from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors
import os

app = Flask(__name__)

# Global variables for the model and data
encoder_dict = {}
topic_encoder = LabelEncoder()
knn = None
X = None
combined_df = None


def load_data(survey_data_path, recommendation_data_path):
    survey_files = ['math_survey.csv', 'chemistry_survey.csv', 'physics_survey.csv']
    recommendation_file = 'topic_recommendation.csv'
    data_frames = []

    for file in survey_files:
        try:
            df = pd.read_csv(os.path.join(survey_data_path, file))
            data_frames.append(df)
            print(f"Loaded {file} successfully!")
        except Exception as e:
            print(f"Error loading {file}: {e}")
            data_frames.append(pd.DataFrame())

    try:
        df = pd.read_csv(os.path.join(recommendation_data_path, recommendation_file))
        data_frames.append(df)
        print(f"Loaded {recommendation_file} successfully!")
    except Exception as e:
        print(f"Error loading {recommendation_file}: {e}")
        data_frames.append(pd.DataFrame(columns=['Recommended_Topic']))

    return data_frames


def encode_df(df, reference_dfs):
    for column in df.columns:
        if df[column].dtype == 'object':
            unique_values = np.array([])
            for dataset in reference_dfs:
                if dataset is not None and column in dataset.columns:
                    unique_values = np.unique(np.concatenate((unique_values, dataset[column].astype(str).unique())))

            if column not in encoder_dict:
                encoder_dict[column] = LabelEncoder()
                encoder_dict[column].fit(unique_values)
                print(f"Encoder for column '{column}' created with classes: {encoder_dict[column].classes_}")  # Debugging print

            df[column] = df[column].apply(
                lambda x: encoder_dict[column].transform([str(x)])[0]
                if str(x) in encoder_dict[column].classes_ else -1
            )
    print("Encoder dictionary after encoding:", encoder_dict)  # Print the entire dictionary
    return df



def prepare_data(survey_data_path, recommendation_data_path):
    data_frames = load_data(survey_data_path, recommendation_data_path)
    math_df, chemistry_df, physics_df, topics_df = data_frames

    # Encode topic recommendations if the DataFrame is not empty
    if not topics_df.empty:
        # Fit encoder with all unique values from the column
        unique_topics = topics_df['Recommended_Topic'].dropna().unique()
        topic_encoder.fit(unique_topics)
        topics_df['Recommended_Topic'] = topics_df['Recommended_Topic'].apply(
            lambda x: topic_encoder.transform([x])[0] if x in topic_encoder.classes_ else -1
        )
        print("Topics encoded successfully!")

    # Encode the data frames
    reference_dfs = [math_df, chemistry_df, physics_df, topics_df]
    math_df = encode_df(math_df, reference_dfs)
    chemistry_df = encode_df(chemistry_df, reference_dfs)
    physics_df = encode_df(physics_df, reference_dfs)
    topics_df = encode_df(topics_df, reference_dfs)

    # Combine the encoded datasets
    combined_df = pd.concat([math_df, chemistry_df, physics_df, topics_df], axis=0, ignore_index=True)

    # Convert the entire DataFrame to numeric values explicitly
    combined_df = combined_df.apply(pd.to_numeric, errors='coerce').fillna(-1)

    # Check for any non-numeric columns after encoding
    non_numeric_cols = combined_df.select_dtypes(exclude=[np.number]).columns
    if len(non_numeric_cols) > 0:
        print("Warning: Non-numeric columns found:", non_numeric_cols)

    return combined_df




def train_knn(combined_df):
    model = NearestNeighbors(n_neighbors=5, metric='euclidean')
    X = combined_df.drop(columns=['Recommended_Topic']).values
    try:
        model.fit(X)
        print("KNN model trained successfully!")
        return model, X
    except Exception as e:
        print(f"Error training KNN model: {e}")
        return None, None


@app.route('/recommend', methods=['POST'])
def recommend():
    global knn, X, combined_df
    try:
        data = request.json['responses']
        encoded_response = []

        for val, col in zip(data, combined_df.columns[:-1]):
            if col in encoder_dict:
                if str(val) in encoder_dict[col].classes_:
                    encoded_val = encoder_dict[col].transform([str(val)])[0]
                else:
                    # Adding unseen value dynamically to encoder classes
                    new_classes = np.append(encoder_dict[col].classes_, str(val))
                    encoder_dict[col].classes_ = np.array(sorted(new_classes))
                    encoded_val = encoder_dict[col].transform([str(val)])[0]
            else:
                try:
                    encoded_val = float(val)
                except ValueError:
                    encoded_val = -1  # Handle non-numeric values

            encoded_response.append(encoded_val)

        # Ensure the encoded response is a numeric array
        # Ensure the encoded response is a numeric array
        encoded_response = np.array(encoded_response, dtype=np.float64)
        print("Encoded response (numeric):", encoded_response)  # Debugging print

# Print encoder classes for debugging
        print("Encoder classes:", {col: encoder_dict[col].classes_ for col in encoder_dict})  # Add this line here

# Perform KNN to get recommendations
        distances, indices = knn.kneighbors([encoded_response])
        recommended_encoded_topics = combined_df.iloc[indices[0]]['Recommended_Topic']

        # Filter out any invalid encoded topics
        valid_topics = [topic for topic in recommended_encoded_topics if topic != -1]
        print("Encoder classes:", {col: encoder_dict[col].classes_ for col in encoder_dict})

        # Convert the recommended topics to integers before inverse transforming
        if len(valid_topics) > 0:
            recommended_topics = topic_encoder.inverse_transform(np.array(valid_topics).astype(int))
            return jsonify({"recommended_topics": recommended_topics.tolist()})
        else:
            return jsonify({"recommended_topics": ["No valid topics found"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 400




if __name__ == '__main__':
    survey_path = 'C:/Users/Priti V/collegeproject/ML/data/survey_question'
    recommendation_path = 'C:/Users/Priti V/collegeproject/ML/data/recommendation_data'
    combined_df = prepare_data(survey_path, recommendation_path)
    knn, X = train_knn(combined_df)

    if knn:
        app.run(debug=True, host="0.0.0.0", port=5000)
    else:
        print("Failed to start the application: KNN model not trained properly.")

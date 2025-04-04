import pandas as pd
import random
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("../../data/raw/chemistry_aptitude_test_100.csv")

# Encode categorical variables
df['Topic'] = df['Topic'].astype('category').cat.codes
df['Difficulty Level'] = df['Difficulty Level'].astype('category').cat.codes
df['Category'] = df['Category'].astype('category').cat.codes

# Features and labels
X = df[['Topic', 'Difficulty Level', 'Category']]
y = df.index  # Using question index as label for selection

# Train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model - corrected filename to match dataset
joblib.dump(model, "../models/chemistry_quiz_generator_model.pkl")
print("Model trained and saved!")

def generate_quiz(num_questions=50):
    """Generate a balanced quiz with 50 questions."""
    selected_questions = []
    topics = df['Topic'].unique()
    difficulties = df['Difficulty Level'].unique()
    
    # Calculate questions per combination
    questions_per_combo = num_questions // (len(topics) * len(difficulties))
    
    # First pass: get balanced distribution
    for topic in topics:
        for difficulty in difficulties:
            subset = df[(df['Topic'] == topic) & (df['Difficulty Level'] == difficulty)]
            if not subset.empty:
                # Only select indices not already chosen
                available_indices = subset.index.difference(selected_questions)
                n_to_select = min(len(available_indices), questions_per_combo)
                if n_to_select > 0:
                    selected_questions.extend(random.sample(list(available_indices), n_to_select))
    
    # Second pass: add random ones to reach target count
    if len(selected_questions) < num_questions:
        remaining = list(df.index.difference(selected_questions))
        n_remaining = min(num_questions - len(selected_questions), len(remaining))
        selected_questions.extend(random.sample(remaining, n_remaining))
    
    # If we somehow got too many, trim the list
    if len(selected_questions) > num_questions:
        selected_questions = selected_questions[:num_questions]
        
    return df.loc[selected_questions]

# Generate a sample quiz - corrected output filename to match dataset
quiz = generate_quiz()
quiz.to_csv("../../data/output/chemistry_quiz.csv", index=False)
print(f"Quiz generated with {len(quiz)} questions and saved!")
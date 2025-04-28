# ml_weakness_predictor.py
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import pandas as pd
from pymongo import MongoClient

# Data Preparation
def prepare_training_data():
    client = MongoClient('mongodb+srv://collegeproject:college123@cluster0.ypfxivd.mongodb.net')
    db = client['test']
    collection = db['assessmentresults']
    
    data = list(collection.find({}))
    features = []
    
    for doc in data:
        # Handle missing timestamp
        timestamp = doc.get('timestamp')
        try:
            last_attempt_date = pd.to_datetime(timestamp).dayofyear if timestamp else 0
        except:
            last_attempt_date = 0  # Default value for invalid dates
        
        # Calculate metrics with error protection
        subtopic_stats = doc.get('subTopicStats', {})
        total_subtopics = len(subtopic_stats)
        
        features.append({
            'student_id': str(doc['_id']),
            'mean_accuracy': (
                sum(stats['correct']/stats['total'] 
                    for stats in subtopic_stats.values() 
                    if stats.get('total', 0) > 0
                ) / total_subtopics 
                if total_subtopics > 0 
                else 0
            ),
            'weak_subtopic_count': sum(
                1 for stats in subtopic_stats.values() 
                if stats.get('total', 0) > 0 
                and (stats.get('correct', 0)/stats['total']) < 0.4
            ),
            'last_attempt_date': last_attempt_date,
            'attempt_frequency': len(doc.get('attempts', [])),
        })
    
    feature_df = pd.DataFrame(features)
    
    # Target logic (modify as needed)
    feature_df['target'] = (feature_df['weak_subtopic_count'] > 3).astype(int)
    
    return feature_df


# Model Training
def train_predictor():
    df = prepare_training_data()
    X = df[['mean_accuracy', 'weak_subtopic_count', 'last_attempt_date', 'attempt_frequency']]
    y = df['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))
    
    return model

# Usage in your existing code
def enhanced_analyze_weak_areas(student_doc, model):
    # Create feature vector
    student_features = pd.DataFrame([{
        'mean_accuracy': sum(stats['correct']/stats['total'] 
                           for stats in student_doc.get('subTopicStats', {}).values() 
                           if stats['total'] > 0)/len(student_doc.get('subTopicStats', {})) if student_doc.get('subTopicStats') else 0,
        'weak_subtopic_count': sum(1 for stats in student_doc.get('subTopicStats', {}).values() 
                                 if (stats['correct']/stats['total'] < 0.4) 
                                 if stats['total'] > 0),
        'last_attempt_date': pd.to_datetime(student_doc.get('timestamp')).dayofyear,
        'attempt_frequency': len(student_doc.get('attempts', []))
    }])
    
    # Predict probability of struggle
    struggle_prob = model.predict_proba(student_features)[0][1]
    
    # If high probability, return all subtopics below 50% instead of 40%
    threshold = 0.5 if struggle_prob > 0.7 else 0.4
    
    weak_subtopics = [
        subtopic for subtopic, stats in student_doc.get('subTopicStats', {}).items()
        if stats['total'] > 0 and (stats['correct']/stats['total']) < threshold
    ]
    
    return weak_subtopics

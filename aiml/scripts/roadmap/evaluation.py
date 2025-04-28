# evaluation.py
from sklearn.metrics import precision_score, recall_score
import numpy as np

def track_recommendation_performance():
    # Get actual student outcomes from DB
    actual = np.array([1, 0, 1, 1, 0])  # 1=improved, 0=not improved
    predicted = np.array([1, 1, 1, 0, 0])  # Mock data - replace with real predictions
    
    print(f"Precision: {precision_score(actual, predicted):.2f}")
    print(f"Recall: {recall_score(actual, predicted):.2f}")
    print(f"F1 Score: {2*(precision_score(actual, predicted)*recall_score(actual, predicted))/(precision_score(actual, predicted)+recall_score(actual, predicted)):.2f}")

# Call this periodically

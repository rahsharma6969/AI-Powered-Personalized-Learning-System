# recommender.py
from surprise import Dataset, Reader, KNNBasic
from collections import defaultdict
import pandas as pd

def build_collaborative_filter():
    # Get student-course interactions from DB
    # This is mock data - replace with actual student-course progress
    data = {
        'student_id': ['s1', 's2', 's3', 's1', 's2'],
        'course_id': ['c1', 'c1', 'c2', 'c3', 'c2'],
        'rating': [5, 3, 4, 4, 5]  # Use actual completion rates or engagement scores
    }
    df = pd.DataFrame(data)
    
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df[['student_id', 'course_id', 'rating']], reader)
    
    trainset = data.build_full_trainset()
    sim_options = {'name': 'cosine', 'user_based': False}
    algo = KNNBasic(sim_options=sim_options)
    algo.fit(trainset)
    
    return algo

def recommend_courses_ml(student_id, algo, weak_subtopics, n=5):
    # Get all courses related to weak subtopics
    candidate_courses = set()
    for topic in weak_subtopics:
        candidate_courses.update(SUBTOPIC_TO_COURSE.get(topic, []))
    
    # Predict ratings for each candidate course
    predictions = []
    for course_id in candidate_courses:
        pred = algo.predict(student_id, course_id)
        predictions.append((course_id, pred.est))
    
    # Sort by predicted rating
    predictions.sort(key=lambda x: x[1], reverse=True)
    
    # Get course details
    recommended = []
    for course_id, _ in predictions[:n]:
        course = next((c for c in COURSES if c['id'] == course_id), None)
        if course:
            recommended.append(course)
    
    return recommended

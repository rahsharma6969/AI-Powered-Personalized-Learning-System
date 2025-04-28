from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from mappings import SUBTOPIC_TO_COURSE, COURSES
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# MongoDB Connection
client = MongoClient('mongodb+srv://collegeproject:college123@cluster0.ypfxivd.mongodb.net')
db = client['test']
student_responses_collection = db['assessmentresults']

@app.route('/api/generate-roadmap/<string:student_id>', methods=['GET'])
def generate_roadmap_route(student_id):
    if not student_id:
        return jsonify({'error': 'studentId is required'}), 400

    student_doc = get_student_responses(student_id)
    if not student_doc:
        return jsonify({'error': 'No responses found for student'}), 404

    roadmap = generate_roadmap(student_doc)
    return jsonify({'roadmap': roadmap}), 200

def get_student_responses(student_id):
    print(f"Received student_id: '{student_id}'")

    try:
        student_id = ObjectId(student_id)
    except Exception as e:
        raise ValueError(f"Invalid student_id format: {student_id}") from e

    student_doc = student_responses_collection.find_one({"user": student_id})
    if not student_doc:
        print(f"No document found for student_id: {student_id}")
        return None

    return student_doc

def analyze_weak_areas(student_doc):
    weak_subtopics = []
    subtopic_stats = student_doc.get('subTopicStats', {})

    if not subtopic_stats:
        print("No subTopicStats found in student document.")
        return weak_subtopics

    for subtopic, stats in subtopic_stats.items():
        total = stats.get('total', 0)
        correct = stats.get('correct', 0)

        if total > 0:
            accuracy = (correct / total) * 100
            if accuracy < 40:
                weak_subtopics.append(subtopic)

    return weak_subtopics

def recommend_courses(weak_subtopics):
    recommended_course_ids = set()
    for topic in weak_subtopics:
        recommended_course_ids.update(SUBTOPIC_TO_COURSE.get(topic, []))
    
    recommended_courses = []
    for course_id in recommended_course_ids:
        # Find the course from the list
        course_detail = next((course for course in COURSES if course['id'] == course_id), None)
        if course_detail:
            recommended_courses.append(course_detail)
    
    return recommended_courses

def generate_roadmap(student_doc):
    weak_areas = analyze_weak_areas(student_doc)
    print(f"Weak Areas Identified: {weak_areas}")  # 🖨️ Print weak areas
    
    courses = recommend_courses(weak_areas)
    print(f"Recommended Courses: {courses}")  # 🖨️ Print recommended courses
    
    return {
        "weakAreas": weak_areas,
        "recommendedCourses": courses
    }

if __name__ == '__main__':
    app.run(debug=True, port=5001)




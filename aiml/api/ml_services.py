from flask import Flask, request, jsonify, send_file
import joblib
import pandas as pd
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

# Directory for reports
os.makedirs("static/reports", exist_ok=True)

# Load ML model and label encoder (if available)
try:
    model = joblib.load("models/student_performance_analyzer.pkl")
    label_enc = joblib.load("models/skill_label_encoder.pkl")
except Exception as e:
    model = None
    label_enc = None
    print("⚠️ Model or encoder not loaded:", e)

def analyze_result(data):
    student_id = data.get("userId", "anonymous")
    answers = data.get("answers", [])

    df = pd.DataFrame(answers)

    required_cols = {"topic", "selected", "correct"}
    if not required_cols.issubset(df.columns):
        return None, {"error": "Missing required columns in answers"}

    # Compute correctness
    df["Correct"] = df["selected"] == df["correct"]

    # Optional ML model prediction (you can skip if not needed)
    if model and label_enc and "Student ID" in df.columns:
        X = df[["Student ID"]]
        df["Predicted Skill Type"] = model.predict(X)
        df["Predicted Skill Type"] = label_enc.inverse_transform(df["Predicted Skill Type"].to_numpy())
        skill_perf = df.groupby("Predicted Skill Type")["Correct"].mean() * 100
    else:
        skill_perf = df.groupby("topic")["Correct"].mean() * 100

    overall_score = skill_perf.mean()
    image_urls = generate_charts(student_id, skill_perf, overall_score)

    return {
        "student_id": student_id,
        "overall_score": overall_score,
        "performance": skill_perf.to_dict(),
        "image_urls": image_urls,
        "suggestions": [f"Improve in {topic}" for topic in skill_perf[skill_perf < 60].index]
    }, None

def generate_charts(student_id, performance, overall_score):
    urls = {}
    for topic, score in performance.items():
        path = f"static/reports/{student_id}_{topic}.png"
        plt.figure()
        plt.bar([topic], [score], color='blue')
        plt.ylim(0, 100)
        plt.title(f"{topic} Performance")
        plt.ylabel("Score (%)")
        print("Saving image to:", path)
        plt.savefig(path)
        plt.close()
        urls[topic] = f"http://127.0.0.1:5002/static/reports/{student_id}_{topic}.png"

    # Overall chart
    overall_path = f"static/reports/{student_id}_Overall.png"
    plt.figure()
    plt.bar(["Overall"], [overall_score], color='purple')
    plt.ylim(0, 100)
    plt.title("Overall Performance")
    plt.savefig(overall_path)
    plt.close()
    urls["Overall"] = f"http://127.0.0.1:5002/static/reports/{student_id}_Overall.png"

    return urls

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    result, error = analyze_result(data)
    if error:
        return jsonify(error), 400
    return jsonify(result)

@app.route("/static/reports/<path:filename>")
def serve_image(filename):
    base_dir = os.path.dirname(os.path.abspath(__file__))  # points to `api/`
    full_path = os.path.join(base_dir, "static", "reports", filename)
    print("📂 Full path used:", full_path) 
    return send_file(full_path, mimetype="image/png")
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AIML server is running!"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)

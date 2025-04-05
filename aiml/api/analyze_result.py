def analyze_result(data):
    score = data.get("score", 0)
    answers = data.get("answers", [])

    topic_scores = {}
    weak_topics = []

    # Example: assuming answers have 'topic', 'selected', and 'correct'
    for ans in answers:
        topic = ans.get("topic", "General")
        if topic not in topic_scores:
            topic_scores[topic] = {"total": 0, "correct": 0}
        topic_scores[topic]["total"] += 1
        if ans.get("selected") == ans.get("correct"):
            topic_scores[topic]["correct"] += 1

    for topic, stat in topic_scores.items():
        accuracy = (stat["correct"] / stat["total"]) * 100
        if accuracy < 60:
            weak_topics.append(topic)

    suggestions = [f"Revise concepts in {t}" for t in weak_topics]

    return {
        "score": score,
        "weak_topics": weak_topics,
        "suggestions": suggestions
    }

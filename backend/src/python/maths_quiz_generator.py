import pandas as pd
import random

def generate_quiz(df, num_questions=50):
    """Generate a balanced quiz with 50 questions."""
    selected_questions = []
    topics = df['Topic'].unique()
    difficulties = df['Difficulty Level'].unique()
    questions_per_group = num_questions // (len(topics) * len(difficulties))
    
    for topic in topics:
        for difficulty in difficulties:
            subset = df[(df['Topic'] == topic) & (df['Difficulty Level'] == difficulty)]
            if not subset.empty:
                n_samples = min(len(subset), questions_per_group)
                selected_questions.extend(subset.sample(n=n_samples, random_state=42).index.tolist())
    
    selected_questions = list(set(selected_questions))
    remaining_needed = num_questions - len(selected_questions)
    
    if remaining_needed > 0:
        available = df.index.difference(selected_questions).tolist()
        if len(available) > 0:
            additional = random.sample(available, min(remaining_needed, len(available)))
            selected_questions.extend(additional)
    
    if len(selected_questions) > num_questions:
        selected_questions = selected_questions[:num_questions]
        
    return df.loc[selected_questions]

# Load and process data
df = pd.read_csv("data/raw/maths_aptitude_test_100.csv")
quiz = generate_quiz(df)
quiz.to_csv("data/output/maths_quiz.csv", index=False)
print("Quiz generated and saved!")
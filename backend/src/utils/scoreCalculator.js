export const calculateScore = (userAnswers) => {
    let correct = 0;
    userAnswers.answers.forEach((q) => {
      if (q.selected === q.correct) {
        correct += 1;
      }
    });
    return (correct / userAnswers.answers.length) * 100;
  };
  
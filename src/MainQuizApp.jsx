import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

const MainQuizApp = () => {
  const [quizList, setQuizList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const preparedQuestions = data.results.map((item) => ({
          question: item.question,
          answer: item.correct_answer,
          options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
        }));
        setQuizList(preparedQuestions);
      });
  }, []);

  const handleResponse = (chosenOption) => {
    if (chosenOption === quizList[activeIndex].answer) {
      setPoints((prev) => prev + 1);
    }
    moveToNext();
  };

  const skipCurrent = () => {
    moveToNext();
  };

  const moveToNext = () => {
    const upcoming = activeIndex + 1;
    if (upcoming < quizList.length) {
      setActiveIndex(upcoming);
    } else {
      setCompleted(true);
    }
  };

  const restartGame = () => {
    setActiveIndex(0);
    setPoints(0);
    setCompleted(false);
    // Optional: fetch new questions again here
  };

  return (
    <div className="quiz-wrapper">
      {completed ? (
        <Result points={points} maxScore={quizList.length} onRestart={restartGame} />
      ) : quizList.length > 0 ? (
        <Quiz
          query={quizList[activeIndex]}
          onRespond={handleResponse}
          index={activeIndex + 1}
          totalCount={quizList.length}
          onPass={skipCurrent}
        />
      ) : (
        <p className="loading-text">🔄 Fetching questions, please wait...</p>
      )}
    </div>
  );
};

export default MainQuizApp;

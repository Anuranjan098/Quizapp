const Result = ({ points, maxScore, onRestart }) => {
    return (
      <div className="summary-box">
        <h2 className="summary-title">🎉 You’ve Completed the Quiz!</h2>
        <p className="score-text">
          You scored <strong>{points}</strong> out of <strong>{maxScore}</strong>
        </p>
        <button className="restart-btn" onClick={onRestart}>
          🔄 Try Again
        </button>
      </div>
    );
  };
  
  export default Result;
  
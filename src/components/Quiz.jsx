import { useEffect, useState } from "react";

const Quiz = ({ query, onRespond, index, totalCount, onPass }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          onRespond(""); // auto-submit on timeout
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [query]);

  return (
    <div className="round-box">
      <h2 className="round-question" dangerouslySetInnerHTML={{ __html: query.question }} />

      <div className="round-options">
        {query.options.map((option, idx) => (
          <button
            key={idx}
            className="option-btn"
            onClick={() => onRespond(option)}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>

      <div className="round-footer">
        <button className="skip-btn" onClick={onPass}>
          ⏭ Skip This
        </button>

        <p className="timer">⏳ Time Remaining: {countdown}s</p>
        <p className="progress">
          🧠 You're on question {index} out of {totalCount}
        </p>
      </div>
    </div>
  );
};

export default Quiz;

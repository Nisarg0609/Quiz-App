import React, { useEffect, useState } from "react";
import "./timer.css";

const Timer = ({ time, onTimerExpire }) => {
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  const [timeLeft, setTimeLeft] = useState(time);

  const hours = Math.floor(timeLeft / (60 * 60));
  const minutes = Math.floor(timeLeft / 60) - Math.floor(hours * 60 * 60);
  const seconds =
    Math.floor(timeLeft) - Math.floor(hours * 60 * 60) - Math.floor(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerExpire({ type: "finished" });
      return;
    }
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleTimeString());
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <div className="timer-container">
      {time === undefined || time === null ? (
        <p style={{ fontSize: "18px" }}>Current Time &nbsp; - &nbsp; {date}</p>
      ) : (
        <p style={{ fontSize: "18px" }}>
          Time Left &nbsp; - &nbsp; {hours} : {minutes} : {seconds}
        </p>
      )}
    </div>
  );
};

export default React.memo(Timer);

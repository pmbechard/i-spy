import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [getTime, setTime] = useState<number>(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(getTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <div className='timer-container'>
      <p>{getTime}s</p>
    </div>
  );
};

export default Timer;

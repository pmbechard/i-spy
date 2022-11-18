import React, { useEffect, useState } from 'react';

interface Props {
  isStarted: boolean;
}

const Timer: React.FC<Props> = ({ isStarted }) => {
  const [getTime, setTime] = useState<number>(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(getTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [getTime, isStarted]);

  return (
    <div className='timer-container'>
      <p>{getTime}s</p>
    </div>
  );
};

export default Timer;

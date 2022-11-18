import React, { useEffect } from 'react';

interface Props {
  isStarted: boolean;
  getTime: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<Props> = ({ isStarted, getTime, setTime }) => {
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(getTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [getTime, isStarted, setTime]);

  return (
    <div className='timer-container'>
      <p>{getTime}s</p>
    </div>
  );
};

export default Timer;

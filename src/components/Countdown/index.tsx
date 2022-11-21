import React, { useEffect } from 'react';

interface Props {
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>;
  countdownTimer: number;
  setCountdownTimer: React.Dispatch<React.SetStateAction<number>>;
}

const Countdown: React.FC<Props> = ({
  setShowCountdown,
  countdownTimer,
  setCountdownTimer,
}) => {
  useEffect(() => {
    return () => {
      setCountdownTimer(5);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdownTimer === 0) setShowCountdown(false);
      setCountdownTimer(countdownTimer - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownTimer]);

  return (
    <div className='countdown-container'>
      <div className='countdown-card'>
        {countdownTimer === 0 ? 'GO!' : countdownTimer}
      </div>
    </div>
  );
};

export default Countdown;

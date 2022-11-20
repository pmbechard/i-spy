import React, { useEffect, useState } from 'react';

interface Props {
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Countdown: React.FC<Props> = ({ setShowCountdown }) => {
  const [getTimer, setTimer] = useState<number>(5);

  useEffect(() => {
    setInterval(() => {
      if (getTimer === 1) setShowCountdown(false);
      setTimer(getTimer - 1);
    }, 1000);
    return () => {
      setTimer(5);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='countdown-container'>
      <div className='countdown-card'>Countdown</div>
    </div>
  );
};

export default Countdown;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../img/close.png';
import successIcon from '../../img/success.png';
import { ScoreObject } from '../Interfaces/Interfaces';

interface Props {
  showSuccessMsg: boolean;
  setShowSuccessMsg: React.Dispatch<React.SetStateAction<boolean>>;
  getTime: number;
  highScores:
    | {
        level: string;
        scores: ScoreObject[];
      }
    | undefined;
}

const SuccessMsg: React.FC<Props> = ({
  showSuccessMsg,
  setShowSuccessMsg,
  getTime,
  highScores,
}) => {
  let navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState<string>('');
  useEffect(() => {
    let counter = 0;
    highScores?.scores.forEach((score) => {
      if (score.time > getTime) counter++;
    });
    if (counter === 0)
      setSuccessMsg("You didn't make the leaderboard this time. Try again!");
    if (counter === 1) setSuccessMsg('You placed third on the leaderboard!');
    if (counter === 2) setSuccessMsg('You placed second on the leaderboard!');
    if (counter === 3) setSuccessMsg('You placed first on the leaderboard!');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showSuccessMsg ? (
    <div
      className='error-msg-container'
      onClick={() => {
        setShowSuccessMsg(false);
        navigate('/');
      }}
    >
      <div className='error-msg-card'>
        <img
          src={closeIcon}
          alt='close'
          onClick={() => {
            setShowSuccessMsg(false);
            navigate('/');
          }}
          className='close-icon'
        />
        <div className='error-img'>
          <img src={successIcon} alt='' />
        </div>
        <div className='error-msg'>
          <h2>Great Job!</h2>
          <p>
            You completed the level in {getTime} seconds! {successMsg}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SuccessMsg;

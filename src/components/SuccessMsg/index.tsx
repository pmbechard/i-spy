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
  handleCompletedLevel: (
    level: string,
    time: number,
    save: boolean
  ) => Promise<void>;
  currentLevel: string;
}

const SuccessMsg: React.FC<Props> = ({
  showSuccessMsg,
  setShowSuccessMsg,
  getTime,
  highScores,
  handleCompletedLevel,
  currentLevel,
}) => {
  let navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isHighScore, setIsHighScore] = useState<boolean>();
  useEffect(() => {
    let counter = 0;
    highScores?.scores.forEach((score) => {
      if (score.time > getTime) counter++;
    });
    if (counter === 0)
      setSuccessMsg("You didn't make the leaderboard this time. Try again!");
    else if (counter === 1)
      setSuccessMsg('You placed third on the leaderboard!');
    else if (counter === 2)
      setSuccessMsg('You placed second on the leaderboard!');
    else if (counter === 3)
      setSuccessMsg('You placed first on the leaderboard!');
    counter > 0 ? setIsHighScore(true) : setIsHighScore(false);
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
            {isHighScore &&
              ' Would you like to save your high score to the leaderboard?'}
          </p>
          {!isHighScore && (
            <button
              onClick={() => {
                setShowSuccessMsg(false);
                navigate('/');
              }}
            >
              OK
            </button>
          )}
          {isHighScore && (
            <div className='save-score-options'>
              <button
                onClick={() => {
                  handleCompletedLevel(currentLevel, getTime, true);
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  handleCompletedLevel(currentLevel, getTime, false);
                }}
              >
                Discard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SuccessMsg;

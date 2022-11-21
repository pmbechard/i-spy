import React from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../img/close.png';
import successIcon from '../../img/success.png';

interface Props {
  showSuccessMsg: boolean;
  setShowSuccessMsg: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessMsg: React.FC<Props> = ({ setShowSuccessMsg }) => {
  let navigate = useNavigate();

  return setShowSuccessMsg ? (
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
            You completed the level. Give the others a try and see if you can
            beat the high scores!
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SuccessMsg;

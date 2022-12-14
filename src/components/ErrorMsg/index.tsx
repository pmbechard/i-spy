import React from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../img/close.png';
import errorIcon from '../../img/no-connection.png';

interface Props {
  showErrorMsg: boolean;
  setShowErrorMsg: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorMsg: React.FC<Props> = ({ showErrorMsg, setShowErrorMsg }) => {
  let navigate = useNavigate();

  return showErrorMsg ? (
    <div
      className='error-msg-container'
      onClick={() => {
        setShowErrorMsg(false);
        navigate('/');
      }}
    >
      <div className='error-msg-card'>
        <img
          src={closeIcon}
          alt='close'
          onClick={() => {
            setShowErrorMsg(false);
            navigate('/');
          }}
          className='close-icon'
        />
        <div className='error-img'>
          <img src={errorIcon} alt='' />
        </div>
        <div className='error-msg'>
          <h2>Sorry for the inconvenience...</h2>
          <p>
            ...but we've experience an error while connecting to the database.
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ErrorMsg;

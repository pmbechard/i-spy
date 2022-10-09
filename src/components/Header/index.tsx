import React from 'react';
import { User } from 'firebase/auth';

interface Props {
  getUserInfo: User | null;
  signIn: () => Promise<void>;
  signUserOut: () => void;
}

const Header: React.FC<Props> = ({ getUserInfo, signIn, signUserOut }) => {
  return (
    <header className='header-area'>
      <h1 className='header-title'>I Spy</h1>
      {getUserInfo ? (
        <>
          <p>Hi, {getUserInfo.displayName?.split(' ')[0]}</p>
          <button onClick={signUserOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </header>
  );
};

export default Header;

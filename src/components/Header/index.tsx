import React from 'react';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';

interface Props {
  getUserInfo: User | null;
  signIn: () => Promise<void>;
  signUserOut: () => void;
}

const Header: React.FC<Props> = ({ getUserInfo, signIn, signUserOut }) => {
  return (
    <header className='header-area'>
      <Link to='/' className='link'>
        <h1 className='header-title'>I Spy</h1>
      </Link>
      {getUserInfo ? (
        <div className='signed-in'>
          <p>Hi, {getUserInfo.displayName?.split(' ')[0]}</p>
          <button onClick={signUserOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </header>
  );
};

export default Header;

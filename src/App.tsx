import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Level from './components/Level';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';

function App() {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);
  const [, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      setUserInfo(getAuth().currentUser);
    });

    return () => {
      listener();
    };
  }, []);

  const signIn = async () => {
    const auth = getAuth();
    let user: User;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).then((result) => {
          user = result.user;
          setUserInfo(user);
        });
      })
      .catch((error) => {
        console.log(error);
        setUserInfo(null);
      });
  };

  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
        console.log(error);
        setUserInfo(null);
      });
  };

  return (
    <BrowserRouter>
      <Header
        getUserInfo={getUserInfo}
        signIn={signIn}
        signUserOut={signUserOut}
      />
      <Routes>
        {getUserInfo ? (
          <>
            <Route path='/1' element={<Level level={1} />} />
            <Route path='/2' element={<Level level={2} />} />
            <Route path='/3' element={<Level level={3} />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='*' element={<Home />} />
          </>
        ) : (
          <Route
            path=''
            element={
              <div className='login-prompt'>
                <button onClick={signIn}>Sign in to play</button>
              </div>
            }
          />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

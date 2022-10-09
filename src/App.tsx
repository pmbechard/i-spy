import React, { useState } from 'react';
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
} from 'firebase/auth';

function App() {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);

  const signIn = async () => {
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).then((result) => {
          const user = result.user;
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
        <Route path='/1' element={<Level level={1} />} />
        <Route path='/2' element={<Level level={2} />} />
        <Route path='/3' element={<Level level={3} />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

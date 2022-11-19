import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
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
import Loading from './components/Loading';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase/firebase-config';
import {
  ScoreCollection,
  ScoreObject,
} from './components/Interfaces/Interfaces';

function App() {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);
  const [getCompletedLevels, setCompletedLevels] = useState<string[]>([]);
  const [, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getHighScores, setHighScores] = useState<
    | {
        level: string;
        scores: ScoreObject[];
      }[]
    | undefined
  >();

  useEffect(() => {
    setIsLoading(true);
    fetchHighScores();
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      setUserInfo(getAuth().currentUser);
      setIsLoading(false);
    });
    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserInfo]);

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

  const fetchUserData = async () => {
    if (!getUserInfo?.email) return;
    let levels: string[] = [];
    try {
      const docRef = doc(db, 'users', getUserInfo.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        levels = docSnap.data().completedLevels;
      } else {
        await createUserDoc();
      }
    } catch (e) {
      // FIXME: Loading error
      console.log(e);
    }
    setCompletedLevels(levels);
  };

  const createUserDoc = async () => {
    try {
      await setDoc(doc(db, 'users', getUserInfo?.email || ''), {
        completedLevels: [],
      });
    } catch (e) {
      //FIXME: Loading error
      console.log(e);
    }
  };

  const fetchHighScores = async () => {
    try {
      const highScores: ScoreCollection[] | undefined = [];
      for (let i = 1; i <= 3; i++) {
        const docRef = doc(db, 'levels', `${i}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          highScores.push({
            level: `${i}`,
            scores: docSnap.data().highScores,
          });
        }
      }
      setHighScores(highScores);
    } catch (e) {
      // FIXME: Loading error
      console.log(e);
    }
  };

  const handleCompletedLevel = async (level: string) => {
    console.log(`Level ${level} complete!`);
    if (!getCompletedLevels.includes(level))
      setCompletedLevels(getCompletedLevels.concat(level));
    // check for high score - ask for permission to save
    // show success msg
  };

  return (
    <BrowserRouter>
      <Header
        getUserInfo={getUserInfo}
        signIn={signIn}
        signUserOut={signUserOut}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          {getUserInfo ? (
            <>
              <Route
                path='/1'
                element={
                  <Level
                    level={'1'}
                    handleCompletedLevel={handleCompletedLevel}
                  />
                }
              />
              <Route
                path='/2'
                element={
                  <Level
                    level={'2'}
                    handleCompletedLevel={handleCompletedLevel}
                  />
                }
              />
              <Route
                path='/3'
                element={
                  <Level
                    level={'3'}
                    handleCompletedLevel={handleCompletedLevel}
                  />
                }
              />
              <Route
                path='*'
                element={
                  <Home
                    getCompletedLevels={getCompletedLevels}
                    getHighScores={getHighScores}
                  />
                }
              />
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
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

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
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase/firebase-config';
import {
  ScoreCollection,
  ScoreObject,
} from './components/Interfaces/Interfaces';
import ErrorMsg from './components/ErrorMsg';
import Countdown from './components/Countdown';

// TODO:
// Improve styling

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
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [countdownTimer, setCountdownTimer] = useState<number>(5);

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
      setShowErrorMsg(true);
    }
    setCompletedLevels(levels);
  };

  const createUserDoc = async () => {
    try {
      await setDoc(doc(db, 'users', getUserInfo?.email || ''), {
        completedLevels: [],
      });
    } catch (e) {
      setShowErrorMsg(true);
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
      setShowErrorMsg(true);
    }
  };

  const handleCompletedLevel = async (
    level: string,
    time: number,
    save: boolean
  ) => {
    await updatedCompletedLevels(level);
    save && (await updateHighScores(level, time));
  };

  const updatedCompletedLevels = async (level: string) => {
    if (!getUserInfo?.email) return;
    if (!getCompletedLevels.includes(level)) {
      const docRef = doc(db, 'users', getUserInfo.email);
      try {
        await updateDoc(docRef, {
          completedLevels: getCompletedLevels.concat(level),
        });
      } catch (e) {
        setShowErrorMsg(true);
      }
      setCompletedLevels(getCompletedLevels.concat(level));
    }
  };

  const updateHighScores = async (level: string, time: number) => {
    const highScores: ScoreObject[] | undefined = getHighScores?.filter(
      (scores) => scores.level === level
    )[0].scores;

    if (!highScores || highScores.length < 3) return;

    for (let i = 2; i >= 0; i--) {
      if (time < highScores[i].time) {
        const docRef = doc(db, 'levels', level);
        try {
          let username: string = getUserInfo?.displayName
            ? getUserInfo?.displayName?.substring(
                0,
                getUserInfo?.displayName?.indexOf(' ') + 2
              )
            : 'Anon';
          let newHighScores: ScoreObject[] = [
            ...highScores,
            { username: username, time: time },
          ];
          newHighScores = newHighScores
            .sort((a, b) => {
              return a.time - b.time;
            })
            .slice(0, 3);
          await updateDoc(docRef, {
            highScores: newHighScores,
          });
          await fetchHighScores();
        } catch (e) {
          setShowErrorMsg(true);
        }
      }
    }
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
                    showCountdown={showCountdown}
                    setShowCountdown={setShowCountdown}
                    setShowErrorMsg={setShowErrorMsg}
                    setCountdownTimer={setCountdownTimer}
                    getHighScores={getHighScores}
                  />
                }
              />
              <Route
                path='/2'
                element={
                  <Level
                    level={'2'}
                    handleCompletedLevel={handleCompletedLevel}
                    showCountdown={showCountdown}
                    setShowCountdown={setShowCountdown}
                    setShowErrorMsg={setShowErrorMsg}
                    setCountdownTimer={setCountdownTimer}
                    getHighScores={getHighScores}
                  />
                }
              />
              <Route
                path='/3'
                element={
                  <Level
                    level={'3'}
                    handleCompletedLevel={handleCompletedLevel}
                    showCountdown={showCountdown}
                    setShowCountdown={setShowCountdown}
                    setShowErrorMsg={setShowErrorMsg}
                    setCountdownTimer={setCountdownTimer}
                    getHighScores={getHighScores}
                  />
                }
              />
              <Route
                path='/*'
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
              path='/*'
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
      <ErrorMsg showErrorMsg={showErrorMsg} setShowErrorMsg={setShowErrorMsg} />
      {showCountdown && !showErrorMsg && (
        <Countdown
          setShowCountdown={setShowCountdown}
          countdownTimer={countdownTimer}
          setCountdownTimer={setCountdownTimer}
        />
      )}
    </BrowserRouter>
  );
}

export default App;

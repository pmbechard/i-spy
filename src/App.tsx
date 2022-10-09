import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Level from './components/Level';

function App() {
  return (
    <BrowserRouter>
      <Header />
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

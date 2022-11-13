import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import lvl1Icon from '../../img/lvl-1.png';
import lvl2Icon from '../../img/lvl-2.png';
import lvl3Icon from '../../img/lvl-3.png';
import lockedIcon from '../../img/locked.png';
import Leaderboard from '../Leaderboard';

const Home = () => {
  const [getCompletedLevels, setCompletedLevels] = useState<string[]>([]);
  const [getLeaderboardLevel, setLeaderboardLevel] = useState<string>('1');

  return (
    <section>
      <h2>Choose a level to play</h2>
      <div className='levels-area'>
        <Link to='1' className='link level-btn'>
          <img src={lvl1Icon} alt='' />
        </Link>
        {getCompletedLevels.includes('1') ? (
          <Link to='2' className='link level-btn'>
            <img src={lvl2Icon} alt='' />
          </Link>
        ) : (
          <div className='disabled-level-container'>
            <img src={lvl2Icon} alt='' className='disabled-level' />
            <img src={lockedIcon} alt='' className='level-status' />
          </div>
        )}
        {getCompletedLevels.includes('2') ? (
          <Link to='3' className='link level-btn'>
            <img src={lvl3Icon} alt='' />
          </Link>
        ) : (
          <div className='disabled-level-container'>
            <img src={lvl3Icon} alt='' className='disabled-level' />
            <img src={lockedIcon} alt='' className='level-status' />
          </div>
        )}
      </div>
      <h2>Check the high scores</h2>
      <div className='leaderboard-tabs'>
        <div
          className={`leaderboard-tab ${
            getLeaderboardLevel === '1' && 'selected'
          }`}
          onClick={() => setLeaderboardLevel('1')}
        >
          Level 1
        </div>
        <div
          className={`leaderboard-tab ${
            getLeaderboardLevel === '2' && 'selected'
          }`}
          onClick={() => setLeaderboardLevel('2')}
        >
          Level 2
        </div>
        <div
          className={`leaderboard-tab ${
            getLeaderboardLevel === '3' && 'selected'
          }`}
          onClick={() => setLeaderboardLevel('3')}
        >
          Level 3
        </div>
      </div>
      <Leaderboard getLeaderboardLevel={getLeaderboardLevel} />
    </section>
  );
};

export default Home;

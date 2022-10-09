import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section>
      <div className='levels-area'>
        <Link to='1' className='link level-card level-1'>
          Level 1
        </Link>
        <Link to='2' className='link level-card level-2'>
          Level 2
        </Link>
        <Link to='3' className='link level-card level-3'>
          Level 3
        </Link>
      </div>
      <Link to='leaderboard' className='link leaderboard-card'>
        Leaderboard
      </Link>
    </section>
  );
};

export default Home;

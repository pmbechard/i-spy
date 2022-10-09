import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <>
      <div>Home</div>
      <Link to='1'>Level 1</Link>
      <Link to='2'>Level 2</Link>
      <Link to='3'>Level 3</Link>
      <Link to='leaderboard'>Leaderboard</Link>
    </>
  );
};

export default index;

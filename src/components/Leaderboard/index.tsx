import React from 'react';

const Leaderboard = () => {
  return (
    <div className='leaderboard-container'>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Level 1</th>
            <th colSpan={2}>Level 2</th>
            <th colSpan={2}>Level 3</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Name</th>
            <th>Time</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User 1.1</td>
            <td>20.3s</td>
            <td>User 2.1</td>
            <td>23.4s</td>
            <td>User 3.1</td>
            <td>26.7s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

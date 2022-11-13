import React from 'react';
import goldMedal from '../../img/gold.png';
import silverMedal from '../../img/silver.png';
import bronzeMedal from '../../img/bronze.png';

interface Props {
  getLeaderboardLevel: string;
}

const Leaderboard: React.FC<Props> = ({ getLeaderboardLevel }) => {
  return (
    <div className='leaderboard-container'>
      <table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* TODO: Implement fetch call here  */}
            <td>
              <img src={goldMedal} alt='' className='leaderboard-medal' />
            </td>
            <td>User {getLeaderboardLevel}.1</td>
            <td>20.3s</td>
          </tr>
          <tr>
            {/* TODO: Implement fetch call here  */}
            <td>
              <img src={silverMedal} alt='' className='leaderboard-medal' />
            </td>
            <td>User {getLeaderboardLevel}.2</td>
            <td>21.3s</td>
          </tr>
          <tr>
            {/* TODO: Implement fetch call here  */}
            <td>
              <img src={bronzeMedal} alt='' className='leaderboard-medal' />
            </td>
            <td>User {getLeaderboardLevel}.2</td>
            <td>21.3s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

import React, { useEffect, useState } from 'react';
import first from '../../img/gold.png';
import second from '../../img/silver.png';
import third from '../../img/bronze.png';
import { ScoresObject } from '../Interfaces/Interfaces';
import Loading from '../Loading';

interface Props {
  getLeaderboardLevel: string;
  getHighScores:
    | {
        level: string;
        scores: ScoresObject;
      }[]
    | undefined;
}

const Leaderboard: React.FC<Props> = ({
  getLeaderboardLevel,
  getHighScores,
}) => {
  const [currentScores, setCurrentScores] = useState<ScoresObject>();

  useEffect(() => {
    setCurrentScores(
      getHighScores?.filter((scores) => scores.level === getLeaderboardLevel)[0]
        .scores
    );
  }, [getHighScores, getLeaderboardLevel]);

  console.table();
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
          {currentScores &&
            currentScores?.highScores.map((score) => {
              return (
                <tr>
                  <td>
                    <img src={score.position} alt='' />
                  </td>
                  <td>{score.username}</td>
                  <td>{score.time}</td>
                </tr>
              );
            })}
          {/* <tr>
              <td>
                <img src={score.position} alt='' />
              </td>
              <td>{score.username}</td>
              <td>{score.time}</td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

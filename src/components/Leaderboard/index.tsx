import React, { useEffect, useState } from 'react';
import goldIcon from '../../img/gold.png';
import silverIcon from '../../img/silver.png';
import bronzeIcon from '../../img/bronze.png';
import Loading from '../Loading';
import { ScoreCollection, ScoreObject } from '../Interfaces/Interfaces';

interface Props {
  getHighScores: ScoreCollection[] | undefined;
}

const Leaderboard: React.FC<Props> = ({ getHighScores }) => {
  const [getLeaderboardLevel, setLeaderboardLevel] = useState<string>('1');
  const [currentScores, setCurrentScores] = useState<
    ScoreObject[] | undefined
  >();

  useEffect(() => {
    setCurrentScores(
      getHighScores?.filter((scores) => scores.level === getLeaderboardLevel)[0]
        .scores
    );
  }, [getHighScores, getLeaderboardLevel]);

  const getIcon = (position: string) => {
    if (position === 'first') return goldIcon;
    if (position === 'second') return silverIcon;
    if (position === 'third') return bronzeIcon;
    return '';
  };

  return (
    <div className='leaderboard-container'>
      <h2>Check the high scores</h2>
      {currentScores ? (
        <>
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
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentScores?.map((score) => {
                return (
                  <tr key={`${getLeaderboardLevel}-${score.position}`}>
                    <td>
                      <img
                        src={getIcon(score.position)}
                        alt=''
                        className='leaderboard-medal'
                      />
                    </td>
                    <td>{score.username}</td>
                    <td>{score.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Leaderboard;

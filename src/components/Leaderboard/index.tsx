import React, { useEffect, useState } from 'react';
import goldIcon from '../../img/gold.png';
import silverIcon from '../../img/silver.png';
import bronzeIcon from '../../img/bronze.png';
import Loading from '../Loading';
import { ScoreCollection, ScoreObject } from '../Interfaces/Interfaces';

interface Props {
  getLeaderboardLevel: string;
  getHighScores: ScoreCollection[] | undefined;
}

const Leaderboard: React.FC<Props> = ({
  getLeaderboardLevel,
  getHighScores,
}) => {
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

          {currentScores ? (
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
          ) : (
            <Loading />
          )}

    </div>
  );
};

export default Leaderboard;

import { Link } from 'react-router-dom';
import lvl1Icon from '../../img/lvl-1.png';
import lvl2Icon from '../../img/lvl-2.png';
import lvl3Icon from '../../img/lvl-3.png';
import lockedIcon from '../../img/locked.png';
import Leaderboard from '../Leaderboard';
import { ScoreCollection } from '../Interfaces/Interfaces';
import MagnifyingGlass from '../MagnifyingGlass';

interface Props {
  getCompletedLevels: string[];
  getHighScores: ScoreCollection[] | undefined;
}

const Home: React.FC<Props> = ({ getCompletedLevels, getHighScores }) => {
  return (
    <section>
      <h2>Choose a level to play</h2>
      <div className='levels-area'>
        <Link to='1' className='link level-btn'>
          <img src={lvl1Icon} alt='' />
        </Link>
        <MagnifyingGlass />
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
      <Leaderboard getHighScores={getHighScores} />
    </section>
  );
};

export default Home;

import { Link } from 'react-router-dom';
import lvl1Img from '../../img/level-1-preview.jpeg';
import lvl1Icon from '../../img/lvl-1.png';
import lvl2Img from '../../img/level-2-preview.jpeg';
import lvl2Icon from '../../img/lvl-2.png';
import lvl3Img from '../../img/level-3-preview.jpeg';
import lvl3Icon from '../../img/lvl-3.png';
import lockedIcon from '../../img/locked.png';
import Leaderboard from '../Leaderboard';
import { ScoreCollection } from '../Interfaces/Interfaces';

interface Props {
  getCompletedLevels: string[];
  getHighScores: ScoreCollection[] | undefined;
}

const Home: React.FC<Props> = ({ getCompletedLevels, getHighScores }) => {
  return (
    <section>
      <h2 className='area-heading'>Levels</h2>
      <div className='levels-area'>
        <Link to='1' className='link level-btn'>
          <img src={lvl1Img} alt='' className='level-bg-img' />
          <img src={lvl1Icon} className='level-number' alt='1' />
        </Link>
        {getCompletedLevels.includes('1') ? (
          <Link to='2' className='link level-btn'>
            <img src={lvl2Img} alt='' className='level-bg-img' />
            <img src={lvl2Icon} className='level-number' alt='2' />
          </Link>
        ) : (
          <div className='disabled-level-container'>
            <img src={lvl2Img} alt='' className='disabled-level level-bg-img' />
            <img src={lockedIcon} alt='' className='level-number disabled' />
          </div>
        )}
        {getCompletedLevels.includes('2') ? (
          <Link to='3' className='link level-btn'>
            <img src={lvl3Img} alt='' className='level-bg-img' />
            <img src={lvl3Icon} className='level-number' alt='3' />
          </Link>
        ) : (
          <div className='disabled-level-container'>
            <img src={lvl3Img} alt='' className='disabled-level level-bg-img' />
            <img src={lockedIcon} alt='' className='level-number disabled' />
          </div>
        )}
      </div>
      <Leaderboard getHighScores={getHighScores} />
    </section>
  );
};

export default Home;

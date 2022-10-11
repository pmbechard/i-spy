import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';

interface Props {
  level: number;
}

const Level: React.FC<Props> = ({ level }) => {
  const [getImg, setImg] = useState<string>('');

  useEffect(() => {
    const fetchImg = async () => {
      try {
        setImg(await getDownloadURL(ref(storage, `level-${level}.jpg`)));
      } catch (e) {
        // FIXME: Show loading error
        console.log(e);
      }
    };
    fetchImg();
  }, [level]);

  const handleBoardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(
      ((e.clientX / e.currentTarget.offsetWidth) * 100).toFixed(0),
      (((e.clientY - rect.top) / (rect.bottom - rect.top)) * 100).toFixed(0)
    );
  };

  return (
    <div className='level-container'>
      <div className='level-info'>Level {level}</div>
      <div className='gameboard' onClick={(e) => handleBoardClick(e)}>
        <img src={getImg} alt='' className='level-img' />
      </div>
    </div>
  );
};

export default Level;

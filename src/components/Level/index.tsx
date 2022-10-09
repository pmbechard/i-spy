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
  }, []);

  return (
    <>
      <div>Level {level}</div>
      <img src={getImg} alt='' />
    </>
  );
};

export default Level;

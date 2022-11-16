import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { storage } from '../../firebase/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';
import Loading from '../Loading';
import { doc, getDoc } from 'firebase/firestore';
import Timer from '../Timer';
import { ItemsObject } from '../Interfaces/Interfaces';
import ClickMenu from './ClickMenu';

interface Props {
  level: string;
  setCompletedLevels: React.Dispatch<React.SetStateAction<string[]>>;
}

const Level: React.FC<Props> = ({ level, setCompletedLevels }) => {
  const [getImg, setImg] = useState<string>('');
  const [getItems, setItems] = useState<ItemsObject>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [getClickPos, setClickPos] = useState<number[]>([]);
  const [clickMenuIsHidden, setClickMenuIsHidden] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsStarted(true);
    }, 3000);
  });

  useEffect(() => {
    const fetchImg = async () => {
      setIsLoading(true);
      try {
        setImg(await getDownloadURL(ref(storage, `level-${level}.jpg`)));
      } catch (e) {
        // FIXME: Show loading error
        console.log(e);
      }
      setIsLoading(false);
    };
    const fetchItemObjects = async () => {
      try {
        const docRef = doc(db, 'levels', `${level}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const itemsObj: ItemsObject = docSnap.data() as ItemsObject;
          setItems(itemsObj);
        }
      } catch (e) {
        // FIXME: Loading error
        console.log(e);
      }
    };
    fetchImg();
    fetchItemObjects();
  }, [level]);

  const handleBoardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!clickMenuIsHidden) {
      setClickMenuIsHidden(true);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    let x = parseInt(
      ((e.clientX / e.currentTarget.offsetWidth) * 100).toFixed(0)
    );
    let y = parseInt(
      (((e.clientY - rect.top) / (rect.bottom - rect.top)) * 100).toFixed(0)
    );
    setClickPos([x, y]);
    setClickMenuIsHidden(false);
  };

  return (
    <>
      <div className='level-container'>
        <div className='level-info'>
          <h1>Level {level}</h1>
          <div className='search-info'>
            <h2>You are looking for...</h2>
            <div className='search-items'>
              {getItems &&
                getItems?.items.map((item) => {
                  return (
                    <div className='search-item' key={item.name}>
                      {item.name}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className='gameboard' onClick={(e) => handleBoardClick(e)}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='game-img-container'>
              <img src={getImg} alt='' className='level-img' />
              {!clickMenuIsHidden && <ClickMenu coords={getClickPos} />}
            </div>
          )}
        </div>
      </div>
      {isStarted && <Timer />}
    </>
  );
};

export default Level;

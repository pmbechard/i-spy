import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { storage } from '../../firebase/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';
import Loading from '../Loading';
import { doc, getDoc } from 'firebase/firestore';
import Timer from '../Timer';
import { ItemsObject } from '../Interfaces/Interfaces';
import ClickMenu from './ClickMenu';
import { useLocation } from 'react-router-dom';

interface Props {
  level: string;
  handleCompletedLevel: (level: string, time: number) => Promise<void>;
}

const itemLabelStyle: React.CSSProperties = {
  fontWeight: '900',
  color: '#ededed',
  padding: '10px 20px',
  borderRadius: '8px',
};

const Level: React.FC<Props> = ({ level, handleCompletedLevel }) => {
  const [getImg, setImg] = useState<string>('');
  const [getItems, setItems] = useState<ItemsObject>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [getClickPos, setClickPos] = useState<number[]>([]);
  const [clickMenuIsHidden, setClickMenuIsHidden] = useState<boolean>(true);
  const [getRemainingItems, setRemainingItems] = useState<ItemsObject>();
  const [getTime, setTime] = useState<number>(0);
  const currentLevel: string = useLocation().pathname.charAt(
    useLocation().pathname.length - 1
  );

  useEffect(() => {
    // FIXME: Implement countdown to start feature
    setTimeout(() => {
      setIsStarted(true);
    }, 3000);
  }, []);

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
          setRemainingItems(itemsObj);
        }
      } catch (e) {
        // FIXME: Loading error
        console.log(e);
      }
    };
    fetchImg();
    fetchItemObjects();
  }, [level]);

  useEffect(() => {
    if (getRemainingItems && getRemainingItems.items.length === 0) {
      setIsStarted(false);
      handleCompletedLevel(currentLevel, getTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRemainingItems]);

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

  const checkItemSelection = (itemName: string): boolean => {
    let selectedItem = getItems?.items.filter((item) => item.name === itemName);
    if (selectedItem && selectedItem?.length > 0) {
      if (
        Math.abs(getClickPos[0] - selectedItem[0].location[0]) <= 3 &&
        Math.abs(getClickPos[1] - selectedItem[0].location[1]) <= 3
      ) {
        const remainingItems: ItemsObject = { items: [] };
        getRemainingItems?.items.forEach((item) => {
          if (item.name !== itemName) remainingItems.items.push(item);
        });
        setRemainingItems(remainingItems);
        return true;
      }
    }
    return false;
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
                    <div
                      className='search-item'
                      key={item.name}
                      style={{
                        ...itemLabelStyle,
                        backgroundColor: `${
                          getRemainingItems?.items.includes(item)
                            ? 'rgb(133, 52, 52)'
                            : 'green'
                        }`,
                      }}
                    >
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
              {!clickMenuIsHidden && (
                <ClickMenu
                  coords={getClickPos}
                  getItems={getItems}
                  getRemainingItems={getRemainingItems}
                  checkItemSelection={checkItemSelection}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {isStarted && (
        <Timer isStarted={isStarted} getTime={getTime} setTime={setTime} />
      )}
    </>
  );
};

export default Level;

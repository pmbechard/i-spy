import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { storage } from '../../firebase/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';
import Loading from '../Loading';
import { doc, getDoc } from 'firebase/firestore';
import Timer from '../Timer';
import { ItemsObject, ScoreObject } from '../Interfaces/Interfaces';
import ClickMenu from './ClickMenu';
import { useLocation } from 'react-router-dom';
import SuccessMsg from '../SuccessMsg';

interface Props {
  level: string;
  handleCompletedLevel: (
    level: string,
    time: number,
    save: boolean
  ) => Promise<void>;
  showCountdown: boolean;
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowErrorMsg: React.Dispatch<React.SetStateAction<boolean>>;
  setCountdownTimer: React.Dispatch<React.SetStateAction<number>>;
  getHighScores:
    | {
        level: string;
        scores: ScoreObject[];
      }[]
    | undefined;
}

const itemLabelStyle: React.CSSProperties = {
  fontWeight: '900',
  color: '#ededed',
  padding: '10px 20px',
  borderRadius: '8px',
};

const Level: React.FC<Props> = ({
  level,
  handleCompletedLevel,
  showCountdown,
  setShowCountdown,
  setShowErrorMsg,
  setCountdownTimer,
  getHighScores,
}) => {
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
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  useEffect(() => {
    setShowCountdown(true);
    setCountdownTimer(5);
    return () => {
      setShowCountdown(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showCountdown) setIsStarted(true);
  }, [showCountdown]);

  useEffect(() => {
    const fetchImg = async () => {
      setIsLoading(true);
      try {
        setImg(await getDownloadURL(ref(storage, `level-${level}.jpg`)));
      } catch (e) {
        setShowErrorMsg(true);
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
        setShowErrorMsg(true);
      }
    };
    fetchImg();
    fetchItemObjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (getRemainingItems && getRemainingItems.items.length === 0) {
      setIsStarted(false);
      setShowSuccessMsg(true);
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
    // FIXME: delete when done
    console.log(x, y);
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
      {isStarted && !showCountdown && (
        <Timer isStarted={isStarted} getTime={getTime} setTime={setTime} />
      )}
      {showSuccessMsg && (
        <SuccessMsg
          showSuccessMsg={showSuccessMsg}
          setShowSuccessMsg={setShowSuccessMsg}
          getTime={getTime}
          highScores={
            getHighScores?.filter((scores) => scores.level === currentLevel)[0]
          }
          handleCompletedLevel={handleCompletedLevel}
          currentLevel={currentLevel}
        />
      )}
    </>
  );
};

export default Level;

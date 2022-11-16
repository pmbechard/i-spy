import React from 'react';

interface Props {
  coords: number[];
}

const ClickMenu: React.FC<Props> = ({ coords }) => {
  let clickMenuStyle: React.CSSProperties = {
    position: 'absolute',
    border: '5px solid black',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    left: `calc(${coords[0]}% - 40px)`,
    top: `calc(${coords[1]}% - 40px)`,
    zIndex: '3',
  };

  return <div className='click-menu' style={clickMenuStyle}></div>;
};

export default ClickMenu;

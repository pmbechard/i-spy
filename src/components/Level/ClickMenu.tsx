import React from 'react';
import { ItemsObject } from '../Interfaces/Interfaces';

interface Props {
  coords: number[];
  getItems: ItemsObject | undefined;
}

const ClickMenu: React.FC<Props> = ({ coords, getItems }) => {
  let selectionMenuStyle: React.CSSProperties = {
    position: 'absolute',
    border: '5px solid #2e2e2e',
    borderRadius: '20px',
    width: '80px',
    height: '80px',
    left: `calc(${coords[0]}% - 40px)`,
    top: `calc(${coords[1]}% - 40px)`,
    zIndex: '3',
    backgroundColor: 'rgba(0, 128, 0, 0.4)',
  };

  return (
    <div className='selection-menu' style={selectionMenuStyle}>
      <div className='selection-menu-dropdown'>
        {getItems?.items.map((item) => {
          return (
            <div
              className='selection-dropdown-item'
              key={`selection-${item.name}`}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClickMenu;

import React from 'react';

interface Props {
  level: number;
}

const index: React.FC<Props> = ({ level }) => {
  return <div>Level {level}</div>;
};

export default index;

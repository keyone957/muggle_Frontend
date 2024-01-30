import React from 'react';
import DefaultAvatar from '../assets/avatar.svg';
import DefaultAvatar2 from '../assets/avatar2.svg';
import DefaultAvatar3 from '../assets/avatar3.svg';
import DefaultAvatar4 from '../assets/avatar4.svg';
import DefaultAvatar5 from '../assets/avatar5.svg';

export default ({uid, width, height}) => {
  const getRandomNum = uid => {
    const ascii = uid.charCodeAt(uid.length - 1);
    const num = ascii % 5;
    return num;
  };

  const num = getRandomNum(uid);

  switch (num) {
    case 1:
      return <DefaultAvatar width={width} height={height} />;
    case 2:
      return <DefaultAvatar2 width={width} height={height} />;
    case 3:
      return <DefaultAvatar3 width={width} height={height} />;
    case 4:
      return <DefaultAvatar4 width={width} height={height} />;
    default:
      return <DefaultAvatar5 width={width} height={height} />;
  }
};

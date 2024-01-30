import React from 'react';
import styled from 'styled-components/native';
import CoList from './CoList';

const AllContainer = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
  padding: 0 20px;
`;

export default () => {
  const comment = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push(<CoList key={i} />);
    }
    return array;
  };

  return <AllContainer>{comment()}</AllContainer>;
};
1;

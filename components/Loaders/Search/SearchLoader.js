import React from 'react';
import styled from 'styled-components/native';
import SearchList from './SearchList';

const AllContainer = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
`;

export default () => {
  const serach = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(<SearchList key={i} />);
    }
    return array;
  };
  return <AllContainer>{serach()}</AllContainer>;
};

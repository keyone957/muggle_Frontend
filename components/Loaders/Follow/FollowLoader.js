import React from 'react';
import styled from 'styled-components/native';
import FollowList from './FollowList';

const AllContainer = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding: 0 20px;
`;

export default () => {
  const follow = () => {
    let array = [];
    for (let i = 0; i < 11; i++) {
      array.push(<FollowList key={i} />);
    }
    return array;
  };
  return <AllContainer>{follow()}</AllContainer>;
};

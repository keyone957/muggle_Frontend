import React from 'react';
import styled from 'styled-components/native';
import {ThumbnailList} from '../../components/Lists';
import ThumbnailLoaser from '../../components/Loaders/UserPage/ThumbnailList';

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
  padding: 0 20px;
  padding-bottom: 30px;
`;

export default ({loading, data, onEndReached}) => {
  return (
    <Container>
      {loading ? (
        <ThumbnailLoaser />
      ) : (
        <ThumbnailList
          data={data}
          onEndReached={onEndReached}
          loading={loading}
        />
      )}
    </Container>
  );
};

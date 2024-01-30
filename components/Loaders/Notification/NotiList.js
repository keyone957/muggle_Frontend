import React from 'react';
import styled from 'styled-components/native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const NotiContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  width: 100%;
`;

const Message = styled.View`
  margin-left: 10px;
`;

export default () => {
  return (
    <NotiContainer>
      <ContentLoader
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        speed={1}
        width={44}
        height={44}
        viewBox="0 0 44 44"
        backgroundColor="#f8f8f8"
        foregroundColor="#ecebeb">
        <Rect rx="30" ry="30" width="44" height="44" />
      </ContentLoader>
      <Message>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          speed={1}
          width={180}
          height={10}
          viewBox="0 0 180 10"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect width="180" height="10" />
        </ContentLoader>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
          }}
          speed={1}
          width={40}
          height={10}
          viewBox="0 0 40 10"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect width="40" height="10" />
        </ContentLoader>
      </Message>
    </NotiContainer>
  );
};

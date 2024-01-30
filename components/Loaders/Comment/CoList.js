import React from 'react';
import styled from 'styled-components/native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const CommentContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 30px;
`;

const Column = styled.View`
  width: 12%;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IdWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default () => {
  return (
    <CommentContainer>
      <Column style={{marginright: 8}}>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          speed={1}
          width={36}
          height={36}
          viewBox="0 0 36 36"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect rx="30" ry="30" width="36" height="36" />
        </ContentLoader>
      </Column>
      <Column>
        <IdWrapper>
          <Wrapper>
            <ContentLoader
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
              }}
              speed={1}
              width={80}
              height={10}
              viewBox="0 0 80 10"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="80" height="10" />
            </ContentLoader>
          </Wrapper>
        </IdWrapper>
        <IdWrapper>
          <Wrapper>
            <ContentLoader
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 7,
                marginTop: 7,
              }}
              speed={1}
              width={250}
              height={10}
              viewBox="0 0 250 10"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="250" height="10" />
            </ContentLoader>
          </Wrapper>
        </IdWrapper>
      </Column>
    </CommentContainer>
  );
};

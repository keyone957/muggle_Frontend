import React from 'react';
import styled from 'styled-components/native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 23px;
`;

const NameWrapper = styled.View``;

const ColumnWrapper = styled.View`
  margin-right: 10px;
`;

export default () => {
  return (
    <SearchContainer>
      <ColumnWrapper>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          speed={1}
          width={60}
          height={60}
          viewBox="0 0 60 60"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect rx="18" ry="18" width="60" height="60" />
        </ContentLoader>
      </ColumnWrapper>
      <ColumnWrapper>
        <NameWrapper>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
            speed={1}
            width={60}
            height={12}
            viewBox="0 0 60 12"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="60" height="12" />
          </ContentLoader>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
            speed={1}
            width={50}
            height={12}
            viewBox="0 0 50 12"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="50" height="12" />
          </ContentLoader>
        </NameWrapper>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          speed={1}
          width={120}
          height={12}
          viewBox="0 0 120 12"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect width="120" height="12" />
        </ContentLoader>
      </ColumnWrapper>
    </SearchContainer>
  );
};

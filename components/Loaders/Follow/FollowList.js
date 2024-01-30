import React from 'react';
import styled from 'styled-components/native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const FollowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NameWrapper = styled.View`
  margin-left: 8px;
`;

const Full = styled.View``;

const Nick = styled.View``;

const Avatar = styled.View``;

const FollowBtn = styled.View``;

export default () => {
  return (
    <FollowContainer>
      <UserWrapper>
        <Avatar>
          <ContentLoader
            style={{alignItems: 'center', justifyContent: 'center'}}
            speed={1}
            width={44}
            height={44}
            viewBox="0 0 44 44"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect rx="30" ry="30" width="44" height="44" />
          </ContentLoader>
        </Avatar>
        <NameWrapper>
          <Full>
            <ContentLoader
              style={{alignItems: 'center', justifyContent: 'center'}}
              speed={1}
              width={150}
              height={12}
              viewBox="0 0 150 12"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="150" height="12" />
            </ContentLoader>
          </Full>
          <Nick>
            <ContentLoader
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
              }}
              speed={1}
              width={100}
              height={12}
              viewBox="0 0 100 12"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="100" height="12" />
            </ContentLoader>
          </Nick>
        </NameWrapper>
      </UserWrapper>
      <FollowBtn>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}
          speed={1}
          width={76}
          height={32}
          viewBox="0 0 76 32"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect rx="16" width="76" height="32" />
        </ContentLoader>
      </FollowBtn>
    </FollowContainer>
  );
};

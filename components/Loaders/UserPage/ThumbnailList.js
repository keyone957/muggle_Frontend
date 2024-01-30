import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    width: '100%',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 1,
    marginBottom: 20,
  },
});

const Container = styled.View`
  padding: 4%;
`;

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5% 0 3% 0;
  flex-wrap: wrap;
`;

const ContentWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Column = styled.View``;

const BottomWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default () => {
  return (
    <Container style={styles.container}>
      <ContentWrapper>
        <Column>
          <UserWrapper>
            <ContentLoader
              style={{alignItems: 'center', justifyContent: 'center'}}
              speed={1}
              width={28}
              height={28}
              viewBox="0 0 28 28"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <Rect rx="30" ry="30" width="28" height="28" />
            </ContentLoader>
            <ContentLoader
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
              }}
              speed={1}
              width={60}
              height={16}
              viewBox="0 0 60 16"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <Rect width="60" height="16" />
            </ContentLoader>
          </UserWrapper>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
            speed={1}
            width={60}
            height={18}
            viewBox="0 0 60 18"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="60" height="18" />
          </ContentLoader>
        </Column>
        <Column>
          <ContentLoader
            speed={1}
            width={100}
            height={100}
            viewBox="0 0 64 64"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="60" height="64" />
          </ContentLoader>
        </Column>
      </ContentWrapper>
      <BottomWrapper>
        <IconWrapper>
          <ContentLoader
            speed={1}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="20" height="20" />
          </ContentLoader>
          <ContentLoader
            style={{marginRight: 16, marginLeft: 3}}
            speed={1}
            width={12}
            height={10}
            viewBox="0 0 12 10"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="12" height="10" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="20" height="20" />
          </ContentLoader>
          <ContentLoader
            style={{marginRight: 16, marginLeft: 3}}
            speed={1}
            width={12}
            height={10}
            viewBox="0 0 12 10"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="12" height="10" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="20" height="20" />
          </ContentLoader>
          <ContentLoader
            style={{marginRight: 16, marginLeft: 3}}
            speed={1}
            width={12}
            height={10}
            viewBox="0 0 12 10"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <Rect width="12" height="10" />
          </ContentLoader>
        </IconWrapper>
        <ContentLoader
          style={{marginRight: 5}}
          speed={1}
          width={20}
          height={10}
          viewBox="0 0 20 10"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <Rect width="20" height="10" />
        </ContentLoader>
      </BottomWrapper>
    </Container>
  );
};

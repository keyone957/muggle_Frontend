import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const Container = styled.TouchableOpacity`
  margin: 20px;
  margin-bottom: 10px;
`;

const TopWrapper = styled.View`
  width: 100%;
  height: ${deviceWidth - 40}px;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const BottomWrapper = styled.View`
  padding: 10px;
  padding-bottom: 15px;
  width: 100%;
  background-color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Background = styled.View`
  background-color: #f9f3f1;
`;

export default () => {
  return (
    <Background>
      <Container activeOpacity={1} style={styles.shadow}>
        <TopWrapper>
          <ContentLoader
            speed={1}
            width={'500'}
            height={'500'}
            viewBox="0 0 500 500"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="500" height="500" />
          </ContentLoader>
        </TopWrapper>
        <BottomWrapper>
          <RowWrapper>
            <ContentLoader
              speed={1}
              width={30}
              height={30}
              viewBox="0 0 30 30"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="30" height="30" rx="18" ry="18" />
            </ContentLoader>
            <ContentLoader
              style={{marginLeft: 8}}
              speed={1}
              width={60}
              height={20}
              viewBox="0 0 60 20"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="60" height="20" />
            </ContentLoader>
          </RowWrapper>
          <ContentLoader
            style={{marginTop: 10, marginBottom: 10}}
            speed={1}
            width={150}
            height={21}
            viewBox="0 0 150 21"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="150" height="21" />
          </ContentLoader>
          <RowWrapper style={{justifyContent: 'space-between'}}>
            <RowWrapper>
              <ContentLoader
                speed={1}
                width={17}
                height={17}
                viewBox="0 0 17 17"
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="17" height="17" />
              </ContentLoader>
              <ContentLoader
                style={{marginLeft: 3, marginRight: 16}}
                speed={1}
                width={34}
                height={17}
                viewBox="0 0 34 17"
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="34" height="17" />
              </ContentLoader>
              <ContentLoader
                speed={1}
                width={17}
                height={17}
                viewBox="0 0 17 17"
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="17" height="17" />
              </ContentLoader>
              <ContentLoader
                style={{marginLeft: 3, marginRight: 16}}
                speed={1}
                width={34}
                height={17}
                viewBox="0 0 34 17"
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="34" height="17" />
              </ContentLoader>
              <ContentLoader
                speed={1}
                width={17}
                height={17}
                viewBox="0 0 17 17"
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="17" height="17" />
              </ContentLoader>
              <ContentLoader
                style={{marginLeft: 3, marginRight: 16}}
                speed={1}
                width={34}
                height={17}
                viewBox="0 0 34 17"
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="34" height="17" />
              </ContentLoader>
            </RowWrapper>
            <ContentLoader
              speed={1}
              width={34}
              height={17}
              viewBox="0 0 34 17"
              backgroundColor="#f8f8f8"
              foregroundColor="#ecebeb">
              <Rect width="34" height="17" />
            </ContentLoader>
          </RowWrapper>
        </BottomWrapper>
      </Container>
    </Background>
  );
};

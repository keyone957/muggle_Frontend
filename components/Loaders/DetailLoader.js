import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import GlobalStyles from '../../components/GlobalStyles';
import ContentLoader, {Rect} from 'react-content-loader/native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const ImageWrappert = styled.View`
  background-color: white;
  width: ${deviceWidth}px;
  height: ${deviceHeight / 4}px;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  padding: 0 15px;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Header = styled(RowWrapper)`
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: ${props => (props.marginTop ? 0 : 20)}px;
`;

const UserWrapper = styled(RowWrapper)`
  flex-wrap: wrap;
`;

const HashWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const HashView = styled.View`
  margin-bottom: 5px;
`;

const Block = styled.View``;

export default () => {
  return (
    <SafeAreaView
      style={{...GlobalStyles.AndroidSafeArea, paddingStart: 0, paddingEnd: 0}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{backgroundColor: 'rgb(249, 243, 241)'}}>
        <ImageWrappert>
          <ContentLoader
            speed={1}
            width={500}
            height={200}
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="500" height="200" />
          </ContentLoader>
        </ImageWrappert>
        <ContentWrapper>
          <Header>
            <UserWrapper>
              <ContentLoader
                speed={1}
                width={40}
                height={40}
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="40" height="40" rx="30" ry="30" />
              </ContentLoader>
              <Block>
                <ContentLoader
                  style={{marginLeft: 9}}
                  speed={1}
                  width={40}
                  height={15}
                  backgroundColor="#f8f8f8"
                  foregroundColor="#ecebeb">
                  <Rect width="40" height="15" />
                </ContentLoader>
                <ContentLoader
                  style={{marginLeft: 9, marginTop: 3}}
                  speed={1}
                  width={60}
                  height={15}
                  backgroundColor="#f8f8f8"
                  foregroundColor="#ecebeb">
                  <Rect width="60" height="15" />
                </ContentLoader>
              </Block>
            </UserWrapper>
          </Header>
          <ContentLoader
            speed={1}
            width={60}
            height={15}
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="60" height="15" />
          </ContentLoader>
          <ContentLoader
            style={{marginTop: 15}}
            speed={1}
            width={300}
            height={15}
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="300" height="15" />
          </ContentLoader>
          <ContentLoader
            style={{marginTop: 5}}
            speed={1}
            width={200}
            height={15}
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="200" height="15" />
          </ContentLoader>
          <HashWrapper>
            <HashView>
              <ContentLoader
                style={{marginTop: 5}}
                speed={1}
                width={60}
                height={20}
                backgroundColor="#f8f8f8"
                foregroundColor="#ecebeb">
                <Rect width="60" height="20" />
              </ContentLoader>
            </HashView>
          </HashWrapper>
        </ContentWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

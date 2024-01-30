import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import GlobalStyles from '../../GlobalStyles';
import ContentLoader, {Rect} from 'react-content-loader/native';
import BackArrow from '../../../assets/backarrow.svg';
import {useNavigation} from '@react-navigation/native';
import ThumbnailList from './ThumbnailList';

const RowWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RowBtnWrapper = styled.View`
  background-color: #f9f3f1;
  flex-direction: row;
  padding: 15px 0;
  justify-content: space-between;
`;

const NumberWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const NameWrapper = styled.View`
  flex-wrap: wrap;
`;

const Avatar1 = styled.View`
  width: 76px;
  height: 76px;
  align-items: center;
  justify-content: center;
`;

const BackTouch = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 0;
  align-self: flex-start;
`;

export default ({showBackArrow = true}) => {
  const navigation = useNavigation();
  const thumbnail = () => {
    let array = [];
    for (let i = 0; i < 3; i++) {
      array.push(<ThumbnailList key={i} />);
    }
    return array;
  };
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      {showBackArrow && (
        <BackTouch onPress={() => navigation.goBack()}>
          <BackArrow width={27} height={27} />
        </BackTouch>
      )}
      <RowWrapper marginTop={showBackArrow ? 0 : 30}>
        <Avatar1>
          <ContentLoader
            style={{alignItems: 'center', justifyContent: 'center'}}
            speed={1}
            width={76}
            height={76}
            viewBox="0 0 76 76"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect rx="30" ry="30" width="76" height="76" />
          </ContentLoader>
        </Avatar1>
        <NumberWrapper>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            speed={1}
            width={60}
            height={48}
            viewBox="0 0 60 48"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="60" height="48" />
          </ContentLoader>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}
            speed={1}
            width={60}
            height={48}
            viewBox="0 0 60 48"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="60" height="48" />
          </ContentLoader>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            speed={1}
            width={60}
            height={48}
            viewBox="0 0 60 48"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="60" height="48" />
          </ContentLoader>
        </NumberWrapper>
      </RowWrapper>
      <RowWrapper>
        <NameWrapper>
          <ContentLoader
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            speed={1}
            width={80}
            height={15}
            viewBox="0 0 80 15"
            backgroundColor="#f8f8f8"
            foregroundColor="#ecebeb">
            <Rect width="80" height="15" />
          </ContentLoader>
        </NameWrapper>
      </RowWrapper>
      <RowBtnWrapper style={{marginBottom: 10}}>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          speed={1}
          width={153}
          height={44}
          viewBox="0 0 153 44"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect rx="16" ry="16" width="153" height="44" />
        </ContentLoader>
        <ContentLoader
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          speed={1}
          width={153}
          height={44}
          viewBox="0 0 153 44"
          backgroundColor="#f8f8f8"
          foregroundColor="#ecebeb">
          <Rect rx="16" ry="16" width="153" height="44" />
        </ContentLoader>
      </RowBtnWrapper>
      {thumbnail()}
    </SafeAreaView>
  );
};

import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {dateAgoFormat, numberFormat, trimText} from '../utilities';
import collect from '../assets/collect.png';
import like from '../assets/like.png';
import chat from '../assets/chat.png';
import DefaultAvatar from './DefaultAvatar';
import {useValue} from '../context';
import i18n from '../i18n/i18n';
import ProgressiveImage from './ProgressiveImage';
import {SharedElement} from 'react-navigation-shared-element';

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
  margin-bottom: 0px;
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

const HashWrapper = styled(RowWrapper)`
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const HashText = styled.Text`
  color: #0066d6;
  font-size: 16px;
`;

const HashView = styled.TouchableOpacity``;

const Avatar = styled.View`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 0.5px solid lightgray;
`;

const Fullname = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(24, 76, 95);
`;

const Title = styled.Text`
  font-size: 16px;
  color: #dc4f0f;
  margin: 10px 0;
`;

const Date = styled.Text`
  color: rgb(112, 112, 112);
  font-size: 12px;
`;

const Number = styled.Text`
  margin-right: 16px;
  margin-left: 3px;
  color: rgb(152, 152, 152);
  font-size: 16px;
`;

const MediaCount = styled.View`
  position: absolute;
  right: 2%;
  top: 3%;
  z-index: 1;
  padding: 4px 5px;
  border-radius: 20px;
  background-color: gray;
  opacity: 0.7;
  justify-content: center;
  align-items: center;
`;

const CountNum = styled.Text`
  font-size: 13px;
  color: white;
`;

const CardFeed = ({item}) => {
  const {
    count_bo,
    count_co,
    count_li,
    title,
    creator: {firstName, lastName, avatar, uid},
    hash,
    createdAt,
    countFile,
    _id: taste_id,
    thumbnail,
  } = item;
  const {login_uid} = useValue();

  const navigation = useNavigation();
  const goToDetail = () => navigation.navigate('Detail', {taste_id, item});
  const goToProfile = () => {
    if (login_uid === uid) navigation.navigate(i18n.t('마이 페이지'));
    else navigation.navigate('User', {uid});
  };
  const goToHash = hash => navigation.navigate('Hash', {hash});

  return (
    <Container onPress={goToDetail} activeOpacity={1} style={styles.shadow}>
      <TopWrapper>
        {countFile > 1 && (
          <MediaCount>
            <CountNum>+{countFile - 1}</CountNum>
          </MediaCount>
        )}
        <SharedElement id={`media${taste_id}`}>
          <ProgressiveImage
            thumbnailSource={{uri: thumbnail}}
            source={{uri: thumbnail}}
            style={{
              width: '100%',
              aspectRatio: 1,
            }}
          />
        </SharedElement>
      </TopWrapper>
      <SharedElement id={`text${taste_id}`}>
        <BottomWrapper>
          <RowWrapper onPress={goToProfile}>
            <TouchableOpacity onPress={goToProfile}>
              {avatar ? (
                <Image
                  source={{uri: avatar}}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                  }}
                />
              ) : (
                <Avatar>
                  <DefaultAvatar uid={uid} width={25} height={25} />
                </Avatar>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={goToProfile}>
              <Fullname>
                {firstName} {lastName}
              </Fullname>
            </TouchableOpacity>
          </RowWrapper>
          <Title margin={thumbnail}>{trimText(title, 40)}</Title>
          {hash?.length > 0 && (
            <HashWrapper>
              {hash.map((el, index) => {
                return (
                  <HashView key={index} onPress={() => goToHash(el)}>
                    <HashText>{`#${el}`}</HashText>
                  </HashView>
                );
              })}
            </HashWrapper>
          )}
          <RowWrapper style={{justifyContent: 'space-between'}}>
            <RowWrapper>
              <Image source={collect} style={{width: 17, height: 17}} />
              <Number>{numberFormat(count_bo)}</Number>
              <Image source={like} style={{width: 17, height: 17}} />
              <Number>{numberFormat(count_li)}</Number>
              <Image source={chat} style={{width: 17, height: 17}} />
              <Number>{numberFormat(count_co)}</Number>
            </RowWrapper>
            <Date>{dateAgoFormat(createdAt)}</Date>
          </RowWrapper>
        </BottomWrapper>
      </SharedElement>
    </Container>
  );
};

CardFeed.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    count_bo: PropTypes.number.isRequired,
    count_co: PropTypes.number.isRequired,
    count_li: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    creator: PropTypes.object.isRequired,
  }),
};

export default CardFeed;

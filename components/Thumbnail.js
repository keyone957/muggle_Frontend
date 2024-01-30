import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
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
import {SharedElement} from 'react-native-shared-element';

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

const Container = styled.TouchableOpacity`
  padding: 4%;
`;

const ContentWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const Column = styled.View`
  width: ${props => (props.thumbnail ? '65%' : 'auto')};
`;

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Avatar = styled.View`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 0.5px solid lightgray;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #dc4f0f;
  margin: 8px 0;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Number = styled.Text`
  margin-right: 16px;
  margin-left: 3px;
  color: rgb(152, 152, 152);
  font-size: 18px;
`;

const Fullname = styled.Text`
  margin-left: 4px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(24, 76, 95);
`;

const HashWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const HashText = styled.Text`
  color: #0066d6;
  /* font-size: 16px; */
`;

const HashView = styled.TouchableOpacity``;

const BottomWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Date = styled.Text`
  color: rgb(112, 112, 112);
  font-size: 12px;
`;

const MediaCount = styled.View`
  position: absolute;
  right: 2%;
  top: 3%;
  z-index: 5;
  padding: 3px 4px;
  border-radius: 20px;
  background-color: gray;
  opacity: 0.7;
  justify-content: center;
  align-items: center;
`;

const CountNum = styled.Text`
  font-size: 12px;
  color: white;
`;

const Thumbnail = ({item}) => {
  const {
    count_bo,
    count_co,
    count_li,
    thumbnail,
    title,
    creator: {firstName, lastName, avatar, uid},
    hash,
    createdAt,
    countFile,
    _id: taste_id,
  } = item;
  const {login_uid} = useValue();

  const navigation = useNavigation();
  const goToDetail = () => navigation.push('Detail', {item});
  const goToProfile = () => {
    if (login_uid === uid) navigation.navigate(i18n.t('마이 페이지'));
    else navigation.navigate('User', {uid});
  };
  const goToHash = hash => navigation.navigate('Hash', {hash});

  return (
    <Container onPress={goToDetail} style={styles.container} activeOpacity={1}>
      <ContentWrapper>
        <Column thumbnail={thumbnail}>
          <UserWrapper>
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
                {trimText(firstName, 20)} {trimText(lastName, 20)}
              </Fullname>
            </TouchableOpacity>
          </UserWrapper>
          <Title>{trimText(title, 30)}</Title>
          {hash?.length > 0 && (
            <HashWrapper>
              {hash.map((el, index) => (
                <HashView key={index} onPress={() => goToHash(el)}>
                  <HashText>{`#${trimText(el, 5)} `}</HashText>
                </HashView>
              ))}
            </HashWrapper>
          )}
        </Column>
        {thumbnail && (
          <Column style={{justifyContent: 'center'}}>
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
                  width: 100,
                  aspectRatio: 1,
                }}
                resizeMode="contain"
              />
            </SharedElement>
          </Column>
        )}
      </ContentWrapper>
      <BottomWrapper>
        <IconWrapper>
          <Image source={collect} style={{width: 20, height: 20}} />
          <Number>{numberFormat(count_bo)}</Number>
          <Image source={like} style={{width: 20, height: 20}} />
          <Number>{numberFormat(count_li)}</Number>
          <Image source={chat} style={{width: 20, height: 20}} />
          <Number>{numberFormat(count_co)}</Number>
        </IconWrapper>
        {createdAt && <Date>{dateAgoFormat(createdAt)}</Date>}
      </BottomWrapper>
    </Container>
  );
};

Thumbnail.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    count_bo: PropTypes.number.isRequired,
    count_co: PropTypes.number.isRequired,
    count_li: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    video_thumbnail: PropTypes.string,
    creator: PropTypes.object.isRequired,
  }),
};

export default Thumbnail;

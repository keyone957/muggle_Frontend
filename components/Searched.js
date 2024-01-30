import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DefaultAvatar from './DefaultAvatar';
import {trimText} from '../utilities';
import {useValue} from '../context';
import i18n from '../i18n/i18n';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

const Avatar = styled.View`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border: 0.1px solid black;
`;

const NameWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 5px;
`;

const ColumnWrapper = styled.View`
  margin-right: 10px;
`;

const ColorText = styled.Text`
  font-size: 16px;
  color: ${props => (props.hash ? '#0066d6' : 'rgb(24, 76, 95)')};
  font-weight: bold;
  margin-right: 5px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: ${props => (props.black ? 'black' : 'rgb(112, 112, 112)')};
`;

const HashBox = styled.View`
  width: 60px;
  height: 60px;
  background-color: orange;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
`;

const HashText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 35px;
`;

export default ({arr}) => {
  const navigation = useNavigation();
  const {login_uid} = useValue();

  const goToUserProfile = () => {
    if (arr.nickname) {
      if (login_uid === arr.uid) {
        navigation.navigate(i18n.t('마이 페이지'));
      } else {
        navigation.navigate('User', {
          uid: arr.uid,
        });
      }
    }
  };
  const goToHash = () => {
    if (!arr.nickname) navigation.navigate('Hash', {hash: arr.text});
  };

  return (
    <Container
      onPress={!arr.nickname ? () => goToHash() : () => goToUserProfile()}>
      <ColumnWrapper>
        {!arr.nickname ? (
          <HashBox>
            <HashText>#</HashText>
          </HashBox>
        ) : arr.avatar ? (
          <Image
            source={{uri: arr.avatar}}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        ) : (
          <Avatar>
            <DefaultAvatar uid={arr.uid} width={35} height={35} />
          </Avatar>
        )}
      </ColumnWrapper>
      <ColumnWrapper>
        {!arr.nickname ? (
          <ColorText hash={true}>{`#${arr.text}`}</ColorText>
        ) : (
          <NameWrapper>
            <ColorText>
              {arr.firstName} {arr.lastName}
            </ColorText>
            <Text>{`@${arr.nickname}`}</Text>
          </NameWrapper>
        )}
        {!arr.nickname ? (
          <Text>
            {arr.count === 1 ? `${arr.count} post` : `${arr.count} posts`}
          </Text>
        ) : (
          <Text black={true}>
            {trimText(arr.intro.replace(/(\r\n\t|\n|\r\t)/gm, ''), 20)}
          </Text>
        )}
      </ColumnWrapper>
    </Container>
  );
};

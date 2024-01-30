import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {FollowUnFollow} from '../cleanedApi';
import {useValue} from '../context';
import DefaultAvatar from './DefaultAvatar';
import i18n from '../i18n/i18n';
import {errorMsg, trimText} from '../utilities';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
`;

const Line = styled.View`
  width: 100%;
  border: 0.5px solid lightgray;
  margin-bottom: 15px;
`;

const UserWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const NameWrapper = styled.View`
  margin-left: 8px;
`;

const FullName = styled.Text`
  font-size: 16px;
  color: rgb(24, 76, 95);
  font-weight: bold;
`;

const NickName = styled.Text`
  font-size: 16px;
  color: rgb(112, 112, 112);
`;

const FollowBtn = styled.TouchableOpacity`
  width: 76px;
  height: 32px;
  border-radius: 32px;
  border: 1px solid #184c5f;
  justify-content: center;
  background-color: ${props =>
    props.uf ? 'rgb(24, 76, 95)' : 'rgb(249, 243, 241)'};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const BtnText = styled.Text`
  font-size: 14px;
  color: ${props => (props.uf ? 'rgb(249, 243, 241)' : 'rgb(24, 76, 95)')};
  text-align: center;
`;

const Avatar = styled.View`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 0.1px solid black;
`;

const FollowUser = ({item}) => {
  const {_id, avatar, firstName, lastName, nickname, uid, status} = item;
  const {login_uid} = useValue();
  const [followStatus, setFollowStatus] = useState(status === 1);
  const [isDisabled, setDisabled] = useState(false);

  const navigation = useNavigation();
  const goToUserProfile = () => {
    if (uid === login_uid) {
      navigation.navigate(i18n.t('마이 페이지'));
    } else {
      const pushAction = StackActions.push('User', {
        uid,
      });
      navigation.dispatch(pushAction);
    }
  };

  const follow = async value => {
    try {
      setDisabled(true);
      const {
        code,
        description,
        followStatus: resFollowStatus,
      } = await FollowUnFollow(uid, value);
      if (code === 200) {
        setDisabled(false);
        setFollowStatus(resFollowStatus);
      } else throw {code, description};
    } catch (error) {
      console.log('follwer func error', error);
      errorMsg(
        error?.code,
        error?.code === 404 ? 'This User Not Found' : error?.description,
      );
      if (error?.code === 403) {
        navigation.navigate('ErrorPage', {
          code: 403,
          description: 'Permission Denied',
          showBackArrow: false,
        });
      } else if (error?.code === 400) {
        navigation.goBack();
      }
    }
  };

  return (
    <>
      <Container>
        <UserWrapper onPress={goToUserProfile}>
          {avatar ? (
            <Image
              source={{uri: avatar}}
              style={{
                width: 44,
                height: 44,
                borderRadius: 18,
              }}
            />
          ) : (
            <Avatar>
              <DefaultAvatar uid={uid} width={35} height={35} />
            </Avatar>
          )}
          <NameWrapper>
            <FullName>
              {firstName.length + lastName.length > 16
                ? `${trimText(firstName, 7)} ${trimText(lastName, 7)}`
                : `${firstName} ${lastName}`}
            </FullName>
            <NickName>@{nickname}</NickName>
          </NameWrapper>
        </UserWrapper>
        {uid !== login_uid && (
          <FollowBtn
            onPress={() => follow(!followStatus)}
            uf={followStatus}
            activeOpacity={0.5}
            disabled={isDisabled}>
            <BtnText uf={followStatus}>
              {followStatus ? 'Following' : 'Follow'}
            </BtnText>
          </FollowBtn>
        )}
      </Container>
      <Line />
    </>
  );
};

export default FollowUser;

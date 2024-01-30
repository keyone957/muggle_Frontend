import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../components/GlobalStyles';
import DefaultAvatar from '../../components/DefaultAvatar';
import SettingIcon from '../../assets/setting.svg';
import Insta from '../../assets/instagram.svg';
import collectIcon from '../../assets/collect.png';
import pencil from '../../assets/pencil.png';
import {checkCollection, numberFormat, openURL} from '../../utilities';
import i18n from '../../i18n/i18n';
import UserPageLoader from '../../components/Loaders/UserPage/UserPageLoader';
import ErrorPage from '../../components/ErrorPage';
import {ThumbnailList} from '../../components/Lists';
import ReadMoreLess from '../../components/ReadMoreLess';

const styles = StyleSheet.create({
  onPress: {
    width: '48%',
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgb(220, 79, 15)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 1,
  },
  unPress: {
    width: '48%',
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 1,
  },
});

const NothingWrapper = styled.View`
  margin-top: 30%;
`;

const Nothing = styled.Text`
  text-align: center;
  font-size: 16px;
  color: rgb(112, 112, 112);
`;

const Setting = styled.TouchableOpacity`
  align-self: flex-end;
  margin: 10px 0 5px 0;
`;

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

const Avatar = styled.View`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 76px;
  height: 76px;
  align-items: center;
  justify-content: center;
`;

const NumberWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const NameWrapper = styled.View`
  flex-wrap: wrap;
`;

const NumberTitle = styled.Text`
  font-size: 16px;
  color: rgb(24, 76, 95);
`;

const Number = styled.Text`
  font-size: 20px;
  color: rgb(24, 76, 95);
  text-align: center;
  font-weight: bold;
`;

const Name = styled.Text`
  font-size: 20px;
  color: rgb(24, 76, 95);
  font-weight: bold;
`;

const NicknameID = styled.Text`
  font-size: 18px;
  color: ${props =>
    props.nickname ? 'rgb(112, 112, 112)' : 'rgb(0, 102, 214)'};
`;

const InstaWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ActButton = styled.TouchableOpacity`
  width: 76px;
  height: 32px;
  background-color: rgb(24, 76, 95);
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  font-size: 16px;
  color: rgb(249, 243, 241);
`;

const IntroView = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const CardBtnText = styled.Text`
  font-size: 16px;
  color: ${props =>
    props.isPress ? 'rgb(255, 255, 255)' : 'rgb(112, 112, 112)'};
  margin-left: 6px;
`;

const MyProfile = ({
  data,
  loading,
  login_uid,
  onEndReached,
  records,
  collects,
  goToWhere,
  showErrorPage,
  setShowErrorPage,
  setRefresh,
  spinner,
  handleRefresh,
  refresh,
}) => {
  const {
    avatar,
    firstName,
    lastName,
    nickname,
    instagramId,
    collect_num,
    follower_num,
    following_num,
    intro,
    birth,
    gender,
    totalRecord,
    totalCollect,
  } = data;
  const [isRecordPress, setIsRecordPress] = useState(true);
  const [isCollectPress, setIsCollectPress] = useState(false);

  const recordProps = {
    style: isRecordPress ? styles.onPress : styles.unPress,
    onPress: () => {
      if (!isRecordPress) {
        setIsRecordPress(!isRecordPress);
        setIsCollectPress(!isCollectPress);
      }
    },
  };
  const collectProps = {
    style: isCollectPress ? styles.onPress : styles.unPress,
    onPress: () => {
      if (!isCollectPress) {
        setIsRecordPress(!isRecordPress);
        setIsCollectPress(!isCollectPress);
      }
    },
  };

  const goToFollow = (title, uid, value) =>
    goToWhere('Follows', {title, uid, value});
  const goToEditProfile = () =>
    goToWhere('EditProfile', {
      login_uid,
      avatar,
      firstName,
      lastName,
      nickname,
      intro,
      instagramId,
      birth,
      gender,
    });

  return loading ? (
    <UserPageLoader showBackArrow={false} />
  ) : showErrorPage ? (
    <ErrorPage
      code={showErrorPage?.code}
      description={showErrorPage?.description}
      func={{setRefresh, setShowErrorPage}}
      showBackArrow={false}
    />
  ) : (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(249, 243, 241)" />
      <ThumbnailList
        data={isRecordPress ? records : collects}
        onEndReached={() => onEndReached(isRecordPress ? '1' : '2')}
        loading={spinner}
        refresh={refresh}
        handleRefresh={handleRefresh}
        ListHeaderComponent={
          <>
            <Setting onPress={() => goToWhere('UserSetting')}>
              <SettingIcon height={25} />
            </Setting>
            <RowWrapper>
              {avatar ? (
                <Image
                  source={{uri: avatar}}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 30,
                  }}
                />
              ) : (
                <Avatar>
                  <DefaultAvatar uid={login_uid} width={65} height={65} />
                </Avatar>
              )}
              <NumberWrapper>
                <TouchableOpacity
                  onPress={() =>
                    checkCollection(collect_num, totalRecord, totalCollect)
                  }>
                  <NumberTitle>Collection </NumberTitle>
                  <Number>{numberFormat(collect_num)}</Number>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => goToFollow('Followers', login_uid, 1)}
                  style={{marginHorizontal: 20}}>
                  <NumberTitle>Followers</NumberTitle>
                  <Number>{numberFormat(follower_num)}</Number>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => goToFollow('Following', login_uid, 2)}>
                  <NumberTitle>Following</NumberTitle>
                  <Number>{numberFormat(following_num)}</Number>
                </TouchableOpacity>
              </NumberWrapper>
            </RowWrapper>
            <RowWrapper>
              <NameWrapper>
                {firstName.length + lastName.length > 16 ? (
                  <>
                    <Name>{firstName}</Name>
                    <Name>{lastName}</Name>
                  </>
                ) : (
                  <Name>
                    {firstName} {lastName}
                  </Name>
                )}
                <NicknameID nickname={true}>@{nickname}</NicknameID>
              </NameWrapper>
              <ActButton onPress={goToEditProfile}>
                <BtnText>Edit</BtnText>
              </ActButton>
            </RowWrapper>
            {intro !== undefined && (
              <IntroView>
                <ReadMoreLess text={intro} style={{fontSize: 16}} />
              </IntroView>
            )}
            {instagramId !== '' && instagramId !== undefined && (
              <InstaWrapper
                onPress={() =>
                  openURL(`https://www.instagram.com/${instagramId}/`)
                }>
                <Insta width={16} height={16} marginRight={5} />
                <NicknameID>{instagramId}</NicknameID>
              </InstaWrapper>
            )}
            <RowBtnWrapper>
              <TouchableOpacity {...recordProps} disabled={isRecordPress}>
                <Image source={pencil} style={{width: 20, height: 20}} />
                <CardBtnText isPress={isRecordPress}>
                  {i18n.t('기록')}
                </CardBtnText>
              </TouchableOpacity>
              <TouchableOpacity {...collectProps} disabled={isCollectPress}>
                <Image source={collectIcon} style={{width: 20, height: 20}} />
                <CardBtnText isPress={isCollectPress}>
                  {i18n.t('수집')}
                </CardBtnText>
              </TouchableOpacity>
            </RowBtnWrapper>
          </>
        }
        ListEmptyComponent={
          <NothingWrapper>
            <Nothing>
              {i18n.t(
                isRecordPress
                  ? '아무것도 기록된 것이 없어요'
                  : '아무것도 수집된 것이 없어요',
              )}
            </Nothing>
            <Nothing>
              {i18n.t(
                isRecordPress
                  ? '내가 먹은 것을 기록해보세요!'
                  : '다양한 머글을 수집해보세요!',
              )}
            </Nothing>
          </NothingWrapper>
        }
      />
    </SafeAreaView>
  );
};

MyProfile.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    collect_num: PropTypes.number.isRequired,
    follower_num: PropTypes.number.isRequired,
    following_num: PropTypes.number.isRequired,
    intro: PropTypes.string,
    mytaste: PropTypes.array,
    collect: PropTypes.array,
  }),
  myCards: PropTypes.array,
  myCollect: PropTypes.array,
};

export default MyProfile;

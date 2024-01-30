import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import collect from '../../assets/collect.png';
import like from '../../assets/like.png';
import chat from '../../assets/chat.png';
import DefaultAvatar from '../../components/DefaultAvatar';
import {dateFormat, numberFormat} from '../../utilities';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete.svg';
import ReportIcon from '../../assets/report.svg';
import BackArrow from '../../assets/arrowbackIos.svg';
import Carousel from '../../components/Carousel';
import RNUrlPreview from 'react-native-url-preview';
import YoutubePlayer from 'react-native';
import ShareIcon from '../../assets/share.svg';
import ErrorPage from '../../components/ErrorPage';
import i18n from '../../i18n/i18n';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {DeleteModal} from '../../components/Modal';
import DotsIcon from '../../assets/dots.svg';
import Logo from '../../assets/bigMuggl.svg';
import {SharedElement} from 'react-navigation-shared-element';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const ImageWrapper = styled.View`
  background-color: white;
  width: ${deviceWidth}px;
  height: ${deviceHeight / 4}px;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  padding: 0 15px;
`;

const BackTouch = styled.View`
  position: absolute;
  left: 3%;
  top: 2%;
  z-index: 1;
  background-color: black;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  opacity: 0.5;
`;

const FlexEndWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const optionsStyles = {
  optionsWrapper: {
    padding: 5,
  },
  optionsContainer: {
    width: 150,
  },
};

const optionStyles = {
  optionWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Header = styled(RowWrapper)`
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: ${props => (props.marginTop ? 0 : 20)}px;
  flex-wrap: wrap;
`;

const UserWrapper = styled(RowWrapper)`
  flex-wrap: wrap;
`;

const Avatar = styled.View`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 0.5px solid lightgray;
  margin-right: 9px;
`;

const UserText = styled.Text`
  font-weight: ${props => (props.name ? 'bold' : 500)};
  font-size: ${props => (props.name ? 16 : 14)}px;
  color: ${props => (props.name ? 'rgb(24,76,95)' : 'rgb(112,112,112)')};
  margin-bottom: ${props => (props.name ? 3 : 0)}px;
`;

const Text = styled.Text`
  margin-bottom: 10px;
`;

const Title = styled(Text)`
  color: rgb(220, 79, 15);
  font-size: 16px;
`;

const Description = styled(Text)`
  font-size: 16px;
  color: rgb(70, 70, 70);
`;

const HashWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const HashText = styled.Text`
  color: #0066d6;
  font-size: 16px;
`;

const MenuText = styled.Text`
  font-size: 14px;
`;

const HashView = styled.View`
  margin-bottom: 5px;
`;

const Block = styled.View``;

const BtnText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: ${props => (props.status ? 'rgb(255,255,255)' : 'rgb(152,152,152)')};
`;

const BtnWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4%;
  z-index: 1;
`;

const Floating = styled.TouchableOpacity`
  width: 22%;
  height: 40px;
  border-radius: 24px;
  border: ${props =>
    props.status ? '1px solid rgb(220,79,15)' : '1px solid #989898'};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${props =>
    props.status ? 'rgb(220,79,15)' : 'rgb(255,255,255)'};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const Detail = ({
  data,
  setRefresh,
  isIdSame,
  pressBookmark,
  pressLike,
  isModalVisible,
  setModalVisible,
  deleteCard,
  youtube,
  goToWhere,
  navigation,
  copyPasteLink,
  isBookDisabled,
  isLikeDisabled,
  showErrorPage,
  setShowErrorPage,
  onRefresh,
}) => {
  const {
    taste_id,
    bookmarkStatus,
    likeStatus,
    count_bo,
    count_li,
    count_co,
    createdAt,
    creator: {uid, avatar, firstName, lastName},
    description,
    hash,
    mediaArr,
    link,
    title,
    location,
  } = data;
  const insets = useSafeAreaInsets();
  const goToUserProfile = () => {
    if (isIdSame) {
      goToWhere(i18n.t('마이 페이지'));
    } else {
      goToWhere('User', {
        uid,
      });
    }
  };

  return showErrorPage ? (
    <ErrorPage
      code={showErrorPage?.code}
      description={showErrorPage?.description}
      func={{setRefresh, setShowErrorPage}}
    />
  ) : (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingStart: insets.left,
        paddingEnd: insets.right,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(249, 243, 241)" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{backgroundColor: 'rgb(249, 243, 241)'}}
        refreshControl={<RefreshControl onRefresh={onRefresh} />}>
        <BackTouch>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow width={25} height={25} />
          </TouchableOpacity>
        </BackTouch>
        {mediaArr.length > 0 ? (
          <SharedElement id={`media${taste_id}`}>
            <Carousel mediaArr={mediaArr} />
          </SharedElement>
        ) : (
          <SharedElement id={`media${taste_id}`}>
            <ImageWrapper>
              <Logo width={200} height={200} />
            </ImageWrapper>
          </SharedElement>
        )}
        <SharedElement id={`text${taste_id}`}>
          <ContentWrapper>
            <Header marginTop={mediaArr.length > 1}>
              <UserWrapper>
                <TouchableOpacity onPress={goToUserProfile}>
                  {avatar ? (
                    <Image
                      source={{uri: avatar}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        marginRight: 9,
                      }}
                    />
                  ) : (
                    <Avatar>
                      <DefaultAvatar uid={uid} width={35} height={35} />
                    </Avatar>
                  )}
                </TouchableOpacity>
                <Block>
                  <TouchableOpacity onPress={goToUserProfile}>
                    <UserText name={true}>
                      {firstName} {lastName}
                    </UserText>
                  </TouchableOpacity>
                  <UserText>{dateFormat(createdAt)}</UserText>
                </Block>
              </UserWrapper>
              <FlexEndWrapper>
                <Menu>
                  <MenuTrigger>
                    <DotsIcon width={25} height={25} />
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles}>
                    {isIdSame && (
                      <MenuOption
                        onSelect={() =>
                          goToWhere('EditCard', {
                            taste_id,
                            title,
                            description,
                            hash,
                            link,
                            location,
                            setRefresh,
                          })
                        }
                        customStyles={optionStyles}>
                        <RowWrapper>
                          <EditIcon width={13} height={13} marginRight={8} />
                          <MenuText>Edit</MenuText>
                        </RowWrapper>
                      </MenuOption>
                    )}
                    <MenuOption
                      onSelect={copyPasteLink}
                      customStyles={optionStyles}>
                      <RowWrapper>
                        <ShareIcon width={13} height={13} marginRight={8} />
                        <MenuText>Copy Link</MenuText>
                      </RowWrapper>
                    </MenuOption>
                    {isIdSame ? (
                      <MenuOption
                        onSelect={() => setModalVisible(true)}
                        customStyles={optionStyles}>
                        <RowWrapper>
                          <DeleteIcon width={13} height={13} marginRight={8} />
                          <MenuText>Delete</MenuText>
                        </RowWrapper>
                      </MenuOption>
                    ) : (
                      <MenuOption
                        onSelect={() =>
                          goToWhere('Report', {
                            taste_id,
                            title,
                          })
                        }
                        customStyles={optionStyles}>
                        <RowWrapper>
                          <ReportIcon width={13} height={13} marginRight={8} />
                          <MenuText>Report</MenuText>
                        </RowWrapper>
                      </MenuOption>
                    )}
                  </MenuOptions>
                </Menu>
                <DeleteModal
                  isModalVisible={isModalVisible}
                  setModalVisible={setModalVisible}
                  deleteFunc={deleteCard}
                />
              </FlexEndWrapper>
            </Header>
            <Title>{title}</Title>
            {description !== '' && <Description>{description}</Description>}
            {hash?.length > 0 && (
              <HashWrapper mt={description}>
                {hash.map((el, index) => (
                  <HashView key={index}>
                    <TouchableOpacity
                      onPress={() => goToWhere('Hash', {hash: el})}
                      key={index}>
                      <HashText>{`#${el}`}</HashText>
                    </TouchableOpacity>
                  </HashView>
                ))}
              </HashWrapper>
            )}
            {link !== '' && link.includes('youtu') ? (
              <YoutubePlayer
                width={deviceWidth * 0.81}
                height={200}
                play={false}
                videoId={`${youtube}`}
              />
            ) : (
              <RNUrlPreview
                text={link}
                descriptionStyle={{fontSize: 13, color: 'black'}}
                titleStyle={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}
                containerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                imageStyle={{
                  borderRadius: 20,
                  width: 110,
                  height: 110,
                  marginRight: 10,
                  marginLeft: 10,
                }}
              />
            )}
          </ContentWrapper>
        </SharedElement>
      </ScrollView>
      <BtnWrapper platform={Platform.OS}>
        <Floating
          status={bookmarkStatus}
          onPress={() => pressBookmark()}
          activeOpacity={0.5}
          disabled={isBookDisabled}>
          <Image source={collect} style={{width: 20, height: 20}} />
          <BtnText status={bookmarkStatus}>{numberFormat(count_bo)}</BtnText>
        </Floating>
        <Floating
          status={likeStatus}
          onPress={() => pressLike()}
          activeOpacity={0.5}
          disabled={isLikeDisabled}>
          <Image source={like} style={{width: 20, height: 20}} />
          <BtnText status={likeStatus}>{numberFormat(count_li)}</BtnText>
        </Floating>
        <Floating
          onPress={() => goToWhere('Comments', {taste_id})}
          status={false}>
          <Image source={chat} style={{width: 20, height: 20}} />
          <BtnText>{numberFormat(count_co)}</BtnText>
        </Floating>
      </BtnWrapper>
    </View>
  );
};

export default Detail;

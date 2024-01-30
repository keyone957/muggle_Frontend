import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import {ReplyList} from '../../components/Lists';
import DefaultAvatar from '../../components/DefaultAvatar';
import {dateAgoFormat, numberFormat, printLine} from '../../utilities';
import SendIcon from '../../assets/comment_send.svg';
import Like from '../../assets/comment_like.svg';
import LikeColor from '../../assets/comment_like_color.svg';
import ReplyIcon from '../../assets/comment_chat.svg';
import DeleteIcon from '../../assets/delete.svg';
import i18n from '../../i18n/i18n';
import CoLoader from '../../components/Loaders/Comment/CoLoader';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {DeleteModal} from '../../components/Modal';
import DotsIcon from '../../assets/dots.svg';

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
`;

const Nothing = styled.Text`
  text-align: center;
  font-size: 16px;
  color: rgb(112, 112, 112);
  margin-top: 70%;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 20px 0 20px;
  margin-bottom: ${props => (props.platform === 'android' ? '15px' : '25px')};
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TextInput = styled.TextInput`
  background-color: white;
  width: ${props => (props.showSendIcon ? '90' : '100')}%;
  padding: ${props => (props.platform === 'android' ? '5px 10px' : '10px')};
  border: 1px solid rgb(152, 152, 152);
  border-radius: 15px;
`;

const Send = styled.TouchableOpacity``;

const Text = styled.Text`
  color: rgb(112, 112, 112);
  font-size: 15px;
`;

const LikeText = styled.Text`
  font-size: 16px;
  color: ${props =>
    props.value === 0 ? 'rgb(220, 79, 15)' : 'rgb(112,112,112)'};
  font-weight: ${props => (props.name ? 'bold' : 500)};
  margin: ${props => (props.content ? '8px 0' : 0)}px;
`;

const Owner = styled.View`
  padding: 15px 10px;
  flex-direction: row;
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
`;

const Avatar = styled.TouchableOpacity`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 0.1px solid black;
  margin-right: 8px;
`;

const Column = styled.View`
  width: ${props => (props.leftColumn ? '12%' : '85%')};
`;

const OwnerWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OwnerText = styled.Text`
  font-size: ${props => (props.name ? 16 : 14)}px;
  color: ${props =>
    props.name
      ? 'rgb(24, 75, 95)'
      : props.content
      ? 'rgb(48,48,48)'
      : 'rgb(112,112,112)'};
  font-weight: ${props => (props.name ? 'bold' : 500)};
  margin: ${props => (props.content ? '8px 0' : 0)}px;
`;

const Icon = styled.TouchableOpacity`
  margin-right: 30px;
  flex-direction: row;
  align-items: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const TopWarrper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ReadMore = styled.TouchableOpacity`
  margin-bottom: 8px;
  align-self: flex-start;
`;

const MenuText = styled.Text`
  font-size: 14px;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

export default ({
  login_id,
  setLoading,
  loading,
  owner,
  replies,
  text,
  setText,
  writeReply,
  onEndReached,
  setReplies,
  setRefresh,
  navigation,
  pressLike,
  deleteOwerComment,
  isModalVisible,
  isDisabled,
  setModalVisible,
  revalue,
  likeNum,
  spinner,
}) => {
  const {comment_id, login_uid, creator, ownerText, count_reco, createdAt} =
    owner;
  const {avatar, firstName, lastName, nickname, uid} = creator;
  const maxLine = 5;
  const lineNum = ownerText.split(/\r\n|\r|\n/).length;
  const [isReadMore, setReadMore] = useState(lineNum > maxLine);

  const goToUserProfile = () => {
    if (uid === login_uid) {
      navigation.navigate(i18n.t('마이 페이지'));
    } else {
      navigation.navigate('User', {
        uid,
      });
    }
  };

  return loading ? (
    <CoLoader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      keyboardVerticalOffset={90}>
      <Container>
        <ReplyList
          replies={replies}
          comment_id={comment_id}
          login_id={login_id}
          loading={spinner}
          setLoading={setLoading}
          onEndReached={onEndReached}
          setReplies={setReplies}
          setRefresh={setRefresh}
          ListEmptyComponent={
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <Nothing>{i18n.t('아직 아무 대댓글도 없어요')}</Nothing>
            </TouchableWithoutFeedback>
          }
          ListHeaderComponent={
            <Owner>
              <Column leftColumn={true}>
                {avatar ? (
                  <TouchableOpacity onPress={goToUserProfile}>
                    <Image
                      source={{uri: avatar}}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 16,
                        marginRight: 8,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Avatar onPress={goToUserProfile}>
                    <DefaultAvatar uid={login_uid} width={30} height={30} />
                  </Avatar>
                )}
              </Column>
              <Column>
                <TopWarrper>
                  <OwnerWrapper onPress={goToUserProfile}>
                    <OwnerText name={true}>
                      {firstName} {lastName}
                    </OwnerText>
                    <OwnerText> @{nickname}</OwnerText>
                  </OwnerWrapper>
                  {uid === login_uid && (
                    <>
                      <Menu>
                        <MenuTrigger>
                          <DotsIcon width={20} height={20} />
                        </MenuTrigger>
                        <MenuOptions customStyles={optionsStyles}>
                          <MenuOption
                            onSelect={() => setModalVisible(true)}
                            customStyles={optionStyles}>
                            <RowWrapper>
                              <DeleteIcon
                                width={13}
                                height={13}
                                marginRight={8}
                              />
                              <MenuText>Delete</MenuText>
                            </RowWrapper>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                      <DeleteModal
                        isModalVisible={isModalVisible}
                        setModalVisible={setModalVisible}
                        deleteFunc={deleteOwerComment}
                      />
                    </>
                  )}
                </TopWarrper>
                <OwnerText content={true}>
                  {isReadMore
                    ? `${printLine(ownerText, maxLine)}...`
                    : ownerText}
                </OwnerText>
                {lineNum > maxLine && (
                  <ReadMore onPress={() => setReadMore(!isReadMore)}>
                    <OwnerText>
                      {isReadMore ? 'Read more' : 'Read less'}
                    </OwnerText>
                  </ReadMore>
                )}
                <IconWrapper>
                  <Icon
                    onPress={pressLike}
                    activeOpacity={0.5}
                    disabled={isDisabled}>
                    {revalue === 1 && (
                      <Like width={14} height={14} marginRight={3} />
                    )}
                    {revalue === 0 && (
                      <LikeColor width={14} height={14} marginRight={3} />
                    )}
                    <LikeText value={revalue}>
                      {' '}
                      {numberFormat(likeNum)}
                    </LikeText>
                  </Icon>
                  <Icon activeOpacity={1}>
                    <ReplyIcon width={16} height={16} />
                    <Text> {numberFormat(count_reco)}</Text>
                  </Icon>
                  <OwnerText>{dateAgoFormat(createdAt)}</OwnerText>
                </IconWrapper>
              </Column>
            </Owner>
          }
        />
        <Wrapper platform={Platform.OS}>
          <TextInput
            multiline={true}
            placeholder={'✏ Write a reply'}
            value={text}
            onChangeText={text => setText(text)}
            showSendIcon={text.trim().length !== 0}
            platform={Platform.OS}
          />
          {text.trim().length !== 0 && (
            <Send onPress={() => writeReply(text)}>
              <SendIcon width={23} height={23} />
            </Send>
          )}
        </Wrapper>
      </Container>
    </KeyboardAvoidingView>
  );
};

import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useValue} from '../context';
import DefaultAvatar from './DefaultAvatar';
import {dateAgoFormat, errorMsg} from '../utilities';
import {deleteReply, likeReply} from '../cleanedApi';
import Like from '../assets/comment_like.svg';
import LikeColor from '../assets/comment_like_color.svg';
import DeleteIcon from '../assets/delete.svg';
import i18n from '../i18n/i18n';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {DeleteModal} from './Modal';
import DotsIcon from '../assets/dots.svg';
import ReadMoreLess from './ReadMoreLess';

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
  padding: 0 10px;
`;

const Line = styled.View`
  width: 100%;
  border: 0.5px solid lightgray;
  margin-bottom: 15px;
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

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
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

const LikeText = styled.Text`
  font-size: 14px;
  color: ${props =>
    props.value === 0 ? 'rgb(220, 79, 15)' : 'rgb(112,112,112)'};
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

const Reply = ({
  reply,
  comment_id,
  login_id,
  setLoading,
  setReplies,
  setRefresh,
}) => {
  const {_id: recomment_id, count_li, createdAt, creator, like, text} = reply;
  const {avatar, firstName, lastName, nickname, uid} = creator;
  const {login_uid} = useValue();
  const [isModalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(); // 1 = 좋아요 (노 컬러), 0 = 좋아요 해제 (컬러)
  const [likeNum, setLikeNum] = useState(count_li);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (like.length !== 0) {
      like.map(el => {
        if (el === login_id) setValue(0);
        else setValue(1);
      });
    } else {
      setValue(1);
    }
  }, []);

  const navigation = useNavigation();
  const goToUserProfile = () => {
    if (uid === login_uid) {
      navigation.navigate(i18n.t('마이 페이지'));
    } else {
      navigation.navigate('User', {
        uid,
      });
    }
  };

  const pressLike = async () => {
    try {
      setDisabled(true);
      const {code, description} = await likeReply(recomment_id, value);
      if (code === 200) {
        if (value === 1) {
          setValue(0);
          setLikeNum(likeNum + 1);
        } else if (value === 0) {
          setValue(1);
          setLikeNum(likeNum - 1);
        }
        setDisabled(false);
      } else throw {code, description};
    } catch (error) {
      errorMsg(error?.code, error?.description);
      console.log('press a reply like api error', error);
    }
  };

  const deleteIt = async () => {
    try {
      const {code, description} = await deleteReply(comment_id, recomment_id);
      if (code === 200) {
        setModalVisible(false);
        setReplies([]);
        setLoading(true);
        setRefresh(Date.now());
      } else throw {code, description};
    } catch (error) {
      setModalVisible(false);
      errorMsg(error?.code, error?.description);
      console.log('deleting a reply api error', error);
    }
  };

  return (
    <>
      <Container>
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
              <DefaultAvatar uid={uid} width={30} height={30} />
            </Avatar>
          )}
        </Column>
        <Column>
          <TopWarrper>
            <Wrapper onPress={goToUserProfile}>
              <Text name={true}>
                {firstName} {lastName}
              </Text>
              <Text> @{nickname}</Text>
            </Wrapper>
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
                        <DeleteIcon width={13} height={13} marginRight={8} />
                        <MenuText>Delete</MenuText>
                      </RowWrapper>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                <DeleteModal
                  isModalVisible={isModalVisible}
                  setModalVisible={setModalVisible}
                  deleteFunc={deleteIt}
                />
              </>
            )}
          </TopWarrper>
          <ReadMoreLess text={text} />
          <IconWrapper>
            <Icon>
              <Icon
                onPress={pressLike}
                activeOpacity={0.5}
                disabled={isDisabled}>
                {value === 1 && <Like width={14} height={14} marginRight={3} />}
                {value === 0 && (
                  <LikeColor width={14} height={14} marginRight={3} />
                )}
                <LikeText value={value}> {likeNum}</LikeText>
              </Icon>
            </Icon>
            <Text>{dateAgoFormat(createdAt)}</Text>
          </IconWrapper>
        </Column>
      </Container>
      <Line />
    </>
  );
};

export default Reply;

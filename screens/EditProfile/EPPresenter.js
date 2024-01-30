import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import DefaultAvatar from '../../components/DefaultAvatar';
import Insta from '../../assets/instagram.svg';
import Female from '../../assets/female.svg';
import Male from '../../assets/male.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../i18n/i18n';
import GlobalStyles from '../../components/GlobalStyles';
import Loader from '../../components/Loaders/Loader';
import {isSameInfo} from '../../utilities';

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding: 0 20px;
`;

const styles = StyleSheet.create({
  fieldContainer: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: ' rgb(255, 255, 255)',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 1,
  },
  halfWidth: {
    width: '47%',
    paddingVertical: 10,
    height: 100,
    marginVertical: 5,
  },
  textinput: {
    textAlignVertical: 'top',
    width: '100%',
    paddingVertical: 0,
    marginTop: 10,
  },
});

const FieldName = styled.Text`
  color: rgb(24, 76, 95);
  font-weight: bold;
  font-size: 18px;
  margin-bottom: ${props => (props.nickname ? 0 : 10)}px;
`;

const GreyText = styled.Text`
  font-size: 13px;
  color: rgb(112, 112, 112);
  margin-left: 5px;
`;

const NicknameMsg = styled.Text`
  font-size: 13px;
  color: ${props => (props.valid ? 'rgb(54, 90, 12)' : '#dc143c')};
`;

const ImageWrapper = styled.View`
  margin: 0 auto;
  margin-bottom: 15px;
`;

const DoneBtn = styled.TouchableOpacity`
  width: 162px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.disabled ? 'rgb(112,112,112)' : 'rgb(220, 79, 15)'};
  border-radius: 24px;
  margin: 0 auto;
  margin-bottom: 80px;
  opacity: ${props => (props.sending ? 0.5 : 1)};
`;

const BtnText = styled.Text`
  font-size: 18px;
  color: ${props => (props.isBlue ? 'rgb(0, 102, 214)' : 'white')};
  font-weight: bold;
`;

const LocalWrapper = styled.View`
  width: 76px;
  height: 76px;
  border-radius: 30px;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
`;

const InstaWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BtnWrapper = styled.View`
  margin: 0 auto;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const ImgPickBtn = styled.TouchableOpacity`
  padding: 5px 8px;
  border-radius: 32px;
  border: 1px solid #184c5f;
  justify-content: center;
  background-color: ${props =>
    props.status ? 'rgb(24, 76, 95)' : 'rgb(249, 243, 241)'};
`;

const ImgPickBtnText = styled.Text`
  font-size: 14px;
  color: ${props => (props.status ? 'rgb(249, 243, 241)' : 'rgb(24, 76, 95)')};
  text-align: center;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props.gender ? 'space-around' : 'space-between'};
`;

const GenderTouch = styled.TouchableOpacity`
  background-color: ${props =>
    props.selected ? ' rgb(255, 235, 222)' : '#ffffff'};
  color: ${props => (props.selected ? '#000000' : '#ffffff')};
  border-radius: 50px;
  padding: 7px;
  align-items: center;
  justify-content: center;
`;

export default ({
  login_uid,
  userInfo,
  setUserInfo,
  onChangeNick,
  nickWarning,
  pickImage,
  sendEditInfo,
  isDisabled,
  setDisabled,
  loading,
  initialObj,
  checkIsValidYear,
}) => {
  const {
    firstName,
    lastName,
    nickname,
    intro,
    instagramId,
    birthYear,
    gender,
    avatar,
  } = userInfo;

  return loading ? (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Loader />
    </SafeAreaView>
  ) : (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView extraHeight={100}>
          <ImageWrapper>
            {avatar === '' ? (
              <LocalWrapper>
                <DefaultAvatar uid={login_uid} width={65} height={65} />
              </LocalWrapper>
            ) : (
              <Image
                source={{uri: avatar}}
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 30,
                }}
              />
            )}
          </ImageWrapper>
          <BtnWrapper>
            <ImgPickBtn
              onPress={pickImage}
              status={avatar === ''}
              disabled={avatar !== ''}>
              <ImgPickBtnText status={avatar === ''}>
                {i18n.t('앨범에서 선택하기')}
              </ImgPickBtnText>
            </ImgPickBtn>
            <ImgPickBtn
              onPress={() =>
                setUserInfo(prev => {
                  isSameInfo({...prev, avatar: ''}, initialObj, setDisabled);
                  return {...prev, avatar: ''};
                })
              }
              status={avatar !== ''}
              disabled={avatar === ''}>
              <ImgPickBtnText status={avatar !== ''}>
                {i18n.t('기본 이미지로 바꾸기')}
              </ImgPickBtnText>
            </ImgPickBtn>
          </BtnWrapper>
          <View style={styles.fieldContainer}>
            <FieldName>
              First Name <GreyText>{i18n.t('(*필수 입력란)')}</GreyText>
            </FieldName>
            <TextInput
              style={styles.textinput}
              placeholder={i18n.t('이름을 입력해주세요 (최대 10자)')}
              value={firstName}
              maxLength={10}
              onChangeText={text =>
                setUserInfo(prev => {
                  if (text.trim().length === 0) setDisabled(true);
                  else
                    isSameInfo(
                      {...prev, firstName: text},
                      initialObj,
                      setDisabled,
                    );
                  return {...prev, firstName: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>
              Last Name <GreyText>{i18n.t('(*필수 입력란)')}</GreyText>
            </FieldName>
            <TextInput
              style={styles.textinput}
              placeholder={i18n.t('성을 입력해주세요 (최대 10자)')}
              value={lastName}
              maxLength={10}
              onChangeText={text =>
                setUserInfo(prev => {
                  if (text.trim().length === 0) setDisabled(true);
                  else
                    isSameInfo(
                      {...prev, lastName: text},
                      initialObj,
                      setDisabled,
                    );
                  return {...prev, lastName: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName nickname={true}>
              Nickname <GreyText>{i18n.t('(*필수 입력란)')}</GreyText>
            </FieldName>
            {nickWarning !== '' && (
              <NicknameMsg
                valid={nickWarning.includes(
                  i18n.t('이 닉네임을 사용 할 수 있습니다'),
                )}>
                {nickWarning}
              </NicknameMsg>
            )}
            <TextInput
              style={styles.textinput}
              value={nickname}
              onChangeText={text => onChangeNick(text)}
              placeholder={i18n.t('닉네임을 입력해주세요 (최대 12자)')}
              maxLength={12}
            />
          </View>
          <RowWrapper>
            <View style={[styles.fieldContainer, styles.halfWidth]}>
              <FieldName>Birth Year</FieldName>
              <TextInput
                style={styles.textinput}
                value={String(birthYear)}
                placeholder={'YYYY'}
                keyboardType="number-pad"
                maxLength={4}
                marginTop="5%"
                onChangeText={text => {
                  setUserInfo(prev => ({...prev, birthYear: text}));
                }}
                onEndEditing={checkIsValidYear}
              />
            </View>
            <View style={[styles.fieldContainer, styles.halfWidth]}>
              <FieldName>Gender</FieldName>
              <RowWrapper gender={true}>
                <GenderTouch
                  selected={gender === 'male'}
                  onPress={() =>
                    setUserInfo(prev => {
                      isSameInfo(
                        {...prev, gender: 'male'},
                        initialObj,
                        setDisabled,
                      );
                      return {...prev, gender: 'male'};
                    })
                  }
                  disabled={gender === 'male'}>
                  <Male width={20} height={20} />
                </GenderTouch>
                <GenderTouch
                  selected={gender === 'female'}
                  onPress={() =>
                    setUserInfo(prev => {
                      isSameInfo(
                        {...prev, gender: 'female'},
                        initialObj,
                        setDisabled,
                      );
                      return {...prev, gender: 'female'};
                    })
                  }
                  disabled={gender === 'female'}>
                  <Female width={20} height={20} />
                </GenderTouch>
              </RowWrapper>
            </View>
          </RowWrapper>
          <View style={styles.fieldContainer}>
            <FieldName>Bio</FieldName>
            <TextInput
              style={styles.textinput}
              value={intro}
              multiline={true}
              placeholder={i18n.t('자기소개를 입력해주세요')}
              onChangeText={text =>
                setUserInfo(prev => {
                  isSameInfo({...prev, intro: text}, initialObj, setDisabled);
                  return {...prev, intro: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>Instagram ID</FieldName>
            <InstaWrapper>
              <Insta width={18} height={18} marginRight={5} marginTop={10} />
              <TextInput
                style={styles.textinput}
                multiline={true}
                value={instagramId}
                placeholder={i18n.t('인스타그램 아이디를 적어주세요')}
                onChangeText={text =>
                  setUserInfo(prev => {
                    isSameInfo(
                      {...prev, instagramId: text},
                      initialObj,
                      setDisabled,
                    );
                    return {...prev, instagramId: text};
                  })
                }
              />
            </InstaWrapper>
          </View>
          <DoneBtn
            onPress={sendEditInfo}
            activeOpacity={0.5}
            disabled={isDisabled}
            sending={isDisabled === null}>
            <BtnText>Update</BtnText>
          </DoneBtn>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

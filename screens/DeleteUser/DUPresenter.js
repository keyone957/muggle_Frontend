import React from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components/native';
import GlobalStyles from '../../components/GlobalStyles';
import Loader from '../../components/Loaders/Loader';
import i18n from '../../i18n/i18n';
import DangerIcon from '../../assets/danger.svg';

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
  padding: 0 20px;
`;

const IconWrapper = styled.View`
  margin: 20px auto;
  align-items: center;
`;

const TextBox = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid crimson;
`;

const WarningText = styled.Text`
  /* color: crimson; */
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin: 20px 0;
`;

const TextInput = styled.TextInput`
  font-size: 18px;
  width: 80%;
  height: 48px;
  border-radius: 8px;
  background-color: #fff;
  padding: 0 10px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-weight: bold;
`;

const CheckBox = styled.View`
  background-color: ${props =>
    props.isChecked ? '#fff' : 'rgb(211, 211, 211)'};
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
`;

const DeleteBtn = styled.TouchableOpacity`
  width: 162px;
  height: 48px;
  background-color: ${props =>
    props.delete
      ? '#DC143C'
      : !props.disabled
      ? '#dc4f0f'
      : 'rgb(112,112,112)'};
  border-radius: 24px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const BtnText = styled.Text`
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 18px;
`;

export default ({
  loading,
  isChecked,
  setIsChecked,
  isReauth,
  killUser,
  code,
  onChangeCode,
  isExpired,
  setIsExpired,
  askCodeNumber,
  confirmCode,
  isAskedCodeNum,
}) => {
  return loading ? (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Loader />
    </SafeAreaView>
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <IconWrapper>
          <DangerIcon width={120} height={120} />
        </IconWrapper>
        <TextBox>
          <WarningText>
            {i18n.t(
              '탈퇴 후 회원정보 및 이용기록은 모두 삭제되며 다시 복구할 수 없어요!',
            )}
          </WarningText>
          <WarningText>
            {i18n.t('탈퇴를 하기 위해서는 인증번호를 통한 재인증이 필요합니다')}
          </WarningText>
        </TextBox>
        <Wrapper onPress={() => setIsChecked(!isChecked)}>
          <CheckBox isChecked={isChecked}>
            <Text>{isChecked ? '✔' : ' '}</Text>
          </CheckBox>
          <Text>{i18n.t('확인')}</Text>
        </Wrapper>
        {!isAskedCodeNum ? (
          <DeleteBtn disabled={!isChecked} onPress={askCodeNumber}>
            <BtnText>{i18n.t('인증번호 받기')}</BtnText>
          </DeleteBtn>
        ) : (
          <>
            <TextInput
              keyboardType="number-pad"
              placeholder={i18n.t('인증번호')}
              maxLength={6}
              value={code}
              onChangeText={onChangeCode}
            />
            <DeleteBtn
              onPress={confirmCode}
              disabled={!(!isReauth && isChecked && code.length === 6)}>
              <BtnText>{i18n.t('인증번호 확인')}</BtnText>
            </DeleteBtn>
          </>
        )}
        {isExpired && (
          <DeleteBtn
            disabled={!isExpired}
            onPress={() => {
              setIsExpired(false);
              askCodeNumber();
            }}>
            <BtnText>{i18n.t('인증번호 재발급')}</BtnText>
          </DeleteBtn>
        )}
        {isReauth && (
          <DeleteBtn onPress={killUser} delete={true}>
            <BtnText>{i18n.t('탈퇴하기')}</BtnText>
          </DeleteBtn>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

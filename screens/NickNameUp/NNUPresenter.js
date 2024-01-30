import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components/native';
import GlobalStyles from '../../components/GlobalStyles';
import Loader from '../../components/Loaders/Loader';
import i18n from '../../i18n/i18n';

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding: 24px 24px 0px 24px;
`;
const Text = styled.Text`
  font-size: ${props => props.fs}px;
  font-weight: bold;
  color: rgb(24, 76, 95);
`;
const Text2 = styled.Text`
  font-size: ${props => props.fs}px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${props => (props.waring ? '#707070' : '#707070')};
`;
const Text3 = styled.Text`
  font-size: ${props => props.fs}px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${props => (props.confirm ? 'rgb(54, 90, 12)' : '#dc143c')};
`;
const TextTitle = styled.Text`
  font-size: ${props => props.fs}px;
  margin-bottom: 30px;
  font-weight: 500;
  color: rgb(24, 76, 95);
`;
const Card = styled.View`
  height: 100px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 15px 17px;
  margin-bottom: 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  height: 48px;
  border-radius: 8px;
`;
const Button = styled.View`
  width: 162px;
  height: 48px;
  background-color: ${props =>
    props.confirm ? '#dc4f0f' : 'rgb(112,112,112)'};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 18px;
`;
const BtnsContainer = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 10px;
  margin: 0 auto;
`;
const Golbangee = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 8px;
`;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ({
  loading,
  onChangeNick,
  nickName,
  nickWarning,
  sendUserInfo,
  confirm,
  confirmMsg,
}) => {
  return loading ? (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Loader />
    </SafeAreaView>
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Text2 fs={14} lh={21} ls={0.7}>
          STEP 2 OF 2
        </Text2>

        <TextTitle fs={20} lh={24} ls={-1}>
          {i18n.t('닉네임을 입력해주세요')}
        </TextTitle>
        <Card style={styles.textInput}>
          <Text fs={18} lh={24} ls={-0.7}>
            Nick Name
          </Text>
          <Golbangee>
            <Text fs={18} lh={24} ls={-0.7}>
              @
            </Text>
            <TextInput
              defaultValue=""
              value={nickName}
              placeholder={i18n.t('여섯 자 이상 영문자 (최대 12자)')}
              returnKeyType="send"
              maxLength={12}
              onChangeText={onChangeNick}
              warning={nickWarning}
              autoCapitalize="none"
            />
          </Golbangee>
        </Card>
        <Text3 fs={13} lh={15} ls={-0.7} confirm={confirm}>
          {confirmMsg ? confirmMsg : nickWarning}
        </Text3>

        <BtnsContainer
          onPress={sendUserInfo}
          style={styles.button}
          disabled={!confirm}>
          <Button confirm={confirm}>
            <BtnText>{i18n.t('시작하기')}</BtnText>
          </Button>
        </BtnsContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

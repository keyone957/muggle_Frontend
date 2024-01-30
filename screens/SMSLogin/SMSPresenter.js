import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Linking,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Next from '../../assets/next.svg';
import i18n from '../../i18n/i18n';
import GlobalStyles from '../../components/GlobalStyles';
import Loader from '../../components/Loaders/Loader';

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding: 24px 12px 0px 12px;
`;

const CardContainer = styled.View`
  flex: 1;
  padding: 0px 12px 0px 12px;
`;

const BtnsContainer = styled.View`
  flex: 1;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-size: ${props => props.fs}px;
  margin-bottom: 6px;
  font-weight: bold;
  color: ${props => (props.grey ? '#707070' : 'rgb(24, 76, 95)')};
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
  font-size: 18px;
  width: 100%;
  height: 48px;
  border-radius: 8px;
`;

const Button = styled.View`
  width: 162px;
  height: 48px;
  background-color: ${props => (props.valid ? '#dc4f0f' : 'rgb(112,112,112)')};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const AgreeButton = styled.View`
  width: 260px;
  height: 48px;
  background-color: ${props => (props.valid ? '#dc4f0f' : 'grey')};
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

const Bug = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Bug2 = styled.View`
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

const Links = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Dots = styled.Text`
  margin: 0 5px;
  color: #707070;
  font-weight: bold;
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
  sendVerification,
  confirmCode,
  onChange,
  onChangeCode,
  onTouch,
  onChangeNational,
  send,
  national,
  number,
  code,
  ToS_URL,
  isExpired,
  setIsExpired,
}) => {
  return loading ? (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Loader />
    </SafeAreaView>
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <KeyboardAwareScrollView>
          <CardContainer>
            <Text fs={14} lh={21} ls={0.7} grey={true}>
              {i18n.t('머글 시작하기')}
            </Text>
            <TextTitle fs={20} lh={24} ls={-1}>
              {i18n.t('휴대폰 번호를 입력해주세요')}
            </TextTitle>
            <Card style={styles.textInput}>
              <Text fs={18} lh={24} ls={-0.7}>
                {i18n.t('국가코드')}
              </Text>
              <TextInput
                defaultValue="+82"
                value={national}
                keyboardType="phone-pad"
                placeholder="+82"
                returnKeyType="send"
                maxLength={4}
                onChangeText={onChangeNational}
              />
            </Card>
            <Card style={styles.textInput}>
              <Text fs={18} lh={24} ls={-0.7}>
                {i18n.t('휴대폰 번호')}
              </Text>
              <TextInput
                value={number}
                keyboardType="phone-pad"
                placeholder={i18n.t('- 없이 숫자만 입력')}
                returnKeyType="send"
                maxLength={15}
                onChangeText={onChange}
              />
            </Card>
            {send === false && (
              <Card style={styles.textInput}>
                <Text fs={18} lh={24} ls={-0.7}>
                  {i18n.t('인증번호')}
                </Text>
                <Bug2>
                  <TextInput
                    value={code}
                    keyboardType="number-pad"
                    placeholder="Confirmation-Code"
                    returnKeyType="send"
                    maxLength={6}
                    onChangeText={onChangeCode}
                  />
                  {isExpired && (
                    <TouchableOpacity
                      onPress={async () => {
                        await sendVerification();
                        setIsExpired(false);
                      }}
                      style={{
                        position: 'absolute',
                        right: 3,
                        paddingTop: 15,
                        marginRight: 0,
                      }}>
                      <Text fs={13} lh={24} ls={-0.7} grey={true}>
                        {i18n.t('인증번호 재전송')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Bug2>
              </Card>
            )}
          </CardContainer>
          {send === false ? (
            <BtnsContainer>
              <Bug>
                <Links>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(ToS_URL('term'))}>
                    <Text fs={13} lh={24} ls={-0.7} grey={true}>
                      {i18n.t('이용약관')}
                    </Text>
                  </TouchableOpacity>
                  <Dots />
                  <TouchableOpacity
                    onPress={() => Linking.openURL(ToS_URL('privacy'))}>
                    <Text fs={13} lh={24} ls={-0.7} grey={true}>
                      {i18n.t('개인정보처리방침')}
                    </Text>
                  </TouchableOpacity>
                  <Dots />
                  <TouchableOpacity
                    onPress={() => Linking.openURL(ToS_URL('community'))}>
                    <Text fs={13} lh={24} ls={-0.7} grey={true}>
                      {i18n.t('커뮤니티 가이드라인')}
                    </Text>
                  </TouchableOpacity>
                </Links>
                <TouchableOpacity
                  onPress={confirmCode}
                  disabled={code.length !== 6}>
                  <AgreeButton style={styles.button} valid={code.length === 6}>
                    <BtnText>{i18n.t('동의하고 시작하기')} </BtnText>
                    <Next />
                  </AgreeButton>
                </TouchableOpacity>
              </Bug>
            </BtnsContainer>
          ) : (
            <BtnsContainer>
              <Bug>
                <TouchableOpacity
                  onPress={onTouch}
                  disabled={!(national[0] === '+' && number !== '')}>
                  <Button
                    style={styles.button}
                    valid={national[0] === '+' && number !== ''}>
                    <BtnText>{i18n.t('다음 ')}</BtnText>
                    <Next />
                  </Button>
                </TouchableOpacity>
              </Bug>
            </BtnsContainer>
          )}
        </KeyboardAwareScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

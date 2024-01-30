import React from 'react';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Next from '../../assets/next.svg';
import i18n from '../../i18n/i18n';

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding: 24px 24px 0px 24px;
`;
const Text = styled.Text`
  font-size: ${props => props.fs}px;
  margin-bottom: 6px;
  font-weight: bold;
  color: rgb(24, 76, 95);
`;
const Text2 = styled.Text`
  font-size: ${props => props.fs}px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${props => (props.warning ? '#707070' : '#707070')};
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
  background-color: ${props =>
    props.warning ? 'rgb(112,112,112)' : '#dc4f0f'};
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
  goToNext,
  onChangeFirst,
  onChangeLast,
  firstName,
  lastName,
  firstWarning,
  lastWarning,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Text2 fs={14} lh={21} ls={0.7}>
          STEP 1 OF 2
        </Text2>
        <TextTitle fs={20} lh={24} ls={-1}>
          {i18n.t('이름을 입력해주세요')}
        </TextTitle>
        <Card style={styles.textInput}>
          <Text fs={18} lh={24} ls={-0.7}>
            First Name
          </Text>
          <TextInput
            defaultValue=""
            value={firstName}
            placeholder={i18n.t('이름 (최대 10자)')}
            returnKeyType="send"
            maxLength={10}
            onChangeText={onChangeFirst}
            warning={firstWarning}
          />
        </Card>
        <Card style={styles.textInput}>
          <Text fs={18} lh={24} ls={-0.7}>
            Last Name
          </Text>
          <TextInput
            value={lastName}
            placeholder={i18n.t('성 (최대 10자)')}
            returnKeyType="send"
            maxLength={10}
            onChangeText={onChangeLast}
          />
        </Card>
        <BtnsContainer
          onPress={goToNext}
          style={styles.button}
          disabled={firstWarning || lastWarning}>
          <Button warning={firstWarning || lastWarning}>
            <BtnText>{i18n.t('다음 ')}</BtnText>
            <Next />
          </Button>
        </BtnsContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import i18n from '../../i18n/i18n';

const styles = StyleSheet.create({
  fieldContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: ' rgb(255, 255, 255)',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 6,
    shadowRadius: 1,
  },
  textinput: {
    textAlignVertical: 'top',
    width: '100%',
  },
});

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
  padding: 0 20px;
`;

const Submit = styled.TouchableOpacity`
  width: 162px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.disabled ? 'rgb(112,112,112)' : 'rgb(220, 79, 15)'};
  border-radius: 24px;
  margin: 0 auto;
  margin-bottom: 20px;
  opacity: ${props => (props.sending ? 0.5 : 1)};
`;

const TextInput = styled.TextInput`
  margin-top: 10px;
`;

const Text = styled.Text`
  margin-top: 10px;
`;

const SubmitText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const FieldName = styled.Text`
  color: rgb(24, 76, 95);
  font-weight: bold;
  font-size: 18px;
`;

export default ({title, text, onChangeText, sendReport, isDisabled}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <ScrollView>
          <View style={styles.fieldContainer}>
            <FieldName>{i18n.t('신고 타켓')}</FieldName>
            <Text>{title}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>{i18n.t('신고 사유')}</FieldName>
            <TextInput
              style={styles.textinput}
              placeholder={i18n.t('신고사유를 작성해주세요')}
              multiline={true}
              value={text}
              onChangeText={text => onChangeText(text)}
            />
          </View>
          <Submit
            onPress={sendReport}
            activeOpacity={0.5}
            disabled={isDisabled}
            sending={isDisabled === null}>
            <SubmitText>Submit</SubmitText>
          </Submit>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

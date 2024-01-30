import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
} from 'react-native';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../i18n/i18n';
import {isSameInfo} from '../../utilities';

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
  textinput: {
    textAlignVertical: 'top',
    width: '100%',
    paddingVertical: 0,
    marginTop: 10,
  },
});

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
  padding: 0 20px;
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
  font-size: 15px;
  color: ${props => props.color};
  font-weight: bold;
`;

const GreyText = styled.Text`
  font-size: 13px;
  color: rgb(112, 112, 112);
  margin-left: 5px;
`;

const FieldName = styled.Text`
  color: rgb(24, 76, 95);
  font-weight: bold;
  font-size: 18px;
`;

export default ({
  cardInfo,
  setInfo,
  sendEditInfo,
  isDisabled,
  setDisabled,
  initialObj,
}) => {
  const {taste_id, title, description, hash, link, location} = cardInfo;

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView extraHeight={100}>
          <View style={styles.fieldContainer}>
            <FieldName>
              Title <GreyText>{i18n.t('(*필수 입력란)')}</GreyText>
            </FieldName>
            <TextInput
              placeholder={i18n.t('제목을 입력해주세요')}
              style={styles.textinput}
              multiline={true}
              value={title}
              onChangeText={text =>
                setInfo(prev => {
                  if (text.trim().length === 0) setDisabled(true);
                  else
                    isSameInfo({...prev, title: text}, initialObj, setDisabled);
                  return {...prev, title: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>Description</FieldName>
            <TextInput
              placeholder={i18n.t('본문 내용을 입력해주세요')}
              style={styles.textinput}
              multiline={true}
              value={description}
              onChangeText={text =>
                setInfo(prev => {
                  isSameInfo(
                    {...prev, description: text},
                    initialObj,
                    setDisabled,
                  );
                  return {...prev, description: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>Hash Tag</FieldName>
            <TextInput
              placeholder={i18n.t('해시태그를 입력해주세요 (eg #떡볶이)')}
              style={styles.textinput}
              value={hash}
              multiline={true}
              onChangeText={text =>
                setInfo(prev => {
                  isSameInfo({...prev, hash: text}, initialObj, setDisabled);
                  return {...prev, hash: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>Link</FieldName>
            <TextInput
              placeholder={i18n.t('링크를 입력해주세요 (ex) https://www')}
              style={styles.textinput}
              multiline={true}
              value={link}
              onChangeText={text =>
                setInfo(prev => {
                  isSameInfo({...prev, link: text}, initialObj, setDisabled);
                  return {...prev, link: text};
                })
              }
            />
          </View>
          <View style={styles.fieldContainer}>
            <FieldName>Location</FieldName>
            <TextInput
              style={styles.textinput}
              multiline={true}
              placeholder={i18n.t('위치를 입력해주세요')}
              value={location}
              onChangeText={text =>
                setInfo(prev => {
                  isSameInfo(
                    {...prev, location: text},
                    initialObj,
                    setDisabled,
                  );
                  return {...prev, location: text};
                })
              }
            />
          </View>
          <DoneBtn
            onPress={sendEditInfo}
            activeOpacity={0.5}
            disabled={isDisabled}
            sending={isDisabled === null}>
            <BtnText color={'white'}>Update</BtnText>
          </DoneBtn>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {CommentList} from '../../components/Lists';
import SendIcon from '../../assets/comment_send.svg';
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import i18n from '../../i18n/i18n';
import CommentLoader from '../../components/Loaders/Comment/CoLoader';

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
`;

const Nothing = styled.Text`
  text-align: center;
  font-size: 16px;
  color: rgb(112, 112, 112);
  margin-top: 80%;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
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

export default ({
  data,
  taste_id,
  login_id,
  loading,
  setLoading,
  text,
  setText,
  writeComment,
  onEndReached,
  setData,
  setRefresh,
  spinner,
}) => {
  return loading ? (
    <CommentLoader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      keyboardVerticalOffset={90}>
      <Container>
        <CommentList
          comments={data}
          taste_id={taste_id}
          login_id={login_id}
          setLoading={setLoading}
          setRefresh={setRefresh}
          onEndReached={onEndReached}
          loading={spinner}
          setData={setData}
          ListEmptyComponent={
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <Nothing>{i18n.t('아직 아무 댓글도 달리지 않았어요')}</Nothing>
            </TouchableWithoutFeedback>
          }
        />
        <Wrapper platform={Platform.OS}>
          <TextInput
            multiline={true}
            placeholder={'✏ Write a comment'}
            value={text}
            onChangeText={text => setText(text)}
            showSendIcon={text.trim().length !== 0}
            platform={Platform.OS}
          />
          {text.trim().length !== 0 && (
            <Send onPress={() => writeComment(text)}>
              <SendIcon width={23} height={23} />
            </Send>
          )}
        </Wrapper>
      </Container>
    </KeyboardAvoidingView>
  );
};

import React from 'react';
import {Modal, TouchableOpacity, Linking} from 'react-native';
import styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';

import i18n from '../../i18n/i18n';

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
`;

const TouchableBlock = styled.TouchableOpacity`
  padding: 10px 25px;
`;

const Block = styled.View`
  padding: 10px 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
  color: ${props => (props.grey ? 'grey' : 'rgb(24, 76, 95)')};
`;

const ModalBg = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ModalBox = styled.View`
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
`;

const ModalText = styled.Text`
  font-size: ${props => (props.big ? 20 : 18)}px;
  text-align: center;
  margin: 5px 0;
  color: ${props => (props.del ? 'rgb(220, 20, 60) ' : 'black')};
`;

export default ({
  isModalVisible,
  setModalVisible,
  onLogOut,
  ToS_URL,
  goToDeleteUser,
}) => {
  return (
    <Container>
      <TouchableBlock onPress={() => Linking.openURL(ToS_URL)}>
        <Text>{i18n.t('서비스 이용약관')}</Text>
      </TouchableBlock>
      <TouchableBlock onPress={() => setModalVisible(true)}>
        <Text>{i18n.t('로그아웃')}</Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <ModalBg>
            <ModalBox>
              <ModalText big={true}>
                {i18n.t('로그아웃하시겠어요? 😢')}
              </ModalText>
              <TouchableOpacity onPress={onLogOut}>
                <ModalText del={true}>Bye Bye 👋</ModalText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ModalText>Nope 🚫</ModalText>
              </TouchableOpacity>
            </ModalBox>
          </ModalBg>
        </Modal>
      </TouchableBlock>
      <TouchableBlock onPress={goToDeleteUser}>
        <Text>{i18n.t('회원탈퇴')}</Text>
      </TouchableBlock>
      <Block>
        <Text>{i18n.t('버전')}</Text>
        <Text grey={true}>{DeviceInfo.getVersion()}</Text>
      </Block>
    </Container>
  );
};

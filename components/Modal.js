import React from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import i18n from '../i18n/i18n';

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

export const DeleteModal = ({isModalVisible, setModalVisible, deleteFunc}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={isModalVisible}
    onRequestClose={() => setModalVisible(false)}>
    <ModalBg>
      <ModalBox>
        <ModalText big={true}>{i18n.t('정말로 지울 거예요? 😢')}</ModalText>
        <TouchableOpacity onPress={deleteFunc}>
          <ModalText del={true}>Bye Bye 👋</ModalText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <ModalText>Nope 🚫</ModalText>
        </TouchableOpacity>
      </ModalBox>
    </ModalBg>
  </Modal>
);

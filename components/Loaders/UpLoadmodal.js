import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';

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

export default ({isModalVisible, progress}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <ModalBg>
        <ModalBox>
          <Progress.Circle
            color={'rgb(220,79,15)'}
            size={100}
            showsText={true}
            progress={progress}
          />
        </ModalBox>
      </ModalBg>
    </Modal>
  );
};

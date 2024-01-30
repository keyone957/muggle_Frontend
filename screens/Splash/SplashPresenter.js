import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Logo from '../../assets/bigMuggl.svg';
import i18n from '../../i18n/i18n';

const {width} = Dimensions.get('window');

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 18px;
`;

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 60%;
`;

const Text = styled.Text`
  color: rgb(24, 76, 95);
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  font-weight: bold;
`;

const BtnsContainer = styled.View`
  position: absolute;
  margin-left: ${width / 2 - 81}px;
  bottom: 15%;
`;

const Button = styled.View`
  width: 162px;
  height: 48px;
  background-color: ${props => (props.valid ? 'rgb(54, 90, 12)' : 'grey')};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  color: ${props => (props.color ? props.color : 'white')};
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

const stylesButton = StyleSheet.create({
  button: {
    backgroundColor: '#dc4f0f',
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

export default ({showBtn, showUpdate, goToWhere}) => {
  return (
    <Container>
      <TextContainer>
        <Logo width={width * 0.5} height={100} />
        <Text>{i18n.t('맛있는건 정말 참을 수 없어')}</Text>
      </TextContainer>
      {showBtn && (
        <BtnsContainer>
          <TouchableOpacity onPress={() => goToWhere('SMSLogin')}>
            <Button style={stylesButton.button}>
              <BtnText>{i18n.t('시작하기')}</BtnText>
            </Button>
          </TouchableOpacity>
        </BtnsContainer>
      )}
      {showUpdate && (
        <BtnsContainer>
          <TouchableOpacity>
            <Button style={stylesButton.button}>
              <BtnText>{i18n.t('업데이트하기')}</BtnText>
            </Button>
          </TouchableOpacity>
        </BtnsContainer>
      )}
    </Container>
  );
};

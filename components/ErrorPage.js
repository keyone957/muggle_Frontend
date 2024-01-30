import React from 'react';
import {Image, SafeAreaView, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Warning from '../assets/warning.png';
import i18n from '../i18n/i18n';
import GlobalStyles from '../components/GlobalStyles';
import BackArrow from '../assets/backarrow.svg';
import {useNavigation} from '@react-navigation/native';
import RefreshIcon from '../assets/refresh.svg';
import {useValue} from '../context';

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding: 0 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: crimson;
  margin: 10px 0;
`;

const Text = styled.Text`
  font-size: 18px;
  margin-bottom: 30px;
`;

const RefreshButton = styled.TouchableOpacity`
  background-color: #707070;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const MoveButton = styled.TouchableOpacity`
  width: 162px;
  height: 48px;
  background-color: #dc4f0f;
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

const BackTouch = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 0;
  align-self: flex-start;
`;

export default ({
  code,
  description,
  func = {},
  showBackArrow = true,
  route,
}) => {
  const navigation = useNavigation();
  const {setRefresh, setShowErrorPage} = func;
  const {setIsLoggedIn, setInitial, setLoginUid} = useValue();

  if (route) {
    const {params} = route;
    code = params.code;
    description = params.description;
    showBackArrow = params.showBackArrow;
  }

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(249, 243, 241)" />
      {code !== 403 && showBackArrow && (
        <BackTouch onPress={() => navigation.goBack()}>
          <BackArrow width={27} height={27} />
        </BackTouch>
      )}
      <Container>
        <Image
          source={Warning}
          style={{
            width: 130,
            height: 130,
            marginTop: '60%',
          }}
        />
        <Title>{description}</Title>
        <Text>
          {i18n.t(
            code === 404
              ? '이미 삭제된 페이지입니다'
              : code === 403
              ? '다시 로그인 해주세요'
              : '새로고침을 해주세요',
          )}
        </Text>
        {code === 400 && (
          <RefreshButton
            onPress={() => {
              setRefresh(Date.now());
              setShowErrorPage(false);
            }}>
            <RefreshIcon width={65} height={65} />
          </RefreshButton>
        )}
        {code === 403 && (
          <MoveButton
            onPress={async () => {
              //   await auth().signOut();
              setIsLoggedIn(false);
              setInitial(true);
              setLoginUid('');
              navigation.reset({routes: [{name: 'SMSLogin'}]});
            }}>
            <BtnText>Go to Log In</BtnText>
          </MoveButton>
        )}
      </Container>
    </SafeAreaView>
  );
};

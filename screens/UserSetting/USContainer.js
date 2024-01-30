import React, {useState} from 'react';
import USPresenter from './USPresenter';
import auth from '@react-native-firebase/auth';
import {useValue} from '../../context';
import {expireFcmToken} from '../../cleanedApi';
import messaging from '@react-native-firebase/messaging';
import {errorMsg} from '../../utilities';

export default ({navigation}) => {
  const {setIsLoggedIn, setInitial, setLoginUid} = useValue();
  const [isModalVisible, setModalVisible] = useState(false);
  const ToS_URL =
    'https://tastenote.s3.ap-northeast-2.amazonaws.com/%EB%A8%B9%EC%9E%98%EC%95%8C+%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80+%EB%8F%99%EC%9D%98(%ED%95%84%EC%88%98)+v1.0.pdf';

  const onLogOut = async () => {
    try {
      const fcmToken = await messaging().getToken();
      const {code, decription} = await expireFcmToken(fcmToken);
      if (code === 200) {
        await auth().signOut();
        setIsLoggedIn(false);
        setInitial(true);
        setLoginUid('');
        setModalVisible(false);
        navigation.reset({routes: [{name: 'Splash'}]});
      } else throw {code, decription};
    } catch (error) {
      setModalVisible(false);
      errorMsg(error?.code, error?.description);
      console.log('log out error', error);
    }
  };

  const goToDeleteUser = () => navigation.navigate('DeleteUser');

  return (
    <USPresenter
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      onLogOut={onLogOut}
      ToS_URL={ToS_URL}
      goToDeleteUser={goToDeleteUser}
    />
  );
};

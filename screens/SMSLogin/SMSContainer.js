import React, {useState} from 'react';
import SMSPresenter from './SMSPresenter';
import {Alert, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import i18n from '../../i18n/i18n';
import {issueJWTtoken, refereshSessionCookie} from '../../cleanedApi';
import messaging from '@react-native-firebase/messaging';
import * as RNLocalize from 'react-native-localize';
import {errorMsg, toastMsg} from '../../utilities';

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [national, setNational] = useState('+82');
  const [send, setSend] = useState(true);
  const [number, setNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  const ToS_URL = what => `https://about.muggl.cc/legal/${what}`;

  const sendVerification = async () => {
    try {
      setLoading(true);
      toastMsg('Sending Code Number...');
      if (Platform.OS === 'android') {
        auth()
          .verifyPhoneNumber(phoneNumber)
          .on('state_changed', phoneAuthSnapshot => {
            // console.log('Snapshot : ', phoneAuthSnapshot);
            setConfirm(phoneAuthSnapshot);
            setLoading(false);
          });
      } else {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        setLoading(false);
      }
    } catch (error) {
      console.log('sendVerification error', error);
      setLoading(false);
      setSend(send);
      if (error.message === 'Cancelled by user') {
        Alert.alert(i18n.t('reCAPTCHA 검사를 해주세요 🚫'));
      } else if (error.message.includes('blocked')) {
        Alert.alert(
          i18n.t('한 번호에 4시간의 문자 제한이 발생했어요'),
          i18n.t('나중에 다시 시도해 주세요!'),
        );
      } else {
        Alert.alert(i18n.t('올바른 국가코드와 핸드폰 번호를 기입해주세요 🚫'));
      }
    }
  };

  const confirmCode = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'android') {
        const credential = auth.PhoneAuthProvider.credential(
          confirm.verificationId,
          code,
        );
        await auth().signInWithCredential(credential);
      } else {
        await confirm.confirm(code);
      }
      checkUserInfo();
    } catch (error) {
      setLoading(false);
      console.log('confirm code error', error);
      if (error.message.includes('expired')) {
        setIsExpired(true);
        Alert.alert(
          i18n.t(
            '인증번호가 만료되었습니다 새로운 인증번호를 발급받아주세요 🚫',
          ),
        );
      } else {
        Alert.alert(i18n.t('잘못된 인증번호입니다 🚫'));
      }
    }
  };

  const onChangeNational = text => {
    text = text.replace(/\s/g, '').replace(/[^0-9^+]/g, '');
    setNational(text);
    setPhoneNumber(text + number);
  };
  const onChange = text => {
    text = text.replace(/\s/g, '').replace(/[^0-9]/g, '');
    setNumber(text);
    setPhoneNumber(national + text);
  };
  const onChangeCode = text => {
    text = text.replace(/\s/g, '').replace(/[^0-9]/g, '');
    setCode(text);
  };

  const onTouch = () => {
    setSend(!send);
    sendVerification();
  };

  const checkUserInfo = async () => {
    try {
      const {uid} = await auth().currentUser;
      const idToken = await auth().currentUser.getIdToken();
      const fcmToken = await messaging().getToken();
      const {
        code,
        description,
        data: {data_code},
      } = await issueJWTtoken(
        idToken,
        uid,
        RNLocalize.getLocales()[0].languageTag,
        fcmToken,
      );
      if (code === 200) {
        if (data_code === 200) {
          const newToken = await auth().currentUser.getIdToken(true);
          const {code: reCode, description: reDes} =
            await refereshSessionCookie(
              newToken,
              uid,
              RNLocalize.getLocales()[0].languageTag,
              fcmToken,
            );
          navigation.reset({routes: [{name: 'Tabs'}]});
        } else if (data_code === 404) {
          navigation.reset({
            routes: [{name: 'NameUp', params: {phoneNumber}}],
          });
        }
      } else throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 403) navigation.goBack();
      console.log(`check User Info in SMS error : ${error}`);
    }
  };

  return (
    <SMSPresenter
      loading={loading}
      confirmCode={confirmCode}
      sendVerification={sendVerification}
      onChange={onChange}
      onChangeCode={onChangeCode}
      onTouch={onTouch}
      onChangeNational={onChangeNational}
      send={send}
      national={national}
      number={number}
      code={code}
      setCode={setCode}
      ToS_URL={ToS_URL}
      isExpired={isExpired}
      setIsExpired={setIsExpired}
    />
  );
};

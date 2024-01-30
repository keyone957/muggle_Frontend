import React, {useState} from 'react';
import DUPresenter from './DUPresenter';
import {Alert, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import {deleteUser} from '../../cleanedApi';
import {useValue} from '../../context';
import i18n from '../../i18n/i18n';
import {errorMsg, toastMsg} from '../../utilities';

export default ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isReauth, isSetReauth] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setIsLoggedIn, setInitial, setLoginUid} = useValue();
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isAskedCodeNum, setAskedCodeNum] = useState(false);

  const askCodeNumber = async () => {
    try {
      setLoading(true);
      toastMsg('Sending Code Number...');
      setAskedCodeNum(true);
      const user = auth().currentUser;
      if (Platform.OS === 'android') {
        auth()
          .verifyPhoneNumber(user.phoneNumber)
          .on('state_changed', phoneAuthSnapshot => {
            setConfirm(phoneAuthSnapshot);
            setLoading(false);
          });
      } else {
        const confirmation = await auth().signInWithPhoneNumber(
          user.phoneNumber,
        );
        setConfirm(confirmation);
        setLoading(false);
      }
    } catch (error) {
      console.log('reauth error ', error);
      setLoading(false);
      if (error.message === 'Cancelled by user') {
        Alert.alert(i18n.t('reCAPTCHA 검사를 해주세요 🚫'));
      } else if (error.message.includes('blocked')) {
        Alert.alert(
          i18n.t('한 번호에 4시간의 문자 제한이 발생했어요'),
          i18n.t('나중에 다시 시도해 주세요!'),
        );
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
      isSetReauth(true);
      setLoading(false);
    } catch (error) {
      console.log('confirm code error', error);
      setLoading(false);
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

  const killUser = async () => {
    try {
      setLoading(true);
      const {code, description} = await deleteUser();
      if (code === 200) {
        await auth().currentUser.delete();
        setIsLoggedIn(false);
        setInitial(true);
        setLoginUid('');
        navigation.reset({routes: [{name: 'Splash'}]});
      } else throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      console.log('delete a user error', error);
    }
  };

  const onChangeCode = text => {
    text = text.replace(/\s/g, '').replace(/[^0-9]/g, '');
    setCode(text);
  };

  return (
    <DUPresenter
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      isReauth={isReauth}
      killUser={killUser}
      loading={loading}
      code={code}
      onChangeCode={onChangeCode}
      isExpired={isExpired}
      setIsExpired={setIsExpired}
      askCodeNumber={askCodeNumber}
      confirmCode={confirmCode}
      isAskedCodeNum={isAskedCodeNum}
    />
  );
};

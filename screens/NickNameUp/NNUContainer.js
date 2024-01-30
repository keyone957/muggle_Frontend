import React, {useState} from 'react';
import NNUPresenter from './NNUPresenter';
import i18n from '../../i18n/i18n';
import {
  createUser,
  checkNickName,
  refereshSessionCookie,
} from '../../cleanedApi';
import {errorMsg} from '../../utilities';
import messaging from '@react-native-firebase/messaging';
import * as RNLocalize from 'react-native-localize';
import auth from '@react-native-firebase/auth';

export default ({
  route: {
    params: {phoneNumber, firstName, lastName},
  },
  navigation,
}) => {
  const [nickName, setNickName] = useState('');
  const [nickWarning, setNickWarning] = useState();
  const [confirm, setConfirm] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState();
  const [loading, setLoading] = useState(false);

  const onChangeNick = async text => {
    text = text.replace(/\s/g, '').replace(/[^A-Za-z^_]/g, '');
    setNickName(text);
    if (text?.length < 6) {
      setNickWarning(i18n.t('최소 여섯 자 이상의 영문자를 입력해주세요'));
      setConfirm(false);
      setConfirmMsg(null);
    } else {
      setNickWarning(null);
      try {
        const {data} = await checkNickName(text);
        if (data === 1) {
          setNickWarning(i18n.t('다른 사람이 사용하고 있는 닉네임입니다'));
          setConfirm(false);
          setConfirmMsg(null);
        } else if (data === 0) {
          setConfirmMsg(i18n.t('이 닉네임을 사용 할 수 있습니다'));
          setConfirm(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendUserInfo = async () => {
    try {
      setLoading(true);
      const {code, description} = await createUser(
        phoneNumber,
        firstName,
        lastName,
        nickName,
      );
      if (code === 200) {
        const {uid} = await auth().currentUser;
        const newToken = await auth().currentUser.getIdToken(true);
        const fcmToken = await messaging().getToken();
        const locale = RNLocalize.getLocales()[0].languageTag;
        const {code: reCode, description: reDes} = await refereshSessionCookie(
          newToken,
          uid,
          locale,
          fcmToken,
        );
        navigation.reset({routes: [{name: 'Tabs'}]});
      } else throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 403) navigation.reset({routes: [{name: 'Splash'}]});
      console.log('saveUserInfo info is fail', error);
    }
  };

  return (
    <NNUPresenter
      loading={loading}
      onChangeNick={onChangeNick}
      sendUserInfo={sendUserInfo}
      nickName={nickName}
      nickWarning={nickWarning}
      confirmMsg={confirmMsg}
      confirm={confirm}
    />
  );
};

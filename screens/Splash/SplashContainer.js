import React, {useEffect, useState} from 'react';
import Toast from 'react-native-tiny-toast';
import {useValue} from '../../context';
import i18n from '../../i18n/i18n';
import SplashPresenter from './SplashPresenter';
import {checkUserCreated, versionCheck} from '../../cleanedApi';
import DeviceInfo from 'react-native-device-info';
import auth from '@react-native-firebase/auth';
import {errorMsg} from '../../utilities';

export default ({navigation}) => {
  const {setIsLatestVer, setLoginUid, setIsLoggedIn} = useValue();
  const [showBtn, isShowBtn] = useState(false);
  const [showUpdate, isShowUpdate] = useState(false);

  const checkVersion = async () => {
    try {
      const clientVer = DeviceInfo.getVersion();
      const {data, version} = await versionCheck(clientVer);
      if (data === 3) {
        setIsLatestVer(false);
        isShowUpdate(true);
        Toast.show(i18n.t('앱을 최신 버전으로 업데이트해주세요!'), {
          containerStyle: {
            backgroundColor: '#808080',
            borderRadius: 50,
            opacity: 0,
          },
        });
      } else if (data === 2) {
        Toast.show(i18n.t('앱을 최신 버전으로 업데이트해주세요!'), {
          containerStyle: {
            backgroundColor: '#808080',
            borderRadius: 50,
            opacity: 0,
          },
        });
      }
    } catch (error) {
      console.log('version check api', error);
    }
  };

  const goToWhere = (where, arg = {}) => navigation.navigate(where, arg);

  const checkUserInDB = async () => {
    try {
      const {
        code,
        description,
        data: {data_code},
      } = await checkUserCreated();
      if (code === 200) {
        if (data_code === 200) setIsLoggedIn(true);
        else {
          // SMS 인증 후 이름 / 닉네임 기입 전 탈주한 신규 유저일 경우
          setIsLoggedIn(false);
          isShowBtn(true);
        }
      } else throw {code, description};
    } catch (error) {
      errorMsg(error?.code, error?.description);
      isShowBtn(true);
      console.log(`checkUserCreated error in App: ${error}`);
    }
  };

  useEffect(() => {
    // checkVersion();
    auth().onAuthStateChanged(async user => {
      if (user) {
        console.log(
          'onAuthStateChanged : User ',
          // await auth().currentUser.getIdTokenResult(),
        );
        isShowBtn(false);
        setLoginUid(user.uid);
        checkUserInDB(user.uid);
      } else {
        console.log('onAuthStateChanged : No User');
        isShowBtn(true);
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <SplashPresenter
      showBtn={showBtn}
      showUpdate={showUpdate}
      goToWhere={goToWhere}
    />
  );
};

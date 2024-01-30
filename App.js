import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Stack, {navigationRef} from './navigation/Stack';
import ContextProvider from './context';
import {fcmTokenUpdate} from './cleanedApi';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodePush from 'react-native-code-push';
import * as RNLocalize from 'react-native-localize';
import {
  setForegroundMsg,
  setBackgroundMsg,
  refreshMsgToken,
  setForegroundLink,
  setBackgroundLink,
} from './fireModules';
import {errorMsg} from './utilities';
import i18n from './i18n/i18n';
import {MenuProvider} from 'react-native-popup-menu';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
  'Constants.linkingUrl has been renamed to Constants.linkingUri. Consider using the Linking API directly. Constants.linkingUrl will be removed in SDK 44.',
  "Constants.installationId has been deprecated in favor of generating and storing your own ID. Implement it using expo-application's androidId on Android and a storage API such as expo-secure-store on iOS and localStorage on the web. This API will be removed in SDK 44.",
  'Constants.deviceId has been deprecated in favor of generating and storing your own ID. This API will be removed in SDK 44.',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

const codePushOptions = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

setForegroundMsg();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLatestVer, setIsLatestVer] = useState(true);
  const [login_uid, setLoginUid] = useState('');

  useEffect(() => {
    checkPermission();
  }, []);

  // Listeners
  RNLocalize.addEventListener('change', updateTokenToServer);
  refreshMsgToken(updateTokenToServer);
  setBackgroundMsg(navigationRef);
  setForegroundLink(navigationRef, login_uid, isLoggedIn);
  setBackgroundLink(navigationRef, login_uid, isLoggedIn);

  const checkPermission = async () => {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled === -1) {
        requestPermission();
      } else if (enabled === 1) {
        const status = await getPermissionStatus();
        if (status === 'denied') {
          updateTokenToServer();
          storePermissionStatus('accepted');
        }
      } else if (enabled === 0) {
        storePermissionStatus('denied');
      }
    } catch (error) {
      console.log('check msging permission ', error);
    }
  };

  const storePermissionStatus = async status => {
    try {
      await AsyncStorage.setItem('@permission', status);
    } catch (e) {
      console.log('store permission status error', e);
    }
  };

  const getPermissionStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('@permission');
      if (status !== null) {
        return status;
      }
    } catch (e) {
      console.log('store permission status error', e);
    }
  };

  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        storePermissionStatus('accepted');
        updateTokenToServer();
      } else throw Error;
    } catch (error) {
      errorMsg(999, i18n.t('푸쉬알람 요청을 거절하였습니다'));
      storePermissionStatus('denied');
      console.log('firebase requestPermission ', error);
    }
  };

  const updateTokenToServer = async () => {
    try {
      const fcmToken = await messaging().getToken();
      const locale = RNLocalize.getLocales()[0].languageTag;
      const {code, description} = await fcmTokenUpdate(fcmToken, locale);
      if (code === 200) {
        console.log('fcm token update successful');
      } else throw description;
    } catch (error) {
      console.log('update fcm token error ', error);
    }
  };

  return (
    <MenuProvider>
      <NavigationContainer ref={navigationRef}>
        <ContextProvider
          value={{
            isLoggedIn,
            isLatestVer,
            setIsLatestVer,
            setIsLoggedIn,
            login_uid,
            setLoginUid,
          }}>
          <Stack />
        </ContextProvider>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default CodePush(codePushOptions)(App);

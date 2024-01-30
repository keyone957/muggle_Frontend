import i18n from './i18n/i18n';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import {toastMsg} from './utilities';

// Dynamic Link
export const generateLink = async (path, param, value) => {
  const link = await dynamicLinks().buildShortLink({
    link: `https://muggl.cc/${path}?${param}=${value}`,
    ios: {
      bundleId: 'com.muggl.muggl',
      appStoreId: '1576051311',
    },
    android: {
      packageName: 'com.muggl.muggl',
    },
    domainUriPrefix: 'https://muggl.page.link',
  });
  return link;
};

const goToLinkRoute = (url, login_uid, navigationRef, isLoggedIn) => {
  if (url && url.includes('profile')) {
    const firstIdx = url.indexOf('uid');
    const uid = url.substring(firstIdx, url.length).replace('uid=', '');
    if (isLoggedIn) {
      if (uid === login_uid)
        navigationRef?.current?.navigate(i18n.t('마이 페이지'));
      else {
        navigationRef?.current?.navigate('Tabs');
        setTimeout(() => {
          navigationRef?.current?.navigate('User', {uid});
        }, 1500);
      }
    }
  } else if (url && url.includes('post')) {
    const firstIdx = url.indexOf('id');
    const taste_id = url.substring(firstIdx, url.length).replace('id=', '');
    if (isLoggedIn) {
      navigationRef?.current?.navigate('Tabs');
      setTimeout(() => {
        navigationRef?.current?.navigate('Detail', {taste_id});
      }, 1500);
    }
  }
};

export const setForegroundLink = (navigationRef, login_uid, isLoggedIn) =>
  dynamicLinks().onLink(({url}) => {
    goToLinkRoute(url, login_uid, navigationRef, isLoggedIn);
  });

export const setBackgroundLink = async (
  navigationRef,
  login_uid,
  isLoggedIn,
) => {
  try {
    const res = await dynamicLinks().getInitialLink();
    goToLinkRoute(res?.url, login_uid, navigationRef, isLoggedIn);
  } catch (error) {
    console.log('backgounrd / quit state link error', error);
  }
};

// Messaging
export const setForegroundMsg = () =>
  messaging().onMessage(async remoteMessage => {
    const {
      notification: {body},
    } = remoteMessage;
    toastMsg(body);
  });

export const setBackgroundMsg = navigationRef =>
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      JSON.stringify(remoteMessage),
    );
    const {
      data: {goto, taste_id, uid},
    } = remoteMessage;
    if (goto === 'profile') {
      navigationRef?.current?.navigate('Tabs');
      setTimeout(() => {
        navigationRef?.current?.navigate('User', {uid});
      }, 1500);
    } else {
      navigationRef?.current?.navigate('Tabs');
      setTimeout(() => {
        navigationRef?.current?.navigate('Detail', {taste_id});
      }, 1500);
    }
  });

export const refreshMsgToken = updateTokenToServer =>
  messaging().onTokenRefresh(async token => {
    console.log('new token', token);
    updateTokenToServer();
  });

export const setBackgroundMsgHandler = () =>
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      'FCM Background / Quit state Message Data:',
      JSON.stringify(remoteMessage),
    );
  });

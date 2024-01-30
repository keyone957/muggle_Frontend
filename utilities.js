import {formatDistanceToNowStrict} from 'date-fns';
import ko from 'date-fns/locale/ko';
import {Alert, Linking} from 'react-native';
import i18n from './i18n/i18n';
import en from 'date-fns/locale/en-US';
import * as RNLocalize from 'react-native-localize';
import Toast from 'react-native-tiny-toast';
import {isEqual, throttle} from 'lodash';

export const trimText = (text = '', limit) =>
  text.length > limit ? `${[...text].slice(0, limit).join('')}..` : text;

export const numberFormat = num => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million
  } else if (num < 1000) {
    return num; // if value < 1000, nothing to do
  }
};

const monthEng = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export const dateFormat = dateStr => {
  if (dateStr) {
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(5, 2);
    const monthName = monthEng[month];
    const date = dateStr.substr(8, 2);
    return `${monthName} ${date} ${year}`;
  } else return '';
};

export const hashFormat = hashStr => {
  // 공백 제거
  hashStr.replace(/\s/g, '');
  // #기준으로 배열에 넣기
  const hashArr = hashStr.split('#');
  const filtered = hashArr.filter(el => el != '');
  return filtered;
};

const locale = RNLocalize.getLocales()[0].languageTag;

export const dateAgoFormat = dateStr => {
  const time = Date.parse(dateStr);
  // const koTime = subHours(time, 9);
  let country;
  // const country = Localization.locale === "en-US" ? en : ko;
  if (locale === 'en-US' || locale === 'en-KR') {
    country = en;
  } else if (locale === 'ko-KR' || locale === 'ko-US') {
    country = ko;
  }

  return `${formatDistanceToNowStrict(time, {
    locale: country,
  })} ${i18n.t('전')}`;
};

export const openURL = link => {
  try {
    Linking.openURL(link);
    console.warn = warn => {
      if (warn.includes('Could not open URL'))
        Alert.alert(
          i18n.t('해당 링크를 열 수 없습니다 🚫'),
          i18n.t('올바른 링크가 맞는지 확인해주세요'),
        );
    };
  } catch (error) {
    console.log('open url error', error.message);
  }
};

export const errorMsg = (code, description) => {
  let msg = '';
  if (code === 404) msg = i18n.t('찾을 수 없는 페이지입니다');
  else if (code === 403) msg = i18n.t('다시 로그인 해주세요');
  else if (code === 400 || code === 999) msg = i18n.t('다시 시도해주세요');
  else msg = i18n.t('인터넷 연결을 확인해주세요');
  Toast.show(
    `Error : ${description ? description : 'Network Error'}.\n${msg}`,
    {
      position: 100,
      containerStyle: {
        backgroundColor: '#808080',
        borderRadius: 50,
        opacity: 0,
        width: '55%',
      },
    },
  );
};

export const revokeThrottle = func =>
  throttle(func, 30000, {
    trailing: false,
  });

export const checkCollection = (total, record, collect) =>
  Alert.alert(
    `Total : ${numberFormat(total)}`,
    `✏️ Record : ${record} \n📥 Collect : ${collect}`,
    [{text: 'OK'}],
  );

export const endOfDataMsg = () =>
  Toast.show(i18n.t('모든 데이터를 불러왔어요'), {
    containerStyle: {
      backgroundColor: '#808080',
      borderRadius: 50,
      opacity: 0,
    },
  });

export const isSameInfo = (obj1, obj2, setState) => {
  const isSame = isEqual(obj1, obj2);
  if (isSame) setState(true);
  else setState(false);
};

export const printLine = (text = '', maxLine) => {
  const briefText = text
    .match(/[^\r\n]+/g)
    .slice(0, maxLine)
    .join('\n');
  return `${briefText}...`;
};

export const toastMsg = msg =>
  Toast.show(msg, {
    position: Toast.position.TOP,
    containerStyle: {
      backgroundColor: '#808080',
      borderRadius: 50,
      opacity: 0,
    },
  });

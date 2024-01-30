import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-tiny-toast';
import EPPresenter from './EPPresenter';
import i18n from '../../i18n/i18n';
import {deleteAvatar, editProfile, checkNickName} from '../../cleanedApi';
import {errorMsg} from '../../utilities';
import {isEqual} from 'lodash';

export default ({
  route: {
    params: {
      login_uid,
      avatar,
      firstName,
      lastName,
      nickname,
      intro,
      instagramId,
      birth: birthYear,
      gender,
    },
  },
  navigation,
}) => {
  const initialObj = {
    firstName,
    lastName,
    nickname,
    intro,
    instagramId: instagramId === undefined ? '' : instagramId,
    birthYear: !birthYear ? '' : birthYear,
    gender: !gender ? '' : gender,
    avatar: avatar === undefined ? '' : avatar,
  };
  const [userInfo, setUserInfo] = useState(initialObj);
  const [nickWarning, setNickWarning] = useState('');
  // flag
  const [loading, setLoading] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const onChangeNick = async text => {
    text = text.replace(/\s/g, '').replace(/[^A-Za-z^_]/g, '');
    setUserInfo(prev => ({...prev, nickname: text}));
    if (text?.length < 6) {
      setNickWarning(i18n.t('최소 여섯 자 이상의 영문자를 입력해주세요'));
      setDisabled(true);
    } else {
      setNickWarning('');
      try {
        if (initialObj.nickname !== text) {
          const {data} = await checkNickName(text);
          if (data === 1) {
            setNickWarning(i18n.t('다른 사람이 사용하고 있는 닉네임입니다'));
            setDisabled(true);
          } else if (data === 0) {
            setNickWarning(i18n.t('이 닉네임을 사용 할 수 있습니다'));
            setDisabled(false);
          }
        } else setDisabled(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!birthYear || !gender)
      Toast.show('더 맛있는 추천을 받기 위해 출생년도와 성별을 입력해보세요!', {
        containerStyle: {
          backgroundColor: '#808080',
          borderRadius: 50,
          opacity: 0,
          width: 300,
        },
      });
  }, []);

  const pickImage = async () => {
    try {
      setLoading(true);
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
      });
      setUserInfo(prev => ({...prev, avatar: image.path}));
      setDisabled(false);
      setIsAvatarChanged(true);
      setLoading(false);
    } catch (error) {
      console.log('picker error ', error);
      setLoading(false);
      if (error.message !== 'User cancelled image selection')
        errorMsg(999, "Can't pick media");
    }
  };

  const editDeleteAvatar = async () => {
    try {
      const {code, description} = await deleteAvatar();
      if (code !== 200) throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      console.log('delete avatar api error', error);
    }
  };

  const sendEditInfo = async () => {
    try {
      setLoading(true);
      const {
        firstName,
        lastName,
        nickname,
        intro,
        instagramId,
        birthYear,
        gender,
        avatar,
      } = userInfo;
      if (!avatar.includes('https://')) {
        // default avatar
        await editDeleteAvatar();
      }
      const {code, description} = await editProfile(
        firstName,
        nickname,
        lastName,
        avatar,
        intro,
        instagramId,
        gender,
        birthYear === '' ? birthYear : parseInt(birthYear),
        isAvatarChanged,
      );
      if (code === 200) navigation.goBack();
      else throw {code, description};
    } catch (error) {
      console.log('edit profile error', error);
      setLoading(false);
      errorMsg(error?.code, error?.description);
    }
  };

  const checkIsValidYear = () => {
    let currentYear = new Date().getFullYear();
    const numberYear = parseInt(userInfo.birthYear, 10);
    if (isEqual(initialObj, userInfo)) {
      setDisabled(true);
    } else if (userInfo.birthYear === '') {
      setDisabled(false);
    } else if (isNaN(numberYear)) {
      errorMsg(999, i18n.t('올바른 출생년도를 입력해주세요!'));
      setDisabled(true);
    } else {
      if (numberYear >= 1900 && numberYear <= currentYear) {
        setDisabled(false);
      } else {
        errorMsg(999, i18n.t('올바른 출생년도를 입력해주세요!'));
        setDisabled(true);
      }
    }
  };

  return (
    <EPPresenter
      // Info
      login_uid={login_uid}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      nickWarning={nickWarning}
      initialObj={initialObj}
      // func
      onChangeNick={onChangeNick}
      pickImage={pickImage}
      checkIsValidYear={checkIsValidYear}
      sendEditInfo={sendEditInfo}
      // Flag
      isDisabled={isDisabled}
      setDisabled={setDisabled}
      loading={loading}
    />
  );
};

import React, {useState, useCallback} from 'react';
import UploadPresenter from './NewPresenter';
import {Platform, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import i18n from '../../i18n/i18n';
import {errorMsg, toastMsg} from '../../utilities';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://muggl.cc/',
  withCredentials: true,
});

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [uploadInfo, setInfo] = useState({
    title: '',
    description: '',
    hash: '',
    link: '',
    location: '',
  });
  const [isConfirm, setConfirm] = useState(false);
  const [mediaArr, setMediaArr] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const onUploadProgress = useCallback(
    progressEvent => {
      const percent = parseFloat(
        (progressEvent.loaded / progressEvent.total).toFixed(1),
      );
      setProgress(percent);
      if (percent === 1) {
        return setTimeout(() => {
          setModalVisible(false);
          toastMsg(i18n.t('업로드 중 입니다 잠시만 기다려주세요'));
        }, 1000);
      }
    },
    [setProgress],
  );

  const pickVideos = async () => {
    try {
      setLoading(true);
      const videos = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'video',
      });
      if (mediaArr.length + videos.length > 5) {
        Alert.alert(
          'Media Uploading Warning 🚫',
          i18n.t('사진과 영상을 총 5개까지 올릴수 있습니다'),
        );
        videos.splice(0, mediaArr.length + videos.length - 5);
      }
      videos.map(video => {
        const {duration, path, sourceURL} = video;
        if (duration > 60000) {
          Alert.alert(
            'Video Uploading Warning 🚫',
            i18n.t('1분 이하의 비디오만 업로드 가능합니다'),
          );
        } else {
          setMediaArr(prev => [
            ...prev,
            {
              uri: Platform.OS === 'ios' ? sourceURL : path,
              type: 'video',
            },
          ]);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('picker error ', error.message);
      setLoading(false);
      if (error.message !== 'User cancelled image selection')
        errorMsg(999, "Can't pick media");
    }
  };

  const pickPhotos = async () => {
    try {
      setLoading(true);
      let photos = [];

      await ImagePicker.openPicker({
        multiple: true,
        forceJpg: true,
        mediaType: 'photo',
      }).then(async items => {
        if (mediaArr.length + items.length > 5) {
          Alert.alert(
            'Media Uploading Warning 🚫',
            i18n.t('사진과 영상을 총 5개까지 올릴수 있습니다'),
          );
          items.splice(0, mediaArr.length + items.length - 5);
        }
        for (const item of items) {
          photos.push(
            await ImagePicker.openCropper({
              path: item.path,
              freeStyleCropEnabled: true,
              forceJpg: true,
            }),
          );
        }
      });

      photos.map(photo => {
        setMediaArr(prev => [
          ...prev,
          {
            uri: photo.path,
            type: 'image',
          },
        ]);
      });

      setLoading(false);
    } catch (error) {
      console.log('picker error ', error.message);
      setLoading(false);
      if (error.message !== 'User cancelled image selection')
        errorMsg(999, "Can't pick media");
    }
  };

  const makePost = async (
    title,
    description,
    hash,
    mediaArr,
    link,
    location,
  ) => {
    let formData = new FormData();
    formData.append('title', title);
    if (description !== '') formData.append('description', description);
    formData.append('hash', hash);
    if (link !== '') formData.append('link', link);
    if (location !== '') formData.append('location', location);
    if (mediaArr.length > 0) {
      mediaArr.map(media => {
        let file = {
          name: media.uri,
          type: `${media.type}/*`,
          uri:
            Platform.OS === 'android'
              ? media.uri
              : media.uri.replace('file://', ''),
        };
        formData.append('media', file);
      });
    }

    const {data} = await api.post('/taste/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return data;
  };

  const sendUploadInfo = async () => {
    const {title, description, hash, link, location} = uploadInfo;
    const hashStr = hash
      .replace(/\([0-9]\)/g, '')
      .replace(/\[/g, '')
      .replace(/\]/g, '');

    try {
      setModalVisible(true);
      const {code, description: errorDes} = await makePost(
        title,
        description,
        hashStr,
        mediaArr,
        link,
        location,
      );
      if (code === 200) {
        setInfo({
          title: '',
          description: '',
          hash: '',
          link: '',
          location: '',
        });
        setMediaArr([]);
        setModalVisible(false);
        setConfirm(false);
        toastMsg(i18n.t('야호! 😆 업로드가 완료되었습니다!'));
        navigation.navigate(i18n.t('머글 세상'), {needRefresh: true});
      } else throw {code, description: errorDes};
    } catch (error) {
      console.log('create post api error', error);
      setModalVisible(false);
      errorMsg(error?.code, error?.description);
    }
  };

  const resetProgress = () => {
    setProgress(0);
  };

  return (
    <UploadPresenter
      uploadInfo={uploadInfo}
      setInfo={setInfo}
      pickPhotos={pickPhotos}
      pickVideos={pickVideos}
      sendUploadInfo={sendUploadInfo}
      isConfirm={isConfirm}
      setConfirm={setConfirm}
      mediaArr={mediaArr}
      setMediaArr={setMediaArr}
      loading={loading}
      isModalVisible={isModalVisible}
      progress={progress}
      resetProgress={resetProgress}
    />
  );
};

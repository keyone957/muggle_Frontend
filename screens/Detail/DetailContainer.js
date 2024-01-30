import React, {useState, useEffect, useCallback} from 'react';
import DetailPresenter from './NewPresenter';
import {useValue} from '../../context';
import {
  checkPostLike,
  getPostDetail,
  checkBookmark,
  deleteCardSecond,
} from '../../cleanedApi';
import i18n from '../../i18n/i18n';
import Clipboard from '@react-native-clipboard/clipboard';
import {generateLink} from '../../fireModules';
import {errorMsg, toastMsg} from '../../utilities';

export default ({
  route: {
    params: {
      item: {
        count_bo,
        count_co,
        count_li,
        title,
        creator,
        hash,
        createdAt,
        _id: taste_id,
        thumbnail,
        description,
      },
    },
  },
  navigation,
}) => {
  const [data, setData] = useState({
    creator,
    mediaArr: thumbnail ? [{uri: thumbnail}] : [],
    link: '',
    taste_id,
    count_bo,
    count_co,
    count_li,
    title,
    createdAt,
    hash,
    description: description ? description : '',
  });
  const [loading, setLoading] = useState();
  const [isIdSame, setIsIdSame] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [youtube, setYoutube] = useState();
  const {login_uid} = useValue();
  const [isBookDisabled, setBookDisabled] = useState(false);
  const [isLikeDisabled, setLikeDisabled] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [isFromHome] = useState(
    navigation.getState().routes[0]?.key.includes('Home'),
  );

  const getCard = async () => {
    try {
      const {code, description: errorDes, data} = await getPostDetail(taste_id);
      if (code === 200) {
        setData({
          taste_id,
          ...data,
          mediaArr: data.image ? data.image : [],
          link: data.link ? data.link : '',
          location: data.location ? data.location : '',
        });
        setIsIdSame(data.creator.uid === login_uid);
        isUrl(data.link);
      } else throw {code, description: errorDes};
      setLoading(false);
    } catch (error) {
      console.log('get post deatil api error', error);
      setLoading(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 400 || error?.code === 403 || error?.code === 404) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  const pressBookmark = async () => {
    try {
      setBookDisabled(true);
      const {bookmarkStatus, count_bo} = data;
      const {
        code,
        description,
        bookmarkStatus: resBookmarkStatus,
      } = await checkBookmark(taste_id, !bookmarkStatus);
      if (code === 200) {
        setData(prev => ({
          ...prev,
          bookmarkStatus: resBookmarkStatus,
          count_bo: resBookmarkStatus ? count_bo + 1 : count_bo - 1,
        }));
        setBookDisabled(false);
      } else throw {code, description};
    } catch (error) {
      setBookDisabled(false);
      errorMsg(error?.code, error?.description);
      console.log('bookmark api error', error);
      if (error?.code === 400 || error?.code === 403 || error?.code === 404) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  const pressLike = async () => {
    try {
      setLikeDisabled(true);
      const {likeStatus, count_li} = data;
      const {
        code,
        description,
        likeStatus: resLikeStatus,
      } = await checkPostLike(taste_id, !likeStatus);
      if (code === 200) {
        setData(prev => ({
          ...prev,
          likeStatus: resLikeStatus,
          count_li: resLikeStatus ? count_li + 1 : count_li - 1,
        }));
        setLikeDisabled(false);
      } else throw {code, description};
    } catch (error) {
      setLikeDisabled(false);
      errorMsg(error?.code, error?.description);
      console.log('like api error', error);
      if (error?.code === 400 || error?.code === 403 || error?.code === 404) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  const deleteCard = async () => {
    try {
      const {code, description} = await deleteCardSecond(taste_id);
      if (code === 200) {
        setModalVisible(false);
        if (isFromHome) {
          navigation.navigate('Home', {needRefresh: true});
        } else {
          navigation.goBack();
        }
      } else throw {code, description};
    } catch (error) {
      setModalVisible(false);
      errorMsg(error?.code, error?.description);
      console.log('delete a card api2 error', error);
    }
  };

  const isUrl = link => {
    try {
      const url = link ? link : '';
      //is Youtube url?
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[7].length == 11) {
        setYoutube(match[7]);
      }
      if (url == undefined || url == 'undefined') {
        setYoutube(false);
      }
    } catch (error) {
      console.log('error by isUrl', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCard();
  }, [taste_id, refresh]);

  const goToWhere = (where, arg = {}) => navigation.navigate(where, arg);

  const copyPasteLink = async () => {
    try {
      const link = await generateLink('post', 'id', taste_id);
      Clipboard.setString(link);
      toastMsg(i18n.t('클립보드로 링크가 복사되었습니다'));
    } catch (error) {
      errorMsg(999, "Can't copy the link");
      console.log('copy paste link error', error);
    }
  };

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setLoading(true);
    wait(1000).then(() => {
      getCard();
      setLoading(false);
    });
  }, []);

  return (
    <DetailPresenter
      data={data}
      loading={loading}
      setRefresh={setRefresh}
      isIdSame={isIdSame}
      pressBookmark={pressBookmark}
      pressLike={pressLike}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      deleteCard={deleteCard}
      youtube={youtube}
      isUrl={isUrl}
      goToWhere={goToWhere}
      navigation={navigation}
      copyPasteLink={copyPasteLink}
      isBookDisabled={isBookDisabled}
      isLikeDisabled={isLikeDisabled}
      showErrorPage={showErrorPage}
      setShowErrorPage={setShowErrorPage}
      onRefresh={onRefresh}
    />
  );
};

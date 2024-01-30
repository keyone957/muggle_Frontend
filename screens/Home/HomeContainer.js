import React, {useState, useEffect} from 'react';
import HomePresenter from './HomePresenter';
import {useValue} from '../../context';
import {
  getInitialFeed,
  getRecentFeed,
  getPushFlag,
  getInitialFollow,
  getFollowFeed,
} from '../../cleanedApi';
import {endOfDataMsg, errorMsg} from '../../utilities';
import i18n from '../../i18n/i18n';
import {Platform, StatusBar} from 'react-native';

export default ({navigation, route: {params}}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [lastPostingId, setLastPostingId] = useState('');
  const [isNewPush, setIsNewPush] = useState();
  const {initial, setInitial} = useValue();
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  const [menu, setMenu] = useState(1);
  const [followingData, setFollowingData] = useState([]);
  const [lastPostingId2, setLastPostingId2] = useState('');
  const [endOfData2, setEndOfData2] = useState(false);

  const onEndReached = async menu => {
    if (loading) return;
    else {
      if ((menu === 1 && !endOfData) || (menu === 2 && !endOfData2)) {
        if (!spinner) {
          let lastId = menu === 1 ? lastPostingId : lastPostingId2;
          fetchMoreList(lastId, menu);
        }
      } else endOfDataMsg();
    }
  };

  const goToWhere = (where, arg = {}) => navigation.navigate(where, arg);

  const getInitialData = () => {
    return Promise.all([getInitialFeed(), getInitialFollow()]);
  };

  const getInitialList = async () => {
    try {
      const [
        {code: wholeCode, description: wholeDes, data: wholeData},
        {code: followCode, description: followDes, data: followData},
      ] = await getInitialData();

      if (wholeCode === 200) {
        if (wholeData?.length > 0) {
          setLastPostingId(wholeData[wholeData.length - 1]['_id']);
          setData(wholeData);
        }
        setLoading(false);
        setRefresh(false);
      } else throw {wholeCode, wholeDes};

      if (followCode === 200) {
        if (followData?.length > 0) {
          setLastPostingId2(followData[followData.length - 1]['_id']);
          setFollowingData(followData);
        }
        setLoading(false);
        setRefresh(false);
      } else throw {followCode, followDes};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 400 || error?.code === 403) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
      console.log('fetch initial feed list api error', error);
    }
  };

  const fetchMoreList = async (taste_id, menu) => {
    try {
      setSpinner(true);
      if (menu === 1) {
        const {code, description, data} = await getRecentFeed(taste_id);
        if (code === 200) {
          if (data?.length > 0) {
            setLastPostingId(data[data.length - 1]?._id);
            setData(prev => [...prev, ...data]);
          } else {
            setEndOfData(true);
          }
          setRefresh(false);
          setSpinner(false);
        } else throw {code, description};
      } else {
        const {code, description, data} = await getFollowFeed(taste_id);
        if (code === 200) {
          if (data?.length > 0) {
            setLastPostingId2(data[data.length - 1]?._id);
            setFollowingData(prev => [...prev, ...data]);
          } else {
            setEndOfData2(true);
          }
          setRefresh(false);
          setSpinner(false);
        } else throw {code, description};
      }
    } catch (error) {
      setSpinner(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 400 || error?.code === 403) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
      console.log('fetch more feed list api error', error);
    }
  };

  const handleRefresh = async () => {
    setRefresh(true);
    setData([]);
    setFollowingData([]);
    getInitialList();
  };

  const getNewPushFlag = async () => {
    try {
      const {pushFlag} = await getPushFlag();
      setIsNewPush(pushFlag === 1); // 1 = new push / 0 = no new push
    } catch (error) {
      console.log('get push flag api error', error);
      errorMsg(999, i18n.n('알람 상태를 업데이트할 수 없습니다'));
    }
  };

  useEffect(() => {
    if (params?.needRefresh) {
      setTrigger(Date.now());
      if (params?.needRefresh)
        navigation.setParams({
          needRefresh: false,
        });
    }
    const unsubscribe = navigation.addListener('focus', async () => {
      if (Platform.OS === 'android') StatusBar.setBackgroundColor('white');
      if (initial) {
        getInitialList();
        getNewPushFlag();
        setInitial(false);
      }
    });
    return unsubscribe;
  }, [trigger, navigation]);

  return (
    <HomePresenter
      data={data}
      loading={loading}
      onEndReached={onEndReached}
      refresh={refresh}
      handleRefresh={handleRefresh}
      goToWhere={goToWhere}
      isNewPush={isNewPush}
      setIsNewPush={setIsNewPush}
      showErrorPage={showErrorPage}
      setShowErrorPage={setShowErrorPage}
      setTrigger={setTrigger}
      spinner={spinner}
      menu={menu}
      setMenu={setMenu}
      followingData={followingData}
    />
  );
};

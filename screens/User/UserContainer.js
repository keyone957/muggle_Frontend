import React, {useState, useEffect, useCallback} from 'react';
import UserPresenter from './UserPresenter';
import {
  getUserDetail,
  getInitialCollect,
  FollowUnFollow,
  getNextCollect,
  getNextRecord,
} from '../../cleanedApi';
import {errorMsg, revokeThrottle} from '../../utilities';

export default ({
  route: {
    params: {uid},
  },
  navigation,
}) => {
  const [data, setData] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    nickname: '',
    instagramId: '',
    collect_num: 0,
    follower_num: 0,
    following_num: 0,
    intro: '',
  });
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [collects, setCollects] = useState([]);
  const [lastRecord, setLastRecord] = useState('');
  const [lastCollect, setLastCollect] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  const [endOfData2, setEndOfData2] = useState(false);

  const onEndReached = value => {
    if (loading) return;
    else {
      if ((value === '1' && !endOfData) || (value === '2' && !endOfData2)) {
        if (!spinner) fetchMore(value);
      }
    }
  };

  const getInitialData = uid => {
    return Promise.all([getUserDetail(uid), getInitialCollect(uid)]);
  };

  const getLoggedInUser = async () => {
    try {
      const [
        {code: detailCode, description: detailDes, data},
        {code: colCode, description: colDes, data: collects},
      ] = await getInitialData(uid);

      if (detailCode === 200) {
        setData(data);
        setRecords(data.mytaste);
        setLastRecord(data.mytaste[data.mytaste.length - 1]?._id);
      } else throw {code: detailCode, description: detailDes};

      if (colCode === 200) {
        setCollects(collects);
        setLastCollect(collects[collects.length - 1]?._id);
      } else throw {code: colCode, description: colDes};

      setLoading(false);
    } catch (error) {
      console.log('get user profile api error', error);
      setLoading(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 400 || error?.code === 403 || error?.code === 404) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  const fetchMore = async value => {
    try {
      setSpinner(true);
      let lastPostId = value === '1' ? lastRecord : lastCollect;
      if (value === '1') {
        const {
          code,
          description,
          data: resData,
        } = await getNextRecord(uid, lastPostId, value);
        if (code === 200) {
          if (resData?.length > 0) {
            setLastRecord(resData[resData.length - 1]?._id);
            setRecords(prev => [...prev, ...resData]);
          } else {
            setEndOfData(true);
          }
          setSpinner(false);
        } else throw {code, description};
      } else {
        const {
          code,
          description,
          data: resData,
        } = await getNextCollect(uid, lastPostId);
        if (code === 200) {
          if (resData?.length > 0) {
            setLastCollect(resData[resData.length - 1]?._id);
            setCollects(prev => [...prev, ...resData]);
          } else {
            setEndOfData2(true);
          }
          setSpinner(false);
        } else throw {code, description};
      }
    } catch (error) {
      console.log('fetch more posts api error', error);
      setSpinner(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 400 || error?.code === 403 || error?.code === 404) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getLoggedInUser();
  }, [uid, refresh]);

  const throttleHandler = useCallback(revokeThrottle(getLoggedInUser), []);

  const follow = async () => {
    try {
      setDisabled(true);
      const {code, description, followStatus} = await FollowUnFollow(
        uid,
        !data.followStatus,
      );
      if (code === 200) {
        setDisabled(false);
        setData(prev => ({
          ...prev,
          followStatus,
          follower_num: followStatus
            ? prev.follower_num + 1
            : prev.follower_num - 1,
        }));
        throttleHandler();
      } else throw {code, description};
    } catch (error) {
      console.log('follow func error', error);
      setDisabled(false);
      errorMsg(error?.code, error?.description);
      if (error?.code === 400 || error?.code === 403 || error?.code === 404) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  const goToWhere = (where, arg = {}) => navigation.push(where, arg);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const handleRefresh = async () => {
    setLoading(true);

    wait(1500).then(() => {
      getLoggedInUser();
      setLoading(false);
    });
  };
  return (
    <UserPresenter
      data={data}
      loading={loading}
      uid={uid}
      follow={follow}
      onEndReached={onEndReached}
      records={records}
      collects={collects}
      goToWhere={goToWhere}
      navigation={navigation}
      isDisabled={isDisabled}
      showErrorPage={showErrorPage}
      setShowErrorPage={setShowErrorPage}
      setRefresh={setRefresh}
      spinner={spinner}
      refresh={loading}
      handleRefresh={handleRefresh}
    />
  );
};

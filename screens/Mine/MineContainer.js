import React, {useState, useEffect} from 'react';
import MinePresenter from './MinePresenter';
import {
  getUserDetail,
  getInitialCollect,
  getNextCollect,
  getNextRecord,
} from '../../cleanedApi';
import {useValue} from '../../context';
import {errorMsg} from '../../utilities';

export default ({navigation}) => {
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
    birth: '',
    gender: '',
  });
  const [records, setRecords] = useState([]);
  const [collects, setCollects] = useState([]);
  const [lastRecord, setLastRecord] = useState('');
  const [lastCollect, setLastCollect] = useState('');
  const [loading, setLoading] = useState(true);
  const {login_uid} = useValue();
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
      ] = await getInitialData(login_uid);

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
      if (error?.code === 400 || error?.code === 403) {
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
        } = await getNextRecord(login_uid, lastPostId, value);
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
        } = await getNextCollect(login_uid, lastPostId);
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
      if (error?.code === 400 || error?.code === 403) {
        setShowErrorPage({code: error?.code, description: error?.description});
      }
    }
  };

  const goToWhere = (where, arg = {}) => navigation.navigate(where, arg);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLoggedInUser();
    });
    return unsubscribe;
  }, [navigation, refresh]);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const handleRefresh = async () => {
    setLoading(true);

    wait(1000).then(() => {
      getLoggedInUser();
      setLoading(false);
    });
  };

  return (
    <MinePresenter
      data={data}
      loading={loading}
      login_uid={login_uid}
      onEndReached={onEndReached}
      records={records}
      collects={collects}
      goToWhere={goToWhere}
      showErrorPage={showErrorPage}
      setShowErrorPage={setShowErrorPage}
      setRefresh={setRefresh}
      spinner={spinner}
      refresh={loading}
      handleRefresh={handleRefresh}
    />
  );
};

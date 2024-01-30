import React, {useState, useEffect} from 'react';
import {getPushHistory, getPushHistoryMore} from '../../cleanedApi';
import PushPresenter from './NotiPresenter';
import {errorMsg} from '../../utilities';

export default ({
  route: {
    params: {setIsNewPush},
  },
}) => {
  const [pushArr, setPushArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastId, setLastId] = useState();
  const [spinner, setSpinner] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

  const onEndReached = async () => {
    if (loading) return;
    else {
      if (!endOfData) {
        if (!spinner) getHisrotyMore();
      }
    }
  };

  const getHistory = async () => {
    try {
      const res = await getPushHistory();
      if (res?.length > 0) {
        setLastId(res[res.length - 1]['_id']);
        setPushArr(res);
      }
      setLoading(false);
    } catch (error) {
      errorMsg(999, "Can't fetch data");
      setLoading(false);
      console.log('get push history api error', error);
    }
  };

  const getHisrotyMore = async () => {
    try {
      setSpinner(true);
      const res = await getPushHistoryMore(lastId);
      if (res?.length > 0) {
        setLastId(res[res.length - 1]['_id']);
        setPushArr(prev => [...prev, ...res]);
      } else setEndOfData(true);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      errorMsg(999, "Can't fetch data more");
      console.log('get push history more api error', error);
    }
  };

  useEffect(() => {
    setIsNewPush(false);
    getHistory();
  }, []);

  return (
    <PushPresenter
      pushArr={pushArr}
      loading={loading}
      onEndReached={onEndReached}
      spinner={spinner}
    />
  );
};

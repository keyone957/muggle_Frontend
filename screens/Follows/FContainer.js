import React, {useState, useEffect} from 'react';
import FPresenter from './FPresenter';
import {getFollowList} from '../../cleanedApi';
import {errorMsg} from '../../utilities';

export default ({
  route: {
    params: {uid, value, title},
  },
  navigation,
}) => {
  const [followersList, setFList] = useState([]);
  const [lastId, setLastId] = useState('');
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

  const onEndReached = async () => {
    if (loading) return;
    else {
      if (!endOfData) {
        if (!spinner) getFollowers('2');
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title,
    });
    getFollowers('1');
  }, [navigation, uid]);

  const getFollowers = async choice => {
    try {
      if (choice === '2') setSpinner(true);
      const {
        code,
        description,
        data: {followStatus, list},
      } = await getFollowList(uid, lastId, choice, value);
      if (code === 200) {
        if (list?.length > 0) {
          list.map((item, index) => (item.status = followStatus[index]));
          setFList(prev => [...prev, ...list]);
          setLastId(list[list.length - 1]?.uid);
        } else setEndOfData(true);
        setLoading(false);
        setSpinner(false);
      } else throw {code, description};
    } catch (error) {
      errorMsg(error?.code, error?.description);
      setLoading(false);
      setSpinner(false);
      console.log(`${title} follow list api error`, error);
    }
  };

  return (
    <FPresenter
      followersList={followersList}
      loading={loading}
      onEndReached={onEndReached}
      spinner={spinner}
    />
  );
};

import React, {useState, useEffect} from 'react';
import HashPresenter from './HashPresenter';
import {searchHash, searchHashMore} from '../../cleanedApi';
import {errorMsg} from '../../utilities';

export default ({
  route: {
    params: {hash},
  },
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lastPostingId, setLastPostingId] = useState('');

  const onEndReached = () => {
    if (loading) return;
    else {
      fetchMore(lastPostingId);
    }
  };

  const searchByHash = async () => {
    try {
      setLoading(true);
      const {code, description, data} = await searchHash(hash);
      if (code === 200) {
        if (data?.length > 0) {
          setData(data);
          setLastPostingId(data[data.length - 1]['_id']);
        }
        setLoading(false);
      } else throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(999, "Can't search Hash");
      navigation.goBack();
      console.log('search hash api error', error);
    }
  };

  const fetchMore = async lastPostingId => {
    try {
      const res = await searchHashMore(hash, lastPostingId);
      if (res?.length > 0) {
        setLastPostingId(res[res.length - 1]?._id);
        setData(prev => [...prev, ...res]);
      }
    } catch (error) {
      errorMsg(999, "Can't search more");
      console.log('fetch hash data api error', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `#${hash}`,
    });
    searchByHash();
  }, [navigation, hash]);

  return (
    <HashPresenter loading={loading} data={data} onEndReached={onEndReached} />
  );
};

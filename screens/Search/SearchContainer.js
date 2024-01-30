import React, {useState, useEffect} from 'react';
import SearchPresenter from './SearchPresenter';
import {searchAll} from '../../cleanedApi';
import {errorMsg} from '../../utilities';
import i18n from '../../i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation}) => {
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(false);
  const [all, setALL] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState(i18n.t('다양한 음식을 검색해보세요!'));
  const [recentTerms, setRecentTerms] = useState([]);
  const maxRecentTerms = 10;

  const onEndReached = () => {};

  const storeRecentTerm = async term => {
    try {
      if (!recentTerms.includes(term)) {
        let newTerms;
        setRecentTerms(prev => {
          let oldTerms = [...prev];
          if (oldTerms.length + 1 > maxRecentTerms) {
            oldTerms.pop();
          }
          newTerms = [term, ...oldTerms];
          return newTerms;
        });
        await AsyncStorage.setItem('@search', newTerms.toString());
      }
    } catch (e) {
      console.log('store terms error', e);
    }
  };

  const getRecentTerms = async () => {
    try {
      const termsStr = await AsyncStorage.getItem('@search');
      if (termsStr) {
        const termsArr = termsStr.split(',');
        setRecentTerms(termsArr);
      }
    } catch (e) {
      console.log('store terms error', e);
    }
  };

  const removeRecentTerm = async deletingIndex => {
    try {
      const removed = recentTerms.filter(
        (item, index) => index !== deletingIndex,
      );
      setRecentTerms(removed);
      await AsyncStorage.setItem('@search', removed.toString());
    } catch (error) {
      console.log('remove a term error', error);
    }
  };

  const removeAllTerms = async () => {
    try {
      await AsyncStorage.removeItem('@search');
      setRecentTerms([]);
    } catch (error) {
      console.log('remove all terms error', error);
    }
  };

  useEffect(() => {
    getRecentTerms();
  }, []);

  const searchByTerm = async recentTerm => {
    try {
      const searching = recentTerm ? recentTerm : term;
      if (searching.trim().length === 0) throw 'empty';
      setLoading(true);
      const {tags, user_filter1, user_filter2, user_filter3} = await searchAll(
        searching,
        1,
      );
      storeRecentTerm(searching);
      setALL([...tags, ...user_filter1, ...user_filter2, ...user_filter3]);
      if (all.length === 0) setMsg(i18n.t('이런! 아무 결과도 없네요 😅'));
      setTags(tags);
      setUsers([...user_filter1, ...user_filter2, ...user_filter3]);
      setLoading(false);
    } catch (error) {
      if (error === 'empty') {
        // toastMsg(i18n.t('검색어를 입력해주세요!'));
        setALL([]);
        setTags([]);
        setUsers([]);
        setTerm('');
        setMsg(i18n.t('다양한 음식을 검색해보세요!'));
      } else {
        setLoading(false);
        errorMsg(999, "Can't search");
      }
      console.log('searchAll api error', error);
    }
  };

  return (
    <SearchPresenter
      term={term}
      setTerm={setTerm}
      all={all}
      tags={tags}
      users={users}
      searchByTerm={searchByTerm}
      loading={loading}
      onEndReached={onEndReached}
      value={value}
      setValue={setValue}
      msg={msg}
      recentTerms={recentTerms}
      removeRecentTerm={removeRecentTerm}
      removeAllTerms={removeAllTerms}
      goBack={() => navigation.goBack()}
    />
  );
};

import React, {useState, useEffect} from 'react';
import CoPresenter from './CoPresenter';
import {readComments, addComment} from '../../cleanedApi';
import {errorMsg} from '../../utilities';

export default ({
  route: {
    params: {taste_id},
  },
}) => {
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState('');
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [login_id, setLoginId] = useState();
  const [refresh, setRefresh] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

  const onEndReached = async () => {
    if (loading) return;
    else {
      if (!endOfData) {
        if (!spinner) {
          getList('2');
        }
      }
    }
  };

  const getList = async choice => {
    try {
      if (choice === '2') setSpinner(true);
      const {
        code,
        description,
        data: {comment, login_id},
      } = await readComments(taste_id, choice, lastId);
      if (code === 200) {
        if (comment?.length > 0) {
          if (choice === '1') setLoginId(login_id);
          setData(prev => [...prev, ...comment]);
          setLastId(comment[comment.length - 1]?._id);
        } else setEndOfData(true);
        setSpinner(false);
        setLoading(false);
      } else throw {code, description};
    } catch (error) {
      errorMsg(error?.code, error?.description);
      setLoading(false);
      setSpinner(false);
      console.log('get comments list api error', error);
    }
  };

  const writeComment = async text => {
    try {
      setLoading(true);
      const {code, description} = await addComment(text, taste_id);
      if (code === 200) {
        setText('');
        setData([]);
        setLastId('');
        setRefresh(Date.now());
      } else throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      console.log('add a comment api eror', error);
    }
  };

  useEffect(() => {
    if (endOfData) setEndOfData(false);
    getList('1');
  }, [refresh]);

  return (
    <CoPresenter
      data={data}
      taste_id={taste_id}
      login_id={login_id}
      loading={loading}
      setLoading={setLoading}
      onEndReached={onEndReached}
      text={text}
      setText={setText}
      writeComment={writeComment}
      setData={setData}
      setRefresh={setRefresh}
      spinner={spinner}
    />
  );
};

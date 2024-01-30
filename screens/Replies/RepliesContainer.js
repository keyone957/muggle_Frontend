import React, {useState, useEffect} from 'react';
import RepliesPresenter from './RepliesPresenter';
import {readRelies, addReply} from '../../cleanedApi';
import {errorMsg} from '../../utilities';
import {deleteComment, likeComment} from '../../cleanedApi';

export default ({
  route: {
    params: {
      setLoading: setOwnerLoading,
      setData: setOwnerData,
      setRefresh: setOwnerRefresh,
      comment_id,
      login_uid,
      creator,
      text: ownerText,
      count_li,
      count_reco,
      createdAt,
      value,
    },
  },
  navigation,
}) => {
  const [owner, setOwner] = useState({
    comment_id,
    login_uid,
    creator,
    ownerText,
    count_li,
    count_reco,
    createdAt,
    value, // 내가 좋아요 눌렀는지 안 눌렀는지 상태값
  });
  const [replies, setReplies] = useState([]);
  const [lastId, setLastId] = useState('');
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [loginID, setLoginID] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [revalue, setRevalue] = useState(value);
  const [likeNum, setLikeNum] = useState(count_li);
  const [isDisabled, setDisabled] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

  const onEndReached = async () => {
    if (loading) return;
    else {
      if (!endOfData) {
        if (!spinner) getList('2');
      }
    }
  };

  const writeReply = async recomment => {
    try {
      setLoading(true);
      const {code, description} = await addReply(recomment, comment_id);
      if (code === 200) {
        setText('');
        setReplies([]);
        setLastId('');
        setRefresh(Date.now());
      } else throw {code, description};
    } catch (error) {
      setLoading(false);
      errorMsg(error?.code, error?.description);
      console.log('add a reply api eror', error);
    }
  };

  const getList = async choice => {
    try {
      if (choice === '2') setSpinner(true);
      const {
        code,
        description,
        data: {recomment, login_id},
      } = await readRelies(comment_id, choice, lastId);
      if (code === 200) {
        if (recomment?.length > 0) {
          if (choice === '1') setLoginID(login_id);
          setReplies(prev => [...prev, ...recomment]);
          setLastId(recomment[recomment.length - 1]?._id);
        } else setEndOfData(true);
        setLoading(false);
        setSpinner(false);
      } else throw {code, description};
    } catch (error) {
      errorMsg(error?.code, error?.description);
      setLoading(false);
      setSpinner(false);
      console.log('get replies list api error', error);
    }
  };

  useEffect(() => {
    if (endOfData) setEndOfData(false);
    getList('1');
  }, [refresh]);

  const pressLike = async () => {
    try {
      setDisabled(true);
      const {code} = await likeComment(comment_id, revalue);
      if (code === 200) {
        if (revalue === 1) {
          setRevalue(0);
          setLikeNum(likeNum + 1);
        } else if (revalue === 0) {
          setRevalue(1);
          setLikeNum(likeNum - 1);
        }
        setOwnerLoading(true);
        setOwnerData([]);
        setOwnerRefresh(Date.now());
        setDisabled(false);
      }
    } catch (error) {
      console.log('press a comment like api error', error);
    }
  };

  const deleteOwerComment = async () => {
    try {
      const {code} = await deleteComment(comment_id);
      if (code === 200) {
        setModalVisible(false);
        setOwnerData([]);
        setOwnerRefresh(Date.now());
        navigation.goBack();
      }
    } catch (error) {
      console.log('deleting a comment api error', error);
      setModalVisible(false);
      errorMsg(error?.code, error?.description);
    }
  };

  return (
    <RepliesPresenter
      setOwnerLoading={setOwnerLoading}
      setOwnerData={setOwnerData}
      setOwnerRefresh={setOwnerRefresh}
      login_id={loginID}
      loading={loading}
      setLoading={setLoading}
      owner={owner}
      replies={replies}
      text={text}
      setText={setText}
      writeReply={writeReply}
      onEndReached={onEndReached}
      setReplies={setReplies}
      setRefresh={setRefresh}
      navigation={navigation}
      pressLike={pressLike}
      deleteOwerComment={deleteOwerComment}
      isModalVisible={isModalVisible}
      isDisabled={isDisabled}
      setModalVisible={setModalVisible}
      revalue={revalue}
      likeNum={likeNum}
      spinner={spinner}
    />
  );
};

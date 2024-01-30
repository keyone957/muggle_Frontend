import React, {useState, useRef, useCallback} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import {FlatList} from 'react-native';
import CardFeed from './CardFeed';
import Thumbnail from './Thumbnail';
import FollowUser from './FollowUser';
import Comment from './Comment';
import Reply from './Reply';
import PushNoti from './PushNoti';
import Searched from './Searched';
import {Spinner} from './Loaders/Loader';

export const HomeFeedlList = ({
  data,
  onEndReached,
  loading,
  refresh,
  handleRefresh,
  ListEmptyComponent,
  ListHeaderComponent,
}) => {
  const ref = useRef(null);
  useScrollToTop(ref);
  const renderItem = useCallback(({item}) => <CardFeed item={item} />, []);
  const keyExtractor = useCallback(item => String(item['_id']), []);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data}
      ref={ref}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      ListFooterComponent={loading && <Spinner />}
      refreshing={refresh}
      onRefresh={handleRefresh}
      disableVirtualization={false}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      windowSize={3}
      removeClippedSubviews={true}
      ListHeaderComponent={ListHeaderComponent}
      initialNumToRender={3}
    />
  );
};

export const ThumbnailList = ({
  data,
  onEndReached,
  loading,
  refresh,
  handleRefresh,
  ListHeaderComponent,
  ListEmptyComponent,
}) => {
  const ref = useRef(null);
  useScrollToTop(ref);
  const renderItem = useCallback(({item}) => <Thumbnail item={item} />, []);
  const keyExtractor = useCallback(item => String(item['_id']), []);
  const [callEndReached, setEndReached] = useState(false);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data}
      ref={ref}
      onMomentumScrollBegin={() => setEndReached(true)}
      onEndReached={() => {
        // if (callEndReached) {
        //   onEndReached();
        //   setEndReached(false);
        // }
        onEndReached();
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Spinner />}
      refreshing={refresh}
      onRefresh={handleRefresh}
      disableVirtualization={false}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
      // initialNumToRender={4}
      windowSize={3}
    />
  );
};

export const FollowList = ({
  data,
  onEndReached,
  loading,
  ListEmptyComponent,
}) => {
  const renderItem = useCallback(({item}) => <FollowUser item={item} />, []);
  const keyExtractor = useCallback(item => String(item['_id']), []);
  const [callEndReached, setEndReached] = useState(false);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data}
      onMomentumScrollBegin={() => setEndReached(true)}
      onEndReached={() => {
        // if (callEndReached) {
        //   onEndReached();
        //   setEndReached(false);
        // }
        onEndReached();
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Spinner />}
      disableVirtualization={false}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
    />
  );
};

export const CommentList = ({
  comments,
  taste_id,
  login_id,
  setLoading,
  setRefresh,
  onEndReached,
  loading,
  setData,
  ListEmptyComponent,
}) => {
  const renderItem = useCallback(
    ({item}) => (
      <Comment
        comment={item}
        taste_id={taste_id}
        login_id={login_id}
        setLoading={setLoading}
        setRefresh={setRefresh}
        setData={setData}
      />
    ),
    [],
  );
  const keyExtractor = useCallback(comment => String(comment['_id']), []);
  const [callEndReached, setEndReached] = useState(false);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={comments}
      onMomentumScrollBegin={() => setEndReached(true)}
      onEndReached={() => {
        // if (callEndReached) {
        //   onEndReached();
        //   setEndReached(false);
        // }
        onEndReached();
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Spinner />}
      disableVirtualization={false}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
    />
  );
};

export const ReplyList = ({
  replies,
  comment_id,
  login_id,
  loading,
  setLoading,
  onEndReached,
  setReplies,
  setRefresh,
  ListEmptyComponent,
  ListHeaderComponent,
}) => {
  const renderItem = useCallback(
    ({item}) => (
      <Reply
        reply={item}
        comment_id={comment_id}
        login_id={login_id}
        setLoading={setLoading}
        setReplies={setReplies}
        setRefresh={setRefresh}
      />
    ),
    [],
  );
  const keyExtractor = useCallback(comment => String(comment['_id']), []);
  const [callEndReached, setEndReached] = useState(false);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={replies}
      // onMomentumScrollBegin={() => setEndReached(true)}
      onEndReached={() => {
        // if (callEndReached) {
        //   onEndReached();
        //   setEndReached(false);
        // }
        onEndReached();
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Spinner />}
      disableVirtualization={false}
      renderItem={renderItem}
      // ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export const PushList = ({
  loading,
  pushArr,
  onEndReached,
  ListEmptyComponent,
}) => {
  const renderItem = useCallback(
    ({item}) => <PushNoti notification={item} />,
    [],
  );
  const keyExtractor = useCallback(item => item.createdAt, []);
  // const [callEndReached, setEndReached] = useState(false);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={pushArr}
      // onMomentumScrollBegin={() => setEndReached(true)}
      onEndReached={() => {
        // if (callEndReached) {
        //   onEndReached();
        //   setEndReached(false);
        // }
        onEndReached();
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Spinner />}
      disableVirtualization={false}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
    />
  );
};

export const SearchList = ({all, tags, users, value, loading}) => {
  const renderItem = useCallback(({item}) => <Searched arr={item} />, []);
  const keyExtractor = useCallback(item => item['_id'], []);
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      keyExtractor={keyExtractor}
      data={value === '1' ? all : value === '2' ? tags : users}
      ListFooterComponent={loading && <Spinner />}
      disableVirtualization={false}
      renderItem={renderItem}
      removeClippedSubviews={true}
    />
  );
};

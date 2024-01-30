import React from 'react';
import styled from 'styled-components/native';
import {FollowList} from '../../components/Lists';
import i18n from '../../i18n/i18n';
import FollowLoader from '../../components/Loaders/Follow/FollowLoader';

const Container = styled.View`
  background-color: #f9f3f1;
  flex: 1;
  padding-bottom: 30px;
`;

const Nothing = styled.Text`
  text-align: center;
  font-size: 16px;
  color: rgb(112, 112, 112);
  margin-top: 80%;
`;

export default ({followersList, loading, onEndReached, spinner}) => {
  return loading ? (
    <FollowLoader />
  ) : (
    <Container>
      <FollowList
        data={followersList}
        onEndReached={onEndReached}
        loading={spinner}
        ListEmptyComponent={<Nothing>{i18n.t('아무도 없어요 👻')}</Nothing>}
      />
    </Container>
  );
};

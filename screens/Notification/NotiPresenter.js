import React from 'react';
import styled from 'styled-components/native';
import {PushList} from '../../components/Lists';
import i18n from '../../i18n/i18n';
import NotiLoader from '../../components/Loaders/Notification/NotiLoader';

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

export default ({loading, pushArr, onEndReached, spinner}) =>
  loading ? (
    <NotiLoader />
  ) : (
    <Container>
      <PushList
        loading={spinner}
        pushArr={pushArr}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <Nothing>{i18n.t('아무 알람도 없어요 📭')}</Nothing>
        }
      />
    </Container>
  );

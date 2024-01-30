import React from 'react';
import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DefaultAvatar from './DefaultAvatar';
import {dateAgoFormat} from '../utilities';

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  width: 100%;
  padding: 0 20px;
`;

const Line = styled.View`
  width: 100%;
  border: 0.5px solid lightgray;
  margin-bottom: 15px;
`;

const Avatar = styled.TouchableOpacity`
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 0.1px solid black;
`;

const Message = styled.TouchableOpacity`
  margin-left: 10px;
`;

const Text = styled.Text`
  font-size: ${props => (props.date ? 13 : props.title ? 13 : 15)}px;
  color: ${props =>
    props.date
      ? 'rgba(152, 152, 152, 0.7)'
      : props.title
      ? 'rgb(24, 76, 95)'
      : 'rgb(112, 112, 112)'};
  font-weight: ${props => (props.title ? 'bold' : 500)};
  margin-top: ${props => (props.date ? 8 : 0)}px; ;
`;

export default ({notification}) => {
  const {createdAt, description, order, sender_id} = notification;
  const item = {
    count_bo: order.count_bo,
    count_co: order.count_co,
    count_li: order.count_li,
    title: order.title,
    creator: {
      uid: order.creator._id,
      avatar: '',
      firstName: order.creator.firstName,
      lastName: order.creator.lastName,
    },
    hash: [],
    createdAt,
    _id: order._id,
    thumbnail: '',
    description: '',
  };
  const {avatar, uid} = sender_id;
  const navigation = useNavigation();
  const goToUserProfile = () => navigation.navigate('User', {uid});
  const goToDetail = () => navigation.navigate('Detail', {item});
  const goTo404 = () =>
    navigation.navigate('ErrorPage', {
      code: 404,
      description: 'Not Found',
      showBackArrow: false,
    });

  return (
    <>
      <Container>
        {avatar ? (
          <TouchableOpacity onPress={goToUserProfile}>
            <Image
              source={{uri: avatar}}
              style={{
                width: 44,
                height: 44,
                borderRadius: 18,
              }}
            />
          </TouchableOpacity>
        ) : (
          <Avatar onPress={goToUserProfile}>
            <DefaultAvatar uid={uid} width={35} height={35} />
          </Avatar>
        )}
        <Message
          onPress={
            (order ? order.delete_col : 0) === 1
              ? goTo404
              : (order ? order.delete_col : 1) === 1
              ? goToUserProfile
              : goToDetail
          }>
          <Text>{description}</Text>
          <Text date={true}> {dateAgoFormat(createdAt)}</Text>
        </Message>
      </Container>
      <Line />
    </>
  );
};

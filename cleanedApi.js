import axios from 'axios';
import {Platform} from 'react-native';

const api = axios.create({
  baseURL: 'https://muggl.cc/',
  withCredentials: true,
});

const postReqForm = async (req, address, formData = false) => {
  const {data} = await api.post(address, formData ? req : JSON.stringify(req), {
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    },
  });
  return data;
};

// session
export const issueJWTtoken = (idToken, uid, locale, pushToken) =>
  postReqForm(
    {
      idToken,
      uid,
      locale,
      pushToken,
    },
    '/api/login',
  ); // ✅

export const refereshSessionCookie = (idToken, uid, locale, pushToken) =>
  postReqForm(
    {
      idToken,
      uid,
      locale,
      pushToken,
    },
    '/api/createSession',
  );

// User
export const createUser = (phoneNumber, firstName, lastName, nickname) =>
  postReqForm(
    {
      phoneNumber,
      firstName,
      lastName,
      nickname,
    },
    '/getuserinfo',
  ); // ✅

export const checkUserCreated = () => postReqForm({}, '/userinfo-depth'); // ✅

// Firebase push notification
export const fcmTokenUpdate = (pushToken, locale) =>
  postReqForm({pushToken, locale}, '/users/push-token'); // ✅

export const expireFcmToken = pushToken =>
  postReqForm({pushToken}, '/api/logout'); // ✅

// Edit Profile
export const editProfile = (
  firstName,
  nickname,
  lastName,
  avatar,
  intro,
  instagramId,
  gender,
  birth,
  isAvatarChanged,
) => {
  let formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('nickname', nickname);
  formData.append('lastName', lastName);
  formData.append('intro', intro);
  formData.append('instagramId', instagramId);
  formData.append('gender', gender);
  formData.append('birth', birth);
  if (avatar !== '' && isAvatarChanged) {
    let imgFile = {
      name: avatar,
      type: 'image/*',
      uri: Platform.OS === 'android' ? avatar : avatar.replace('file://', ''),
    };
    formData.append('avatar', imgFile);
  }
  return postReqForm(formData, '/users/edit-profile', true);
}; // ✅

export const deleteAvatar = () => postReqForm({}, '/api/delete-avatar'); // ✅

// Follow
export const getFollowList = (uid, last_uid, choice, value) =>
  postReqForm({uid, last_uid, choice, value}, '/users/follow-list'); // ✅

// User
export const getUserDetail = uid => postReqForm({uid}, '/users/user-detail'); // ✅

export const getInitialCollect = uid =>
  postReqForm({uid}, '/users/user-collect'); // ✅

export const getNextCollect = (uid, taste_id) =>
  postReqForm({uid, taste_id}, '/users/user-collect'); // ✅

export const getNextRecord = (uid, last_taste_id, value) =>
  postReqForm({uid, last_taste_id, value}, '/users/user-next'); // ✅

// Post
export const createPost = (
  title,
  description,
  hash,
  mediaArr,
  link,
  location,
) => {
  let formData = new FormData();
  formData.append('title', title);
  if (description !== '') formData.append('description', description);
  formData.append('hash', hash);
  if (link !== '') formData.append('link', link);
  if (location !== '') formData.append('location', location);
  if (mediaArr.length > 0) {
    mediaArr.map(media => {
      let file = {
        name: media.uri,
        type: `${media.type}/*`,
        uri:
          Platform.OS === 'android'
            ? media.uri
            : media.uri.replace('file://', ''),
      };
      formData.append('media', file);
    });
  }
  return postReqForm(formData, '/taste/upload', true);
}; // ✅

export const getPostDetail = taste_id =>
  postReqForm({taste_id}, '/taste/taste-detail'); // ✅

export const updatePost = (
  taste_id,
  title,
  description,
  hash,
  link,
  location,
) =>
  postReqForm(
    {taste_id, title, description, hash, link, location},
    '/taste/update-taste',
  ); // ✅

export const checkPostLike = (taste_id, likeStatus) =>
  postReqForm({taste_id, likeStatus}, '/api/like'); // ✅

// Comments & Replies
export const readComments = (taste_id, choice, last_comment_id) =>
  postReqForm({taste_id, choice, last_comment_id}, '/taste/read-comment'); // ✅

export const readRelies = (comment_id, choice, recomment_id) =>
  postReqForm({comment_id, choice, recomment_id}, '/taste/read-recomment'); // ✅

// Home Feed
export const getInitialFeed = () => postReqForm({}, '/taste/recent');

export const getRecentFeed = (taste_id, size = 10) =>
  postReqForm({taste_id, size}, '/taste/recent');

export const getInitialFollow = () => postReqForm({}, '/taste/getFollowing');

export const getFollowFeed = (taste_id, size = 10) =>
  postReqForm({taste_id, size}, '/taste/getFollowing');

// Hash
export const getAutoHashCompleted = keyword =>
  postReqForm({keyword}, '/taste/autoCompleteHashTag');

/////// Uncleaded Yet ///////

export const FollowUnFollow = (uid, followStatus) =>
  postReqForm({uid, followStatus}, '/api/follow'); // ✅

export const checkBookmark = (taste_id, bookmarkStatus) =>
  postReqForm({taste_id, bookmarkStatus}, '/api/bookmark'); // ✅

export const addComment = (comment, taste_id) =>
  postReqForm({comment, taste_id}, '/taste/add-comment'); // ✅

export const addReply = (recomment, comment_id) =>
  postReqForm({recomment, comment_id}, '/taste/add-recomment'); // ✅

export const deleteComment = comment_id =>
  postReqForm({comment_id}, '/api/goodbye-comment'); // ✅

export const deleteReply = (comment_id, recomment_id) =>
  postReqForm({comment_id, recomment_id}, '/api/goodbye-recomment'); // ✅

export const deleteCardSecond = taste_id =>
  postReqForm({taste_id}, '/api/goodbye-taste'); // ✅

export const reportCard = (taste_id, text) =>
  postReqForm({taste_id, text}, '/api/report'); // ✅

export const likeComment = (comment_id, value) =>
  postReqForm({comment_id, value}, '/api/like-comment'); // ✅

export const likeReply = (recomment_id, value) =>
  postReqForm({recomment_id, value}, '/api/like-recomment'); // ✅

export const deleteUser = () => postReqForm({}, '/api/goodbye-user'); // ✅

export const checkNickName = nickname =>
  postReqForm({nickname}, '/api/nickname-check'); // ✅

export const searchAll = (search, value) =>
  postReqForm({search, value}, '/api/search'); // ✅

export const searchHash = hash => postReqForm({hash}, '/api/hashtag'); // ✅

export const searchHashMore = (hash, taste_id) =>
  postReqForm({hash, taste_id}, '/api/hashtag2'); // ✅

export const getPushHistory = () => postReqForm({}, '/users/push-history'); // ✅

export const getPushHistoryMore = push_id =>
  postReqForm({push_id}, '/users/push-history-more'); // ✅

export const getPushFlag = () => postReqForm({}, '/users/push-flag'); // ✅

export const versionCheck = client_version =>
  postReqForm({client_version}, '/api/version'); // ✅

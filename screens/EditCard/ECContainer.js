import React, {useState} from 'react';
import ECPresenter from './ECPresenter';
import {updatePost} from '../../cleanedApi';
import {errorMsg} from '../../utilities';

export default ({
  route: {
    params: {taste_id, title, description, hash, link, location, setRefresh},
  },
  navigation,
}) => {
  const initialObj = {
    taste_id,
    title,
    description: description === undefined ? '' : description,
    hash: hash.length > 0 ? `#${hash.join('#')}` : '',
    link,
    location,
  };
  const [cardInfo, setInfo] = useState(initialObj);
  const [isDisabled, setDisabled] = useState(true);

  const sendEditInfo = async () => {
    try {
      setDisabled(null);
      const {taste_id, title, description, hash, link, location} = cardInfo;
      const {code, description: errorDes} = await updatePost(
        taste_id,
        title,
        description,
        hash,
        link,
        location,
      );
      if (code === 200) {
        setRefresh(Date.now());
        navigation.goBack();
      } else throw {code, description: errorDes};
    } catch (error) {
      setDisabled(false);
      errorMsg(error?.code, error?.description);
      console.log('send edit api2 error', error);
    }
  };

  return (
    <ECPresenter
      cardInfo={cardInfo}
      setInfo={setInfo}
      sendEditInfo={sendEditInfo}
      isDisabled={isDisabled}
      setDisabled={setDisabled}
      initialObj={initialObj}
    />
  );
};

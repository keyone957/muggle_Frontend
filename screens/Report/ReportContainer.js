import React, {useState} from 'react';
import ReportPresenter from './ReportPresenter';
import {reportCard} from '../../cleanedApi';
import i18n from '../../i18n/i18n';
import {errorMsg, toastMsg} from '../../utilities';

export default ({
  route: {
    params: {taste_id, title},
  },
}) => {
  const [text, setText] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const sendReport = async () => {
    try {
      setDisabled(null);
      const {code, description} = await reportCard(taste_id, text);
      if (code === 200) {
        setText('');
        setDisabled(true);
        toastMsg(
          `${i18n.t('📩 신고 접수')}\n${i18n.t(
            '성공적으로 신고가 접수되었습니다!',
          )}`,
        );
      } else throw {code, description};
    } catch (error) {
      setDisabled(false);
      errorMsg(error?.code, error?.description);
      console.log('send a report api error', error);
    }
  };

  const onChangeText = typing => {
    setText(typing);
    if (typing.trim().length !== 0) setDisabled(false);
    else setDisabled(true);
  };

  return (
    <ReportPresenter
      title={title}
      text={text}
      onChangeText={onChangeText}
      sendReport={sendReport}
      isDisabled={isDisabled}
    />
  );
};

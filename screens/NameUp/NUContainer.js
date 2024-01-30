import React, {useState} from 'react';
import NUPresenter from './NUPresenter';
import i18n from '../../i18n/i18n';

export default ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstWarning, setFirstWarning] = useState(true);
  const [lastWarning, setLastWarning] = useState(true);

  const onChangeFirst = text => {
    if (text?.length < 1 || text === ' ')
      setFirstWarning(i18n.t('최소 한 자 이상 입력해주세요'));
    else setFirstWarning(null);
    text = text.replace(/\s/g, '').replace(/[^A-Za-z^ㄱ-ㅎ^가-힣]/g, '');
    setFirstName(text);
  };

  const onChangeLast = text => {
    if (text?.length < 1 || text === ' ')
      setLastWarning(i18n.t('최소 한 자 이상 입력해주세요'));
    else setLastWarning(null);
    text = text.replace(/\s/g, '').replace(/[^A-Za-z^ㄱ-ㅎ^가-힣]/g, '');
    setLastName(text);
  };

  const goToNext = () => {
    navigation.navigate('NickNameUp', {
      phoneNumber,
      firstName,
      lastName,
    });
  };

  return (
    <NUPresenter
      goToNext={goToNext}
      onChangeFirst={onChangeFirst}
      onChangeLast={onChangeLast}
      lastName={lastName}
      firstName={firstName}
      lastWarning={lastWarning}
      firstWarning={firstWarning}
    />
  );
};

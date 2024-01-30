import * as React from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import en from './locales/en';
import ko from './locales/ko';

i18n.locale = RNLocalize.getLocales()[0].languageTag;

i18n.translations = {en, ko};

i18n.fallbacks = true;

export default i18n;

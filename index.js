/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {setBackgroundMsgHandler} from './fireModules';
import {Text} from 'react-native';

setBackgroundMsgHandler();

function HeadlessCheck({isHeadless}) {
  return isHeadless ? null : <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

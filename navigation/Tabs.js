import React, {useLayoutEffect} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Mine from '../screens/Mine';
import Upload from '../screens/Upload';
import OthersColor from '../assets/Others-color.svg';
import OthersGrey from '../assets/Others-grey.svg';
import UploadGrey from '../assets/Upload-grey.svg';
import UploadColor from '../assets/Upload-color.svg';
import MyGrey from '../assets/My-grey.svg';
import MyColor from '../assets/My-color.svg';
import i18n from '../i18n/i18n';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Detail from '../screens/Detail';
import {CardStyleInterpolators} from '@react-navigation/stack';

const Tabs = createBottomTabNavigator();

const HomeStack = createSharedElementStackNavigator();
const HomeStackScreen = ({navigation, route}) => {
  useLayoutEffect(() => {
    if (navigation.getState().routes[0]?.state?.index === 1) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);
  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          backgroundColor: 'rgb(249, 243, 241)',
        },
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="Detail"
        component={Detail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          tabBarVisible: false,
        }}
        sharedElements={(route, otherRoute, showing) => {
          return [
            {
              id: `media${route.params.item._id}`,
              animation: 'fade',
              resize: 'auto',
            },
            {
              id: `text${route.params.item._id}`,
              animation: 'fade',
              resize: 'auto',
            },
          ];
        }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStack = createSharedElementStackNavigator();
const ProfileStackScreen = ({navigation, route}) => {
  useLayoutEffect(() => {
    if (navigation.getState().routes[2]?.state?.index === 1) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          backgroundColor: 'rgb(249, 243, 241)',
        },
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <ProfileStack.Screen
        name="Mine"
        component={Mine}
        options={{tabBarVisible: false}}
      />
      <ProfileStack.Screen
        name="Detail"
        component={Detail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          tabBarVisible: false,
        }}
        sharedElements={(route, otherRoute, showing) => {
          return [
            {
              id: `media${route.params.item._id}`,
              animation: 'fade',
              // resize: 'auto',
            },
            {
              id: `text${route.params.item._id}`,
              animation: 'fade',
              // resize: 'auto',
            },
          ];
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (route.name === i18n.t('머글 세상')) {
            if (focused) {
              return <OthersColor height={28} width={44} />;
            } else {
              return <OthersGrey height={28} width={44} />;
            }
          } else if (route.name === i18n.t('기록하기')) {
            if (focused) {
              return <UploadColor height={28} width={44} />;
            } else {
              return <UploadGrey height={28} width={44} />;
            }
          } else if (route.name === i18n.t('마이 페이지')) {
            if (focused) {
              return <MyColor height={28} width={44} />;
            } else {
              return <MyGrey height={28} width={44} />;
            }
          }
        },
        keyboardHidesTabBar: true,
        tabBarActiveTintColor: 'rgb(24, 76, 95)',
        style: {
          backgroundColor: 'white',
          height: Platform.OS === 'ios' ? '10%' : '7%',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          elevation: 2,
        },
        labelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
        tabStyle: {
          paddingVertical: 5,
        },
      })}>
      <Tabs.Screen name={i18n.t('머글 세상')} component={HomeStackScreen} />
      <Tabs.Screen name={i18n.t('기록하기')} component={Upload} />
      <Tabs.Screen
        name={i18n.t('마이 페이지')}
        component={ProfileStackScreen}
      />
    </Tabs.Navigator>
  );
};

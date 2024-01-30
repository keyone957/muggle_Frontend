import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import Tabs from './Tabs';
import Splash from '../screens/Splash';
import Detail from '../screens/Detail';
import Comments from '../screens/Comments';
import Follows from '../screens/Follows';
import User from '../screens/User';
import EditProfile from '../screens/EditProfile';
import EditCard from '../screens/EditCard';
import Replies from '../screens/Replies';
import SMSLogin from '../screens/SMSLogin';
import NameUp from '../screens/NameUp';
import NickNameUp from '../screens/NickNameUp';
import Report from '../screens/Report';
import UserSetting from '../screens/UserSetting';
import DeleteUser from '../screens/DeleteUser';
import Search from '../screens/Search';
import Hash from '../screens/Hash';
import Notification from '../screens/Notification';
import ErrorPage from '../components/ErrorPage';
import {useValue} from '../context';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

export const navigationRef = React.createRef();
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const Stack = createSharedElementStackNavigator();

export default () => {
  const {isLoggedIn, isLatestVer} = useValue();

  return (
    <Stack.Navigator
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
      }}>
      {(!isLoggedIn || !isLatestVer) && (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SMSLogin"
        component={SMSLogin}
        options={{title: 'Start'}}
      />
      <Stack.Screen
        name="NameUp"
        component={NameUp}
        options={{title: 'Sign up'}}
      />
      <Stack.Screen
        name="NickNameUp"
        component={NickNameUp}
        options={{title: 'Sign up'}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
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
      <Stack.Screen
        name="User"
        component={User}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="EditCard"
        component={EditCard}
        options={{title: 'Edit Post'}}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{title: 'Comments'}}
      />
      <Stack.Screen
        name="Replies"
        component={Replies}
        options={{title: 'Replies'}}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{title: 'Report'}}
      />
      <Stack.Screen name="Follows" component={Follows} options={{title: ''}} />
      <Stack.Screen
        name="UserSetting"
        component={UserSetting}
        options={{title: 'Setting'}}
      />
      <Stack.Screen
        name="DeleteUser"
        component={DeleteUser}
        options={{title: 'Danger Zone'}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{title: 'Notification'}}
      />
      <Stack.Screen
        name="Hash"
        component={Hash}
        options={{
          title: '',
          headerTitleStyle: {color: '#0066d6'},
        }}
      />
      <Stack.Screen
        name="ErrorPage"
        component={ErrorPage}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

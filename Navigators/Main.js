import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import CartIcon from '../Shared/CartIcon';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';
import TwoUser from '../Screens/User/TwoUser';

import { FontAwesome5 } from '@expo/vector-icons';

import GetProfile from '../Screens/User/ComonUse/GetProfile';
import EditCommon from '../Screens/User/ComonUse/EditCommon';

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Homes'
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name='shopping-cart' color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />

      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name='Admin'
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='cog' color={color} size={30} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='user' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='GetProfile'
        component={GetProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="users" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});

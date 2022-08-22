import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';
import EditCommon from '../Screens/User/ComonUse/EditCommon';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='EdiProfile'
        component={EditCommon}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function UserNavigator() {
  return <MyStack />;
}

const styles = StyleSheet.create({});

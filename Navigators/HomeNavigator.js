import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';
import OrderCard from '../Shared/OrderCard';
import OrderScreenEmpty from '../Shared/OrderScreenEmpty';
import TwoUser from '../Screens/User/TwoUser';
import Orders from '../Screens/Admin/Order';
import Order2 from '../Screens/Admin/Order2';

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='UserTwo'
        component={TwoUser}
        options={{ headerShown: false }}
      />

      <Stack.Screen name='Order2' component={Order2} />

      <Stack.Screen
        name='Home'
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ProductDetail'
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
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
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}

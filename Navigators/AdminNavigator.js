import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Cart from '../Screens/Cart/Cart';
import Checkout from '../Screens/Cart/Checkout/Checkout';
import CheckoutNavigator from './CheckoutNavigator';
import Products from '../Screens/Admin/Products';
import Categories from '../Screens/Admin/Categories';
import Order from '../Screens/Admin/Order';
import ProductForm from '../Screens/Admin/ProductForm';
import OrderCard from '../Shared/OrderCard';
import OrderScreenEmpty from '../Shared/OrderScreenEmpty';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Products'
        component={Products}
        options={{
          headerShown: false,
          title: 'Products',
        }}
      />
      <Stack.Screen
        name='Categories'
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Orders'
        component={Order}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='ProductForm'
        component={ProductForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const AdminNavigator = () => {
  return <MyStack />;
};

export default AdminNavigator;

const styles = StyleSheet.create({});

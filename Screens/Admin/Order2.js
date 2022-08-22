import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';

import OrderCard2 from '../../Shared/OrderCard2';

const Order2 = (props) => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    const config = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVkNjI0NWZjYTYwNDhmMzU5NjUyMDYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjEwMjA1NzYsImV4cCI6MTY2MTYyNTM3Nn0.Hb-N3mqDE3i_FPU0b-uroeRDOB_i3X27xOl48aWdxAU',
      },
    };
    axios
      .get(`${baseURL}orders`, config)
      .then((x) => {
        setOrderList(x.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderCard2 navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Order2;

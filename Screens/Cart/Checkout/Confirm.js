import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Text,
  Image,
  Alert,
} from 'react-native';
import { Thumbnail } from 'native-base';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
var { width, height } = Dimensions.get('window');
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL, { imageBaseUrl } from '../../../assets/common/baseUrl';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Confirm = (props) => {
  const finalOrder = props.route.params;
  const cartItems = useSelector((state) => state.cartItems);

  const confirmOrder = () => {
    const order = finalOrder?.order?.order;
    // console.log('orderorder', order);
    order.orderItems = cartItems;

    axios
      .post(`${baseURL}orders`, order, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVkNjI0NWZjYTYwNDhmMzU5NjUyMDYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjEwMjA1NzYsImV4cCI6MTY2MTYyNTM3Nn0.Hb-N3mqDE3i_FPU0b-uroeRDOB_i3X27xOl48aWdxAU',
        },
      })
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Alert.alert('Order Shipped Successfull');
          props?.clearCart();
          props?.navigation.navigate('Cart');
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });

    // AsyncStorage.getItem('jwt')
    //   .then((res) => {
    //     axios
    //     .post(`${baseURL}orders`, order, {
    //       headers: {
    //         Authorization:
    //          `Bearer ${res}`
    //       },
    //     }).then((res) => {
    //       if (res.status == 200 || res.status == 201) {
    //         Toast.show({
    //           topOffset: 60,
    //           type: 'success',
    //           text1: 'Order Completed',
    //           text2: '',
    //         });
    //         setTimeout(() => {
    //           props.clearCart();
    //           props.navigation.navigate('Cart');
    //         }, 500);
    //       }
    //     })
    //     }).catch((error) => {
    //       console.log(error);
    //     })

    //   }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: 'orange' }}>
            <Text style={styles.title}>Shipping To :</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {finalOrder?.order?.order?.shippingAddress1}</Text>
              <Text>
                Address2: {finalOrder?.order?.order?.shippingAddress2}
              </Text>
              <Text>City: {finalOrder?.order?.order?.city}</Text>
              <Text>Zip Code: {finalOrder?.order?.order?.zip}</Text>
              <Text>Country: {finalOrder?.order?.order?.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {cartItems.map((x) => {
              return (
                <View style={styles.listItem}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      style={styles.img}
                      source={{
                        uri: `${imageBaseUrl}${x.product.image}`,
                      }}
                    />
                    <Text style={{ paddingLeft: 20 }}>{x.product.name}</Text>
                  </View>
                  <View>
                    <Text>${x.product.price}</Text>
                  </View>
                </View>
              );
            })}

            <View style={{ alignItems: 'center', margin: 20 }}>
              <Button title={'Place order'} onPress={confirmOrder} />
            </View>
          </View>
        ) : (
          <Text>No Order yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    width: 100,
    height: 100,
  },
});

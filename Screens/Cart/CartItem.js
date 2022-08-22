import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { imageBaseUrl } from '../../assets/common/baseUrl';

const CartItem = (props) => {
  const data = props.item.product;

  return (
    <View style={styles.mainList}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.img}
          source={{ uri: `${imageBaseUrl}${data.image}` }}
        />
        <Text style={{ marginTop: 30, fontSize: 20, marginLeft: 20 }}>
          {data.name}
        </Text>
      </View>
      <View
        style={{
          marginRight: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>{data.price}</Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  mainList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // justifyContent:'center'
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

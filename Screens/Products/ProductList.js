import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';

var { width } = Dimensions.get('window');
const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('ProductDetail', { item: item })}
    >
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({});

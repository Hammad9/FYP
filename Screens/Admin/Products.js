import React, { useState, useCallback } from 'react';
import { Searchbar } from 'react-native-paper';
import {
  View,
  Text,
  Input,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from './ListItem';
import EasyButton from '../../Shared/StyledComponents/EassyButton';
var { height, width } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';

const ListHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '900' }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '900' }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '900' }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '900' }}>Price</Text>
      </View>
    </View>
  );
};
function Products(props) {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [searchQuery, setSearchQuery] = React.useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductFilter();
        setProductList();
        setLoading(true);
      };
    }, [])
  );
  // const onChangeSearch = query => setSearchQuery(query);
  const searchProduct = (text) => {
    if (text == '') {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };
  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'white',
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign
            style={{ marginTop: 5 }}
            name='arrowleft'
            size={22}
            color='black'
          />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 8, fontWeight: '600', fontSize: 20 }}>
          Products
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate('Orders')}
        >
          <Icon name='shopping-bag' size={18} color='white' />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate('ProductForm')}
        >
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.buttonText}>Products</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate('Categories')}
        >
          <Icon name='plus' size={18} color='white' />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton>
      </View>
      <Searchbar
        placeholder='Search'
        onChangeText={(text) => searchProduct(text)}
        // value={searchQuery}
      />

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' color='red' />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 4,
    color: 'white',
  },
});

export default Products;

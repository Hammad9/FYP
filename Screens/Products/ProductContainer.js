import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
// import data from '../../assets/data/products.json';
// import CATEGORIES from '../../assets/data/categories.json';
import ProductList from './ProductList';
import {
  Header,
  Icon,
  Input,
  NativeBaseProvider,
  Item,
  HStack,
  Box,
} from 'native-base';
import { TextInput } from 'react-native-paper';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import { Dimensions, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';

import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productFiltered, setProductFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  var { height } = Dimensions.get('window');

  useFocusEffect(
    useCallback(() => {
      // setProducts(data)
      // setProductFiltered(data);
      setFocus(false);
      // setCategories(categories)
      // setInitialState(data);
      setActive(-1);

      axios
        .get(`${baseURL}products/`)
        .then((res) => {
          setProducts(res.data);
          setProductFiltered(res.data);
          setProductsCtg(res.data);
          // console.log('ccccccc' + setCategories);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {});
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {});
      return () => {
        setProducts([]);
        setProductFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );
  const getFilteredProducts = () => {
    const prod = products.filter((i) => {
      return i.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return prod;
  };

  const getFilteredProductsOfCat = () => {
    const prod = products.filter((i) => {
      return active !== -1 ? active?._id === i?.category?._id : true;
    });
    return prod;
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  const [onClick, setOnClick] = useState(1);
  return (
    <>
      {loading == false ? (
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <Searchbar
              style={{
                marginHorizontal: 20,
                borderRadius: 50,
                marginBottom: 10,
              }}
              label='Search'
              onFocus={openList}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            {searchTerm.length > 0 ? (
              <Icon onPress={onBlur} name='ios-close' />
            ) : null}
            <View>
              {searchTerm.length > 0 ? (
                <SearchedProduct data={getFilteredProducts()} />
              ) : (
                <>
                  <Banner />
                  <ScrollView
                    bounces={true}
                    horizontal={true}
                    style={{ backgroundColor: '#f2f2f2' }}
                  >
                    <CategoryFilter
                      categories={categories}
                      categoryFilter={changeCtg}
                      productsCtg={getFilteredProducts()}
                      active={active}
                      setActive={setActive}
                      click={onClick}
                      clickFunc={setOnClick}
                    />
                  </ScrollView>
                  {getFilteredProductsOfCat().length > 0 ? (
                    <View style={styles.listContainer}>
                      {getFilteredProductsOfCat().map((item) => {
                        return (
                          <ProductList
                            navigation={props.navigation}
                            key={item._id}
                            item={item}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View style={[styles.center, { height: height / 2 }]}>
                      <Text>No products found</Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        // Loading
        <View style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator size='large' color='red' />
        </View>
      )}
    </>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

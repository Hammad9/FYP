import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  Content,
  Left,
  Body,
  ListItem,
  Thumbnail,
  Container,
  NativeBaseProvider,
} from 'native-base';
import { List, MD3Colors } from 'react-native-paper';
import { imageBaseUrl } from '../../assets/common/baseUrl';

var { width } = Dimensions.get('window');

const SearchedProduct = (props) => {
  const { data } = props;
  return (
    <View style={{ marginTop: 50 }}>
      <List.Section style={{ width: width }}>
        {data.length > 0 ? (
          data.map((item) => (
            <>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View
                  style={{
                    marginLeft: 25,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    width: '100%',
                    marginBottom:20,
                  }}
                >
                  <Image
                    source={{
                      uri: item.image
                        ? `${imageBaseUrl}${item.image}`
                        : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                    }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 25,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width: '100%',
                  }}
                >
                  <Text style={{ fontSize: 23, fontWeight: '600' }}>
                    {item.name}
                  </Text>
                  <Text>{item.description}</Text>
                </View>
              </View>
            </>
          ))
        ) : (
          <View style={styles.center}>
            <Text style={{ alignSelf: 'center' }}>
              No product match the selected criteria
            </Text>
          </View>
        )}
      </List.Section>
    </View>
  );
};

export default SearchedProduct;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

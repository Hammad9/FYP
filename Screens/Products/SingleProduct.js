import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import EasyButton from '../../Shared/StyledComponents/EassyButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import { imageBaseUrl } from '../../assets/common/baseUrl';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const SingleProduct = (props, { route, navigation }) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState('');

  useEffect(() => {
    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, []);

  const { image } = item;
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            resizeMode='contain'
            source={{
              uri: image
                ? `${imageBaseUrl}${image}`
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>

          <Text style={styles.price}>$ {item.price}</Text>

        
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${item.name} added to Cart`,
                  text2: 'Go to your cart to complete order',
                });
            }}
          >
            <Text style={{ color: 'white', marginTop: 10 }}>Add</Text>
          </EasyButton>
          
  
      </View>
    </View>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapToDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // position: 'absolute',
    bottom: 0,
    left: 0,
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import { List } from 'react-native-paper';
import CartItem from './CartItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'native-base';
import AuthGlobal from '../../Context/store/AuthGlobal';
import EasyButton from '../../Shared/StyledComponents/EassyButton';
var { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
const Cart = (props) => {
  const context = useContext(AuthGlobal);
  var total = 0;
 
  props.cartItems.forEach((cart) => {
    console.log((total += cart.product.price));
  });
  const cartItems = useSelector((state) => state.cartItems);

  const nav = useNavigation();
  // const navigateTo = (screen) => {
  //   const dt = {
  //     name: screen,
  //     params: {},
  //   };

  //   navigation.navigate(dt);
  // };

  return (
    <>
      {cartItems.length ? (
        <>
          <ScrollView>
            {cartItems.map((data) => {
              return (
                <View>
                  <CartItem item={data} />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={{ color: 'red', fontSize: 20, paddingLeft: 20 }}>
                ${total}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <EasyButton danger medium onPress={() => props.clearCart()}>
                <Text style={{ color: 'white' }}>Clear</Text>
              </EasyButton>

              {context.stateUser.isAuthenticated ? (
                <EasyButton
                  primary
                  medium
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                  <Text style={{ color: 'white' }}>Checkout</Text>
                </EasyButton>
              ) : (
                // <Button title='Clear' onPress={() => props.navigation.navigate('Checkout')}/>
                <EasyButton
                  secondary
                  medium
                  onPress={() => {
                    nav.navigate('Login');
                  }}
                >
                  <Text style={{ color: 'white' }}>Login</Text>
                </EasyButton>
                // <Button title='Login' onPress={() => props.navigation.navigate('Logins')}/>
              )}
            </View>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Look like your Cart is Empty</Text>
          <Text>Add Product to your Cart to get Started</Text>
        </View>
      )}
    </>
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

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    // marginTop: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // top: 400,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 5,
  },

  //   Swip github Code
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50,
    flexWrap: 'wrap',
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 2,
    paddingVertical: 10,
    width: Dimensions.get('window').width / 3,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

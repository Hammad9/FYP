import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import EasyButton from '../../Shared/StyledComponents/EassyButton';
// import { useNavigation } from '@react-navigation/native';

const TwoUser = (props) => {
  // const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: '#C7EBDF',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flex: 2.5 }}>
          <Image
            style={{ resizeMode: 'cover', width: 500, height: 500 }}
            source={require('../../assets/Logo2.png')}
          />
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <EasyButton
            primary
            large
            onPress={() => props.navigation.navigate('Home')}
          >
            <Text style={{ color: 'white' }}>Customer</Text>
          </EasyButton>

          <EasyButton
            primary
            large
            onPress={() => props.navigation.navigate('Order2')}
          >
            <Text style={{ color: 'white' }}>Delivery</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

export default TwoUser;

const styles = StyleSheet.create({});

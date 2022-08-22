import { StyleSheet, Text, View, Button ,Image} from 'react-native';
import React, { useState } from 'react';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import EasyButton from '../../Shared/StyledComponents/EassyButton';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/; // email
  let reg2 = /^(?=.*[A-Z]).{8,}$/; // password

  const register = () => {
    if (email === '') {
      setError('Email is required');
      return;
    } else if (reg.test(email) === false) {
      setError('Email is not valid');
      return;
    } else if (name === '') {
      setError('Name is required');
      return;
    } else if (password === '') {
      setError('Password is required');
      return;
    } else if (password.length < 8) {
      setError('Password must be at least 8 charaters');
      return;
    } else if (reg2.test(password) === false) {
      setError('Password must have at least one capital letter');
      return;
    } else {
      let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        isAdmin: false,
      };
      axios
        .post(`${baseURL}users/register`, user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Registration Succeeded',
              text2: 'Please Login into your account',
            });
            setTimeout(() => {
              props.navigation.navigate('Login');
            }, 500);
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
    }
  };
  return (
    <View>
      <View>
        <View style={{ resizeMode: 'contain', justifyContent: 'center', alignItems: 'center', }}>

          <Image style={{ height: 200, width: 300 }} source={require('../../assets/images/loginimg.png')} />
        </View>
      </View>
      <View style={styles.main}>

        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          extraHeight={200}
          enableOnAndroid={true}
        >
          <FormContainer title={'Register'}>
            <Input
              placeholder={'Email'}
              name={'email'}
              id={'email'}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
              placeholder={'Name'}
              name={'name'}
              id={'name'}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder={'Phone Number'}
              name={'phone'}
              id={'phone'}
              keyboardType={'numeric'}
              onChangeText={(text) => setPhone(text)}
            />
            <Input
              placeholder={'Password'}
              name={'password'}
              id={'password'}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
              {error ? <Error message={error} /> : null}
            </View>
            <View>
              <EasyButton primary large onPress={() => register()}>
                <Text>Register</Text>
              </EasyButton>
            </View>
            <View>
              <EasyButton
                secondary
                large
                onPress={() => props.navigation.navigate('Login')}
              >
                <Text>Back to Login</Text>
              </EasyButton>
            </View>
          </FormContainer>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
  main: {
    // marginTop: '10%',
    backgroundColor: 'lightgray',
    // borderTopLeftRadius:30,
    borderTopRightRadius: 330,
  }
});

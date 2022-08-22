import { StyleSheet, Text, View, Button, TouchableOpacity,Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import EasyButton from '../../Shared/StyledComponents/EassyButton';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(false);

  // useEffect(() => {
  // if (context.stateUser.isAuthenticated === true) {
  //   props.navigation.navigate('UserProfile');
  // }
  // }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    if (email === '') {
      setError('Email is Required');
      return;
    } else if (password === '') {
      setError('Password is Required');
      return;
    } else {
      const user = {
        email,
        password,
      };
      loginUser(user, context.dispatch);

      if (context.stateUser.isAuthenticated === false) {
        setError('Wrong Credentials');
        return;
      } else if (context.stateUser.isAuthenticated === true) {
        props.navigation.navigate('UserProfile');
      }
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

        <FormContainer title={'Login'}>
          <Input
            placeholder={'Enter Email'}
            name={'email'}
            id={'email'}
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
            placeholder={'Enter Password'}
            name={'password'}
            id={'password'}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
            <EasyButton primary large onPress={() => handleSubmit()}>
              <Text>Login</Text>
            </EasyButton>
          </View>
          <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
            <Text style={styles.middleText}>Don't Have an Account Yet?</Text>
            <EasyButton
              secondary
              large
              onPress={() => props.navigation.navigate('Register')}
            >
              <Text>Register</Text>
            </EasyButton>
          </View>
        </FormContainer>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  main: {
    marginTop: '10%',
    backgroundColor:'lightgray',
    // borderTopLeftRadius:30,
    borderTopRightRadius:330,
  }
});

import { StyleSheet, Image, SafeAreaView, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../assets/Logo2.png')}
        // resizeMode="contain"
        style={{ height: 100, width: 200 }}
      />
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    // padding: 30
  },
});

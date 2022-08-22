import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';

import Header from './Shared/Header';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Navigators/Main';
import Toast from 'react-native-toast-message';
// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
// contect api
import Auth from './Context/store/Auth';

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'new NativeEventEmitter',
  'Overwriting fontFamily style attribute preprocessor',
]);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({});

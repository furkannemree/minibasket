/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { CartProvider } from './src/store/cartContext';
import Toast from 'react-native-toast-message';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaInsetsContext value={null}>
      <SafeAreaView edges={['top','bottom']} style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <CartProvider>
          <RootNavigator />
        </CartProvider>
         <Toast />
      </SafeAreaView>
    </SafeAreaInsetsContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;

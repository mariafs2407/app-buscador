
import { NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import AppBar from './src/assets/components/AppBar';
import Search from './src/assets/components/search/Search';
import SearchTab from './src/assets/components/todos/SearchTab';
import { Center } from 'native-base'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/assets/components/nav/HomeScreen';
import SearchScreen from './src/assets/components/search/SearchScreen';
import WebViewScreen from './src/assets/components/search/WebViewScreen';


const HomeStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <HomeStack.Navigator initialRouteName="Home">
          <HomeStack.Screen options={{ title: 'Inicio' }} name="Home" component={HomeScreen} />
          <HomeStack.Screen options={{ title: '' }} name="Busqueda" component={SearchScreen} />
          <HomeStack.Screen options={{ title: '' }} name="WebView" component={WebViewScreen} />
        </HomeStack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}



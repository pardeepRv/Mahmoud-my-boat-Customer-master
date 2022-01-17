import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import TabNav from './src/Navi/BottomNav';
// import  from './src/Navi/BottomNav';
import Stacks from './src/Navi/Stack';

const App =()=>{
  return(
    <NavigationContainer>
      <StatusBar hidden />
      <Stacks />
      {/* <TabNav /> */}
    </NavigationContainer>
  )
}

export default App;

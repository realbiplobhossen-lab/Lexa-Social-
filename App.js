import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#070A13' }}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

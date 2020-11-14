import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f2f3f5'} }}
      >
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Parks from '../pages/Parks';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f2f3f5'} }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="Parks" component={Parks} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
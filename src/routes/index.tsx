import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none" initialRouteName="home" mode="card">
        <Screen name="home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;

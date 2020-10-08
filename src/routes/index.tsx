import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import Home from '../pages/Home';
import ShoppingList from '../pages/ShoppingList';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        initialRouteName="home"
        mode="card"
        screenOptions={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}
      >
        <Screen name="home" component={Home} />
        <Screen name="shopping_list" component={ShoppingList} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;

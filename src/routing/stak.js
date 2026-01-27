import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../home';
import CartPage from '../cartPage';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <>
      <Stack.Navigator initialRouteName="HomPage">
        <Stack.Screen
          name="HomPage"
          component={HomePage}
          options={{ title: 'Home Page', headerShown: false }}
        />
        <Stack.Screen
          name="CartPage"
          component={CartPage}
          options={{ title: 'Cart Page', headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

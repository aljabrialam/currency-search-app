import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DemoScreen from './ui/screens/DemoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Demo"
          component={DemoScreen}
          options={{title: 'DemoActivity'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

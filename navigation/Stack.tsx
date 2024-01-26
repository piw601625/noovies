import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLACK_COLOR, YELLO_COLOR } from '../colors';
import Detail from '../screens/Details';
import { useColorScheme } from 'react-native';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: YELLO_COLOR,
        headerTitleAlign: 'center',
        animation: 'fade_from_bottom',
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : 'white' },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
      }}>
      <NativeStack.Screen name="Detail" component={Detail}></NativeStack.Screen>
    </NativeStack.Navigator>
  );
};

export default Stack;

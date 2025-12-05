import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useAuthStore } from 'src/state/authStore';
import { AuthNavigator } from './stacks/AuthNavigator';
import { TabsNavigator } from './tabs/TabsNavigator';
import { useAuthStore } from '../state/authStore';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={TabsNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

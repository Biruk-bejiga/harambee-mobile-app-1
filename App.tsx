import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'src/theme/ThemeProvider';
import { RootNavigator } from 'src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

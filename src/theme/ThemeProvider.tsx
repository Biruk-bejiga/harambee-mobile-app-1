import React, { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const scheme = useColorScheme();

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </>
  );
};

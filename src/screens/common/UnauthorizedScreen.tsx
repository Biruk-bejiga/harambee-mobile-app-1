import React from 'react';
import { View, Text } from 'react-native';

export const UnauthorizedScreen = () => (
  <View className="flex-1 bg-midnight items-center justify-center p-6">
    <Text className="text-white text-lg font-semibold mb-2">Access Restricted</Text>
    <Text className="text-white/70 text-center">
      Your role does not have permission to view this screen.
    </Text>
  </View>
);

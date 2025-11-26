import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from './Icon';

interface QuickActionButtonProps {
  label: string;
  icon: string;
  onPress?: () => void;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ label, icon, onPress }) => (
  <Pressable
    className="flex-1 bg-ash rounded-2xl p-4 items-center justify-center m-1"
    onPress={onPress}
  >
    <View className="bg-white/10 p-3 rounded-full mb-2">
      <Icon name={icon} size={20} />
    </View>
    <Text className="text-white font-semibold text-sm text-center">{label}</Text>
  </Pressable>
);

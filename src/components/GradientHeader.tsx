import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from './Icon';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export const GradientHeader: React.FC<GradientHeaderProps> = ({ title, subtitle, icon = 'Home' }) => {
  return (
    <LinearGradient colors={['#8B5CF6', '#3B82F6']} className="rounded-3xl p-5 shadow-card mb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-white text-xl font-semibold" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? <Text className="text-sm text-white/80 mt-1">{subtitle}</Text> : null}
        </View>
        <View className="bg-white/20 rounded-full p-3">
          <Icon name={icon} size={28} color="#fff" />
        </View>
      </View>
    </LinearGradient>
  );
};

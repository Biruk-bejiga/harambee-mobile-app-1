import React from 'react';
import { View, Text } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  background?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, background = '#1E293B' }) => (
  <View className="rounded-2xl p-4" style={{ backgroundColor: background }}>
    <Text className="text-white/60 text-sm mb-1">{label}</Text>
    <Text className="text-white text-2xl font-semibold">{value}</Text>
  </View>
);

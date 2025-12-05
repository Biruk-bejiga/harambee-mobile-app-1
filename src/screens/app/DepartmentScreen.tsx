import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';

export const DepartmentScreen = () => (
  <SafeAreaView className="flex-1 bg-midnight">
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <GradientHeader title="Department Overview" subtitle="Accounting and Finance" icon="Department" />
      <View className="bg-ash rounded-3xl p-5">
        <Text className="text-white/80 mb-3">
          Program performance metrics, faculty contacts, and key announcements for Accounting and Finance.
        </Text>
        <View className="bg-midnight/40 rounded-2xl p-4 mb-3">
          <Text className="text-white font-semibold mb-1">Department Head</Text>
          <Text className="text-white/70">Dr. Helen Desta</Text>
          <Text className="text-white/50 text-sm">helen.desta@harambee.edu.et</Text>
        </View>
        <View className="bg-midnight/40 rounded-2xl p-4">
          <Text className="text-white font-semibold mb-1">Upcoming Review</Text>
          <Text className="text-white/70 text-sm">Curriculum alignment meeting • Dec 05, 2025</Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);

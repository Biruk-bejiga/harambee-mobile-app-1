import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from 'src/components/GradientHeader';
import { useAuthStore } from 'src/state/authStore';

export const ProfileScreen = () => {
  const { user, role, logout } = useAuthStore();

  const infoRows = [
    { label: 'Department', value: user?.department ?? 'Accounting and Finance' },
    { label: 'Program', value: 'Undergraduate' },
    { label: 'Admission Type', value: 'Extension' },
    { label: 'Section', value: 'A' },
    { label: 'Year', value: '3' },
    { label: 'Role', value: role }
  ];

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader title={user?.fullName ?? 'Student'} subtitle={user?.email ?? ''} icon="Profile" />
        <View className="bg-ash rounded-3xl p-5">
          {infoRows.map((row) => (
            <View
              key={row.label}
              className="flex-row justify-between items-center py-4 border-b border-white/10"
            >
              <Text className="text-white/60">{row.label}</Text>
              <Text className="text-white font-semibold">{row.value}</Text>
            </View>
          ))}
          <Text className="text-brand mt-6" onPress={logout}>
            Sign Out
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

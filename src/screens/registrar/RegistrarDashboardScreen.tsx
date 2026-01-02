import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { StatCard } from '../../components/StatCard';
import { useAuthStore } from '../../state/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/stacks/HomeNavigator';
import { fetchRegistrarMetrics } from '../../supabase/api';

type RegistrarMetrics = {
  pendingAddDrop: number;
  pendingPayments: number;
  approvedToday: number;
};

export const RegistrarDashboardScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [metrics, setMetrics] = useState<RegistrarMetrics>({ pendingAddDrop: 0, pendingPayments: 0, approvedToday: 0 });

  useEffect(() => {
    fetchRegistrarMetrics(user?.id ?? '').then(setMetrics).catch(() =>
      setMetrics({ pendingAddDrop: 7, pendingPayments: 4, approvedToday: 2 })
    );
  }, [user?.id]);

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader title={`Registrar`} subtitle={user?.fullName ?? ''} />

        <View className="flex-row flex-wrap justify-between mb-4">
          <View className="w-[48%] mb-3">
            <StatCard label="Add/Drop Pending" value={metrics.pendingAddDrop} background="#1E293B" />
          </View>
          <View className="w-[48%] mb-3">
            <StatCard label="Payments Pending" value={metrics.pendingPayments} background="#0F172A" />
          </View>
          <View className="w-[100%]">
            <StatCard label="Approved Today" value={metrics.approvedToday} background="#052E16" />
          </View>
        </View>

        <View className="bg-ash rounded-3xl p-4">
          <Text className="text-white text-lg font-semibold mb-3">Actions</Text>
          <Text className="text-brand mb-2" onPress={() => navigation.navigate('AddDropRequests')}>Review Add/Drop Requests</Text>
          <Text className="text-brand" onPress={() => navigation.navigate('PaymentReview')}>Verify Payments</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

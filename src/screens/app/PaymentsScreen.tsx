import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from 'src/components/GradientHeader';
import { fetchPayments, PaymentItem } from 'src/supabase/api';

export const PaymentsScreen = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]);

  useEffect(() => {
    fetchPayments().then(setPayments);
  }, []);

  const totalPaid = payments.filter((p) => p.status === 'paid').reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader title="Payments" subtitle="Total Paid" icon="Payments" />
        <View className="bg-ash rounded-3xl p-5">
          <View className="bg-emerald-500/20 rounded-2xl p-4 mb-4">
            <Text className="text-white/70 text-sm">Total Paid</Text>
            <Text className="text-white text-3xl font-semibold">{totalPaid} Birr</Text>
          </View>

          {payments.map((payment) => (
            <View key={payment.id} className="bg-midnight/50 rounded-2xl p-4 mb-3">
              <View className="flex-row justify-between mb-2">
                <Text className="text-white font-semibold">{payment.label}</Text>
                <Text className="text-white font-semibold">{payment.amount} Birr</Text>
              </View>
              <Text className="text-white/60 text-sm">{payment.status === 'paid' ? 'Paid' : 'Unpaid'} • {new Date(payment.date).toDateString()}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

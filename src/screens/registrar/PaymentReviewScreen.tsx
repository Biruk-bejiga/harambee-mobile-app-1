import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { fetchPaymentsToReview, verifyPayment } from '../../supabase/api';

type PaymentItem = {
  id: string;
  studentName: string;
  studentId: string;
  label: string;
  amount: number;
  date: string;
};

export const PaymentReviewScreen = () => {
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [workingId, setWorkingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await fetchPaymentsToReview();
      setItems(data);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onVerify = async (id: string) => {
    setWorkingId(id);
    setError(undefined);
    try {
      await verifyPayment(id);
      setItems((curr) => curr.filter((i) => i.id !== id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <View className="px-5">
        <GradientHeader title="Payment Verification" subtitle="Registrar" />
      </View>
      {error ? (
        <View className="px-5">
          <Text className="text-red-400">{error}</Text>
        </View>
      ) : null}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View className="bg-ash rounded-2xl p-4 mb-3">
            <Text className="text-white font-semibold mb-1">{item.studentName} ({item.studentId})</Text>
            <Text className="text-white/70">{item.label} • {item.amount} Birr</Text>
            <Text className="text-white/60 mt-1">{item.date}</Text>
            <View className="flex-row mt-3 items-center">
              {workingId === item.id ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="#22D3EE" />
                  <Text className="text-white/70 ml-2">Verifying…</Text>
                </View>
              ) : (
                <Pressable onPress={() => onVerify(item.id)} className="px-3 py-2 rounded-xl bg-brand">
                  <Text className="text-black font-semibold">Mark as Verified</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

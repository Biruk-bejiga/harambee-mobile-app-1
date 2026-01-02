import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { fetchAddDropRequests, updateAddDropRequestStatus } from '../../supabase/api';

type RequestItem = {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  action: 'add' | 'drop';
  reason?: string;
};

export const AddDropRequestsScreen = () => {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [workingId, setWorkingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await fetchAddDropRequests();
      setItems(data);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDecision = async (id: string, status: 'approved' | 'rejected') => {
    setWorkingId(id);
    setError(undefined);
    try {
      await updateAddDropRequestStatus(id, status);
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
        <GradientHeader title="Add / Drop Requests" subtitle="Registrar" />
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
            <Text className="text-white/70">{item.action.toUpperCase()} • {item.course}</Text>
            {item.reason ? <Text className="text-white/60 mt-1">{item.reason}</Text> : null}
            <View className="flex-row mt-3 items-center">
              {workingId === item.id ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="#22D3EE" />
                  <Text className="text-white/70 ml-2">Submitting…</Text>
                </View>
              ) : (
                <>
                  <Pressable onPress={() => onDecision(item.id, 'approved')} className="px-3 py-2 mr-2 rounded-xl bg-brand">
                    <Text className="text-black font-semibold">Approve</Text>
                  </Pressable>
                  <Pressable onPress={() => onDecision(item.id, 'rejected')} className="px-3 py-2 rounded-xl bg-midnight">
                    <Text className="text-white">Reject</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

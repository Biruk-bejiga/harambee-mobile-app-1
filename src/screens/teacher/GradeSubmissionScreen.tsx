import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { useAuthStore } from '../../state/authStore';
import { fetchPendingSubmissions, submitGrade } from '../../supabase/api';

type SubmissionItem = {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  section: string;
  assignment: string;
  grade?: string;
};

export const GradeSubmissionScreen = () => {
  const { user } = useAuthStore();
  const [items, setItems] = useState<SubmissionItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchPendingSubmissions(user.id)
      .then(setItems)
      .catch((e) => setError((e as Error).message));
  }, [user]);

  const onSubmit = async (id: string, grade: string) => {
    setSavingId(id);
    setError(undefined);
    try {
      await submitGrade(id, grade);
      setItems((curr) => curr.filter((i) => i.id !== id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <View className="px-5">
        <GradientHeader title="Pending Grade Submissions" subtitle="Teacher" />
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
            <Text className="text-white/70">
              {item.course} • Section {item.section}
            </Text>
            <Text className="text-white/60 mt-1">{item.assignment}</Text>
            <View className="flex-row mt-3">
              {savingId === item.id ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="#22D3EE" />
                  <Text className="text-white/70 ml-2">Submitting…</Text>
                </View>
              ) : (
                <>
                  {['A', 'B', 'C', 'D', 'F'].map((g) => (
                    <Pressable
                      key={g}
                      onPress={() => onSubmit(item.id, g)}
                      className="px-3 py-2 mr-2 rounded-xl bg-midnight"
                    >
                      <Text className="text-white">{g}</Text>
                    </Pressable>
                  ))}
                </>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

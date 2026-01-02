import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { useAuthStore } from '../../state/authStore';
import { fetchTeacherCourses } from '../../supabase/api';

type TeacherCourse = {
  code: string;
  name: string;
  section: string;
  schedule: string;
};

export const TeacherCoursesScreen = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!user) return;
    fetchTeacherCourses(user.id)
      .then(setCourses)
      .catch((e) => setError((e as Error).message));
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <View className="px-5">
        <GradientHeader title="My Courses" subtitle="Teacher" />
      </View>
      {error ? (
        <View className="px-5">
          <Text className="text-red-400">{error}</Text>
        </View>
      ) : null}
      <FlatList
        data={courses}
        keyExtractor={(c) => `${c.code}-${c.section}`}
        renderItem={({ item }) => (
          <View className="bg-ash rounded-2xl p-4 mb-3 mx-5">
            <Text className="text-white font-semibold mb-1">{item.name} ({item.code})</Text>
            <Text className="text-white/70">Section {item.section}</Text>
            <Text className="text-white/60 mt-1">{item.schedule}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </SafeAreaView>
  );
};

import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { Course, fetchCourses } from '../../supabase/api';

export const CoursesScreen = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader title="Course Add" subtitle="Office of Registrar" icon="Courses" />
        <View className="bg-ash rounded-3xl p-5">
          <View className="bg-midnight/40 rounded-2xl px-4 py-3 mb-4">
            <Text className="text-white/60">Search courses...</Text>
          </View>

          {courses.map((course) => (
            <View key={course.code} className="bg-midnight/40 rounded-2xl p-4 mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-accent font-semibold">{course.code}</Text>
                <TouchableOpacity className="bg-brand/20 rounded-full px-4 py-1">
                  <Text className="text-brand font-semibold">+ Add</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-white font-semibold mb-1">{course.name}</Text>
              <Text className="text-white/60 text-sm">
                {course.credits} Credit Hours • {course.instructor}
              </Text>
              <Text className="text-white/60 text-sm">{course.schedule}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

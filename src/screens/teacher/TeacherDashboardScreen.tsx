import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { StatCard } from '../../components/StatCard';
import { useAuthStore } from '../../state/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/stacks/HomeNavigator';

type TeacherMetrics = {
  courses: number;
  sections: number;
  pendingSubmissions: number;
};

export const TeacherDashboardScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [metrics, setMetrics] = useState<TeacherMetrics>({ courses: 0, sections: 0, pendingSubmissions: 0 });

  useEffect(() => {
    // TODO: replace with supabase RPC/queries for teacher metrics
    setMetrics({ courses: 3, sections: 5, pendingSubmissions: 12 });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader title={`Welcome, ${user?.fullName ?? 'Faculty'}`} subtitle="Teacher Dashboard" />

        <View className="flex-row flex-wrap justify-between mb-4">
          <View className="w-[48%] mb-3">
            <StatCard label="Courses" value={metrics.courses} background="#1E293B" />
          </View>
          <View className="w-[48%] mb-3">
            <StatCard label="Sections" value={metrics.sections} background="#0F172A" />
          </View>
          <View className="w-[100%]">
            <StatCard label="Pending Submissions" value={metrics.pendingSubmissions} background="#052E16" />
          </View>
        </View>

        <View className="bg-ash rounded-3xl p-4">
          <Text className="text-white text-lg font-semibold mb-3">Actions</Text>
          <Text className="text-brand mb-2" onPress={() => navigation.navigate('TeacherCourses')}>View My Courses</Text>
          <Text className="text-brand" onPress={() => navigation.navigate('GradeSubmission')}>Pending Grade Submissions</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

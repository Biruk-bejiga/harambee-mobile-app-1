import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { useAuthStore } from '../../state/authStore';

const gradeData = [
  { course: 'Financial Accounting III', code: 'ACCT3022', credit: 3, grade: 'A', points: 4 },
  { course: 'Corporate Finance', code: 'FINA3011', credit: 3, grade: 'B+', points: 3.3 },
  { course: 'Business Law', code: 'BUSL2001', credit: 2, grade: 'A-', points: 3.7 }
];

export const GradesScreen = () => {
  const { user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader title="Grade Report" subtitle={`Dept. ${user?.department ?? ''}`} icon="Grades" />
        <View className="bg-ash rounded-3xl p-5">
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-white/60 text-sm">Admission</Text>
              <Text className="text-white font-semibold">Extension</Text>
            </View>
            <View>
              <Text className="text-white/60 text-sm">Semester</Text>
              <Text className="text-white font-semibold">3</Text>
            </View>
            <View>
              <Text className="text-white/60 text-sm">Year</Text>
              <Text className="text-white font-semibold">3</Text>
            </View>
          </View>

          {gradeData.map((item) => (
            <View key={item.code} className="bg-midnight/50 rounded-2xl p-4 mb-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-white font-semibold">{item.course}</Text>
                <Text className="text-accent font-semibold">{item.grade}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/60">{item.code}</Text>
                <Text className="text-white/60">{item.credit} Cr</Text>
              </View>
            </View>
          ))}

          <View className="mt-4 flex-row justify-between">
            <Text className="text-white/70">CGPA</Text>
            <Text className="text-white font-semibold">2.94</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

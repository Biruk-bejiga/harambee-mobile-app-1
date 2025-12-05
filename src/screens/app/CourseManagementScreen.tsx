import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { useNavigation } from '@react-navigation/native';

export const CourseManagementScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="mb-4">
          <Text className="text-white text-lg" onPress={() => navigation.goBack()}>
            ← Back
          </Text>
        </View>

        <GradientHeader title="Course Actions" subtitle="Manage add/drop requests" icon="CourseManagement" />

        <View className="bg-ash rounded-3xl p-5">
          <TouchableOpacity className="bg-brand/20 rounded-2xl p-4 mb-3">
            <Text className="text-white font-semibold">Add Course Request</Text>
            <Text className="text-white/70 text-sm">Submit for advisor approval</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-rose-500/20 rounded-2xl p-4">
            <Text className="text-white font-semibold">Drop Course Request</Text>
            <Text className="text-white/70 text-sm">Requires registrar confirmation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

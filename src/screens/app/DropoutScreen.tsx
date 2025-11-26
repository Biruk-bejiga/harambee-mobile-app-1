import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from 'src/components/GradientHeader';

export const DropoutScreen = () => (
  <SafeAreaView className="flex-1 bg-midnight">
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <GradientHeader title="Dropout Advisory" subtitle="Registrar Office" icon="Dropout" />
      <View className="bg-ash rounded-3xl p-5">
        <Text className="text-white/80 mb-3">
          Students requesting temporary withdrawal or program exit must complete the form below and schedule a
          meeting with their department head.
        </Text>
        <View className="bg-midnight/40 rounded-2xl p-4 mb-3">
          <Text className="text-white font-semibold mb-1">Eligibility</Text>
          <Text className="text-white/70 text-sm">CGPA ≥ 2.0 and no active disciplinary cases.</Text>
        </View>
        <View className="bg-midnight/40 rounded-2xl p-4">
          <Text className="text-white font-semibold mb-1">Steps</Text>
          <Text className="text-white/70 text-sm">
            1. Submit withdrawal request.
            2. Meet advisor for clearance.
            3. Registrar final approval within 5 business days.
          </Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);

import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { StatCard } from '../../components/StatCard';
import { QuickActionButton } from '../../components/QuickActionButton';
import { DashboardMetrics, fetchDashboard } from '../../supabase/api';
import { useAuthStore } from '../../state/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/stacks/HomeNavigator';
import { LinearGradient } from 'expo-linear-gradient';

export const HomeScreen = () => {
  const { user, role } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const parentNav = navigation.getParent();
  const [metrics, setMetrics] = useState<DashboardMetrics>();

  useEffect(() => {
    fetchDashboard().then(setMetrics);
  }, []);

  const quickActions = useMemo(() => {
    const actions = [
      {
        label: 'View Grades',
        icon: 'Grades',
        onPress: () => parentNav?.navigate('Grades'),
        roles: ['student', 'teacher']
      },
      {
        label: 'Payments',
        icon: 'Payments',
        onPress: () => parentNav?.navigate('Payments'),
        roles: ['student', 'admin', 'registrar']
      },
      {
        label: 'Add / Drop Course',
        icon: 'CourseManagement',
        onPress: () => navigation.navigate('CourseManagement'),
        roles: ['student', 'registrar']
      },
      {
        label: 'Department',
        icon: 'Department',
        onPress: () => navigation.navigate('Department'),
        roles: ['head', 'admin']
      }
    ];
    return actions.filter((a) => a.roles.includes(role));
  }, [navigation, parentNav, role]);

  const roleHighlights: Record<string, { title: string; description: string }> = {
    admin: {
      title: 'Admin Insights',
      description: 'Monitor enrollment requests and payment compliance across departments.'
    },
    teacher: {
      title: 'Faculty Snapshot',
      description: 'Grade submissions pending for three sections.'
    },
    head: {
      title: 'Department Head',
      description: 'Review program performance and dropout alerts.'
    },
    registrar: {
      title: 'Registrar Office',
      description: 'Approve add/drop requests awaiting confirmation.'
    }
  };

  const roleHighlight = roleHighlights[role];

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <GradientHeader
          title={`Hello, ${user?.fullName ?? 'Student'}`}
          subtitle={`${user?.studentId ?? ''} • ${role.toUpperCase()}`}
        />

        <View className="flex-row flex-wrap justify-between mb-4">
          <View className="w-[48%] mb-3">
            <StatCard label="CGPA" value={metrics?.cgpa ?? '--'} background="#1E1B4B" />
          </View>
          <View className="w-[48%] mb-3">
            <StatCard label="Credits" value={metrics?.credits ?? '--'} background="#0F172A" />
          </View>
          <View className="w-[48%]">
            <StatCard label="Semester" value={metrics?.semester ?? '--'} background="#1E293B" />
          </View>
          <View className="w-[48%]">
            <StatCard label="Payments" value={`${metrics?.payments ?? 0} Birr`} background="#052E16" />
          </View>
        </View>

        <View className="bg-ash rounded-3xl p-4 mb-4">
          <Text className="text-white text-lg font-semibold mb-3">Quick Actions</Text>
          <View className="flex-row flex-wrap -m-1">
            {quickActions.map((action) => (
              <QuickActionButton key={action.label} {...action} />
            ))}
          </View>
        </View>

        {roleHighlight ? (
          <LinearGradient colors={['#8B5CF6', '#06B6D4']} className="rounded-3xl p-5 mb-4">
            <Text className="text-white text-lg font-semibold mb-1">{roleHighlight.title}</Text>
            <Text className="text-white/80">{roleHighlight.description}</Text>
          </LinearGradient>
        ) : null}

        <View className="bg-ash rounded-3xl p-4">
          <Text className="text-white font-semibold text-lg mb-2">Announcements</Text>
          <View className="bg-midnight/60 rounded-2xl p-4 mb-3">
            <Text className="text-accent text-sm mb-1">11 Nov 2025</Text>
            <Text className="text-white font-medium mb-1">Registration week</Text>
            <Text className="text-white/70 text-sm">
              Add/drop opens Monday 9:00 AM. Registrar approval required for overloads.
            </Text>
          </View>
          <View className="bg-midnight/60 rounded-2xl p-4">
            <Text className="text-accent text-sm mb-1">7 Nov 2025</Text>
            <Text className="text-white font-medium mb-1">CGPA advisory</Text>
            <Text className="text-white/70 text-sm">
              Students below 2.0 must meet their advisor before requesting new courses.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

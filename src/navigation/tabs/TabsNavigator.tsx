import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from '../stacks/HomeNavigator';
import { GradesScreen } from '../../screens/app/GradesScreen';
import { CoursesScreen } from '../../screens/app/CoursesScreen';
import { PaymentsScreen } from '../../screens/app/PaymentsScreen';
import { ProfileScreen } from '../../screens/app/ProfileScreen';
import { withRoleGuard } from '../withRoleGuard';
import { useAuthStore } from '../../state/authStore';
import { Icon } from '../../components/Icon';
// import { HomeNavigator } from 'src/navigation/stacks/HomeNavigator';
// import { GradesScreen } from 'src/screens/app/GradesScreen';
// import { CoursesScreen } from 'src/screens/app/CoursesScreen';
// import { PaymentsScreen } from 'src/screens/app/PaymentsScreen';
// import { ProfileScreen } from 'src/screens/app/ProfileScreen';
// import { Icon } from 'src/components/Icon';

export type TabParamList = {
  Home: undefined;
  Grades: undefined;
  Courses: undefined;
  Payments: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => {
  const role = useAuthStore((s) => s.role);

  const GuardedGrades = withRoleGuard(['student', 'teacher'], GradesScreen);
  const GuardedCourses = withRoleGuard(['student', 'teacher'], CoursesScreen);
  const GuardedPayments = withRoleGuard(['student', 'admin', 'registrar'], PaymentsScreen);
  const GuardedProfile = withRoleGuard(['student', 'teacher', 'admin', 'head', 'registrar'], ProfileScreen);

  return (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#0F172A',
        borderTopColor: 'transparent',
        height: 70
      },
      tabBarIcon: ({ focused }) => (
        <Icon name={route.name} size={24} color={focused ? '#22D3EE' : '#94A3B8'} />
      )
    })}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    {['student', 'teacher'].includes(role) && (
      <Tab.Screen name="Grades" component={GuardedGrades} />
    )}
    {['student', 'teacher'].includes(role) && (
      <Tab.Screen name="Courses" component={GuardedCourses} />
    )}
    {['student', 'admin', 'registrar'].includes(role) && (
      <Tab.Screen name="Payments" component={GuardedPayments} />
    )}
    <Tab.Screen name="Profile" component={GuardedProfile} />
  </Tab.Navigator>
  );
};

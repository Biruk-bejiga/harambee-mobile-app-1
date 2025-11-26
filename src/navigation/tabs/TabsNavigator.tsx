import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from 'src/navigation/stacks/HomeNavigator';
import { GradesScreen } from 'src/screens/app/GradesScreen';
import { CoursesScreen } from 'src/screens/app/CoursesScreen';
import { PaymentsScreen } from 'src/screens/app/PaymentsScreen';
import { ProfileScreen } from 'src/screens/app/ProfileScreen';
import { Icon } from 'src/components/Icon';

export type TabParamList = {
  Home: undefined;
  Grades: undefined;
  Courses: undefined;
  Payments: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => (
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
    <Tab.Screen name="Grades" component={GradesScreen} />
    <Tab.Screen name="Courses" component={CoursesScreen} />
    <Tab.Screen name="Payments" component={PaymentsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/app/HomeScreen';
import { DepartmentScreen } from '../../screens/app/DepartmentScreen';
import { DropoutScreen } from '../../screens/app/DropoutScreen';
import { CourseManagementScreen } from '../../screens/app/CourseManagementScreen';
// import { HomeScreen } from 'src/screens/app/HomeScreen';
// import { CourseManagementScreen } from 'src/screens/app/CourseManagementScreen';
// import { DepartmentScreen } from 'src/screens/app/DepartmentScreen';
// import { DropoutScreen } from 'src/screens/app/DropoutScreen';

export type HomeStackParamList = {
  Home: undefined;
  CourseManagement: undefined;
  Department: undefined;
  Dropout: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="CourseManagement" component={CourseManagementScreen} />
    <Stack.Screen name="Department" component={DepartmentScreen} />
    <Stack.Screen name="Dropout" component={DropoutScreen} />
  </Stack.Navigator>
);

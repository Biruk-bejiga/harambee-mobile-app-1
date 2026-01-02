import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/app/HomeScreen';
import { DepartmentScreen } from '../../screens/app/DepartmentScreen';
import { DropoutScreen } from '../../screens/app/DropoutScreen';
import { CourseManagementScreen } from '../../screens/app/CourseManagementScreen';
import { RoleManagementScreen } from '../../screens/admin/RoleManagementScreen';
import { TeacherDashboardScreen } from '../../screens/teacher/TeacherDashboardScreen';
import { TeacherCoursesScreen } from '../../screens/teacher/TeacherCoursesScreen';
import { GradeSubmissionScreen } from '../../screens/teacher/GradeSubmissionScreen';
import { withRoleGuard } from '../withRoleGuard';
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
    <Stack.Screen
      name="CourseManagement"
      component={withRoleGuard(['student', 'registrar'], CourseManagementScreen)}
    />
    <Stack.Screen name="Department" component={withRoleGuard(['head', 'admin'], DepartmentScreen)} />
    <Stack.Screen name="Dropout" component={withRoleGuard(['head', 'admin'], DropoutScreen)} />
    <Stack.Screen name="RoleManagement" component={withRoleGuard(['admin'], RoleManagementScreen)} />
    <Stack.Screen name="TeacherDashboard" component={withRoleGuard(['teacher'], TeacherDashboardScreen)} />
    <Stack.Screen name="TeacherCourses" component={withRoleGuard(['teacher'], TeacherCoursesScreen)} />
    <Stack.Screen name="GradeSubmission" component={withRoleGuard(['teacher'], GradeSubmissionScreen)} />
  </Stack.Navigator>
);

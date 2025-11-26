import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Grades: 'stats-chart',
  Courses: 'book',
  Payments: 'card',
  Profile: 'person',
  CourseManagement: 'add-circle',
  Department: 'business',
  Dropout: 'exit-outline',
  AddCourse: 'add-circle',
  DropCourse: 'remove-circle',
  default: 'grid'
};

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, color = '#fff', size = 24 }) => {
  const iconName = iconMap[name] ?? iconMap.default;
  return <Ionicons name={iconName} size={size} color={color} />;
};

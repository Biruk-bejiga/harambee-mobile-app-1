import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../state/authStore';

export type AllowedRoles = Array<'student' | 'admin' | 'teacher' | 'head' | 'registrar'>;

export const withRoleGuard = <P extends object>(
  allowed: AllowedRoles,
  Component: React.ComponentType<P>
) => {
  const Guarded: React.FC<P> = (props) => {
    const role = useAuthStore((s) => s.role);
    if (!allowed.includes(role)) {
      return (
        <View className="flex-1 bg-midnight items-center justify-center p-6">
          <Text className="text-white text-lg font-semibold mb-2">Access Restricted</Text>
          <Text className="text-white/70 text-center">
            Your role does not have permission to view this screen.
          </Text>
        </View>
      );
    }
    return <Component {...props} />;
  };
  return Guarded;
};

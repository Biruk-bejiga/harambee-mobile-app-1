import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/stacks/AuthNavigator';
import { useAuthStore } from '../../state/authStore';
import { LinearGradient } from 'expo-linear-gradient';

type LoginScreenNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigation>();
  const login = useAuthStore((state) => state.login);
  const { isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('birukbejiga8@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = () => {
    login(email.trim(), password);
  };

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <LinearGradient colors={['#4C1D95', '#0F172A']} className="flex-1">
        <View className="flex-1 bg-midnight/75 px-6 justify-center">
          <View className="mb-12 items-center">
            <Text className="text-white text-4xl font-black mb-2">HU</Text>
            <Text className="text-white text-lg tracking-widest">HARAMBEE UNIVERSITY</Text>
            <Text className="text-white/70 text-sm">Office of Registrar</Text>
          </View>

          <View className="bg-white/10 rounded-3xl p-6">
            <Text className="text-white text-2xl font-semibold mb-6">Welcome Back</Text>

            <Text className="text-white/70 mb-2">Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              className="bg-white/10 text-white rounded-2xl px-4 py-3 mb-4"
            />

            <Text className="text-white/70 mb-2">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              className="bg-white/10 text-white rounded-2xl px-4 py-3"
            />

            {error ? <Text className="text-rose-300 mt-3">{error}</Text> : null}

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} className="mt-3">
              <Text className="text-brand text-right font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-brand rounded-2xl py-4 mt-6 items-center"
            >
              <Text className="text-white text-lg font-semibold">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

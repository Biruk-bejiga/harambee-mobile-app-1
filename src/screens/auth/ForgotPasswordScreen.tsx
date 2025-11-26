import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/navigation/stacks/AuthNavigator';
import { supabase } from 'src/supabase/supabaseClient';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'harambeeportal://reset-password'
    });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Password reset link sent. Please check your inbox.');
  };

  return (
    <SafeAreaView className="flex-1 bg-midnight px-6 py-10">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-white text-lg mb-6">← Back</Text>
      </TouchableOpacity>

      <Text className="text-3xl text-white font-semibold mb-2">Forgot Password</Text>
      <Text className="text-white/70 mb-6">
        Enter the email you used during registration and we will send you instructions to reset your password.
      </Text>

      <View className="bg-white/10 rounded-3xl p-6">
        <Text className="text-white/70 mb-2">Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="biruk.bejiga@student.harambee.edu.et"
          placeholderTextColor="#94A3B8"
          className="bg-white/10 text-white rounded-2xl px-4 py-3"
        />

        {message ? <Text className="text-emerald-300 mt-3">{message}</Text> : null}

        <TouchableOpacity onPress={handleReset} className="bg-brand rounded-2xl py-4 mt-6 items-center">
          <Text className="text-white text-lg font-semibold">Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

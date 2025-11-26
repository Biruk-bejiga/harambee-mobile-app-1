import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const extra = Constants.expoConfig?.extra ?? {};

const supabaseUrl = (extra as { supabaseUrl?: string }).supabaseUrl;
const supabaseAnonKey = (extra as { supabaseAnonKey?: string }).supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Did you set SUPABASE_URL and SUPABASE_ANON_KEY?');
}

const secureStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key)
};

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: {
    persistSession: true,
    storage: secureStorage
  }
});

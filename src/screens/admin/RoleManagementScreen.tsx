import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { fetchProfiles, updateUserRole, UserRole } from '../../supabase/api';

type ProfileItem = {
  id: string;
  full_name?: string | null;
  role: UserRole;
};

const ROLE_OPTIONS: UserRole[] = ['student', 'teacher', 'admin', 'head', 'registrar'];

export const RoleManagementScreen = () => {
  const [profiles, setProfiles] = useState<ProfileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();

  const load = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const list = await fetchProfiles();
      setProfiles(list.map((p) => ({ id: p.id, full_name: p.full_name, role: p.role as UserRole })));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChangeRole = async (id: string, role: UserRole) => {
    setSavingId(id);
    setError(undefined);
    const prev = profiles;
    setProfiles((curr) => curr.map((p) => (p.id === id ? { ...p, role } : p)));
    try {
      await updateUserRole(id, role);
    } catch (e) {
      setError((e as Error).message);
      setProfiles(prev); // revert on error
    } finally {
      setSavingId(null);
    }
  };

  const renderItem = ({ item }: { item: ProfileItem }) => (
    <View className="bg-ash rounded-2xl p-4 mb-3">
      <Text className="text-white font-semibold mb-1">{item.full_name ?? 'Unknown User'}</Text>
      <Text className="text-white/60 mb-3">{item.id}</Text>
      <View className="flex-row flex-wrap">
        {ROLE_OPTIONS.map((r) => {
          const active = item.role === r;
          return (
            <Pressable
              key={r}
              onPress={() => onChangeRole(item.id, r)}
              className={`px-3 py-2 mr-2 mb-2 rounded-full ${
                active ? 'bg-brand' : 'bg-midnight'
              }`}
            >
              <Text className={`text-sm ${active ? 'text-black' : 'text-white/80'}`}>{r}</Text>
            </Pressable>
          );
        })}
      </View>
      {savingId === item.id ? (
        <View className="flex-row items-center mt-2">
          <ActivityIndicator color="#22D3EE" />
          <Text className="text-white/70 ml-2">Saving…</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-midnight">
      <View className="px-5">
        <GradientHeader title="Role Management" subtitle="Admin only" />
      </View>
      {error ? (
        <View className="px-5">
          <Text className="text-red-400">{error}</Text>
        </View>
      ) : null}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#22D3EE" />
          <Text className="text-white/70 mt-2">Loading profiles…</Text>
        </View>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(p) => p.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

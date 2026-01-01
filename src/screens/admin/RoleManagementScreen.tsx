import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientHeader } from '../../components/GradientHeader';
import { fetchProfiles, updateProfileName, updateUserRole, UserRole } from '../../supabase/api';

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
  const [query, setQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'full_name' | 'role'>('full_name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 10;
  const [count, setCount] = useState<number>(0);

  const offset = (page - 1) * PAGE_SIZE;

  const load = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const { rows, count } = await fetchProfiles({ limit: PAGE_SIZE, offset, search: query, sortBy, sortDir });
      setProfiles(rows.map((p) => ({ id: p.id, full_name: p.full_name, role: p.role as UserRole })));
      setCount(count);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy, sortDir]);

  const onSearch = () => {
    setPage(1);
    load();
  };

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
      <View className="mb-2">
        <Text className="text-white/70 mb-1">Full name</Text>
        <TextInput
          value={item.full_name ?? ''}
          placeholder="Enter full name"
          placeholderTextColor="#94A3B8"
          onChangeText={(text) =>
            setProfiles((curr) => curr.map((p) => (p.id === item.id ? { ...p, full_name: text } : p)))
          }
          onBlur={async () => {
            if ((item.full_name ?? '')?.trim().length === 0) return;
            setSavingId(item.id);
            try {
              await updateProfileName(item.id, item.full_name ?? '');
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setSavingId(null);
            }
          }}
          className="bg-midnight rounded-xl px-3 py-2 text-white"
        />
      </View>
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
      <View className="px-5">
        <View className="bg-ash rounded-2xl p-4 mb-3">
          <Text className="text-white text-base font-semibold mb-2">Search</Text>
          <View className="flex-row items-center">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by full name or exact id"
              placeholderTextColor="#94A3B8"
              className="flex-1 bg-midnight rounded-xl px-3 py-2 text-white"
            />
            <Pressable onPress={onSearch} className="ml-2 px-3 py-2 bg-brand rounded-xl">
              <Text className="text-black font-semibold">Search</Text>
            </Pressable>
          </View>
        </View>
        <View className="bg-ash rounded-2xl p-4 mb-3">
          <Text className="text-white text-base font-semibold mb-2">Sort</Text>
          <View className="flex-row items-center mb-2">
            {(['full_name', 'role'] as const).map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setSortBy(opt)}
                className={`px-3 py-2 mr-2 rounded-xl ${sortBy === opt ? 'bg-brand' : 'bg-midnight'}`}
              >
                <Text className={`${sortBy === opt ? 'text-black' : 'text-white/80'}`}>
                  {opt === 'full_name' ? 'Name' : 'Role'}
                </Text>
              </Pressable>
            ))}
          </View>
          <View className="flex-row items-center">
            {(['asc', 'desc'] as const).map((dir) => (
              <Pressable
                key={dir}
                onPress={() => setSortDir(dir)}
                className={`px-3 py-2 mr-2 rounded-xl ${sortDir === dir ? 'bg-brand' : 'bg-midnight'}`}
              >
                <Text className={`${sortDir === dir ? 'text-black' : 'text-white/80'}`}>
                  {dir.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
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
          ListFooterComponent={() => (
            <View className="flex-row items-center justify-between mt-2">
              <Pressable
                onPress={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 bg-midnight rounded-xl"
              >
                <Text className="text-white">Prev</Text>
              </Pressable>
              <Text className="text-white/70">
                Page {page} of {Math.max(1, Math.ceil(count / PAGE_SIZE))}
              </Text>
              <Pressable
                onPress={() => setPage((p) => (p * PAGE_SIZE < count ? p + 1 : p))}
                className="px-3 py-2 bg-midnight rounded-xl"
              >
                <Text className="text-white">Next</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

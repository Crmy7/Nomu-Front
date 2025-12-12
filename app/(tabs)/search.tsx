import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/constants/config';
import { Colors } from '@/constants/theme';
import { getTokenAsync } from '@/lib/session';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const t = await getTokenAsync();
      setToken(t);
      setLoadingToken(false);
      if (!t) {
        router.replace('/login');
      }
    })();
  }, [router]);

  const handleSearch = async () => {
    if (!token || !query.trim()) return;
    try {
      setSearching(true);
      setError(null);
      const url = `${API_BASE_URL}/users/semantic-search?q=${encodeURIComponent(query.trim())}`;
      console.log('[Search] GET ->', url);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('[Search] status:', response.status);
      if (response.status === 401) {
        setError('Session expirée, veuillez vous reconnecter.');
        router.replace('/login');
        return;
      }
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }
      const data = await response.json();
      console.log('[Search] payload hits:', data?.hits?.length ?? 0);
      setResults(Array.isArray(data?.hits) ? data.hits : []);
    } catch (e: any) {
      console.error('Erreur recherche utilisateur:', e);
      setError(e?.message || 'Erreur lors de la recherche');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  if (loadingToken) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.center}>
          <ActivityIndicator />
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Recherche d'utilisateurs</ThemedText>
          <ThemedText style={styles.subtitle}>Trouvez rapidement des profils qui matchent vos besoins.</ThemedText>
        </View>

        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Mot-clé, techno, ville..."
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <Pressable
              style={({ pressed }) => [
                styles.searchButton,
                pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                (searching || !query.trim()) && { opacity: 0.6 },
              ]}
              onPress={handleSearch}
              disabled={searching || !query.trim()}
            >
              <ThemedText style={styles.searchButtonText}>{searching ? '...' : 'Rechercher'}</ThemedText>
            </Pressable>
          </View>
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        </View>

        <View style={styles.resultsContainer}>
          {searching && <ActivityIndicator />}
          {!searching && results.length === 0 && !error && (
            <ThemedText style={styles.emptyText}>Pas encore de résultats. Lancez une recherche.</ThemedText>
          )}
          {!searching && results.length > 0 && (
            <FlatList
              data={results}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <View style={styles.userCard}>
                  <View style={styles.userHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.userName}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.userRole}>{item.role}</ThemedText>
                  </View>
                  <ThemedText style={styles.userEmail}>{item.email}</ThemedText>
                  {!!item.location && (
                    <ThemedText style={styles.userLocation}>{item.location}</ThemedText>
                  )}
                  {item.bio ? (
                    <ThemedText numberOfLines={2} style={styles.userBio}>
                      {item.bio}
                    </ThemedText>
                  ) : null}
                </View>
              )}
            />
          )}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 18,
  },
  header: {
    gap: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  searchCard: {
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#262B33',
    borderWidth: 1,
    borderColor: '#374151',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 0,
    backgroundColor: '#111827',
    color: '#F9FAFB',
  },
  searchButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#FF6A57',
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  userCard: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    gap: 4,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
  },
  userRole: {
    fontSize: 13,
    color: '#F97373',
  },
  userEmail: {
    fontSize: 13,
    opacity: 0.9,
  },
  userLocation: {
    fontSize: 12,
    opacity: 0.75,
  },
  userBio: {
    opacity: 0.8,
    marginTop: 6,
  },
  error: {
    color: '#f97373',
  },
  emptyText: {
    opacity: 0.8,
  },
});

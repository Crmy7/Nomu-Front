import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import {
  MusicNotes,
  Football,
  GameController,
  ForkKnife,
  AirplaneTilt,
  CameraRotate,
} from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.5;
const CARD_HEIGHT = CARD_WIDTH * (1 / 1.2);
const CATEGORY_ICON_SIZE = CARD_HEIGHT * 0.5;
const SUGGESTION_CARD_WIDTH = SCREEN_WIDTH * 0.4;

const destinations = [
  {
    id: '1',
    name: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80',
  },
  {
    id: '2',
    name: 'Italy',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80',
  },
  {
    id: '3',
    name: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
  },
  {
    id: '4',
    name: 'Thailand',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80',
  },
  {
    id: '5',
    name: 'Morocco',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&q=80',
  },
];

const categories = [
  { id: '1', name: 'Musique', Icon: MusicNotes },
  { id: '2', name: 'Sport', Icon: Football },
  { id: '3', name: 'Jeux', Icon: GameController },
  { id: '4', name: 'Food', Icon: ForkKnife },
  { id: '5', name: 'Voyage', Icon: AirplaneTilt },
  { id: '6', name: 'Photo', Icon: CameraRotate },
];

const suggestions = [
  {
    id: '1',
    name: 'Sophie',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    categoryIcon: MusicNotes,
    flag: 'https://hatscripts.github.io/circle-flags/flags/fr.svg',
  },
  {
    id: '2',
    name: 'Marco',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    categoryIcon: Football,
    flag: 'https://hatscripts.github.io/circle-flags/flags/it.svg',
  },
  {
    id: '3',
    name: 'Yuki',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    categoryIcon: CameraRotate,
    flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg',
  },
  {
    id: '4',
    name: 'Ahmed',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    categoryIcon: ForkKnife,
    flag: 'https://hatscripts.github.io/circle-flags/flags/ma.svg',
  },
  {
    id: '5',
    name: 'Emma',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    categoryIcon: AirplaneTilt,
    flag: 'https://hatscripts.github.io/circle-flags/flags/th.svg',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const renderDestinationCard = ({ item }: { item: typeof destinations[0] }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.cardOverlay} />
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <View style={styles.categoryItem}>
      <View style={[styles.categoryIcon, { borderColor: colors.primary }]}>
        <item.Icon size={CATEGORY_ICON_SIZE * 0.45} color={colors.primary} weight="regular" />
      </View>
      <Text style={[styles.categoryText, { color: colors.text }]}>{item.name}</Text>
    </View>
  );

  const renderSuggestionCard = ({ item }: { item: typeof suggestions[0] }) => (
    <View style={styles.suggestionCard}>
      <View style={styles.suggestionImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.suggestionImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.suggestionOverlay} />
        <View style={[styles.suggestionBadge, styles.categoryBadge, { borderColor: colors.primary }]}>
          <item.categoryIcon size={14} color={colors.primary} weight="regular" />
        </View>
        <View style={[styles.flagBadgeContainer, { borderColor: colors.primary }]}>
          <Image
            source={{ uri: item.flag }}
            style={styles.flagImage}
            contentFit="cover"
          />
        </View>
        <Text style={styles.suggestionName}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.heroContainer, { height: 280 + insets.top }]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80' }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay}>
            <LinearGradient
              colors={['rgba(255, 106, 87, 0.6)', 'transparent']}
              style={styles.heroOverlayTop}
            />
            <LinearGradient
              colors={['transparent', 'rgba(255, 106, 87, 0.6)']}
              style={styles.heroOverlayBottom}
            />
            <LinearGradient
              colors={['rgba(255, 106, 87, 0.3)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroOverlayLeft}
            />
            <LinearGradient
              colors={['transparent', 'rgba(255, 106, 87, 0.3)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroOverlayRight}
            />
          </View>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              NOMU
            </Text>
            <View style={styles.heroTagline}>
              <View style={styles.heroLine} />
              <Text style={styles.heroSubtitle}>
                Real people, real meet
              </Text>
              <View style={styles.heroLine} />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          Our destinations
        </Text>
        <FlatList
          data={destinations}
          renderItem={renderDestinationCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          scrollEnabled={true}
        />

        <Text style={[styles.sectionTitle, { color: colors.primary, marginTop: 24 }]}>
          Catégories
        </Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          scrollEnabled={true}
        />

        <Text style={[styles.sectionTitle, { color: colors.primary, marginTop: 24 }]}>
          Suggestions for you
        </Text>
        <FlatList
          data={suggestions}
          renderItem={renderSuggestionCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          scrollEnabled={true}
        />
        <View style={{ height: 24 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  heroOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  heroOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  heroOverlayLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 60,
  },
  heroOverlayRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 60,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 6,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroTagline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  heroLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: CATEGORY_ICON_SIZE,
    height: CATEGORY_ICON_SIZE,
    borderRadius: CATEGORY_ICON_SIZE / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  suggestionCard: {
    width: SUGGESTION_CARD_WIDTH,
  },
  suggestionImageContainer: {
    width: SUGGESTION_CARD_WIDTH,
    height: SUGGESTION_CARD_WIDTH,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  suggestionImage: {
    width: '100%',
    height: '100%',
  },
  suggestionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  suggestionName: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  suggestionBadge: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  categoryBadge: {
    top: 8,
    left: 8,
  },
  flagBadgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
});

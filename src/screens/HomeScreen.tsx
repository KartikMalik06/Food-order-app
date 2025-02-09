import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {
  MapPin,
  User,
  Search,
  ChevronDown,
  Star,
  Bell,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  SHADOWS,
  commonStyles,
  screenWidth,
} from '../styles/common';
import {useHomeController} from '../hooks/useHomeController';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [address, setAddress] = useState({
    flatNo: 'B-501',
    location: 'ILD Green',
    area: 'Sector 37C gurugram',
  });

  const scrollX = useRef(new Animated.Value(0)).current;
  const bannerScrollRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const {loading, error, banners, filters, restaurants, refreshData} =
    useHomeController();

  const renderRestaurantCard = restaurant => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantCard}
      activeOpacity={0.95}
      onPress={() => navigation.navigate('RestaurantDetail', {restaurant})}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: restaurant.image}}
          style={styles.restaurantImage}
        />
        {restaurant.promoted && (
          <View style={styles.promotedBadge}>
            <Text style={styles.promotedText}>Promoted</Text>
          </View>
        )}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{restaurant.discount}</Text>
          <Text style={styles.upToText}>Up to ₹{restaurant.upTo}</Text>
        </View>
        <View style={styles.deliveryTimeBadge}>
          <Text style={styles.deliveryTimeText}>{restaurant.time}</Text>
        </View>
      </View>

      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={commonStyles.ratingContainer}>
            <Star size={14} color={COLORS.secondary} fill={COLORS.secondary} />
            <Text style={commonStyles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
        <View style={commonStyles.row}>
          <MapPin size={14} color={COLORS.text.secondary} />
          <Text style={styles.locationText}>{restaurant.location}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.distanceText}>{restaurant.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.locationButton} activeOpacity={0.7}>
              <View style={commonStyles.row}>
                <MapPin size={20} color={COLORS.primary} />
                <View style={styles.addressContainer}>
                  <Text style={styles.flatNo}>
                    {address.flatNo}, {address.location}
                  </Text>
                  <Text style={styles.area}>{address.area}</Text>
                </View>
                <ChevronDown size={20} color={COLORS.text.primary} />
              </View>
            </TouchableOpacity>
            <View style={commonStyles.row}>
              <TouchableOpacity style={commonStyles.iconButton}>
                <Bell size={20} color={COLORS.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.iconButton, {marginLeft: SPACING.sm}]}>
                <User size={20} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            style={commonStyles.searchBar}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Search')}>
            <Search
              size={20}
              color={COLORS.text.secondary}
              style={{marginRight: SPACING.sm}}
            />
            <Text style={{color: COLORS.text.secondary}}>
              Search for restaurants, cuisines...
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.activeFilterButton,
              ]}
              onPress={() =>
                setActiveFilter(filter.id === activeFilter ? null : filter.id)
              }>
              <Text style={styles.filterIcon}>{filter.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.activeFilterText,
                ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner Carousel */}
        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}>
            {banners.map((image, index) => (
              <View key={index} style={styles.bannerImageContainer}>
                <Image
                  source={{uri: image}}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.paginationDots}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      index === Math.round(scrollX._value / screenWidth)
                        ? COLORS.primary
                        : COLORS.gray[200],
                    marginHorizontal: 4,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Restaurant List */}
        <View style={commonStyles.listContainer}>
          <Text style={commonStyles.title}>Popular Restaurants</Text>
          {restaurants.map(restaurant => renderRestaurantCard(restaurant))}
        </View>
      </ScrollView>

      {loading ? (
        <View style={commonStyles.loaderContainer}>
          <View style={commonStyles.loaderWrapper}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    ...commonStyles.spaceBetween,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  locationButton: {
    flex: 1,
    marginRight: SPACING.lg,
  },
  addressContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
    marginRight: SPACING.xs,
  },
  flatNo: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  area: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  filtersContainer: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtersContent: {
    paddingHorizontal: SPACING.md,
  },
  filterButton: {
    ...commonStyles.row,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.gray[50],
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterIcon: {
    fontSize: FONT_SIZE.lg,
    marginRight: SPACING.xs,
  },
  filterText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: COLORS.text.light,
  },
  bannerContainer: {
    height: 180,
    marginVertical: SPACING.lg,
  },
  bannerImageContainer: {
    width: screenWidth,
    height: 180,
    paddingHorizontal: SPACING.lg,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.lg,
  },
  paginationDots: {
    ...commonStyles.row,
    position: 'absolute',
    bottom: SPACING.lg,
    alignSelf: 'center',
  },
  restaurantCard: {
    ...commonStyles.card,
  },
  imageContainer: {
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
  },
  promotedBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  promotedText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.small,
  },
  discountText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  upToText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  deliveryTimeBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.xs,
  },
  deliveryTimeText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  restaurantInfo: {
    padding: SPACING.lg,
  },
  restaurantHeader: {
    ...commonStyles.spaceBetween,
    marginBottom: SPACING.sm,
  },
  restaurantName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  cuisineText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  locationText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  dot: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginHorizontal: SPACING.xs,
  },
  distanceText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  retryButton: {
    ...commonStyles.button,
    paddingHorizontal: SPACING.xl,
  },
  retryButtonText: {
    ...commonStyles.buttonText,
  },
});

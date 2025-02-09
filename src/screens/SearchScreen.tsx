import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Search, ArrowLeft, Star} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  commonStyles,
} from '../styles/common';
import {useSearchController} from '../hooks/useSearchController';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('restaurants');
  const {loading, error, searchResults, searchData} = useSearchController();

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchData(searchQuery);
    }
  }, [searchQuery]);

  const renderRestaurantItem = ({item}) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() =>
        navigation.navigate('RestaurantDetail', {restaurant: item})
      }>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={commonStyles.subtitle}>{item.name}</Text>
        <View style={commonStyles.ratingContainer}>
          <Star size={16} color={COLORS.secondary} fill={COLORS.secondary} />
          <Text style={commonStyles.ratingText}>{item.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={commonStyles.text}>{item.cuisine}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDishItem = ({item}) => (
    <TouchableOpacity
      style={styles.dishItem}
      onPress={() =>
        navigation.navigate('RestaurantDetail', {
          restaurant: searchResults.restaurants.find(
            r => r.name === item.restaurant,
          ),
        })
      }>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={commonStyles.subtitle}>{item.name}</Text>
        <Text style={commonStyles.text}>{item.restaurant}</Text>
        <View style={commonStyles.ratingContainer}>
          <Star size={16} color={COLORS.secondary} fill={COLORS.secondary} />
          <Text style={commonStyles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={commonStyles.iconButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <ArrowLeft size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Search
            size={20}
            color={COLORS.text.secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for restaurants, dishes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholderTextColor={COLORS.text.secondary}
          />
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]}
          onPress={() => setActiveTab('restaurants')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'restaurants' && styles.activeTabText,
            ]}>
            Restaurants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dishes' && styles.activeTab]}
          onPress={() => setActiveTab('dishes')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'dishes' && styles.activeTabText,
            ]}>
            Dishes
          </Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={[commonStyles.container, commonStyles.center]}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => searchData(searchQuery)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={
            activeTab === 'restaurants'
              ? searchResults.restaurants
              : searchResults.dishes
          }
          renderItem={
            activeTab === 'restaurants' ? renderRestaurantItem : renderDishItem
          }
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={commonStyles.listContainer}
          ListEmptyComponent={
            searchQuery.length > 0 && (
              <View style={[commonStyles.container, commonStyles.center]}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            )
          }
        />
      )}

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
  header: {
    ...commonStyles.header,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginLeft: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  tabs: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    marginRight: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  restaurantItem: {
    ...commonStyles.card,
    flexDirection: 'row',
  },
  dishItem: {
    ...commonStyles.card,
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  dot: {
    marginHorizontal: SPACING.xs,
    color: COLORS.text.secondary,
  },
  time: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  location: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: SPACING.xs,
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
  emptyText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
  },
});

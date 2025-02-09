import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EmptyState} from '../components/common/EmptyState';
import {BannerCarousel} from '../components/home/BannerCarousel';
import {Header} from '../components/home/Header';
import {QuickFilters} from '../components/home/QuickFilters';
import {RestaurantCard} from '../components/home/RestaurantCard';
import {useHomeController} from '../hooks/useHomeController';
import {COLORS, SPACING, commonStyles} from '../styles/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    loading,
    error,
    banners,
    filters,
    restaurants,
    activeFilter,
    address,
    refreshData,
    handleFilterPress,
  } = useHomeController();

  const handleRestaurantPress = restaurant => {
    navigation.navigate('RestaurantDetail', {restaurant});
  };

  const renderHeader = () => (
    <>
      <QuickFilters
        filters={filters}
        activeFilter={activeFilter}
        onFilterPress={handleFilterPress}
      />
      <BannerCarousel banners={banners} />
      <View style={commonStyles.listContainer}>
        <Text style={commonStyles.title}>Popular Restaurants</Text>
      </View>
    </>
  );

  if (loading) {
    return (
      <View style={commonStyles.loaderContainer}>
        <View style={commonStyles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <EmptyState
        message={error}
        buttonText="Retry"
        onButtonPress={refreshData}
      />
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />

      <View style={styles.stickyHeader}>
        <Header address={address} />
      </View>

      <FlatList
        data={restaurants}
        renderItem={({item}) => (
          <RestaurantCard restaurant={item} onPress={handleRestaurantPress} />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: SPACING.xl,
  },
  stickyHeader: {
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 1000,
  },
});

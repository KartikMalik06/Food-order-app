import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {COLORS, commonStyles} from '../styles/common';
import {useSearchController} from '../hooks/useSearchController';
import {Header} from '../components/search/Header';
import {TabBar} from '../components/search/TabBar';
import {RestaurantItem} from '../components/search/RestaurantItem';
import {DishItem} from '../components/search/DishItem';
import {EmptyState} from '../components/search/EmptyState';

export default function SearchScreen() {
  const {
    loading,
    error,
    searchQuery,
    activeTab,
    searchResults,
    handleSearchChange,
    handleTabChange,
    handleRestaurantPress,
    handleDishPress,
  } = useSearchController();

  if (loading) {
    return (
      <View style={commonStyles.loaderContainer}>
        <View style={commonStyles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      <FlatList
        data={
          activeTab === 'restaurants'
            ? searchResults.restaurants
            : searchResults.dishes
        }
        renderItem={({item}) =>
          activeTab === 'restaurants' ? (
            <RestaurantItem restaurant={item} onPress={handleRestaurantPress} />
          ) : (
            <DishItem dish={item} onPress={handleDishPress} />
          )
        }
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={commonStyles.listContainer}
        ListEmptyComponent={
          searchQuery.length > 0 && <EmptyState message="No results found" />
        }
      />
    </View>
  );
}

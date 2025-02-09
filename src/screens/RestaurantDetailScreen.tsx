import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {COLORS, commonStyles} from '../styles/common';
import {useRestaurantController} from '../hooks/useRestaurantController';
import {Header} from '../components/restaurant/Header';
import {RestaurantInfo} from '../components/restaurant/RestaurantInfo';
import {MenuItem} from '../components/restaurant/MenuItem';
import {ViewCartButton} from '../components/restaurant/ViewCartButton';
import {EmptyState} from '../components/common/EmptyState';

export default function RestaurantDetailScreen({route}) {
  const {restaurant: initialRestaurant} = route.params;
  const {
    loading,
    error,
    restaurant,
    menuItems,
    cartItems,
    cartTotal,
    viewCartAnimation,
    refreshData,
    getItemQuantity,
    handleAddToCart,
    handleUpdateQuantity,
    handleViewCart,
  } = useRestaurantController(initialRestaurant.id);

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Header name={restaurant.name} rating={restaurant.rating} />

      <RestaurantInfo
        location={restaurant.location}
        time={restaurant.time}
        discount={restaurant.discount}
        upTo={restaurant.upTo}
      />

      <ScrollView style={styles.menuList}>
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            quantity={getItemQuantity(item.id)}
            onUpdateQuantity={handleUpdateQuantity}
            onAddToCart={handleAddToCart}
          />
        ))}
      </ScrollView>

      <ViewCartButton
        itemCount={cartItems.length}
        total={cartTotal}
        onPress={handleViewCart}
        animation={viewCartAnimation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  menuList: {
    flex: 1,
  },
});

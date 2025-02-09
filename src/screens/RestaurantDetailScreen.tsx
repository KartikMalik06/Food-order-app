import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, updateQuantity} from '../redux/cartSlice';
import {
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  Plus,
  Minus,
  Utensils,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import type {RootState} from '../redux/store';
import {useRestaurantController} from '../hooks/useRestaurantController';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  commonStyles,
} from '../styles/common';

export default function RestaurantDetailScreen({route}) {
  const {restaurant: initialRestaurant} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.total);
  const [viewCartAnimation] = useState(new Animated.Value(0));

  const {loading, error, restaurant, menuItems, refreshData} =
    useRestaurantController(initialRestaurant.id);

  useEffect(() => {
    if (cartItems.length > 0) {
      Animated.spring(viewCartAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(viewCartAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [cartItems.length]);

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = item => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      }),
    );
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    dispatch(updateQuantity({id: itemId, quantity: newQuantity}));
  };

  const handleViewCart = () => {
    navigation.navigate('Checkout');
  };

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
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF4444" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#fff" fill="#fff" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#666" />
          <Text style={styles.infoText}>{restaurant.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color="#666" />
          <Text style={styles.infoText}>{restaurant.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Utensils size={16} color="#666" />
          <Text style={styles.infoText}>Pure Veg</Text>
        </View>
      </View>

      {restaurant.discount && (
        <View style={styles.offerBanner}>
          <Text style={styles.offerText}>
            🏷️ {restaurant.discount} on orders above ₹{restaurant.upTo}
          </Text>
        </View>
      )}

      {/* Menu Items */}
      <ScrollView style={styles.menuList}>
        {menuItems.map(item => (
          <View key={item.id} style={styles.menuItem}>
            <View style={styles.itemContent}>
              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View
                    style={[
                      styles.vegBadge,
                      {backgroundColor: item.isVeg ? '#22c55e' : '#ef4444'},
                    ]}>
                    <Text style={styles.vegText}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{item.price}</Text>
                  {getItemQuantity(item.id) > 0 ? (
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          handleUpdateQuantity(
                            item.id,
                            getItemQuantity(item.id) - 1,
                          )
                        }>
                        <Minus size={16} color="#22c55e" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {getItemQuantity(item.id)}
                      </Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          handleUpdateQuantity(
                            item.id,
                            getItemQuantity(item.id) + 1,
                          )
                        }>
                        <Plus size={16} color="#22c55e" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item)}>
                      <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.itemImageContainer}>
                <Image source={{uri: item.image}} style={styles.itemImage} />
                {item.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                    <Text style={styles.upToText}>Upto ₹{item.upTo}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* View Cart Button */}
      <Animated.View
        style={[
          styles.viewCartContainer,
          {
            transform: [
              {
                translateY: viewCartAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          },
        ]}>
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={handleViewCart}>
            <View style={styles.cartInfo}>
              <Text style={styles.cartItemCount}>
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </Text>
              <Text style={styles.cartTotal}>₹{cartTotal}</Text>
            </View>
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF4444',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  offerBanner: {
    backgroundColor: '#FFF8F6',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  offerText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemDetails: {
    flex: 1,
    marginRight: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  vegBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  vegText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#22c55e',
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  addButtonText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
  },
  itemImageContainer: {
    width: 100,
    position: 'relative',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#FF4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  upToText: {
    color: '#666',
    fontSize: 10,
  },
  viewCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  viewCartButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemCount: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  cartTotal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

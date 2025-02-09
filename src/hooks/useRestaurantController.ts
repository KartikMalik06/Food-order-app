import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addToCart, updateQuantity} from '../redux/cartSlice';
import {MOCK_DATA} from '../data/mockData';
import type {RootState} from '../redux/store';
import {Animated} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

export const useRestaurantController = (restaurantId: number) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.total);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [viewCartAnimation] = useState(new Animated.Value(0));

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      const restaurantData = MOCK_DATA.restaurants.find(
        r => r.id === restaurantId,
      );
      const restaurantMenuItems = MOCK_DATA.menuItems.filter(
        item => item.restaurantId === restaurantId,
      );

      if (!restaurantData) {
        throw new Error('Restaurant not found');
      }

      setRestaurant(restaurantData);
      setMenuItems(restaurantMenuItems);
      setError(null);
    } catch (err) {
      setError('Failed to fetch restaurant data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [restaurantId]);

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

  return {
    loading,
    error,
    restaurant,
    menuItems,
    cartItems,
    cartTotal,
    viewCartAnimation,
    refreshData: fetchRestaurantData,
    getItemQuantity,
    handleAddToCart,
    handleUpdateQuantity,
    handleViewCart,
  };
};

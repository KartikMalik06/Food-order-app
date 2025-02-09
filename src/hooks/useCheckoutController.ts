import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {updateQuantity, clearCart} from '../redux/cartSlice';
import type {RootState} from '../redux/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

export const useCheckoutController = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const deliveryCharge = 0;
  const gst = Math.round(total * 0.05);
  const finalTotal = total + deliveryCharge + gst;

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    dispatch(updateQuantity({id: itemId, quantity: newQuantity}));
  };

  const handleRemoveItem = (itemId: number, itemName: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${itemName} from your cart?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => dispatch(updateQuantity({id: itemId, quantity: 0})),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const applyCoupon = async (code: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (code === 'WELCOME50') {
        return {valid: true, discount: 50, maxDiscount: 100};
      }
      return {valid: false, message: 'Invalid coupon code'};
    } catch (err) {
      setError('Failed to apply coupon');
      return {valid: false, message: 'Failed to apply coupon'};
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    const result = await applyCoupon(couponCode);
    if (result.valid) {
      Alert.alert(
        'Success',
        `Coupon applied successfully! You saved ₹${result.discount}`,
      );
    } else {
      Alert.alert('Error', result.message || 'Invalid coupon code');
    }
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        items: cartItems,
        total: finalTotal,
        paymentMethod: selectedPayment,
        couponCode,
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const orderId = 'ORD' + Math.random().toString(36).substr(2, 9);
      dispatch(clearCart());
      navigation.navigate('OrderConfirmation', {orderId});
      return {success: true, orderId};
    } catch (err) {
      setError('Failed to place order');
      Alert.alert('Error', 'Failed to place order');
      return {success: false, message: 'Failed to place order'};
    } finally {
      setLoading(false);
    }
  };

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return {
    loading,
    error,
    cartItems,
    total,
    couponCode,
    selectedPayment,
    deliveryCharge,
    gst,
    finalTotal,
    setCouponCode,
    setSelectedPayment,
    handleUpdateQuantity,
    handleRemoveItem,
    handleApplyCoupon,
    placeOrder,
    goToHome,
  };
};

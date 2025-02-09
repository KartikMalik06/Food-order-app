import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Plus,
  Minus,
  X,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
} from 'lucide-react-native';
import type {RootState} from '../redux/store';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  SHADOWS,
  commonStyles,
} from '../styles/common';
import {useCheckoutController} from '../hooks/useCheckoutController';
import {updateQuantity} from '../redux/cartSlice';

const PAYMENT_OPTIONS = [
  {
    id: 'card',
    title: 'Credit/Debit Card',
    icon: CreditCard,
  },
  {
    id: 'upi',
    title: 'UPI',
    icon: Smartphone,
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    icon: Building2,
  },
  {
    id: 'cod',
    title: 'Cash on Delivery',
    icon: Banknote,
  },
];

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const [couponCode, setCouponCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const {loading, error, applyCoupon, placeOrder} = useCheckoutController();

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

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    const orderData = {
      items: cartItems,
      total: finalTotal,
      paymentMethod: selectedPayment,
      couponCode,
    };

    const result = await placeOrder(orderData);
    if (result.success) {
      navigation.navigate('OrderConfirmation', {orderId: result.orderId});
    } else {
      Alert.alert('Error', result.message || 'Failed to place order');
    }
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
        <TouchableOpacity style={styles.retryButton} onPress={handlePlaceOrder}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.scrollView}>
        <Text style={commonStyles.title}>Your Order</Text>

        {cartItems.map(item => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={{uri: item.image}} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <View style={commonStyles.spaceBetween}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.id, item.name)}
                  style={styles.removeButton}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <X size={20} color={COLORS.error} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }>
                  <Minus size={16} color={COLORS.text.secondary} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }>
                  <Plus size={16} color={COLORS.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.couponContainer}>
          <Text style={commonStyles.subtitle}>Apply Coupon</Text>
          <View style={styles.couponInputContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter coupon code"
              value={couponCode}
              onChangeText={setCouponCode}
              placeholderTextColor={COLORS.text.secondary}
            />
            <TouchableOpacity
              style={[styles.applyButton, !couponCode && styles.disabledButton]}
              onPress={handleApplyCoupon}
              disabled={!couponCode}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={commonStyles.subtitle}>Payment Options</Text>
          {PAYMENT_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.paymentOption,
                selectedPayment === option.id && styles.selectedPaymentOption,
              ]}
              onPress={() => setSelectedPayment(option.id)}>
              <View style={commonStyles.row}>
                <option.icon
                  size={24}
                  color={
                    selectedPayment === option.id
                      ? COLORS.secondary
                      : COLORS.text.secondary
                  }
                />
                <Text
                  style={[
                    styles.paymentOptionText,
                    selectedPayment === option.id &&
                      styles.selectedPaymentOptionText,
                  ]}>
                  {option.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <Text style={commonStyles.subtitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{total}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Charges</Text>
            <Text style={styles.summaryValue}>₹{deliveryCharge}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST (5%)</Text>
            <Text style={styles.summaryValue}>₹{gst}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{finalTotal}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.placeOrderButton,
          cartItems.length === 0 && styles.disabledButton,
        ]}
        onPress={handlePlaceOrder}
        disabled={cartItems.length === 0 || loading}>
        <Text style={styles.placeOrderButtonText}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  itemCard: {
    ...commonStyles.card,
    flexDirection: 'row',
    padding: SPACING.lg,
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
  itemName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    flex: 1,
  },
  removeButton: {
    padding: SPACING.xs,
  },
  itemPrice: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginHorizontal: SPACING.lg,
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  couponContainer: {
    ...commonStyles.card,
  },
  couponInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    ...commonStyles.input,
    flex: 1,
    marginRight: SPACING.md,
  },
  applyButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  applyButtonText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  paymentContainer: {
    ...commonStyles.card,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    padding: SPACING.lg,
  },
  selectedPaymentOption: {
    borderColor: COLORS.secondary,
    backgroundColor: '#F0FDF4',
  },
  paymentOptionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    marginLeft: SPACING.md,
  },
  selectedPaymentOptionText: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  summaryContainer: {
    ...commonStyles.card,
    marginBottom: 100,
  },
  summaryRow: {
    ...commonStyles.spaceBetween,
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
  },
  summaryValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.lg,
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
  emptyCartText: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
  },
  continueShoppingButton: {
    ...commonStyles.button,
    paddingHorizontal: SPACING.xxl,
  },
  continueShoppingText: {
    ...commonStyles.buttonText,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

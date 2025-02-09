import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {COLORS, commonStyles, SPACING} from '../styles/common';
import {useCheckoutController} from '../hooks/useCheckoutController';
import {Header} from '../components/checkout/Header';
import {CartItem} from '../components/checkout/CartItem';
import {CouponSection} from '../components/checkout/CouponSection';
import {PaymentOptions} from '../components/checkout/PaymentOptions';
import {OrderSummary} from '../components/checkout/OrderSummary';
import {PlaceOrderButton} from '../components/checkout/PlaceOrderButton';
import {EmptyState} from '../components/common/EmptyState';

export default function CheckoutScreen() {
  const {
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
  } = useCheckoutController();

  if (loading) {
    return (
      <View style={commonStyles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <EmptyState
        message={error}
        buttonText="Retry"
        onButtonPress={placeOrder}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        message="Your cart is empty"
        buttonText="Continue Shopping"
        onButtonPress={goToHome}
      />
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <Header />

      <FlatList
        data={[
          {type: 'items', data: cartItems},
          {type: 'coupon'},
          {type: 'payment'},
          {type: 'summary'},
        ]}
        keyExtractor={(item, index) => `section-${index}`}
        renderItem={({item: section}) => {
          switch (section.type) {
            case 'coupon':
              return (
                <CouponSection
                  couponCode={couponCode}
                  onCouponChange={setCouponCode}
                  onApplyCoupon={handleApplyCoupon}
                />
              );
            case 'items':
              return (
                <View>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </View>
              );
            case 'payment':
              return (
                <PaymentOptions
                  selectedPayment={selectedPayment}
                  onSelectPayment={setSelectedPayment}
                />
              );
            case 'summary':
              return (
                <OrderSummary
                  total={total}
                  deliveryCharge={deliveryCharge}
                  gst={gst}
                  finalTotal={finalTotal}
                />
              );
            default:
              return null;
          }
        }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />

      <PlaceOrderButton
        loading={loading}
        disabled={cartItems.length === 0}
        finalTotal={finalTotal}
        onPress={placeOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
});

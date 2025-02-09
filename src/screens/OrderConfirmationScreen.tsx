import {Check, Clock} from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EmptyState} from '../components/common/EmptyState';
import {BackToHomeButton} from '../components/order/BackToHomeButton';
import {OrderStatus} from '../components/order/OrderStatus';
import {useOrderController} from '../hooks/useOrderController';
import {
  BORDER_RADIUS,
  COLORS,
  commonStyles,
  FONT_SIZE,
  SPACING,
} from '../styles/common';

export default function OrderConfirmationScreen({route}) {
  const {orderId} = route.params;
  const {
    loading,
    error,
    orderStatus,
    getStatusIndex,
    handleBackToHome,
    refreshStatus,
  } = useOrderController(orderId);

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
        onButtonPress={refreshStatus}
      />
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Check size={40} color={COLORS.text.light} />
        </View>

        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.message}>
          Your order has been successfully placed and will be delivered soon.
        </Text>

        <View style={styles.orderInfo}>
          <View style={commonStyles.row}>
            <Clock size={20} color={COLORS.text.secondary} />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Estimated Delivery Time</Text>
              <Text style={styles.infoValue}>30-45 minutes</Text>
            </View>
          </View>

          <OrderStatus
            orderStatus={orderStatus}
            statusIndex={getStatusIndex()}
          />
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1531171673193-d52fd0429c7d?w=800&auto=format&fit=crop&q=60',
          }}
          style={styles.deliveryImage}
        />
      </View>

      <BackToHomeButton onPress={handleBackToHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.secondary,
    ...commonStyles.center,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SPACING.lg,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
  },
  orderInfo: {
    width: '100%',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  infoText: {
    marginLeft: SPACING.md,
  },
  infoLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  infoValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  deliveryImage: {
    width: 200,
    height: 200,
    borderRadius: BORDER_RADIUS.round,
    marginBottom: SPACING.xxxl,
  },
});

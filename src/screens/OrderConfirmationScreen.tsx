import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Check, Home, Clock} from 'lucide-react-native';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  commonStyles,
} from '../styles/common';
import {useOrderController} from '../hooks/useOrderController';

export default function OrderConfirmationScreen({route}) {
  const navigation = useNavigation();
  const {orderId} = route.params;
  const {loading, error, orderStatus, refreshStatus} =
    useOrderController(orderId);

  const getStatusIndex = () => {
    const statuses = ['confirmed', 'preparing', 'on-the-way', 'delivered'];
    return statuses.indexOf(orderStatus);
  };

  if (error) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshStatus}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
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

          <View style={styles.orderStatus}>
            <View style={styles.statusStep}>
              <View style={[styles.statusDot, styles.activeDot]} />
              <Text
                style={[
                  styles.statusText,
                  getStatusIndex() >= 0 && styles.activeStatusText,
                ]}>
                Order Confirmed
              </Text>
            </View>
            <View
              style={[
                styles.statusLine,
                getStatusIndex() >= 1 && styles.activeLine,
              ]}
            />
            <View style={styles.statusStep}>
              <View
                style={[
                  styles.statusDot,
                  getStatusIndex() >= 1 && styles.activeDot,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  getStatusIndex() >= 1 && styles.activeStatusText,
                ]}>
                Being Prepared
              </Text>
            </View>
            <View
              style={[
                styles.statusLine,
                getStatusIndex() >= 2 && styles.activeLine,
              ]}
            />
            <View style={styles.statusStep}>
              <View
                style={[
                  styles.statusDot,
                  getStatusIndex() >= 2 && styles.activeDot,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  getStatusIndex() >= 2 && styles.activeStatusText,
                ]}>
                On the Way
              </Text>
            </View>
            <View
              style={[
                styles.statusLine,
                getStatusIndex() >= 3 && styles.activeLine,
              ]}
            />
            <View style={styles.statusStep}>
              <View
                style={[
                  styles.statusDot,
                  getStatusIndex() >= 3 && styles.activeDot,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  getStatusIndex() >= 3 && styles.activeStatusText,
                ]}>
                Delivered
              </Text>
            </View>
          </View>
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1531171673193-d52fd0429c7d?w=800&auto=format&fit=crop&q=60',
          }}
          style={styles.deliveryImage}
        />
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}>
        <Home size={20} color={COLORS.text.light} />
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>

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
  orderStatus: {
    width: '100%',
    marginTop: SPACING.xl,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.md,
  },
  activeDot: {
    backgroundColor: COLORS.secondary,
  },
  upcomingDot: {
    backgroundColor: COLORS.gray[200],
  },
  statusLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.gray[200],
    marginLeft: 7,
  },
  activeLine: {
    backgroundColor: COLORS.secondary,
  },
  statusText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
  },
  deliveryImage: {
    width: 200,
    height: 200,
    borderRadius: BORDER_RADIUS.round,
    marginBottom: SPACING.xxxl,
  },
  homeButton: {
    ...commonStyles.button,
    backgroundColor: COLORS.primary,
    margin: SPACING.lg,
  },
  homeButtonText: {
    ...commonStyles.buttonText,
    marginLeft: SPACING.sm,
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
  activeStatusText: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, commonStyles } from '../../styles/common';

interface OrderSummaryProps {
  total: number;
  deliveryCharge: number;
  gst: number;
  finalTotal: number;
}

export const OrderSummary = ({ total, deliveryCharge, gst, finalTotal }: OrderSummaryProps) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    ...commonStyles.card,
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
});
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {COLORS, SPACING, FONT_SIZE, BORDER_RADIUS} from '../../styles/common';

interface PlaceOrderButtonProps {
  loading: boolean;
  disabled: boolean;
  finalTotal: number;
  onPress: () => void;
}

export const PlaceOrderButton = ({
  loading,
  disabled,
  finalTotal,
  onPress,
}: PlaceOrderButtonProps) => {
  return (
    <View style={styles.stickyFooter}>
      <TouchableOpacity
        style={[styles.placeOrderButton, disabled && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled || loading}>
        <Text style={styles.placeOrderButtonText}>
          {loading ? 'Placing Order...' : `Place Order • ₹${finalTotal}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  placeOrderButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

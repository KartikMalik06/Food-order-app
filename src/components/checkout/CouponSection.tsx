import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, commonStyles } from '../../styles/common';

interface CouponSectionProps {
  couponCode: string;
  onCouponChange: (code: string) => void;
  onApplyCoupon: () => void;
}

export const CouponSection = ({ couponCode, onCouponChange, onApplyCoupon }: CouponSectionProps) => {
  return (
    <View style={styles.couponContainer}>
      <Text style={commonStyles.subtitle}>Apply Coupon</Text>
      <View style={styles.couponInputContainer}>
        <TextInput
          style={styles.couponInput}
          placeholder="Enter coupon code"
          value={couponCode}
          onChangeText={onCouponChange}
          placeholderTextColor={COLORS.text.secondary}
        />
        <TouchableOpacity 
          style={[
            styles.applyButton,
            !couponCode && styles.disabledButton
          ]}
          onPress={onApplyCoupon}
          disabled={!couponCode}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  disabledButton: {
    opacity: 0.5,
  },
});
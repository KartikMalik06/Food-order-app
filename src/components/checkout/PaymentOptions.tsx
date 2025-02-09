import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CreditCard, Smartphone, Building2, Banknote } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, commonStyles } from '../../styles/common';

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

interface PaymentOptionsProps {
  selectedPayment: string;
  onSelectPayment: (id: string) => void;
}

export const PaymentOptions = ({ selectedPayment, onSelectPayment }: PaymentOptionsProps) => {
  return (
    <View style={styles.paymentContainer}>
      <Text style={commonStyles.subtitle}>Payment Options</Text>
      {PAYMENT_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.paymentOption,
            selectedPayment === option.id && styles.selectedPaymentOption,
          ]}
          onPress={() => onSelectPayment(option.id)}
        >
          <View style={commonStyles.row}>
            <option.icon
              size={24}
              color={selectedPayment === option.id ? COLORS.secondary : COLORS.text.secondary}
            />
            <Text
              style={[
                styles.paymentOptionText,
                selectedPayment === option.id && styles.selectedPaymentOptionText,
              ]}
            >
              {option.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
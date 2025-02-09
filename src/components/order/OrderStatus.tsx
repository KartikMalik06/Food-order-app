import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SPACING, FONT_SIZE, BORDER_RADIUS} from '../../styles/common';

interface OrderStatusProps {
  orderStatus: string;
  statusIndex: number;
}

export const OrderStatus = ({orderStatus, statusIndex}: OrderStatusProps) => {
  return (
    <View style={styles.orderStatus}>
      <StatusStep
        title="Order Confirmed"
        isActive={statusIndex >= 0}
        showLine={true}
      />
      <StatusStep
        title="Being Prepared"
        isActive={statusIndex >= 1}
        showLine={true}
      />
      <StatusStep
        title="On the Way"
        isActive={statusIndex >= 2}
        showLine={true}
      />
      <StatusStep
        title="Delivered"
        isActive={statusIndex >= 3}
        showLine={false}
      />
    </View>
  );
};

interface StatusStepProps {
  title: string;
  isActive: boolean;
  showLine: boolean;
}

const StatusStep = ({title, isActive, showLine}: StatusStepProps) => (
  <>
    <View style={styles.statusStep}>
      <View style={[styles.statusDot, isActive && styles.activeDot]} />
      <Text style={[styles.statusText, isActive && styles.activeStatusText]}>
        {title}
      </Text>
    </View>
    {showLine && (
      <View style={[styles.statusLine, isActive && styles.activeLine]} />
    )}
  </>
);

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.gray[200],
    marginRight: SPACING.md,
  },
  activeDot: {
    backgroundColor: COLORS.secondary,
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
  activeStatusText: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
});

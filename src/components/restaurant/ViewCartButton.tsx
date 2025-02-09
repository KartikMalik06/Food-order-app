import React from 'react';
import {TouchableOpacity, View, Text, Animated, StyleSheet} from 'react-native';
import {COLORS, SPACING, FONT_SIZE, BORDER_RADIUS} from '../../styles/common';

interface ViewCartButtonProps {
  itemCount: number;
  total: number;
  onPress: () => void;
  animation: Animated.Value;
}

export const ViewCartButton = ({
  itemCount,
  total,
  onPress,
  animation,
}: ViewCartButtonProps) => {
  return (
    <Animated.View
      style={[
        styles.viewCartContainer,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        },
      ]}>
      {itemCount > 0 && (
        <TouchableOpacity style={styles.viewCartButton} onPress={onPress}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartItemCount}>
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </Text>
            <Text style={styles.cartTotal}>₹{total}</Text>
          </View>
          <Text style={styles.viewCartText}>View Cart</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  viewCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  viewCartButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemCount: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.md,
  },
  cartTotal: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
  },
  viewCartText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
  },
});

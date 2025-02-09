import {Minus, Plus} from 'lucide-react-native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from '../../styles/common';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    isVeg: boolean;
    discount?: string;
    upTo?: string;
  };
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onAddToCart: (item: any) => void;
}

export const MenuItem = ({
  item,
  quantity,
  onUpdateQuantity,
  onAddToCart,
}: MenuItemProps) => {
  return (
    <View style={styles.menuItem}>
      <View style={styles.itemContent}>
        <View style={styles.itemDetails}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View
              style={[
                styles.vegBadge,
                {backgroundColor: item.isVeg ? COLORS.secondary : COLORS.error},
              ]}>
              <Text style={styles.vegText}>
                {item.isVeg ? 'Veg' : 'Non-Veg'}
              </Text>
            </View>
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            {quantity > 0 ? (
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => onUpdateQuantity(item.id, quantity - 1)}>
                  <Minus size={16} color={COLORS.secondary} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => onUpdateQuantity(item.id, quantity + 1)}>
                  <Plus size={16} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAddToCart(item)}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.itemImageContainer}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}</Text>
              <Text style={styles.upToText}>Upto ₹{item.upTo}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemDetails: {
    flex: 1,
    marginRight: SPACING.lg,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  itemName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    flex: 1,
    marginRight: SPACING.md,
  },
  vegBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  vegText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    paddingHorizontal: SPACING.lg,
  },
  addButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  addButtonText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  itemImageContainer: {
    width: 100,
    position: 'relative',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.md,
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  discountText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
  },
  upToText: {
    color: COLORS.text.secondary,
    fontSize: FONT_SIZE.xs,
  },
});

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, commonStyles } from '../../styles/common';

interface DishItemProps {
  dish: {
    id: number;
    name: string;
    restaurant: string;
    price: number;
    rating: number;
    image: string;
  };
  onPress: (dish: any) => void;
}

export const DishItem = ({ dish, onPress }: DishItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.dishItem}
      onPress={() => onPress(dish)}
    >
      <Image source={{ uri: dish.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={commonStyles.subtitle}>{dish.name}</Text>
        <Text style={commonStyles.text}>{dish.restaurant}</Text>
        <View style={commonStyles.ratingContainer}>
          <Star size={16} color={COLORS.secondary} fill={COLORS.secondary} />
          <Text style={commonStyles.ratingText}>{dish.rating}</Text>
        </View>
        <Text style={styles.price}>₹{dish.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dishItem: {
    ...commonStyles.card,
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: SPACING.xs,
  },
});
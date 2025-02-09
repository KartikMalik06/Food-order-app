import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, commonStyles } from '../../styles/common';

interface RestaurantItemProps {
  restaurant: {
    id: number;
    name: string;
    rating: number;
    time: string;
    cuisine: string;
    location: string;
    image: string;
  };
  onPress: (restaurant: any) => void;
}

export const RestaurantItem = ({ restaurant, onPress }: RestaurantItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.restaurantItem}
      onPress={() => onPress(restaurant)}
    >
      <Image source={{ uri: restaurant.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={commonStyles.subtitle}>{restaurant.name}</Text>
        <View style={commonStyles.ratingContainer}>
          <Star size={16} color={COLORS.secondary} fill={COLORS.secondary} />
          <Text style={commonStyles.ratingText}>{restaurant.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.time}>{restaurant.time}</Text>
        </View>
        <Text style={commonStyles.text}>{restaurant.cuisine}</Text>
        <Text style={styles.location}>{restaurant.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantItem: {
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
  dot: {
    marginHorizontal: SPACING.xs,
    color: COLORS.text.secondary,
  },
  time: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  location: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});
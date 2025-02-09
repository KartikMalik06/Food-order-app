import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS, commonStyles } from '../../styles/common';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  time: string;
  cuisine: string;
  location: string;
  distance: string;
  discount: string;
  upTo: string;
  image: string;
  promoted: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export const RestaurantCard = ({ restaurant, onPress }: RestaurantCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.restaurantCard}
      activeOpacity={0.95}
      onPress={() => onPress(restaurant)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
        {restaurant.promoted && (
          <View style={styles.promotedBadge}>
            <Text style={styles.promotedText}>Promoted</Text>
          </View>
        )}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{restaurant.discount}</Text>
          <Text style={styles.upToText}>Up to ₹{restaurant.upTo}</Text>
        </View>
        <View style={styles.deliveryTimeBadge}>
          <Text style={styles.deliveryTimeText}>{restaurant.time}</Text>
        </View>
      </View>
      
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={commonStyles.ratingContainer}>
            <Star size={14} color={COLORS.secondary} fill={COLORS.secondary} />
            <Text style={commonStyles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
        <View style={commonStyles.row}>
          <MapPin size={14} color={COLORS.text.secondary} />
          <Text style={styles.locationText}>{restaurant.location}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.distanceText}>{restaurant.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    ...commonStyles.card,
    marginHorizontal: SPACING.lg,
  },
  imageContainer: {
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
  },
  promotedBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
  },
  promotedText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.small,
  },
  discountText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  upToText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  deliveryTimeBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.xs,
  },
  deliveryTimeText: {
    color: COLORS.text.light,
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  restaurantInfo: {
    padding: SPACING.lg,
  },
  restaurantHeader: {
    ...commonStyles.spaceBetween,
    marginBottom: SPACING.sm,
  },
  restaurantName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  cuisineText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  locationText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  dot: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginHorizontal: SPACING.xs,
  },
  distanceText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
  },
});
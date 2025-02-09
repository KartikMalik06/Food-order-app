import {Clock, MapPin, Utensils} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from '../../styles/common';

interface RestaurantInfoProps {
  location: string;
  time: string;
  discount?: string;
  upTo?: string;
}

export const RestaurantInfo = ({
  location,
  time,
  discount,
  upTo,
}: RestaurantInfoProps) => {
  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#666" />
          <Text style={styles.infoText}>{location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color="#666" />
          <Text style={styles.infoText}>{time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Utensils size={16} color="#666" />
          <Text style={styles.infoText}>Pure Veg</Text>
        </View>
      </View>

      {discount && (
        <View style={styles.offerBanner}>
          <Text style={styles.offerText}>
            🏷️ {discount} on orders above ₹{upTo}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: SPACING.md,
    color: COLORS.text.secondary,
    fontSize: FONT_SIZE.md,
  },
  offerBanner: {
    backgroundColor: '#FFF8F6',
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  offerText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
  },
});

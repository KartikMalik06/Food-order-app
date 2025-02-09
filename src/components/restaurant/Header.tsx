import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Star} from 'lucide-react-native';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from '../../styles/common';

interface HeaderProps {
  name: string;
  rating: number;
}

export const Header = ({name, rating}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <ArrowLeft size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.restaurantName}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#fff" fill="#fff" />
          <Text style={styles.rating}>{rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    marginBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.text.light,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  rating: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.light,
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home } from 'lucide-react-native';
import { COLORS, SPACING, commonStyles } from '../../styles/common';

interface BackToHomeButtonProps {
  onPress: () => void;
}

export const BackToHomeButton = ({ onPress }: BackToHomeButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.homeButton}
      onPress={onPress}
    >
      <Home size={20} color={COLORS.text.light} />
      <Text style={styles.homeButtonText}>Back to Home</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeButton: {
    ...commonStyles.button,
    backgroundColor: COLORS.primary,
    margin: SPACING.lg,
  },
  homeButtonText: {
    ...commonStyles.buttonText,
    marginLeft: SPACING.sm,
  },
});
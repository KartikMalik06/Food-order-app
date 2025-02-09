import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SPACING, FONT_SIZE, commonStyles} from '../../styles/common';

interface EmptyStateProps {
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export const EmptyState = ({
  message,
  buttonText,
  onButtonPress,
}: EmptyStateProps) => {
  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <Text style={styles.message}>{message}</Text>
      {buttonText && onButtonPress && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  button: {
    ...commonStyles.button,
    paddingHorizontal: SPACING.xl,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, commonStyles } from '../../styles/common';

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
  },
});
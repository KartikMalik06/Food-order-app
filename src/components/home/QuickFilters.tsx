import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, commonStyles } from '../../styles/common';

interface QuickFilter {
  id: number;
  name: string;
  icon: string;
}

interface QuickFiltersProps {
  filters: QuickFilter[];
  activeFilter: number | null;
  onFilterPress: (filterId: number) => void;
}

export const QuickFilters = ({ filters, activeFilter, onFilterPress }: QuickFiltersProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersContainer}
      contentContainerStyle={styles.filtersContent}
      data={filters}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item: filter }) => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.filterButton,
            activeFilter === filter.id && styles.activeFilterButton
          ]}
          onPress={() => onFilterPress(filter.id)}
        >
          <Text style={styles.filterIcon}>{filter.icon}</Text>
          <Text style={[
            styles.filterText,
            activeFilter === filter.id && styles.activeFilterText
          ]}>
            {filter.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    paddingVertical: SPACING.md,
  },
  filtersContent: {
    paddingHorizontal: SPACING.md,
  },
  filterButton: {
    ...commonStyles.row,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.gray[50],
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterIcon: {
    fontSize: FONT_SIZE.lg,
    marginRight: SPACING.xs,
  },
  filterText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: COLORS.text.light,
  },
});
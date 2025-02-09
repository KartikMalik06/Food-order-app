import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {MapPin, User, Search, ChevronDown, Bell} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SPACING, FONT_SIZE, commonStyles} from '../../styles/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

interface HeaderProps {
  address: {
    flatNo: string;
    location: string;
    area: string;
  };
}

export const Header = ({address}: HeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.locationButton} activeOpacity={0.7}>
          <View style={commonStyles.row}>
            <MapPin size={20} color={COLORS.primary} />
            <View style={styles.addressContainer}>
              <Text style={styles.flatNo}>
                {address.flatNo}, {address.location}
              </Text>
              <Text style={styles.area}>{address.area}</Text>
            </View>
            <ChevronDown size={20} color={COLORS.text.primary} />
          </View>
        </TouchableOpacity>
        <View style={commonStyles.row}>
          <TouchableOpacity style={commonStyles.iconButton}>
            <Bell size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[commonStyles.iconButton, {marginLeft: SPACING.sm}]}>
            <User size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={commonStyles.searchBar}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Search')}>
        <Search
          size={20}
          color={COLORS.text.secondary}
          style={{marginRight: SPACING.sm}}
        />
        <Text style={{color: COLORS.text.secondary}}>
          Search for restaurants, cuisines...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background,
    paddingTop:
      Platform.OS === 'ios' ? 44 : StatusBar.currentHeight + SPACING.md,
  },
  headerTop: {
    ...commonStyles.spaceBetween,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  locationButton: {
    flex: 1,
    marginRight: SPACING.lg,
  },
  addressContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
    marginRight: SPACING.xs,
  },
  flatNo: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  area: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
});

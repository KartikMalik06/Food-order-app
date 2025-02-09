import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SPACING, FONT_SIZE, commonStyles} from '../../styles/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

export const Header = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={commonStyles.iconButton}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <ArrowLeft size={24} color={COLORS.text.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Your Order</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingTop:
      Platform.OS === 'ios' ? 44 : StatusBar.currentHeight + SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginLeft: SPACING.lg,
  },
});

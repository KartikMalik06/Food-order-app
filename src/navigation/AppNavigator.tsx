import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import SearchScreen from '../screens/SearchScreen';

// Define the type for restaurant object
export type Restaurant = {
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
};

// Define the param list for all screens
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  RestaurantDetail: {
    restaurant: Restaurant;
  };
  Checkout: undefined;
  OrderConfirmation: {
    orderId: string;
  };
};

// Export types for navigation prop and route prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
      />
    </Stack.Navigator>
  );
}

import {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MOCK_DATA} from '../data/mockData';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

export const useSearchController = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('restaurants');
  const [searchResults, setSearchResults] = useState({
    restaurants: [],
    dishes: [],
  });
  const [error, setError] = useState(null);

  const searchData = useCallback(async (query: string) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const filteredRestaurants = MOCK_DATA.searchResults.restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(query.toLowerCase()),
      );

      const filteredDishes = MOCK_DATA.searchResults.dishes.filter(
        dish =>
          dish.name.toLowerCase().includes(query.toLowerCase()) ||
          dish.restaurant.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchResults({
        restaurants: filteredRestaurants,
        dishes: filteredDishes,
      });
      setError(null);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRestaurantPress = restaurant => {
    navigation.navigate('RestaurantDetail', {restaurant});
  };

  const handleDishPress = dish => {
    const restaurant = searchResults.restaurants.find(
      r => r.name === dish.restaurant,
    );
    if (restaurant) {
      navigation.navigate('RestaurantDetail', {
        restaurant: restaurant,
      });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      searchData(query);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return {
    loading,
    error,
    searchQuery,
    activeTab,
    searchResults,
    handleSearchChange,
    handleTabChange,
    handleRestaurantPress,
    handleDishPress,
  };
};

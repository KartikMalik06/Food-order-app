import { useState, useCallback } from 'react';
import { MOCK_DATA } from '../data/mockData';

export const useSearchController = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    restaurants: [],
    dishes: []
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
          restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );

      const filteredDishes = MOCK_DATA.searchResults.dishes.filter(
        dish => 
          dish.name.toLowerCase().includes(query.toLowerCase()) ||
          dish.restaurant.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults({
        restaurants: filteredRestaurants,
        dishes: filteredDishes
      });
      setError(null);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    searchResults,
    searchData
  };
};
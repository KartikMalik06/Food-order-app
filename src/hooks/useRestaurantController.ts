import {useState, useEffect} from 'react';
import {MOCK_DATA} from '../data/mockData';

export const useRestaurantController = (restaurantId: number) => {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const restaurantData = MOCK_DATA.restaurants.find(
        r => r.id === restaurantId,
      );
      const restaurantMenuItems = MOCK_DATA.menuItems.filter(
        item => item.restaurantId === restaurantId,
      );

      if (!restaurantData) {
        throw new Error('Restaurant not found');
      }

      setRestaurant(restaurantData);
      setMenuItems(restaurantMenuItems);
      setError(null);
    } catch (err) {
      setError('Failed to fetch restaurant data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [restaurantId]);

  return {
    loading,
    error,
    restaurant,
    menuItems,
    refreshData: fetchRestaurantData,
  };
};

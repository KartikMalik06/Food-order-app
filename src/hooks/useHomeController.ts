import {useState, useEffect} from 'react';
import {MOCK_DATA} from '../data/mockData';

export const useHomeController = () => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [filters, setFilters] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBanners(MOCK_DATA.banners);
      setFilters(MOCK_DATA.filters);
      setRestaurants(MOCK_DATA.restaurants);
      setError(null);
    } catch (err) {
      setError('Failed to fetch home data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    loading,
    error,
    banners,
    filters,
    restaurants,
    refreshData: fetchHomeData,
  };
};

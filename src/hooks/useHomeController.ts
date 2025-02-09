import {useEffect, useState} from 'react';
import {MOCK_DATA} from '../data/mockData';

interface Filter {
  id: number;
  name: string;
  icon: string;
}

interface Restaurant {
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
}

interface Address {
  flatNo: string;
  location: string;
  area: string;
}

interface HomeControllerState {
  loading: boolean;
  error: string | null;
  banners: string[];
  filters: Filter[];
  restaurants: Restaurant[];
  activeFilter: number | null;
  address: Address;
}

export const useHomeController = () => {
  const [state, setState] = useState<HomeControllerState>({
    loading: true,
    error: null,
    banners: [],
    filters: [],
    restaurants: [],
    activeFilter: null,
    address: {
      flatNo: 'B-501',
      location: 'ILD Green',
      area: 'Sector 37C gurugram',
    },
  });

  const fetchHomeData = async () => {
    try {
      setState(prev => ({...prev, loading: true}));
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setState(prev => ({
        ...prev,
        banners: MOCK_DATA.banners,
        filters: MOCK_DATA.filters,
        restaurants: MOCK_DATA.restaurants,
        error: null,
        loading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch home data',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleFilterPress = (filterId: number) => {
    setState(prev => ({
      ...prev,
      activeFilter: filterId === prev.activeFilter ? null : filterId,
    }));
  };

  return {
    loading: state.loading,
    error: state.error,
    banners: state.banners,
    filters: state.filters,
    restaurants: state.restaurants,
    activeFilter: state.activeFilter,
    address: state.address,
    refreshData: fetchHomeData,
    handleFilterPress,
  };
};

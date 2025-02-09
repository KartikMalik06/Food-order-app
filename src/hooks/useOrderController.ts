import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'navigation/AppNavigator';

export const useOrderController = (orderId: string) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [error, setError] = useState(null);

  const fetchOrderStatus = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock order status progression
      const statuses = ['confirmed', 'preparing', 'on-the-way', 'delivered'];
      const currentIndex = statuses.indexOf(orderStatus);
      const nextStatus = statuses[currentIndex + 1] || orderStatus;

      setOrderStatus(nextStatus);
      setError(null);
    } catch (err) {
      setError('Failed to fetch order status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
    // Simulate status updates every 30 seconds
    const interval = setInterval(fetchOrderStatus, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  const getStatusIndex = () => {
    const statuses = ['confirmed', 'preparing', 'on-the-way', 'delivered'];
    return statuses.indexOf(orderStatus);
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return {
    loading,
    error,
    orderStatus,
    getStatusIndex,
    handleBackToHome,
    refreshStatus: fetchOrderStatus,
  };
};

import {useState, useEffect} from 'react';

export const useOrderController = (orderId: string) => {
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
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
  }, []);

  return {
    loading,
    error,
    orderStatus,
    refreshStatus: fetchOrderStatus,
  };
};

import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/cartSlice';

export const useCheckoutController = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyCoupon = async (code: string) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock coupon validation
      if (code === 'WELCOME50') {
        return {valid: true, discount: 50, maxDiscount: 100};
      }
      return {valid: false, message: 'Invalid coupon code'};
    } catch (err) {
      setError('Failed to apply coupon');
      return {valid: false, message: 'Failed to apply coupon'};
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (orderData: any) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock order placement
      const orderId = 'ORD' + Math.random().toString(36).substr(2, 9);
      dispatch(clearCart());
      return {success: true, orderId};
    } catch (err) {
      setError('Failed to place order');
      return {success: false, message: 'Failed to place order'};
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    applyCoupon,
    placeOrder,
  };
};

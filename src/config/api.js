// API Configuration for WMS Frontend
export const API_BASE_URL = 'http://localhost:8080/api';

// API endpoints
export const API_ENDPOINTS = {
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDERS_READY_FOR_DISPATCH: `${API_BASE_URL}/orders/ready-for-dispatch`,
  ASSIGN_DRIVER: (orderId) => `${API_BASE_URL}/orders/${orderId}/assign-driver`,
  UPDATE_ORDER_STATUS: (orderId) => `${API_BASE_URL}/orders/${orderId}/status`,
  
  // Drivers
  DRIVERS: `${API_BASE_URL}/drivers`,
  AVAILABLE_DRIVERS: `${API_BASE_URL}/drivers/available`,
  
  // Driver App Integration
  DRIVER_ORDERS: (driverId) => `${API_BASE_URL}/driver-app/driver/${driverId}/orders`,
  NOTIFY_DRIVER_ASSIGNMENT: (driverId) => `${API_BASE_URL}/driver-app/driver/${driverId}/notify-assignment`,
  CONFIRM_DELIVERY: (driverId) => `${API_BASE_URL}/driver-app/driver/${driverId}/confirm-delivery`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,
};

// Helper function for API calls
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
};
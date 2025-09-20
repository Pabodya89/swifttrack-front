import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  MapPin, 
  Phone, 
  User, 
  Calendar,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  Eye,
  Edit,
  X
} from 'lucide-react';
import { API_ENDPOINTS, apiCall } from '../config/api';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersResponse, driversResponse] = await Promise.all([
        apiCall(API_ENDPOINTS.ORDERS),
        apiCall(API_ENDPOINTS.DRIVERS)
      ]);
      setOrders(ordersResponse);
      setDrivers(driversResponse);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RECEIVED':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'READY_TO_DISPATCH':
        return <Package className="w-5 h-5 text-yellow-600" />;
      case 'DELIVERED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RECEIVED':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'READY_TO_DISPATCH':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'DELIVERED':
        return 'text-green-700 bg-green-100 border-green-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Unassigned';
  };

  const getDriverInfo = (driverId) => {
    return drivers.find(d => d.id === driverId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      order.clientRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getOrderStats = () => {
    return {
      total: orders.length,
      received: orders.filter(o => o.status === 'RECEIVED').length,
      readyToDispatch: orders.filter(o => o.status === 'READY_TO_DISPATCH').length,
      delivered: orders.filter(o => o.status === 'DELIVERED').length,
      assigned: orders.filter(o => o.assignedDriver).length,
      unassigned: orders.filter(o => !o.assignedDriver).length
    };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
          <p className="text-gray-600">Complete overview of all orders in the system</p>
        </div>
        <button
          onClick={refreshData}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Received</p>
              <p className="text-xl font-bold text-gray-900">{stats.received}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Package className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Ready</p>
              <p className="text-xl font-bold text-gray-900">{stats.readyToDispatch}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-xl font-bold text-gray-900">{stats.delivered}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Assigned</p>
              <p className="text-xl font-bold text-gray-900">{stats.assigned}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Unassigned</p>
              <p className="text-xl font-bold text-gray-900">{stats.unassigned}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="RECEIVED">Received</option>
              <option value="READY_TO_DISPATCH">Ready to Dispatch</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by tracking number, customer name, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer & Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium text-gray-900">#{order.clientRef}</p>
                        <p className="text-sm text-gray-500">ID: {order.id}</p>
                        {order.packageInfo && (
                          <p className="text-xs text-gray-400">{order.packageInfo}</p>
                        )}
                        {order.weight && (
                          <p className="text-xs text-gray-400">{order.weight} kg</p>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-600 flex items-start">
                        <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{order.deliveryAddress}</span>
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                      <br />
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                        {order.priority === 'High' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {order.priority || 'Medium'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    {order.assignedDriver ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{getDriverName(order.assignedDriver.id)}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {order.assignedDriver.phoneNumber}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 italic">Unassigned</span>
                    )}
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="text-xs">Created:</span>
                      </div>
                      <p className="text-xs text-gray-900">{formatDate(order.createdAt)}</p>
                      
                      <div className="flex items-center text-gray-600 mb-1 mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="text-xs">Delivery:</span>
                      </div>
                      <p className="text-xs text-gray-900">{formatDate(order.deliveryDate)}</p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tracking Number</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOrder.clientRef}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Order ID</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedOrder.id}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-600 flex items-start mt-2">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    {selectedOrder.deliveryAddress}
                  </p>
                </div>
              </div>

              {/* Package Info */}
              {selectedOrder.packageInfo && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Package Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedOrder.packageInfo}</p>
                    {selectedOrder.weight && (
                      <p className="text-sm text-gray-600 mt-2">Weight: {selectedOrder.weight} kg</p>
                    )}
                  </div>
                </div>
              )}

              {/* Status and Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedOrder.priority)}`}>
                      {selectedOrder.priority === 'High' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {selectedOrder.priority || 'Medium'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              {selectedOrder.assignedDriver && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Assigned Driver</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedOrder.assignedDriver.name}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {selectedOrder.assignedDriver.phoneNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          License: {selectedOrder.assignedDriver.licenseNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Created</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedOrder.deliveryDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Edit className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Updated</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedOrder.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
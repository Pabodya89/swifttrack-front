import React from 'react';
import { Package, Truck, Clock, CheckCircle, MapPin, Phone, Plus } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const colors = {
    Received: "bg-blue-500",
    "Ready for Dispatch": "bg-purple-500",
    "In Transit": "bg-yellow-500",
    Delivered: "bg-green-500",
    Failed: "bg-red-500",
  };

  return (
    <span className={`px-2 py-1 rounded text-white text-sm ${colors[status] || "bg-gray-500"}`}>
      {status}
    </span>
  );
};

const OrderStatus = ({ orders, onNewOrder }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Ready for Dispatch':
        return <Package className="w-5 h-5 text-yellow-600" />;
      case 'In Transit':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'text-blue-700 bg-blue-100';
      case 'Ready for Dispatch':
        return 'text-yellow-700 bg-yellow-100';
      case 'In Transit':
        return 'text-purple-700 bg-purple-100';
      case 'Completed':
        return 'text-green-700 bg-green-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">Start by selecting packages and assigning a driver</p>
        <button
          onClick={onNewOrder}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Order</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Processing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ready</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Ready for Dispatch').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'In Transit').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Today's Orders</h3>
          <p className="text-gray-600">Track and monitor all delivery orders</p>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{order.id}</h4>
                    <p className="text-sm text-gray-500">
                      Created at {formatTime(order.createdAt)} on {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Details */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Order Details</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Packages:</span>
                      <span className="font-medium">{order.packages.length} items</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Weight:</span>
                      <span className="font-medium">
                        {order.packages.reduce((sum, pkg) => sum + pkg.weight, 0).toFixed(1)} kg
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Est. Delivery:</span>
                      <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
                    </div>
                  </div>
                </div>

                {/* Driver Details */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Assigned Driver</h5>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{order.driver.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{order.driver.phoneNumber}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{order.driver.vehicleType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package List */}
              <div className="mt-4">
                <h5 className="font-medium text-gray-900 mb-2">Packages in this order:</h5>
                <div className="flex flex-wrap gap-2">
                  {order.packages.map((pkg) => (
                    <span
                      key={pkg.id}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                    >
                      {pkg.trackingNumber}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { StatusBadge };
export default OrderStatus;

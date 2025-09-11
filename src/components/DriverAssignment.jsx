import React, { useState, useEffect } from 'react';
import { Truck, Phone, Star, MapPin, Clock, ChevronRight } from 'lucide-react';

const DriverAssignment = ({ selectedPackages, onDriverSelect }) => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading drivers from API
    const loadDrivers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockDrivers = [
        {
          id: 'DRV-001',
          name: 'Kamal Perera',
          licenseNumber: 'B1234567',
          phoneNumber: '+94 77 123 4567',
          vehicleType: 'Van',
          status: 'Available',
          currentLocation: 'Warehouse',
          deliveriesCompleted: 145,
          rating: 4.8,
        },
        {
          id: 'DRV-002',
          name: 'Nimal Silva',
          licenseNumber: 'B2345678',
          phoneNumber: '+94 71 234 5678',
          vehicleType: 'Motorcycle',
          status: 'Available',
          currentLocation: 'Colombo 07',
          deliveriesCompleted: 89,
          rating: 4.6,
        },
        {
          id: 'DRV-003',
          name: 'Sunil Fernando',
          licenseNumber: 'B3456789',
          phoneNumber: '+94 76 345 6789',
          vehicleType: 'Truck',
          status: 'Busy',
          currentLocation: 'Kandy Route',
          deliveriesCompleted: 203,
          rating: 4.9,
        },
        {
          id: 'DRV-004',
          name: 'Chaminda Rajapakse',
          licenseNumber: 'B4567890',
          phoneNumber: '+94 78 456 7890',
          vehicleType: 'Van',
          status: 'Available',
          currentLocation: 'Warehouse',
          deliveriesCompleted: 67,
          rating: 4.4,
        },
        {
          id: 'DRV-005',
          name: 'Pradeep Mendis',
          licenseNumber: 'B5678901',
          phoneNumber: '+94 72 567 8901',
          vehicleType: 'Motorcycle',
          status: 'Busy',
          currentLocation: 'Gampaha Route',
          deliveriesCompleted: 134,
          rating: 4.7,
        },
      ];
      
      setDrivers(mockDrivers);
      setLoading(false);
    };

    loadDrivers();
  }, []);

  const handleDriverSelect = (driver) => {
    if (driver.status === 'Available') {
      setSelectedDriver(driver);
    }
  };

  const handleSubmit = () => {
    if (selectedDriver) {
      onDriverSelect(selectedDriver);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'text-green-700 bg-green-100';
      case 'Busy':
        return 'text-red-700 bg-red-100';
      case 'On Break':
        return 'text-yellow-700 bg-yellow-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const totalWeight = selectedPackages.reduce((sum, pkg) => sum + pkg.weight, 0);
  const availableDrivers = drivers.filter(d => d.status === 'Available');
  const busyDrivers = drivers.filter(d => d.status !== 'Available');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading drivers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Packages</p>
            <p className="text-2xl font-bold text-blue-900">{selectedPackages.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Total Weight</p>
            <p className="text-2xl font-bold text-green-900">{totalWeight.toFixed(1)} kg</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">High Priority</p>
            <p className="text-2xl font-bold text-purple-900">
              {selectedPackages.filter(p => p.priority === 'High').length}
            </p>
          </div>
        </div>
      </div>

      {/* Available Drivers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Available Drivers</h3>
            <p className="text-gray-600">Select a driver to assign the delivery</p>
          </div>
          <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
            {availableDrivers.length} Available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {availableDrivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => handleDriverSelect(driver)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedDriver?.id === driver.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{driver.name}</h4>
                    <p className="text-sm text-gray-500">{driver.vehicleType}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                  {driver.status}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{driver.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{driver.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{driver.currentLocation}</span>
                  </div>
                  <span className="text-gray-500">{driver.deliveriesCompleted} deliveries</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Busy Drivers */}
      {busyDrivers.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Unavailable Drivers</h3>
            <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">
              {busyDrivers.length} Busy
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 opacity-60">
            {busyDrivers.map((driver) => (
              <div
                key={driver.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">{driver.name}</h4>
                      <p className="text-sm text-gray-500">{driver.vehicleType}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">{driver.currentLocation}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-red-400" />
                      <span className="text-red-600">On Route</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {selectedDriver && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>Submit Order</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DriverAssignment;

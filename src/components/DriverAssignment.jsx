import React, { useState, useEffect } from 'react';
import { Truck, Phone, Star, MapPin, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { API_ENDPOINTS, apiCall } from '../config/api';

const DriverAssignment = ({ selectedPackages, onDriverSelect, onBack }) => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load drivers from WMS backend API
    const loadDrivers = async () => {
      setLoading(true);
      try {
        const driversData = await apiCall(API_ENDPOINTS.DRIVERS);
        
        // Transform backend driver data to frontend format
        const transformedDrivers = driversData.map(driver => ({
          id: `DRV-${driver.id.toString().padStart(3, '0')}`,
          name: driver.name,
          licenseNumber: driver.licenseNumber,
          phoneNumber: driver.phoneNumber,
          vehicleType: 'Van', // Default vehicle type
          status: driver.available ? 'Available' : 'Busy',
          currentLocation: 'Warehouse',
          deliveriesCompleted: Math.floor(Math.random() * 200) + 50, // Mock delivery count
          rating: (4.0 + Math.random() * 1.0).toFixed(1),
          driverId: driver.id // Keep original driver ID for assignment
        }));
        
        setDrivers(transformedDrivers);
      } catch (error) {
        console.error('Error loading drivers:', error);
        // Fallback to mock data if API fails
        setDrivers([
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
            driverId: 1
          }
        ]);
      }
      setLoading(false);
    };

    loadDrivers();
  }, []);

  const handleDriverSelect = (driver) => {
    if (driver.status === 'Available') {
      setSelectedDriver(driver);
    }
  };

  const handleSubmit = async () => {
    if (selectedDriver) {
      try {
        // Assign driver to selected packages via API
        const assignmentPromises = selectedPackages.map(async (pkg) => {
          return apiCall(API_ENDPOINTS.ASSIGN_DRIVER(pkg.orderId), {
            method: 'PUT',
            body: JSON.stringify({
              driverId: selectedDriver.driverId
            })
          });
        });
        
        await Promise.all(assignmentPromises);
        
        // Call the parent component's handler
        onDriverSelect(selectedDriver);
      } catch (error) {
        console.error('Error assigning driver:', error);
        alert('Failed to assign driver. Please try again.');
      }
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

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Packages</span>
        </button>
        
        {selectedDriver && (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>Submit Order</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverAssignment;

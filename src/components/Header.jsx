import React from 'react';
import { Bell, User, RefreshCw } from 'lucide-react';

const Header = ({ currentStep, selectedCount, assignedDriver, onReset }) => {
  const getStepTitle = () => {
    switch (currentStep) {
      case 'packages':
        return 'Select Packages for Delivery';
      case 'drivers':
        return 'Assign Driver to Selected Packages';
      case 'status':
        return 'Order Status & Tracking';
      default:
        return 'SwiftTrack Dashboard';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 'packages':
        return 'Choose packages that are ready for dispatch';
      case 'drivers':
        return `Assign a driver to deliver ${selectedCount} selected package${selectedCount !== 1 ? 's' : ''}`;
      case 'status':
        return 'Monitor order progress and delivery status';
      default:
        return '';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{getStepTitle()}</h2>
          <p className="text-gray-600 mt-1">{getStepDescription()}</p>
          {selectedCount > 0 && currentStep !== 'packages' && (
            <div className="flex items-center mt-2 space-x-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {selectedCount} package{selectedCount !== 1 ? 's' : ''} selected
              </span>
              {assignedDriver && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Driver: {assignedDriver.name}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {currentStep === 'status' && (
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Order</span>
            </button>
          )}
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Warehouse Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

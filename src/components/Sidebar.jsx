import React from 'react';
import { Package, Truck, CheckCircle, BarChart3, List } from 'lucide-react';

const Sidebar = ({ currentStep, onViewChange }) => {
  const menuItems = [
    {
      id: 'packages',
      name: 'Select Packages',
      icon: Package,
      active: currentStep === 'packages',
    },
    {
      id: 'drivers',
      name: 'Assign Driver',
      icon: Truck,
      active: currentStep === 'drivers',
    },
    {
      id: 'status',
      name: 'Order Status',
      icon: CheckCircle,
      active: currentStep === 'status',
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">SwiftTrack</h1>
            <p className="text-sm text-gray-500">Logistics Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
        
        {/* View All Orders Button */}
        {onViewChange && (
          <button
            onClick={() => onViewChange('allOrders')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 mt-4"
          >
            <List className="w-5 h-5" />
            <span className="font-medium">View All Orders</span>
          </button>
        )}
      </nav>
      
      <div className="p-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p>
            Step {currentStep === 'packages' ? '1' : currentStep === 'drivers' ? '2' : '3'} of 3
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: currentStep === 'packages' ? '33%' : currentStep === 'drivers' ? '66%' : '100%' 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

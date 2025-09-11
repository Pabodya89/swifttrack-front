import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PackageSelection from './PackageSelection';
import DriverAssignment from './DriverAssignment';
import OrderStatus from './OrderStatus';

const Dashboard = ({
  currentStep,
  selectedPackages,
  assignedDriver,
  submittedOrders,
  onPackageSelection,
  onDriverAssignment,
  onReset,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentStep={currentStep} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentStep={currentStep}
          selectedCount={selectedPackages.length}
          assignedDriver={assignedDriver}
          onReset={onReset}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {currentStep === 'packages' && (
            <PackageSelection 
              selectedPackages={selectedPackages}
              onNext={onPackageSelection}
            />
          )}
          
          {currentStep === 'drivers' && (
            <DriverAssignment 
              selectedPackages={selectedPackages}
              onDriverSelect={onDriverAssignment}
            />
          )}
          
          {currentStep === 'status' && (
            <OrderStatus 
              orders={submittedOrders}
              onNewOrder={onReset}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

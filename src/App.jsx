import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { Package, Driver, Order } from './type/index.js'; 

function App() {
  const [currentStep, setCurrentStep] = useState('packages'); // 'packages' | 'drivers' | 'status'
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [submittedOrders, setSubmittedOrders] = useState([]);

  const handlePackageSelection = (packages) => {
    setSelectedPackages(packages);
    setCurrentStep('drivers');
  };

  const handleDriverAssignment = (driver) => {
    setAssignedDriver(driver);

    const newOrder = {
      id: `ORD-${Date.now()}`,
      packages: selectedPackages,
      driver: driver,
      status: 'Processing',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    setSubmittedOrders((prev) => [...prev, newOrder]);
    setCurrentStep('status');
  };

  const resetWorkflow = () => {
    setCurrentStep('packages');
    setSelectedPackages([]);
    setAssignedDriver(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard
        currentStep={currentStep}
        selectedPackages={selectedPackages}
        assignedDriver={assignedDriver}
        submittedOrders={submittedOrders}
        onPackageSelection={handlePackageSelection}
        onDriverAssignment={handleDriverAssignment}
        onReset={resetWorkflow}
      />
    </div>
  );
}

export default App;

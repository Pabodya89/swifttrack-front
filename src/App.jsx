import React, { useState } from 'react';
import { Package, List } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AllOrders from './components/AllOrders'; 

function App() {
  const [currentView, setCurrentView] = useState('workflow'); // 'workflow' | 'allOrders'
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

  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (step === 'packages') {
      // Clear driver assignment when going back to packages
      setAssignedDriver(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'workflow' ? (
        <Dashboard
          currentStep={currentStep}
          selectedPackages={selectedPackages}
          assignedDriver={assignedDriver}
          submittedOrders={submittedOrders}
          onPackageSelection={handlePackageSelection}
          onDriverAssignment={handleDriverAssignment}
          onReset={resetWorkflow}
          onViewChange={setCurrentView}
          onStepChange={handleStepChange}
        />
      ) : (
        <div className="flex h-screen bg-gray-50">
          {/* Navigation Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SwiftTrack</h1>
                  <p className="text-sm text-gray-500">WMS</p>
                </div>
              </div>
            </div>
            
            <nav className="mt-6">
              <div className="px-3">
                <button
                  onClick={() => setCurrentView('workflow')}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Package className="w-5 h-5 mr-3" />
                  Driver Assignment
                </button>
                <button
                  onClick={() => setCurrentView('allOrders')}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-colors mt-1"
                >
                  <List className="w-5 h-5 mr-3" />
                  All Orders
                </button>
              </div>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Order Management</h2>
            </header>
            
            <main className="flex-1 overflow-y-auto p-6">
              <AllOrders />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

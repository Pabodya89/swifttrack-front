import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const PackageSelection = ({ selectedPackages, onNext }) => {
  const [packages, setPackages] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API delay

      const mockPackages = [
        {
          id: 'PKG-001',
          trackingNumber: 'ST2025001',
          clientName: 'E-Mall Lanka',
          recipientName: 'John Silva',
          recipientAddress: '123 Galle Road, Colombo 03',
          weight: 2.5,
          status: 'Ready for Dispatch',
          location: { zone: 'A', shelf: '12', position: '3' },
          priority: 'High',
          createdAt: new Date('2025-01-15T08:00:00'),
        },
        {
          id: 'PKG-002',
          trackingNumber: 'ST2025002',
          clientName: 'TechStore LK',
          recipientName: 'Priya Fernando',
          recipientAddress: '456 Kandy Road, Peradeniya',
          weight: 1.8,
          status: 'Ready for Dispatch',
          location: { zone: 'B', shelf: '08', position: '1' },
          priority: 'Medium',
          createdAt: new Date('2025-01-15T09:15:00'),
        },
        {
          id: 'PKG-003',
          trackingNumber: 'ST2025003',
          clientName: 'Fashion Hub',
          recipientName: 'Chamara Perera',
          recipientAddress: '789 Main Street, Negombo',
          weight: 0.8,
          status: 'Ready for Dispatch',
          location: { zone: 'A', shelf: '15', position: '7' },
          priority: 'Low',
          createdAt: new Date('2025-01-15T10:30:00'),
        },
        {
          id: 'PKG-004',
          trackingNumber: 'ST2025004',
          clientName: 'Book Palace',
          recipientName: 'Saman Ratnaike',
          recipientAddress: '321 Temple Road, Mount Lavinia',
          weight: 3.2,
          status: 'Processing',
          location: { zone: 'C', shelf: '05', position: '2' },
          priority: 'Medium',
          createdAt: new Date('2025-01-15T11:45:00'),
        },
        {
          id: 'PKG-005',
          trackingNumber: 'ST2025005',
          clientName: 'Electronics Pro',
          recipientName: 'Nimal Jayawardena',
          recipientAddress: '654 High Level Road, Maharagama',
          weight: 4.5,
          status: 'Ready for Dispatch',
          location: { zone: 'B', shelf: '20', position: '5' },
          priority: 'High',
          createdAt: new Date('2025-01-15T12:00:00'),
        },
      ];

      setPackages(mockPackages);
      setLoading(false);
    };

    loadPackages();
  }, []);

  const handlePackageSelect = (packageId) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(packageId)) {
      newSelected.delete(packageId);
    } else {
      newSelected.add(packageId);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    const readyPackages = packages.filter((pkg) => pkg.status === 'Ready for Dispatch');
    if (selectedIds.size === readyPackages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(readyPackages.map((pkg) => pkg.id)));
    }
  };

  const handleNext = () => {
    const selected = packages.filter((pkg) => selectedIds.has(pkg.id));
    onNext(selected);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready for Dispatch':
        return 'text-green-700 bg-green-100';
      case 'Processing':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  const readyPackages = packages.filter((pkg) => pkg.status === 'Ready for Dispatch');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Available Packages</h3>
            <p className="text-gray-600">Select packages that are ready for dispatch</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {selectedIds.size === readyPackages.length ? 'Deselect All' : 'Select All Ready'}
            </button>
            <span className="text-sm text-gray-500">
              {selectedIds.size} of {readyPackages.length} ready packages selected
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client & Recipient
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
               
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedIds.has(pkg.id) ? 'bg-blue-50' : ''
                  } ${pkg.status !== 'Ready for Dispatch' ? 'opacity-60' : ''}`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(pkg.id)}
                      onChange={() => handlePackageSelect(pkg.id)}
                      disabled={pkg.status !== 'Ready for Dispatch'}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{pkg.trackingNumber}</p>
                        <p className="text-sm text-gray-500">{pkg.weight} kg</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{pkg.clientName}</p>
                      <p className="text-sm text-gray-600">{pkg.recipientName}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {pkg.recipientAddress}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">Zone {pkg.location.zone}</p>
                      <p className="text-gray-500">
                        Shelf {pkg.location.shelf}, Pos {pkg.location.position}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        pkg.priority
                      )}`}
                    >
                      {pkg.priority === 'High' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {pkg.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Continue to Driver Assignment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageSelection;

import React from 'react';
import { useStore } from '../../store';
import { Smartphone, Activity } from 'lucide-react';

export function DeviceInsights() {
  const { devices, customers } = useStore();

  const availableDevices = devices.filter(device => !device.customerId).length;
  const assignedDevices = devices.length - availableDevices;

  const devicesByCustomer = customers
    .map(customer => ({
      name: customer.name,
      assignedCount: devices.filter(device => device.customerId === customer.id).length,
    }))
    .filter(stat => stat.assignedCount > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Device Insights</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{availableDevices}</div>
          <div className="text-sm text-gray-600">Available Devices</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">{assignedDevices}</div>
          <div className="text-sm text-gray-600">Assigned Devices</div>
        </div>
      </div>
      <div className="space-y-3">
        {devicesByCustomer.map(stat => (
          <div key={stat.name} className="flex items-center justify-between">
            <span className="text-sm font-medium">{stat.name}</span>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {stat.assignedCount} devices assigned
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
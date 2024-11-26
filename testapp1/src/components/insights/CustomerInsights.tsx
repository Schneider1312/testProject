import React from 'react';
import { useStore } from '../../store';
import { Users, Activity } from 'lucide-react';

export function CustomerInsights() {
  const { customers, devices } = useStore();

  const customersWithDevices = customers.filter(customer => 
    devices.some(device => device.customerId === customer.id)
  ).length;
  const customersWithoutDevices = customers.length - customersWithDevices;

  const customersByDeviceCount = customers
    .map(customer => ({
      id: customer.id,
      name: customer.name,
      deviceCount: devices.filter(device => device.customerId === customer.id).length,
    }))
    .sort((a, b) => b.deviceCount - a.deviceCount);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Customer Insights</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{customersWithDevices}</div>
          <div className="text-sm text-gray-600">Customers with Devices</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">{customersWithoutDevices}</div>
          <div className="text-sm text-gray-600">Customers without Devices</div>
        </div>
      </div>
      <div className="space-y-3">
        {customersByDeviceCount.map(stat => (
          <div key={stat.id} className="flex items-center justify-between">
            <span className="text-sm font-medium">{stat.name}</span>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {stat.deviceCount} devices assigned
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
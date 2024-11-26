import React from 'react';
import { useStore } from '../store';
import { Smartphone, CreditCard, Users, Radio } from 'lucide-react';

export function Dashboard() {
  const { providers, simCards, devices, customers } = useStore();

  const stats = [
    { title: 'Providers', count: providers.length, Icon: Radio },
    { title: 'SIM Cards', count: simCards.length, Icon: CreditCard },
    { title: 'Devices', count: devices.length, Icon: Smartphone },
    { title: 'Customers', count: customers.length, Icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map(({ title, count, Icon }) => (
        <div
          key={title}
          className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-semibold mt-1">{count}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
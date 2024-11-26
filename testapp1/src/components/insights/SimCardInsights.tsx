import React from 'react';
import { useStore } from '../../store';
import { CreditCard, Activity } from 'lucide-react';

export function SimCardInsights() {
  const { simCards, devices, providers } = useStore();

  const availableSimCards = simCards.filter(sim => 
    !devices.some(device => device.simCardId === sim.id)
  ).length;
  const assignedSimCards = simCards.length - availableSimCards;

  const simsByProvider = providers.map(provider => ({
    id: provider.id,
    name: provider.name,
    count: simCards.filter(sim => sim.providerId === provider.id).length,
    availableCount: simCards.filter(sim => 
      sim.providerId === provider.id && 
      !devices.some(device => device.simCardId === sim.id)
    ).length,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">SIM Card Insights</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{availableSimCards}</div>
          <div className="text-sm text-gray-600">Available SIM Cards</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">{assignedSimCards}</div>
          <div className="text-sm text-gray-600">Assigned SIM Cards</div>
        </div>
      </div>
      <div className="space-y-3">
        {simsByProvider.map(stat => (
          <div key={stat.id} className="flex items-center justify-between">
            <span className="text-sm font-medium">{stat.name}</span>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {stat.availableCount} available / {stat.count} total
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
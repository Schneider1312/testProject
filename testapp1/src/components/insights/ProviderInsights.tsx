import React from 'react';
import { useStore } from '../../store';
import { BarChart3, Radio } from 'lucide-react';

export function ProviderInsights() {
  const { providers, simCards } = useStore();

  const providerStats = providers.map(provider => ({
    id: provider.id,
    name: provider.name,
    simCardCount: simCards.filter(sim => sim.providerId === provider.id).length,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Provider Insights</h3>
      </div>
      <div className="space-y-4">
        {providerStats.map(stat => (
          <div key={stat.id} className="flex items-center justify-between">
            <span className="text-sm font-medium">{stat.name}</span>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{stat.simCardCount} SIM Cards</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
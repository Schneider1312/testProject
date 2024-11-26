import React from 'react';
import { ProviderInsights } from './ProviderInsights';
import { SimCardInsights } from './SimCardInsights';
import { DeviceInsights } from './DeviceInsights';
import { CustomerInsights } from './CustomerInsights';

export function DataInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <ProviderInsights />
      <SimCardInsights />
      <DeviceInsights />
      <CustomerInsights />
    </div>
  );
}
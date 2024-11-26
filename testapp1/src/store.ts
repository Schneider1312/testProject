import { create } from 'zustand';
import { fetchRecords, createRecord, deleteRecord, updateRecord } from './lib/airtable';
import { Provider, SimCard, Device, Customer } from './types';

interface Store {
  providers: Provider[];
  simCards: SimCard[];
  devices: Device[];
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchAllData: () => Promise<void>;
  addProvider: (provider: Omit<Provider, 'id'>) => Promise<void>;
  addSimCard: (simCard: Omit<SimCard, 'id'>) => Promise<void>;
  addDevice: (device: Omit<Device, 'id'>) => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  removeProvider: (id: string) => Promise<void>;
  removeSimCard: (id: string) => Promise<void>;
  removeDevice: (id: string) => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;
  getCustomerDevices: (customerId: string) => Device[];
  getDeviceCustomer: (deviceId: string) => Customer | undefined;
  getAvailableSimCards: () => SimCard[];
  getAvailableDevices: () => Device[];
}

export const useStore = create<Store>((set, get) => ({
  providers: [],
  simCards: [],
  devices: [],
  customers: [],
  loading: false,
  error: null,

  fetchAllData: async () => {
    set({ loading: true, error: null });
    try {
      const [providers, simCards, devices, customers] = await Promise.all([
        fetchRecords('providers'),
        fetchRecords('simCards'),
        fetchRecords('devices'),
        fetchRecords('customers'),
      ]);
      set({ providers, simCards, devices, customers, loading: false, error: null });
    } catch (error: any) {
      console.error('Error fetching data:', error);
      set({ 
        loading: false, 
        error: error?.message || 'Failed to load data. Please check your Airtable configuration.'
      });
    }
  },

  addProvider: async (provider) => {
    try {
      await createRecord('providers', provider);
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  addSimCard: async (simCard) => {
    try {
      await createRecord('simCards', { ...simCard, status: 'inactive' });
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  addDevice: async (device) => {
    try {
      await createRecord('devices', {
        ...device,
        status: 'inactive',
        customerId: device.customerId || null,
      });
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  addCustomer: async (customer) => {
    try {
      await createRecord('customers', customer);
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  removeProvider: async (id) => {
    try {
      await deleteRecord('providers', id);
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  removeSimCard: async (id) => {
    try {
      await deleteRecord('simCards', id);
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  removeDevice: async (id) => {
    try {
      await deleteRecord('devices', id);
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  removeCustomer: async (id) => {
    try {
      const devices = get().devices.filter(device => device.customerId === id);
      await Promise.all([
        deleteRecord('customers', id),
        ...devices.map(device =>
          updateRecord('devices', device.id, {
            ...device,
            customerId: null,
            status: 'inactive',
          })
        ),
      ]);
      await get().fetchAllData();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  getCustomerDevices: (customerId) =>
    get().devices.filter(device => device.customerId === customerId),

  getDeviceCustomer: (deviceId) => {
    const device = get().devices.find(d => d.id === deviceId);
    return device?.customerId
      ? get().customers.find(c => c.id === device.customerId)
      : undefined;
  },

  getAvailableSimCards: () => {
    const usedSimCardIds = new Set(get().devices.map(d => d.simCardId));
    return get().simCards.filter(sim => !usedSimCardIds.has(sim.id));
  },

  getAvailableDevices: () =>
    get().devices.filter(device => device.customerId === null),
}));
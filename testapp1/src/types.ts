export interface Provider {
  id: string;
  name: string;
  logo: string;
}

export interface SimCard {
  id: string;
  providerId: string;
  phoneNumber: string;
  plan: string;
  status: 'active' | 'inactive';
}

export interface Device {
  id: string;
  name: string;
  model: string;
  simCardId: string;
  customerId: string | null;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}
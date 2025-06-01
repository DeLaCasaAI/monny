
export interface FixedCost {
  id: string;
  name: string;
  amount: number;
  period: number;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  costPerUnit: number;
  pricePerUnit: number;
  unitsSold: number;
  period: number;
  description?: string;
}

export interface Budget {
  id: string;
  name: string;
  type: 'business' | 'trip' | 'scratch';
  period: number;
  fixedCosts: FixedCost[];
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

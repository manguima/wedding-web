export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  price: number;
  quantityAvailable: number;
  quantityDesired: number;
  quantityReceived: number;
  imageUrl?: string | null;
  status?: string | null;
  productLink?: string | null;
  brand?: string | null;
  dimensions?: string | null;
  maxInstallmentCount?: number | null;
  weight?: number | null;
  comments?: string | null;
  createdAt: Date;
  updatedAt: Date;
  paymentHistories: PaymentHistory[];
}

export interface PaymentHistory {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  dueDate: Date;
  paymentLink: string;
  status: string;
  name?: string; // opcional
  color?: string; // opcional
  createdAt: Date;
  updatedAt: Date;
  product: Product; // relacionamento com Product
}

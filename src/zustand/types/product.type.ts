import { department } from "./../../utils/categories";
// Tipagem do Product
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

// Tipagem do PaymentHistory
export interface PaymentHistory {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  dueDate: Date;
  paymentLink: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

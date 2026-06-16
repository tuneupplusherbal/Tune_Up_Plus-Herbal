export interface Ingredient {
  id: string;
  name: string;
  urduName: string;
  description: string;
  benefits: string[];
  scientificName: string;
  image: string;
}

export interface Benefit {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  suitableFor: string[]; // 'Children' | 'Adults' | 'Elderly'
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  city: string;
  relation: string; // e.g., "Father of 3", "Business Owner"
  text: string;
  rating: number;
  date: string;
  isVerified: boolean;
  avatarSeed: string;
}

export interface ProductPackage {
  id: string;
  name: string;
  volume: string;
  price: number;
  originalPrice: number;
  savedAmount: number;
  badge?: string;
  capsuleCount: number;
  duration: string;
  popular?: boolean;
}

export interface OrderItem {
  packageId: string;
  quantity: number;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  packageId: string;
  paymentMethod: 'COD' | 'BankDeposit';
  notes?: string;
}

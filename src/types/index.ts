export interface ServiceCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  bgColor: string;
  averagePrice: string;
  priceUnit: string;
  formFields: FormField[];
  quoteGuidance: QuoteGuidance[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'file' | 'range';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  /** Show this field only when the named field's value equals one of these option labels (via translation keys). */
  visibleWhen?: { field: string; anyOfOptionKeys: string[] };
}

export interface QuoteGuidance {
  title: string;
  description: string;
  priceRange: string;
}

export interface ServiceProvider {
  id: string;
  categoryId: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  experience: number;
  description: string;
  services: string[];
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
}

export interface QuoteRequest {
  categoryId: string;
  fields: Record<string, string | number | boolean | string[]>;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  location: string;
  preferredDate: string;
  budget: string;
  notes: string;
  createdAt: string;
}

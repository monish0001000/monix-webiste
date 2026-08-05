export type Language = 'en' | 'ta';

export type PageView = 
  | 'home'
  | 'web-development'
  | 'mobile-applications'
  | 'ai-internships'
  | 'academic-projects'
  | 'contact'
  | 'category-detail';

export interface CategoryDetail {
  id: string;
  title: string;
  parentService: 'web' | 'mobile' | 'internship' | 'projects';
  subtitle: string;
  overview: string;
  priceTag?: string;
  duration?: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  process: string[];
  deliverables?: string[];
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  category: string;
  budget: string;
  requirement: string;
  documentName?: string;
}

export interface ServiceCardItem {
  id: string;
  title: string;
  subtitle: string;
  startingPrice?: string;
  iconName: string;
  badge?: string;
  categoriesCount: number;
  description: string;
  featuredCategories: string[];
}


export interface Theme {
  primaryColor: string;
  fontFamily: string;
}

export interface SectionContent {
  title?: string;
  subtitle?: string;
  text?: string;
  buttonText?: string;
  imageUrl?: string;
  items?: { title: string; description: string; imageUrl?: string; price?: string; features?: string[] }[];
  columns?: { title?: string; text?: string; }[];
  navLinks?: string[];
  footerText?: string;
  faqs?: { question: string; answer: string; }[];
}

export interface Section {
  type: 'hero' | 'features' | 'about' | 'gallery' | 'contact' | 'footer' | 'header' | 'testimonials' | 'pricing' | 'faq' | 'cta';
  content: SectionContent;
}

export interface PageConfig {
  theme: Theme;
  sections: Section[];
}

export interface CodeBundle {
  html: string;
  css: string;
  js: string;
}

export interface Template {
  name: string;
  description: string;
  code: CodeBundle;
}

export type Language = 'html' | 'css' | 'js';

export type BlockType = string; 

export interface DraggableBlockItem {
  type: string;
  snippet: string;
  iconName: string;
  tags?: string[];
}

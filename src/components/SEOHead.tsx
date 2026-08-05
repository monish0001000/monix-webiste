import React, { useEffect } from 'react';
import { PageView, Language } from '../types';

interface SEOHeadProps {
  currentView: PageView;
  selectedCategory?: string;
  lang: Language;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentView, selectedCategory, lang }) => {
  useEffect(() => {
    let title = 'MONIX Software Solutions | AI Digital Technology Company';
    let description = 'Govt MSME Registered Technology Company providing AI-Powered Website Development from ₹4,999, Mobile Applications from ₹7,999, Online AI Internships, and IEEE Academic Projects.';
    let keywords = 'MONIX, MONIX Software Solutions, monix.srm, monix-softwaresolutions, MONIX SRM, rajibabu1184@gmail.com, 9025087129, Web Development, Mobile Apps, AI Internships, Academic Projects, MSME India, Monish CEO';
    let path = '/';

    switch (currentView) {
      case 'web-development':
        title = 'Website Development Services (Starting ₹4,999*) | MONIX Software Solutions';
        description = 'Professional, responsive & AI-powered websites starting at ₹4,999. E-Commerce, Corporate Portals, SaaS & Portfolios with free SSL, domain & 1-year hosting.';
        keywords = 'MONIX Web Development, E-Commerce Website, Corporate Website, React Developer India, Portfolio Website, Low Cost Website, monix.srm';
        path = '/#web-development';
        break;
      case 'mobile-applications':
        title = 'Mobile App Development (Android & iOS starting ₹7,999*) | MONIX Software Solutions';
        description = 'Custom Android, iOS and Cross-Platform Flutter/React Native mobile applications starting at ₹7,999. Native performance, cloud database, and App Store publishing.';
        keywords = 'MONIX Mobile App Development, Android App, iOS App, Flutter App, React Native India, Custom App Developer, monix-softwaresolutions';
        path = '/#mobile-applications';
        break;
      case 'ai-internships':
        title = '100% Online AI Internship Program | MONIX Software Solutions';
        description = 'Industry-ready Online AI & Software Engineering Internship with live mentorship, real projects, ISO-certified completion certificate, and letter of recommendation.';
        keywords = 'MONIX AI Internship, Machine Learning Internship, Python Internship, Web Dev Internship, Remote Internship India, Student Certificate, monix.srm';
        path = '/#ai-internships';
        break;
      case 'academic-projects':
        title = 'Academic & IEEE Major Projects (B.Tech, MCA, Diploma) | MONIX Software Solutions';
        description = 'Ready-to-deploy final year academic & IEEE projects with complete source code, documentation, PPT, video explanation, and live setup guidance.';
        keywords = 'MONIX Academic Projects, IEEE Projects, Final Year Projects, B.Tech Projects, MCA Projects, Python AI Projects, React Projects';
        path = '/#academic-projects';
        break;
      case 'contact':
        title = 'Contact Us | MONIX Software Solutions Executive Helpdesk';
        description = 'Get in touch with MONIX Software Solutions. Phone: +91 90250 87129, Email: rajibabu1184@gmail.com. Instagram: monix.srm, LinkedIn: monix-softwaresolutions.';
        keywords = 'Contact MONIX, Monish CEO, Software Solutions Helpdesk, Monix Email, Monix Phone, rajibabu1184@gmail.com, 9025087129, monix.srm';
        path = '/#contact';
        break;
      case 'category-detail':
        if (selectedCategory) {
          title = `${selectedCategory} | MONIX Software Solutions`;
          description = `Comprehensive breakdown and engineering scope for ${selectedCategory}. Built with cutting-edge stack by MONIX Software Solutions.`;
          path = `/#category-${encodeURIComponent(selectedCategory.toLowerCase())}`;
        }
        break;
      default:
        title = 'MONIX Software Solutions | AI-Powered Websites, Apps, Internships & Projects';
        description = 'Govt of India MSME Registered Company — Transforming business visions into intelligent digital assets. Contact: +91 90250 87129, rajibabu1184@gmail.com.';
        path = '/';
        break;
    }

    // Update Document Title
    document.title = title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaKw) metaKw.setAttribute('content', keywords);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.instagram.com/monix.srm`);
    }

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Inject JSON-LD Structured Data
    const schemaId = 'monix-jsonld-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.linkedin.com/company/monix-softwaresolutions/#organization',
          'name': 'MONIX Software Solutions',
          'alternateName': ['MONIX', 'MONIX SRM', 'monix.srm', 'monix-softwaresolutions'],
          'url': 'https://www.linkedin.com/company/monix-softwaresolutions',
          'logo': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
          'description': 'Govt MSME Registered AI Digital Technology Company providing Web Development, Mobile Apps, AI Internships, and IEEE Projects.',
          'email': 'rajibabu1184@gmail.com',
          'telephone': '+91-9025087129',
          'founder': {
            '@type': 'Person',
            'name': 'Monish',
            'jobTitle': 'Founder & CEO',
          },
          'sameAs': [
            'https://www.instagram.com/monix.srm',
            'https://www.linkedin.com/company/monix-softwaresolutions',
          ],
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://www.linkedin.com/company/monix-softwaresolutions/#localbusiness',
          'name': 'MONIX Software Solutions',
          'image': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          'priceRange': '₹4999 - ₹50000+',
          'telephone': '+91-9025087129',
          'email': 'rajibabu1184@gmail.com',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'IN',
            'addressRegion': 'Tamil Nadu / India',
          },
          'sameAs': [
            'https://www.instagram.com/monix.srm',
            'https://www.linkedin.com/company/monix-softwaresolutions',
          ]
        },
        {
          '@type': 'Service',
          'name': 'Website & Mobile App Development',
          'provider': {
            '@type': 'Organization',
            'name': 'MONIX Software Solutions',
          },
          'offers': {
            '@type': 'Offer',
            'price': '4999',
            'priceCurrency': 'INR',
          },
        },
      ],
    };

    scriptTag.text = JSON.stringify(structuredData);
  }, [currentView, selectedCategory, lang]);

  return null;
};

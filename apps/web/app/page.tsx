"use client";

import React, { useState, useEffect } from 'react';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { DesktopLayout, Project, Service, CartItem, EducationMilestone, WorkExperience } from '@/components/desktop-layout';
import { MobileLayout } from '@/components/mobile-layout';

// Custom SVG Icons because lucide-react does not bundle brand/social icons.
const WhatsAppIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.808.48 3.56 1.39 5.112L2 22l5.068-1.332a9.98 9.98 0 004.936 1.332C17.52 22 22 17.52 22 12.004 22 6.48 17.52 2 12.004 2zm5.72 13.064c-.244.692-1.236 1.252-1.748 1.312-.472.06-1.06.084-1.712-.124-.4-.128-.9-.28-1.54-.556-2.732-1.184-4.492-3.956-4.628-4.14-.136-.18-1.12-1.492-1.12-2.844 0-1.352.704-2.012.956-2.28.252-.268.552-.336.736-.336.184 0 .368.004.528.012.168.008.396-.064.62.484.228.552.78 1.9.848 2.04.068.14.112.3.02.484-.092.184-.14.3-.28.46-.14.16-.296.36-.424.484-.144.136-.296.284-.128.572.168.288.748 1.236 1.604 1.996.816.724 1.504.948 1.716 1.052.212.104.336.088.46-.056.128-.144.552-.64.7-.86.148-.22.296-.184.5-.108.204.076 1.296.612 1.52.724.224.112.372.168.428.264.056.096.056.552-.188 1.244z" />
  </svg>
);

const PhoneIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const InstagramIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedinIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// DATA
const educationHistory: EducationMilestone[] = [
  {
    period: '2023 – 2027',
    degree: 'Bachelor of Engineering – Computer Science',
    institution: 'Tagore Engineering College',
    grade: 'CGPA: 8.0 / 10.0'
  },
  {
    period: '2021 – 2023',
    degree: 'Higher Secondary Certificate (Class XII)',
    institution: 'St. Paul Higher Secondary School',
    grade: 'Percentage: 80%'
  }
];

const workExperiences: WorkExperience[] = [
  {
    role: 'Data Analyst Intern',
    company: 'Enlight Technology',
    type: 'Internship',
    points: [
      'Analyzed and cleaned datasets using Excel and SQL.',
      'Created dashboards and reports for business insights.',
      'Assisted in data visualization and reporting.',
      'Improved data accuracy through validation and preprocessing.'
    ]
  },
  {
    role: 'Digital Transformation Intern',
    company: 'Solidpro Group',
    type: 'Internship',
    points: [
      'Supported digital transformation initiatives and business process improvements.',
      'Assisted in workflow automation and documentation.',
      'Collaborated with cross-functional teams on technology-driven solutions.',
      'Gained practical experience in digital operations and process optimization.'
    ]
  }
];

const techSkillsGroups = [
  { category: 'Programming Languages', skills: ['Java', 'JavaScript'] },
  { category: 'Backend Technologies', skills: ['Spring Boot', 'Node.js'] },
  { category: 'Frontend Technologies', skills: ['HTML5', 'CSS3'] },
  { category: 'Web Technologies', skills: ['REST APIs'] }
];

const interpersonalSkills = [
  'Project Management', 'Teamwork & Leadership', 'Time Management',
  'Critical Thinking', 'Effective Communication'
];

const certifications = [
  { title: 'Oracle Java Foundations', provider: 'Coursera', credential: 'Certificate of Completion' },
  { title: 'Full-Stack Web Development', provider: 'Udemy', credential: 'Certificate of Completion' }
];

const interests = [
  'Front-end Development', 'Back-end Development', 'Cloud Computing',
  'Artificial Intelligence', 'Machine Learning'
];

const projects: Project[] = [
  {
    id: 'proj1',
    name: 'Coffee Shop Website',
    category: 'frontend',
    status: 'Completed',
    description: 'Designed and developed a modern, responsive coffee shop website featuring menu browsing, online ordering interface, customer reviews, and contact sections. Focused on attractive UI/UX design, mobile responsiveness, and smooth navigation to enhance customer engagement.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'UI/UX'],
    features: [
      'Interactive menu catalog browser with hover preview highlights',
      'Mock online checkout basket and custom item selection options',
      'Polished slider customer reviews section and Google Maps widget integration',
      'Fully responsive media-query breakpoints for mobile, tablet, and desktop screens'
    ],
    image: '/projects/coffee-shop.png',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="165" rx="40" ry="5" fill="rgba(0,0,0,0.06)" />
        <path d="M65 80 L135 80 C132 125, 122 145, 100 145 C78 145, 68 125, 65 80 Z" fill="#C48B71" stroke="#1C1C1C" strokeWidth="3" strokeLinejoin="round" />
        <path d="M135 95 C152 95, 152 125, 135 125" stroke="#1C1C1C" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M66 98 L134 98 L130 120 L70 120 Z" fill="#E6E1DA" stroke="#1C1C1C" strokeWidth="2.5" />
        <circle cx="100" cy="109" r="6" fill="#4B5340" stroke="#1C1C1C" strokeWidth="1.5" />
        <path d="M85 65 Q90 55 85 45" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M100 68 Q105 58 100 48" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M115 65 Q120 55 115 45" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'proj2',
    name: 'House Price Prediction System',
    category: 'backend',
    status: 'Completed / Deployed',
    description: 'Developed a web-based application that predicts house prices based on property features such as location, area, number of bedrooms, and amenities. Built a responsive user interface for users to input property details and receive estimated house prices. Implemented backend logic using Spring Boot and Maven for efficient data processing and application management.',
    techStack: ['Java', 'Spring Boot', 'Maven', 'HTML5', 'CSS3', 'REST APIs'],
    features: [
      'Spring Boot server endpoints handling price calculation requests',
      'Maven dependency system configuring application deployment packages',
      'Advanced estimation algorithm parsing area, location, and rooms parameters',
      'Clean responsive layout rendering instant results asynchronously'
    ],
    image: '/projects/house-price.png',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="165" rx="55" ry="5" fill="rgba(0,0,0,0.06)" />
        <rect x="65" y="95" width="70" height="60" rx="3" fill="#E6E1DA" stroke="#1C1C1C" strokeWidth="3" />
        <path d="M55 95 L100 50 L145 95 Z" fill="#4B5340" stroke="#1C1C1C" strokeWidth="3" strokeLinejoin="round" />
        <rect x="90" y="125" width="20" height="30" rx="2" fill="#C48B71" stroke="#1C1C1C" strokeWidth="2" />
        <rect x="75" y="110" width="14" height="14" rx="2" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="2" />
        <rect x="111" y="110" width="14" height="14" rx="2" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="2" />
        <path d="M40 140 L85 110 L125 120 L165 75" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="165" cy="75" r="4.5" fill="#1C1C1C" />
      </svg>
    )
  },
  {
    id: 'proj3',
    name: 'EduManage',
    category: 'backend',
    status: 'Completed',
    description: 'Developed a modern Education Management System with a responsive admin dashboard for managing students, courses, departments, and academic records. The platform includes Excel data import, real-time analytics, interactive charts, student admission tracking, and report generation. Built with a scalable full-stack architecture, it streamlines educational administration through role-based access, CRUD operations, data visualization, and secure database management.',
    techStack: ['React.js', 'Vite', 'Tailwind CSS', 'Chart.js', 'Recharts', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Pandas', 'SQLAlchemy'],
    features: [
      'Interactive student admission and growth tracking filters',
      'Dynamic department-wise student distribution analytics charts',
      'Pandas CSV/Excel data cleaning and batch database import pipelines',
      'Role-based access permissions securing multi-user workspace accounts'
    ],
    image: '/projects/edumanage.jpg',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="165" rx="50" ry="5" fill="rgba(0,0,0,0.06)" />
        <rect x="55" y="75" width="90" height="80" rx="6" fill="#E6E1DA" stroke="#1C1C1C" strokeWidth="3" />
        <line x1="55" y1="95" x2="145" y2="95" stroke="#1C1C1C" strokeWidth="2.5" />
        <path d="M65 135 L85 115 L105 125 L125 105 L135 115" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="125" cy="105" r="3.5" fill="#1C1C1C" />
        <polygon points="100,35 135,47 100,59 65,47" fill="#1C1C1C" stroke="#1C1C1C" strokeWidth="1" />
        <path d="M82 54 L82 64 C82 69, 118 69, 118 64 L118 54" fill="none" stroke="#1C1C1C" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 47 L128 54 L128 66" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="128" cy="68" r="2.5" fill="#EAB308" stroke="#1C1C1C" strokeWidth="1" />
      </svg>
    )
  }
];

const services: Service[] = [
  {
    id: 'srv1',
    name: 'Full-Stack Web App Development',
    price: 9000,
    description: 'Complete architecture and implementation of modern web applications. Combines robust backend logic in Spring Boot or Node.js with responsive, animated React.js frontend interfaces.',
    techStack: ['Java', 'Spring Boot', 'React', 'JavaScript', 'SQL'],
    image: '/services/full-stack.png',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="170" rx="35" ry="4" fill="rgba(0,0,0,0.06)" />
        <rect x="50" y="50" width="100" height="90" rx="6" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="3" />
        <line x1="50" y1="70" x2="150" y2="70" stroke="#1C1C1C" strokeWidth="2" />
        <circle cx="58" cy="60" r="2.5" fill="#1C1C1C" />
        <circle cx="66" cy="60" r="2.5" fill="#1C1C1C" />
        <rect x="65" y="85" width="25" height="40" rx="3" fill="#E6E1DA" stroke="#1C1C1C" strokeWidth="2" />
        <line x1="65" y1="95" x2="90" y2="95" stroke="#1C1C1C" strokeWidth="1.5" />
        <line x1="65" y1="105" x2="90" y2="105" stroke="#1C1C1C" strokeWidth="1.5" />
        <rect x="105" y="90" width="30" height="30" rx="3" fill="#4B5340" stroke="#1C1C1C" strokeWidth="2" />
        <path d="M90 105 L105 105" stroke="#EAB308" strokeWidth="2.5" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'srv2',
    name: 'Spring Boot REST API Design',
    price: 6000,
    description: 'Secure, clean backend API design using Java and Spring Boot. Incorporates Maven package dependency configuration, relational database schemas, query mapping, and REST endpoint routes.',
    techStack: ['Java', 'Spring Boot', 'Maven', 'REST APIs', 'SQL'],
    image: '/services/spring-boot-api.png',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="165" rx="30" ry="3" fill="rgba(0,0,0,0.05)" />
        <rect x="65" y="55" width="70" height="20" rx="3" fill="#E6E1DA" stroke="#1C1C1C" strokeWidth="2.5" />
        <rect x="65" y="85" width="70" height="20" rx="3" fill="#C48B71" stroke="#1C1C1C" strokeWidth="2.5" />
        <rect x="65" y="115" width="70" height="20" rx="3" fill="#4B5340" stroke="#1C1C1C" strokeWidth="2.5" />
        <circle cx="75" cy="65" r="2.5" fill="#EAB308" />
        <circle cx="75" cy="95" r="2.5" fill="#1C1C1C" />
        <circle cx="75" cy="125" r="2.5" fill="#EAB308" />
        <path d="M100 75 L100 85" stroke="#1C1C1C" strokeWidth="2" />
        <path d="M100 105 L100 115" stroke="#1C1C1C" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'srv3',
    name: 'Data Analytics & Dashboards',
    price: 5000,
    description: 'Processing raw data patterns into actionable insights. Designing SQL query filters, cleaning transactional logs, and assembling custom dashboard telemetry charts.',
    techStack: ['SQL', 'Excel', 'Data Preprocessing', 'Data Visualisation'],
    image: '/services/data-analytics.png',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="165" rx="40" ry="4" fill="rgba(0,0,0,0.05)" />
        <circle cx="100" cy="95" r="45" stroke="#1C1C1C" strokeWidth="3" fill="none" />
        <path d="M100 95 L100 50 A 45 45 0 0 1 145 95 Z" fill="#C48B71" stroke="#1C1C1C" strokeWidth="2.5" />
        <path d="M100 95 L145 95 A 45 45 0 0 1 100 140 Z" fill="#4B5340" stroke="#1C1C1C" strokeWidth="2.5" />
        <rect x="65" y="115" width="10" height="25" fill="#1C1C1C" />
        <rect x="80" y="100" width="10" height="40" fill="#EAB308" stroke="#1C1C1C" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'srv4',
    name: 'Responsive UI/UX Integration',
    price: 3000,
    description: 'Assembling high-fidelity webpage interfaces conforming to modern design standards. Focus on interactive hover states, cross-browser compatibility, and smooth mobile layouts.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Layouts'],
    image: '/services/ui-ux.png',
    svg: () => (
      <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="160" rx="45" ry="5" fill="rgba(0,0,0,0.06)" />
        <rect x="50" y="60" width="85" height="65" rx="4" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="2.5" />
        <line x1="50" y1="110" x2="135" y2="110" stroke="#1C1C1C" strokeWidth="1.5" />
        <path d="M40 125 L145 125 L150 130 L35 130 Z" fill="#E6E1DA" stroke="#1C1C1C" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="120" y="80" width="30" height="50" rx="3" fill="#4B5340" stroke="#1C1C1C" strokeWidth="2.5" />
        <circle cx="135" cy="122" r="2" fill="#FFFFFF" />
      </svg>
    )
  }
];

export default function Page() {
  const isMobileDevice = useIsMobileDevice();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const socialLinks = [
    { icon: PhoneIcon, href: 'tel:7339063909' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/kxrthik_._._07?igsh=bG82cXdueXpwZzJ2' },
    { icon: MailIcon, href: 'mailto:kn09960@gmail.com' },
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/karthikeyan-n-1b3174283' },
    { icon: GithubIcon, href: 'https://github.com/karthi835' },
  ];

  // 1. Projects states
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 2. CV Modal states
  const [isCvOpen, setIsCvOpen] = useState(false);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // 3. Services Cart states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');

  const [emailBooking, setEmailBooking] = useState('');
  const [briefBooking, setBriefBooking] = useState('');
  const [timelineBooking, setTimelineBooking] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.service.price * item.quantity), 0);

  const addToCart = (service: Service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.service.id === service.id);
      if (existingItem) return prevCart;
      return [...prevCart, { service, quantity: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const removeCartItem = (serviceId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.service.id !== serviceId));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailBooking || !briefBooking || !timelineBooking) return;

    const servicesList = cart.map(item => `• ${item.service.name} (₹${item.service.price.toLocaleString('en-IN')})`).join('\n');
    const message = [
      `*📋 Project Booking Inquiry*`,
      ``,
      `*Email:* ${emailBooking}`,
      ``,
      `*Project Brief:*`,
      briefBooking,
      ``,
      `*Preferred Timeline:* ${timelineBooking}`,
      ``,
      `*Services Selected:*`,
      servicesList,
      ``,
      `*Estimated Cost:* ₹${cartSubtotal.toLocaleString('en-IN')}`,
    ].join('\n');

    const whatsappNumber = '917339063909';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setCheckoutStep('success');
    setCart([]);
  };

  const layoutProps = {
    socialLinks,
    educationHistory,
    workExperiences,
    techSkillsGroups,
    interpersonalSkills,
    certifications,
    interests,
    projects,
    filteredProjects,
    selectedCategory,
    setSelectedCategory,
    selectedProject,
    setSelectedProject,
    isCvOpen,
    setIsCvOpen,
    services,
    cart,
    cartTotalItems,
    cartSubtotal,
    addToCart,
    removeCartItem,
    isCartOpen,
    setIsCartOpen,
    checkoutStep,
    setCheckoutStep,
    emailBooking,
    setEmailBooking,
    briefBooking,
    setBriefBooking,
    timelineBooking,
    setTimelineBooking,
    isSubmittingBooking,
    handleBookingSubmit,
    WhatsAppIcon,
  };

  // SSR & Hydration Protection:
  // Render DesktopLayout on server & initial hydration frame to match SSR HTML.
  // After mount, switch to MobileLayout if physical mobile device is detected.
  if (!isMounted) {
    return <DesktopLayout {...layoutProps} />;
  }

  return isMobileDevice ? (
    <MobileLayout {...layoutProps} />
  ) : (
    <DesktopLayout {...layoutProps} />
  );
}

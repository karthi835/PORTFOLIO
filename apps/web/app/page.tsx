"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MinimalistHero } from '@workspace/ui/components/minimalist-hero';
import { CVModal } from '@/components/cv-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@workspace/ui/lib/utils";
import { LogosSlider } from "@/components/ui/demo";
import { Starfield } from "@/components/ui/starfield";

// ── Scroll-triggered slide animation wrapper ──────────────────────
type SlideDir = 'up' | 'left' | 'right';
const SlideIn = ({
  children,
  dir = 'up',
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  dir?: SlideDir;
  delay?: number;
  className?: string;
}) => {
  const offset = dir === 'up' ? { y: 48 } : dir === 'left' ? { x: -48 } : { x: 48 };
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Custom SVG Icons because the installed version of lucide-react (1.24.0)
// does not bundle brand/social icons.
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

// ABOUT ME DATA
interface EducationMilestone {
  period: string;
  degree: string;
  institution: string;
  grade: string;
}

interface WorkExperience {
  role: string;
  company: string;
  type: string;
  points: string[];
}

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

// PROJECTS DATA
interface Project {
  id: string;
  name: string;
  category: 'frontend' | 'backend';
  status: string;
  description: string;
  techStack: string[];
  features: string[];
  svg: () => React.ReactNode;
}

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

// SERVICES DATA
interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  techStack: string[];
  svg: () => React.ReactNode;
}

interface CartItem {
  service: Service;
  quantity: number;
}

const services: Service[] = [
  {
    id: 'srv1',
    name: 'Full-Stack Web App Development',
    price: 9000,
    description: 'Complete architecture and implementation of modern web applications. Combines robust backend logic in Spring Boot or Node.js with responsive, animated React.js frontend interfaces.',
    techStack: ['Java', 'Spring Boot', 'React', 'JavaScript', 'SQL'],
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

  // 4. CV Modal states
  const [isCvOpen, setIsCvOpen] = useState(false);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // 2. Services Cart states
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

    const whatsappNumber = '917339063909'; // +91 73390 63909
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setCheckoutStep('success');
    setCart([]);
  };


  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">


      {/* Sticky top-level single page Navigation */}
      <Navbar />

      {/* Floating Inquiry Basket Button */}
      {/* RESPONSIVE FIX: Use pb-safe-area-inset on iOS to avoid home bar overlap;
          slightly smaller button on mobile (h-12 w-12) vs desktop (h-14 w-14) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40">
        <motion.button
          onClick={() => setIsCartOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-foreground text-background shadow-2xl border border-background/10 transition-colors hover:bg-foreground/90"
          aria-label="View Service Basket"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

          <AnimatePresence>
            {cartTotalItems > 0 && (
              <motion.span
                key={cartTotalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 15 }}
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-[11px] font-extrabold text-foreground border-2 border-background"
              >
                {cartTotalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>


      {/* 1. HERO SECTION */}
      <div id="home" className="relative overflow-hidden bg-black">
        {/* Starfield animated canvas background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Starfield
            starCount={10000}
            waveFrequency={15}
            starEscapeWidth={400}
            voidWidth={80}
            starColor={{ r: 234, g: 179, b: 8 }}
            maxOpacity={200}
            rotationSpeed={0.0002}
            waveSpeed={0.005}
          />
        </div>

        {/* Volumetric golden ambient glow / atmospheric haze */}
        <div className="absolute inset-x-0 bottom-0 h-[250px] bg-[radial-gradient(circle_at_bottom,rgba(234,179,8,0.12),transparent_70%)] pointer-events-none z-10" />

        {/* Strong black gradient mask — covers yellow circle bottom edge fully */}
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none z-10" />

        {/* Solid black bar at very bottom to ensure zero bleed-through */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-black pointer-events-none z-10" />

        {/* Hero content layered above the starfield and glows */}
        <div className="relative z-20">
          <MinimalistHero
            className="bg-transparent"
            logoText="KARTHIKEYAN"
            navLinks={[]} // Pass empty list to suppress the duplicate hero internal static header
            mainText="Motivated Computer Science Engineering student (2023–2027) with a strong foundation in programming, data structures, and full-stack web development. Eager to apply academic knowledge to real-world problems through internships or entry-level roles."
            readMoreLink="#about"
            imageSrc="/profile.png"
            imageAlt="Karthikeyan N Portrait"
            overlayText={{
              part1: 'karthik',
              part2: 'Developer',
            }}
            socialLinks={socialLinks}
            locationText="Cuddalore – 607302"
            onCvClick={() => setIsCvOpen(true)}
          />
        </div>
      </div>

      {/* Logos slider on pure black bg (extends hero black background down till the icons) */}
      <div className="relative z-30 bg-black pt-8 pb-4">
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">
          <LogosSlider />
        </div>
      </div>

      {/* Smooth transition from black to page background below the icons */}
      <div className="h-16 bg-gradient-to-b from-black to-background relative z-30" />

      {/* 2. ABOUT ME SECTION */}
      <section id="about" className="py-14 bg-background md:py-20 relative z-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">

          {/* Intro Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 md:mb-24 lg:mb-32">
            <SlideIn dir="left" className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">profile summary</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-2 mb-4 sm:text-4xl md:text-5xl text-foreground">
                about me.
              </h2>
            </SlideIn>
            <SlideIn dir="right" delay={0.15} className="lg:col-span-7 text-foreground/75 leading-relaxed text-sm sm:text-base md:text-lg space-y-4 font-light">
              <p>
                Motivated Computer Science Engineering student (2023–2027) with a strong foundation in programming, data structures, and full-stack web development. Eager to apply academic knowledge to real-world problems through internships or entry-level roles.
              </p>
              <p>
                Passionate about AI, machine learning, and web technologies. Proven ability to work productively in teams, adapt quickly to new workflows, and deliver solutions effectively.
              </p>
            </SlideIn>
          </div>

          {/* Internships Timeline */}
          <div className="mb-16 md:mb-24 lg:mb-32">
            <SlideIn dir="up">
              <div className="mb-8 md:mb-12">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">professional training</span>
                <h3 className="text-xl font-bold tracking-tight mt-1 text-foreground sm:text-2xl">internships.</h3>
              </div>
            </SlideIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {workExperiences.map((exp, i) => (
                <SlideIn key={exp.company} dir="up" delay={i * 0.12}>
                  <div className="border border-foreground/5 bg-muted/10 p-5 md:p-8 rounded-3xl h-full">
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-foreground sm:text-lg">{exp.role}</h4>
                        <p className="text-sm font-semibold text-yellow-600 mt-0.5">{exp.company}</p>
                      </div>
                      <span className="flex-shrink-0 px-2.5 py-0.5 border border-yellow-400/20 bg-yellow-400/5 text-[9px] uppercase font-bold tracking-wider rounded text-yellow-600">
                        {exp.type}
                      </span>
                    </div>
                    <ul className="text-xs text-foreground/60 space-y-2 list-disc pl-4 leading-relaxed font-light">
                      {exp.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
                    </ul>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="mb-16 md:mb-24 lg:mb-32">
            <SlideIn dir="up">
              <div className="mb-8 md:mb-12">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">academic journey</span>
                <h3 className="text-xl font-bold tracking-tight mt-1 text-foreground sm:text-2xl">education.</h3>
              </div>
            </SlideIn>
            {/* RESPONSIVE FIX: Added overflow-visible and ml-2 sm:ml-0 to ensure the
                absolute-positioned timeline dot (-left-[41px]) doesn't clip at the
                edge of the screen on narrow viewports. pl-8 gives enough room. */}
            <div className="relative max-w-3xl pl-8 border-l border-foreground/10 space-y-12 ml-2 sm:ml-0">
              {educationHistory.map((edu, i) => (
                <SlideIn key={edu.institution} dir="left" delay={i * 0.12}>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full bg-background border border-foreground/20 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    </div>
                    <span className="text-xs font-extrabold text-yellow-500 uppercase tracking-widest">{edu.period}</span>
                    <h4 className="text-lg font-bold text-foreground mt-1">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-foreground/70 mt-0.5">{edu.institution}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-muted text-xs font-bold uppercase tracking-wide rounded-md border border-foreground/5">
                      {edu.grade}
                    </span>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mb-16 md:mb-24 lg:mb-32">
            <SlideIn dir="up">
              <div className="mb-8 md:mb-12">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">capabilities</span>
                <h3 className="text-xl font-bold tracking-tight mt-1 text-foreground sm:text-2xl">technical skills.</h3>
              </div>
            </SlideIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {techSkillsGroups.map((grp, i) => (
                <SlideIn key={grp.category} dir="up" delay={i * 0.1}>
                  <div className="p-6 border border-foreground/5 bg-muted/10 rounded-2xl h-full">
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 mb-4">{grp.category}</h5>
                    <div className="flex flex-wrap gap-2">
                      {grp.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-background border border-foreground/5 text-xs font-bold uppercase tracking-wider rounded-xl cursor-default hover:border-yellow-400/30 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>

          {/* Soft Skills & Certifications */}
          <div className="mb-16 md:mb-24 lg:mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <SlideIn dir="left">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">strengths</span>
                <h3 className="text-2xl font-bold tracking-tight mt-1 text-foreground">interpersonal skills.</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {interpersonalSkills.map((skill) => (
                  <span key={skill} className="px-4 py-2 border border-foreground/5 bg-muted/20 text-xs uppercase font-bold tracking-widest rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>
            </SlideIn>

            <SlideIn dir="right" delay={0.12}>
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">credentials</span>
                <h3 className="text-2xl font-bold tracking-tight mt-1 text-foreground">certifications.</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.title} className="p-4 border border-foreground/5 bg-muted/10 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{cert.title}</h4>
                      <p className="text-[11px] text-foreground/40 mt-0.5">{cert.provider} — {cert.credential}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-yellow-500 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>

          {/* Interests & Contact Particulars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SlideIn dir="left">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">focus</span>
                <h3 className="text-2xl font-bold tracking-tight mt-1 text-foreground">areas of interest.</h3>
              </div>
              <div className="space-y-3">
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center gap-3 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    <span className="text-sm text-foreground/80 font-medium">{interest}</span>
                  </div>
                ))}
              </div>
            </SlideIn>

            <SlideIn dir="right" delay={0.12}>
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">particulars</span>
                <h3 className="text-2xl font-bold tracking-tight mt-1 text-foreground">contact & personal info.</h3>
              </div>
              {/* RESPONSIVE FIX: `break-all` on the email and long strings prevents
                  them from overflowing the container on 320px–375px screens.
                  The 3-col grid collapses gracefully because col-span-2 takes 2/3. */}
              <div className="border border-foreground/5 rounded-2xl divide-y divide-foreground/5 bg-muted/10 overflow-hidden text-xs">
                <div className="grid grid-cols-3 p-4 uppercase font-bold tracking-widest">
                  <span className="text-foreground/40 col-span-1">Phone</span>
                  <span className="text-foreground col-span-2 select-all break-all">7339063909</span>
                </div>
                <div className="grid grid-cols-3 p-4 uppercase font-bold tracking-widest">
                  <span className="text-foreground/40 col-span-1">Email</span>
                  <span className="text-foreground col-span-2 select-all break-all">kn09960@gmail.com</span>
                </div>
                <div className="grid grid-cols-3 p-4 uppercase font-bold tracking-widest">
                  <span className="text-foreground/40 col-span-1">Location</span>
                  <span className="text-foreground col-span-2">Cuddalore – 607302</span>
                </div>
                <div className="grid grid-cols-3 p-4 uppercase font-bold tracking-widest">
                  <span className="text-foreground/40 col-span-1">Languages</span>
                  <span className="text-foreground col-span-2">Tamil, English (Fluent)</span>
                </div>
              </div>
            </SlideIn>
          </div>

        </div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section id="projects" className="py-14 border-t border-foreground/5 bg-muted/10 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">

          <SlideIn dir="up">
            <div className="max-w-2xl mb-10 md:mb-12">
              <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">my work</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-2 mb-3 text-foreground sm:text-4xl">
                projects.
              </h2>
              <p className="text-sm text-foreground/60 font-light">
                A showcase of programming applications and system designs. Integrating robust backend APIs with responsive client interfaces.
              </p>
            </div>
          </SlideIn>

          {/* Category filter tabs */}
          <div className="border-b border-foreground/5 mb-10 flex space-x-6 overflow-x-auto scrollbar-none pb-2">
            {['all', 'frontend', 'backend'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={cn(
                  "relative text-xs uppercase tracking-widest font-semibold pb-3 transition-colors whitespace-nowrap",
                  selectedCategory === category ? "text-foreground" : "text-foreground/40 hover:text-foreground"
                )}
              >
                {category === 'all' ? 'All Projects' : category + ' end'}
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-0 h-[2.5px] w-full bg-yellow-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const ProjectSvg = project.svg;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex flex-col justify-between overflow-hidden border border-foreground/5 bg-background p-4 transition-all duration-300 rounded-2xl hover:shadow-xl"
                  >
                    <div className="relative aspect-square w-full bg-muted/10 rounded-xl overflow-hidden mb-6 transition-transform duration-300 group-hover:scale-[1.02]">
                      <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm border border-foreground/5 px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md text-foreground/60 shadow-sm z-10">
                        {project.category}
                      </span>
                      <ProjectSvg />
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <div>
                        <h4 className="text-base font-bold text-foreground group-hover:underline decoration-yellow-400 decoration-2 underline-offset-4">
                          {project.name}
                        </h4>
                        <p className="text-xs font-semibold text-foreground/50 mt-1">{project.status}</p>
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="rounded-full border border-foreground/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all shadow-sm"
                      >
                        Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-14 border-t border-foreground/5 bg-background md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">

          <SlideIn dir="up">
            <div className="max-w-2xl mb-10 md:mb-16">
              <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">collaborations</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-2 mb-3 text-foreground sm:text-4xl">
                services.
              </h2>
              <p className="text-sm text-foreground/60 font-light">
                Freelance engineering support. Hire me to build custom components, design clean Java/Spring REST APIs, or analyze data patterns.
              </p>
            </div>
          </SlideIn>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((service, i) => {
              const ServiceSvg = service.svg;
              return (
                <SlideIn key={service.id} dir="up" delay={i * 0.12}>
                  <div
                    className="group relative flex flex-col justify-between border border-foreground/5 bg-muted/10 p-6 rounded-3xl transition-all duration-300 hover:bg-muted/20 hover:shadow-xl h-full"
                  >
                    <div className="relative aspect-video w-full bg-background rounded-2xl overflow-hidden mb-6 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-300">
                      <ServiceSvg />
                    </div>

                    <div className="flex flex-col flex-grow justify-between">
                      <div>
                        {/* RESPONSIVE FIX: Allow name and price to wrap on mobile
                            instead of overflowing. `flex-wrap` + `gap-y-1` handle it. */}
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-2">
                          <h4 className="text-lg font-bold text-foreground">{service.name}</h4>
                          <span className="text-base font-extrabold text-yellow-600 flex-shrink-0">Est. ₹{service.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-foreground/50 leading-relaxed font-light mb-4">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {service.techStack.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-background border border-foreground/5 rounded text-[9px] uppercase font-bold tracking-wider text-foreground/75">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(service)}
                        className="w-full py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-foreground/80 transition-all active:translate-y-px"
                      >
                        Add to Inquiry Basket
                      </button>
                    </div>
                  </div>
                </SlideIn>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. DECLARATION & CONTACT SECTION */}
      <section className="py-14 border-t border-foreground/5 bg-muted/10 md:py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">

          {/* WhatsApp Connect Box */}
          <SlideIn dir="up">
            <div id="contact" className="max-w-2xl mx-auto border border-foreground/5 bg-background p-6 sm:p-8 md:p-12 rounded-3xl shadow-sm text-center">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">connect</span>
                <h3 className="text-2xl font-bold tracking-tight mt-1 mb-3 text-foreground">get in touch.</h3>
                <p className="text-xs text-foreground/50 font-light">Have an internship offer or freelance inquiry? Let's chat directly on WhatsApp.</p>
              </div>

              <a
                href="https://wa.me/917339063909"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:translate-y-px hover:shadow-lg hover:shadow-emerald-500/10 w-full sm:w-auto"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Message on WhatsApp
              </a>
            </div>
          </SlideIn>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* MODAL 1: PROJECT DETAILS */}
      <AnimatePresence>
        {selectedProject && (
          // RESPONSIVE FIX: `items-end` on mobile shows modal as a bottom sheet;
          // `sm:items-center` centers it on tablet+. `p-0 sm:p-4` removes padding
          // on mobile so the sheet uses full width.
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />

            {/* RESPONSIVE FIX: rounded-t-3xl on mobile (bottom sheet style),
                rounded-3xl on sm+ (centered dialog). Inner padding scales with
                p-4 sm:p-6 md:p-10. max-h guards against tall content. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-background border border-foreground/10 p-4 sm:p-6 md:p-10 shadow-2xl rounded-t-3xl sm:rounded-3xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full hover:bg-muted p-2 text-foreground/60 hover:text-foreground transition-colors z-20"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 items-center">
                <div className="relative aspect-square w-full bg-muted/30 rounded-2xl overflow-hidden flex items-center justify-center">
                  {selectedProject.svg()}
                </div>

                <div className="flex flex-col h-full justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500 mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-2">
                    {selectedProject.name}
                  </h3>
                  <p className="text-sm font-semibold text-yellow-600 mb-6">{selectedProject.status}</p>

                  <p className="text-sm text-foreground/60 leading-relaxed mb-6 font-light">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2.5">Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-muted border border-foreground/5 rounded-md text-[10px] uppercase font-bold tracking-wider text-foreground/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">Core Features</span>
                    <ul className="text-xs text-foreground/60 space-y-1.5 list-disc pl-4 leading-relaxed font-light">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-3.5 bg-foreground text-background font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-foreground/80 transition-all shadow-md"
                  >
                    Return to Projects
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: SLIDE-OVER INQUIRY CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-background/50 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 w-full flex sm:pl-10 sm:max-w-full">
              {/* RESPONSIVE FIX: Full-width on mobile, constrained to max-w-md on sm+
                  The w-full on mobile ensures no gap on the left side */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 220 }}
                className="w-full sm:w-screen sm:max-w-md bg-background border-l border-foreground/10 flex flex-col shadow-2xl relative"
              >
                <div className="p-6 border-b border-foreground/5 flex items-center justify-between">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
                    {checkoutStep === 'cart' && 'Inquiry Basket'}
                    {checkoutStep === 'form' && 'Project Scope'}
                    {checkoutStep === 'success' && 'Inquiry Sent'}
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full text-foreground/50 hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                  {checkoutStep === 'cart' && (
                    <>
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-16 h-16 text-foreground/20 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                          <p className="text-sm text-foreground/40 font-medium">Your basket is empty.</p>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="mt-6 border border-foreground/10 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-foreground hover:bg-muted"
                          >
                            Explore Services
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {cart.map((item) => (
                            <div key={item.service.id} className="flex gap-4 items-center py-2 border-b border-foreground/5 pb-4">
                              <div className="h-14 w-14 bg-muted/30 rounded-lg flex-shrink-0 border border-foreground/5 overflow-hidden">
                                {item.service.svg()}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-foreground">{item.service.name}</h4>
                                <span className="text-xs text-yellow-600 font-bold">Est. ₹{item.service.price.toLocaleString('en-IN')}</span>
                              </div>
                              <button
                                onClick={() => removeCartItem(item.service.id)}
                                className="text-foreground/30 hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {checkoutStep === 'form' && (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest text-foreground/60 mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={emailBooking}
                          onChange={(e) => setEmailBooking(e.target.value)}
                          placeholder="client@domain.com"
                          className="w-full bg-muted/20 border border-foreground/10 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-yellow-400 transition-colors text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest text-foreground/60 mb-2">Project Brief & Details</label>
                        <textarea
                          required
                          rows={4}
                          value={briefBooking}
                          onChange={(e) => setBriefBooking(e.target.value)}
                          placeholder="Describe your project requirements and custom specs..."
                          className="w-full bg-muted/20 border border-foreground/10 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest text-foreground/60 mb-2">Preferred Timeline</label>
                        <input
                          type="text"
                          required
                          value={timelineBooking}
                          onChange={(e) => setTimelineBooking(e.target.value)}
                          placeholder="e.g. 2 months, urgent start, flexible"
                          className="w-full bg-muted/20 border border-foreground/10 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-yellow-400 transition-colors text-foreground"
                        />
                      </div>

                      <div className="bg-muted/30 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-xs text-foreground/60 font-medium">
                          <span>Services Selected</span>
                          <span>{cart.length}</span>
                        </div>
                        <div className="flex justify-between text-sm text-foreground font-bold border-t border-foreground/5 pt-2 mt-2">
                          <span>Estimated Cost</span>
                          <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingBooking}
                        className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20"
                      >
                        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                        Send via WhatsApp
                      </button>
                    </form>
                  )}

                  {checkoutStep === 'success' && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </motion.div>
                      <h4 className="text-xl font-bold text-foreground mb-2">Inquiry Transmitted!</h4>
                      <p className="text-sm text-foreground/50 leading-relaxed font-light max-w-xs">
                        Thank you. Your project brief has been sent. I will review your requirements and follow up via email shortly to schedule a consultation.
                      </p>
                      <button
                        onClick={() => {
                          setCheckoutStep('cart');
                          setIsCartOpen(false);
                        }}
                        className="mt-8 px-8 py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-foreground/80 transition-colors"
                      >
                        Return to Services
                      </button>
                    </div>
                  )}
                </div>

                {cart.length > 0 && checkoutStep === 'cart' && (
                  <div className="p-6 border-t border-foreground/5 bg-background">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-sm text-foreground/50 font-medium">Estimated Project Cost</span>
                      <span className="text-xl font-extrabold text-foreground">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => setCheckoutStep('form')}
                      className="w-full py-4 bg-foreground text-background text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-foreground/90 transition-colors shadow-md text-center block"
                    >
                      Book Free Consultation
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CV Modal Overlay */}
      <AnimatePresence>
        {isCvOpen && (
          <CVModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}

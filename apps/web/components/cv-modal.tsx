'use client';

import React from 'react';
import { X, Download, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      // @ts-ignore
      const html2canvasPro = (await import('html2canvas-pro')).default;
      // @ts-ignore
      const { jsPDF } = await import('jspdf');

      const element = document.getElementById('printable-cv-content');
      if (element) {
        // Clone the element to apply styling tweaks for the PDF download
        const cloned = element.cloneNode(true) as HTMLElement;
        
        // Remove screen-only container styles (shadows, borders, rounded corners)
        cloned.style.boxShadow = 'none';
        cloned.style.border = 'none';
        cloned.style.borderRadius = '0';
        cloned.style.width = '794px'; // ~210mm wide at 96 DPI for perfect A4 fit
        cloned.style.margin = '0';
        
        // Append off-screen temporarily so browser computes its Tailwind styles
        cloned.style.position = 'absolute';
        cloned.style.left = '-9999px';
        cloned.style.top = '-9999px';
        document.body.appendChild(cloned);
        
        // Render to canvas
        const canvas = await html2canvasPro(cloned, {
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        // Clean up DOM immediately after canvas rendering
        document.body.removeChild(cloned);
        
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        
        let pdfWidth = pageWidth;
        let pdfHeight = (canvas.height * pageWidth) / canvas.width;
        
        // Scale down proportionally if the rendered height exceeds a single A4 page height
        if (pdfHeight > pageHeight) {
          const ratio = pageHeight / pdfHeight;
          pdfHeight = pageHeight;
          pdfWidth = pdfWidth * ratio;
        }
        
        // Center the content on the A4 page
        const xOffset = (pageWidth - pdfWidth) / 2;
        const yOffset = (pageHeight - pdfHeight) / 2;
        
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, pdfWidth, pdfHeight);
        pdf.save('Karthikeyan_N_CV.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md print:bg-white print:p-0">
      {/* Print-specific style block to format the A4 print output */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-cv-content, #printable-cv-content * {
            visibility: visible;
          }
          #printable-cv-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          /* Hide standard screen elements during print */
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* RESPONSIVE FIX: On mobile (320px) the full modal height should be a
          comfortable 85vh; on desktop it can be 90vh. Reduced max-width on small
          screens via w-[calc(100%-1rem)] with a max-w-4xl cap. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-zinc-900 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10 print:h-auto print:border-none print:shadow-none print:bg-white print:rounded-none"
      >
        {/* Header bar (actions) - hidden during print */}
        {/* RESPONSIVE FIX: On 320px screens the header was cramped. We reduce px
            on mobile (px-3 sm:px-6), hide the CV label title below sm, and let
            the Download button show text only on sm+. */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-sm print-hidden z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <h2 className="hidden sm:block text-sm font-bold tracking-widest uppercase text-zinc-300">Curriculum Vitae</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-widest text-black bg-yellow-400 hover:bg-yellow-500 rounded-full transition-all active:scale-95 cursor-pointer shadow-md shadow-yellow-400/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Content Scroll Container */}
        {/* RESPONSIVE FIX: Reduce scroll area padding on mobile (p-2 sm:p-4 md:p-8) */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 bg-zinc-950/40 print:p-0 print:bg-white print:overflow-visible">
          {/* Printable Page Body (rendered as light paper sheet) */}
          <div
            id="printable-cv-content"
            className="w-full max-w-[800px] mx-auto bg-white text-black p-8 md:p-12 shadow-2xl border border-zinc-200 rounded-2xl print:shadow-none print:border-none print:p-0 font-sans leading-relaxed text-zinc-900 print:text-black"
          >
            {/* Header: Name and Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black uppercase mb-1">
                Karthikeyan N
              </h1>
              <div className="text-xs md:text-sm font-bold tracking-widest text-zinc-700 uppercase py-1 border-y border-zinc-900 my-2">
                Computer Science Engineering Student | Full-Stack Developer
              </div>
            </div>

            {/* Contact Info bar */}
            {/* RESPONSIVE FIX: `text-[10px] sm:text-[11px]` shrinks text on tiny
                screens to prevent the row from overflowing the CV card width. */}
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px] font-medium text-zinc-600 mb-6 pb-4 border-b-2 border-zinc-900">
              <a
                href="mailto:kn09960@gmail.com"
                className="flex items-center gap-1.5 hover:text-yellow-600 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-900" />
                kn09960@gmail.com
              </a>
              <span className="text-zinc-300">|</span>
              <a
                href="https://linkedin.com/in/karthikeyan-n-1b3174283"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-yellow-600 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-zinc-900" />
                linkedin.com/in/karthikeyan-n
              </a>
              <span className="text-zinc-300">|</span>
              <a
                href="https://github.com/karthi835"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-yellow-600 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-zinc-900" />
                github.com/karthi835
              </a>
              <span className="text-zinc-300">|</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-900" />
                Cuddalore – 607302
              </span>
            </div>

            {/* Profile Summary */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2 uppercase">
                Profile Summary
              </h3>
              <p className="text-[12.5px] leading-relaxed text-zinc-800 text-justify font-light">
                Motivated Computer Science Engineering student (2023–2027) with a strong foundation in programming, data structures, and full-stack web development. Eager to apply academic knowledge to real-world problems through internships or entry-level roles. Passionate about AI, machine learning, and web technologies. Proven ability to work in teams, adapt quickly, and deliver solutions effectively.
              </p>
            </section>

            {/* Education */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2 uppercase">
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs md:text-sm font-bold text-black">
                    <span>Tagore Engineering College</span>
                    <span>2023 — 2027</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-700 italic mt-0.5">
                    <span>Bachelor of Engineering — Computer Science</span>
                    <span>CGPA: 8.0 / 10.0</span>
                  </div>
                </div>
                <div className="border-t border-zinc-100 pt-2">
                  <div className="flex justify-between text-xs md:text-sm font-bold text-black">
                    <span>St. Paul Higher Secondary School</span>
                    <span>2021 — 2023</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-700 italic mt-0.5">
                    <span>Higher Secondary Certificate (Class XII)</span>
                    <span>Percentage: 80%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2 uppercase">
                Experience
              </h3>
              <ul className="space-y-3 pl-1">
                <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">
                  <span className="font-semibold text-xs md:text-sm text-black">Data Analytics Intern — Novalis Infotech</span>
                  <p className="mt-1 text-[12.5px] text-zinc-700 leading-relaxed font-light">
                    Worked on data analysis, data cleaning, visualization, and reporting using Excel, SQL, and Python.
                  </p>
                </li>
                <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500 border-t border-zinc-100 pt-2">
                  <span className="font-semibold text-xs md:text-sm text-black">Digital Transformation Intern — Solidpro Engineering Support Private Limited</span>
                  <p className="mt-1 text-[12.5px] text-zinc-700 leading-relaxed font-light">
                    Contributed to digital transformation projects, process optimization, and business workflow analysis using modern digital tools.
                  </p>
                </li>
              </ul>
            </section>

            {/* Projects */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2 uppercase">
                Projects
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-black">Coffee Shop Website</h4>
                  <p className="text-[12.5px] text-zinc-700 leading-relaxed text-justify mt-1 font-light">
                    Designed and developed a modern, responsive coffee shop website featuring menu browsing, online ordering interface, customer reviews, and contact sections. Focused on attractive UI/UX design, mobile responsiveness, and smooth navigation to enhance customer engagement.
                  </p>
                  <p className="text-[10px] md:text-[11px] text-zinc-500 italic mt-1.5 font-medium">
                    Tech Stack: HTML • CSS • JavaScript • Responsive Web Design • UI/UX
                  </p>
                </div>
                <div className="border-t border-dashed border-zinc-200 my-2" />
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-black">House Price Prediction System</h4>
                  <p className="text-[12.5px] text-zinc-700 leading-relaxed text-justify mt-1 font-light">
                    Developed a web-based application that predicts house prices based on property features such as location, area, number of bedrooms, and amenities. Built a responsive user interface for users to input property details and receive estimated house prices. Implemented backend logic using Spring Boot and Maven for efficient data processing and application management.
                  </p>
                  <p className="text-[10px] md:text-[11px] text-zinc-500 italic mt-1.5 font-medium">
                    Tech Stack: Java • Spring Boot • Maven • HTML • CSS • REST APIs
                  </p>
                </div>
                <div className="border-t border-dashed border-zinc-200 my-2" />
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-black">EduManage – Student Management & Analytics Dashboard</h4>
                  <p className="text-[12.5px] text-zinc-700 leading-relaxed text-justify mt-1 font-light">
                    Developed a modern Education Management System with a responsive admin dashboard for managing students, courses, departments, and academic records. The platform includes Excel data import, real-time analytics, interactive charts, student admission tracking, and report generation. Built with a scalable full-stack architecture, it streamlines educational administration through role-based access, CRUD operations, data visualization, and secure database management.
                  </p>
                  <p className="text-[10px] md:text-[11px] text-zinc-500 italic mt-1.5 font-medium">
                    Tech Stack: React.js • Vite • Tailwind CSS • Chart.js/Recharts • FastAPI • Spring Boot • PostgreSQL • Pandas • SQLAlchemy
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2.5 uppercase">
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="border-r border-zinc-200 pr-2 last:border-none">
                  <h5 className="font-bold text-black mb-1.5">Programming</h5>
                  <ul className="space-y-1 text-zinc-700 font-light list-none pl-0">
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> Java</li>
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> JavaScript</li>
                  </ul>
                </div>
                <div className="sm:border-r sm:border-zinc-200 pr-2 sm:pl-2 last:border-none">
                  <h5 className="font-bold text-black mb-1.5">Backend</h5>
                  <ul className="space-y-1 text-zinc-700 font-light list-none pl-0">
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> Spring Boot</li>
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> Node.js</li>
                  </ul>
                </div>
                <div className="border-r border-zinc-200 pr-2 sm:pl-2 last:border-none">
                  <h5 className="font-bold text-black mb-1.5">Frontend</h5>
                  <ul className="space-y-1 text-zinc-700 font-light list-none pl-0">
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> HTML5</li>
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> CSS3</li>
                  </ul>
                </div>
                <div className="sm:pl-2">
                  <h5 className="font-bold text-black mb-1.5">Web Tech</h5>
                  <ul className="space-y-1 text-zinc-700 font-light list-none pl-0">
                    <li className="flex items-center gap-1.5"><span className="h-1 w-1 bg-zinc-400 rounded-full" /> REST APIs</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2 uppercase">
                Certifications
              </h3>
              <ul className="space-y-1.5 pl-1 text-[12.5px] text-zinc-700 font-light">
                <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">
                  Oracle Java Foundations — Coursera | Certificate of completion
                </li>
                <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">
                  Full-Stack Web Development — Udemy | Certificate of Completion
                </li>
              </ul>
            </section>

            {/* Languages */}
            <section className="mb-6">
              <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-400 pb-1 mb-2 uppercase">
                Languages
              </h3>
              <ul className="space-y-1.5 pl-1 text-[12.5px] text-zinc-700 font-light">
                <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">
                  Tamil — Fluent
                </li>
                <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">
                  English — Fluent
                </li>
              </ul>
            </section>

            {/* Declaration */}
            <section className="mt-8 border-t border-zinc-200 pt-4 text-center">
              <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">
                Declaration
              </h3>
              <p className="text-[11px] italic text-zinc-500 leading-relaxed max-w-lg mx-auto">
                I hereby declare that all the information given above is true to the best of my knowledge.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

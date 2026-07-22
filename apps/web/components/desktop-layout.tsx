"use client";

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MinimalistHero } from '@workspace/ui/components/minimalist-hero';
import { CVModal } from '@/components/cv-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@workspace/ui/lib/utils";
import { LogosSlider } from "@/components/ui/demo";
import { Starfield } from "@/components/ui/starfield";

export interface EducationMilestone {
  period: string;
  degree: string;
  institution: string;
  grade: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  type: string;
  points: string[];
}

export interface Project {
  id: string;
  name: string;
  category: 'frontend' | 'backend';
  status: string;
  description: string;
  techStack: string[];
  features: string[];
  svg: () => React.ReactNode;
  image?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  techStack: string[];
  svg: () => React.ReactNode;
  image?: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface DesktopLayoutProps {
  socialLinks: Array<{
    icon: (props: React.ComponentPropsWithoutRef<'svg'>) => React.ReactNode;
    href: string;
  }>;
  educationHistory: EducationMilestone[];
  workExperiences: WorkExperience[];
  techSkillsGroups: Array<{ category: string; skills: string[] }>;
  interpersonalSkills: string[];
  certifications: Array<{ title: string; provider: string; credential: string }>;
  interests: string[];
  projects: Project[];
  filteredProjects: Project[];
  selectedCategory: 'all' | 'frontend' | 'backend';
  setSelectedCategory: (cat: 'all' | 'frontend' | 'backend') => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  isCvOpen: boolean;
  setIsCvOpen: (open: boolean) => void;
  services: Service[];
  cart: CartItem[];
  cartTotalItems: number;
  cartSubtotal: number;
  addToCart: (service: Service) => void;
  removeCartItem: (serviceId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  checkoutStep: 'cart' | 'form' | 'success';
  setCheckoutStep: (step: 'cart' | 'form' | 'success') => void;
  emailBooking: string;
  setEmailBooking: (val: string) => void;
  briefBooking: string;
  setBriefBooking: (val: string) => void;
  timelineBooking: string;
  setTimelineBooking: (val: string) => void;
  isSubmittingBooking: boolean;
  handleBookingSubmit: (e: React.FormEvent) => void;
  WhatsAppIcon: (props: React.ComponentPropsWithoutRef<'svg'>) => React.ReactNode;
}

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

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  socialLinks,
  educationHistory,
  workExperiences,
  techSkillsGroups,
  interpersonalSkills,
  certifications,
  interests,
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
}) => {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      {/* Sticky top-level single page Navigation */}
      <Navbar />

      {/* Floating Inquiry Basket Button */}
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
        {/* Starfield animated canvas background (desktop 1025px+ only) */}
        <div className="absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
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
        <div className="absolute inset-x-0 bottom-0 h-[250px] bg-[radial-gradient(circle_at_bottom,rgba(234,179,8,0.12),transparent_70%)] pointer-events-none z-10 hidden lg:block" />

        {/* Strong black gradient mask */}
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none z-10 hidden lg:block" />

        {/* Solid black bar at very bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-black pointer-events-none z-10 hidden lg:block" />

        {/* Hero content layered above the starfield and glows */}
        <div className="relative z-20">
          <MinimalistHero
            className="bg-transparent"
            logoText="KARTHIKEYAN"
            navLinks={[]}
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

      {/* Logos slider */}
      <div className="relative z-30 bg-black pt-8 pb-4">
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12">
          <LogosSlider />
        </div>
      </div>

      {/* Smooth transition from black to page background */}
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
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ProjectSvg />
                      )}
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
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ServiceSvg />
                      )}
                    </div>

                    <div className="flex flex-col flex-grow justify-between">
                      <div>
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
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />

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
};

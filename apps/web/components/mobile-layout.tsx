"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { CVModal } from '@/components/cv-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@workspace/ui/lib/utils";
import { LogosSlider } from "@/components/ui/demo";
import { DesktopLayoutProps } from './desktop-layout';

export const MobileLayout: React.FC<DesktopLayoutProps> = ({
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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SERVICES', href: '#services' },
    { label: 'ABOUT ME', href: '#about' },
  ];

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* ── FORCED MOBILE NAVBAR ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-foreground/5 bg-background/95 backdrop-blur-md h-16 transition-all duration-300">
        <div className="flex h-full w-full items-center justify-between px-4">
          <Link href="#home" className="text-lg font-bold tracking-wider text-foreground hover:opacity-80 transition-opacity">
            KARTHIKEYAN
          </Link>

          {/* Mobile Hamburger Button — ALWAYS rendered in MobileLayout regardless of viewport width */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex flex-col space-y-1.5 z-50 p-2 -mr-1"
            aria-label="Toggle mobile menu"
            aria-expanded={isNavOpen}
          >
            <motion.span
              animate={isNavOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-6 bg-foreground"
            />
            <motion.span
              animate={isNavOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-6 bg-foreground"
            />
            <motion.span
              animate={isNavOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-5 bg-foreground align-right self-end"
            />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute left-0 right-0 top-full border-b border-foreground/5 bg-background/95 backdrop-blur-md px-6 pb-8 pt-4 z-40 overflow-hidden shadow-lg"
            >
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsNavOpen(false)}
                      className="block text-lg font-medium tracking-widest py-3 border-l-2 pl-4 border-transparent text-foreground/60 hover:text-foreground hover:border-yellow-400 transition-all"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── FLOATING BASKET BUTTON ────────────────────────────────────── */}
      <div className="fixed bottom-6 right-4 z-40">
        <motion.button
          onClick={() => setIsCartOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-2xl border border-background/10 transition-colors hover:bg-foreground/90"
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

      {/* ── FORCED MOBILE HERO SECTION ────────────────────────────────── */}
      <div id="home" className="relative bg-black text-white px-4 pt-8 pb-12 overflow-hidden flex flex-col items-center text-center">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />

        {/* Profile Image Frame */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-yellow-400/40 shadow-2xl mb-6 flex-shrink-0">
          <img src="/profile.png" alt="Karthikeyan N" className="w-full h-full object-cover" />
        </div>

        {/* Name & Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          KARTHIKEYAN N
        </h1>
        <span className="inline-block px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
          Software Developer
        </span>

        {/* Bio summary */}
        <p className="text-xs text-white/70 leading-relaxed font-light max-w-sm mb-6">
          Motivated Computer Science Engineering student (2023–2027) with a strong foundation in programming, data structures, and full-stack web development. Eager to apply academic knowledge to real-world problems.
        </p>

        {/* CV & Location Buttons */}
        <div className="flex flex-col w-full max-w-xs gap-3 mb-6">
          <button
            onClick={() => setIsCvOpen(true)}
            className="w-full py-3.5 bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-300 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Curriculum Vitae (CV)
          </button>
          <span className="text-[11px] text-white/50 font-medium tracking-wide">
            📍 Cuddalore – 607302
          </span>
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Logos Slider */}
      <div className="bg-black py-6 border-t border-white/10">
        <div className="w-full px-4">
          <LogosSlider />
        </div>
      </div>

      {/* ── ABOUT ME SECTION ───────────────────────────────────────────── */}
      <section id="about" className="py-10 px-4 bg-background">
        <div className="w-full space-y-12">
          {/* Profile Summary */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Profile Summary</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground mt-1 mb-3">About Me</h2>
            <p className="text-xs text-foreground/75 leading-relaxed font-light mb-3">
              Motivated Computer Science Engineering student (2023–2027) with a strong foundation in programming, data structures, and full-stack web development. Eager to apply academic knowledge to real-world problems through internships or entry-level roles.
            </p>
            <p className="text-xs text-foreground/75 leading-relaxed font-light">
              Passionate about AI, machine learning, and web technologies. Proven ability to work productively in teams, adapt quickly to new workflows, and deliver solutions effectively.
            </p>
          </div>

          {/* Internships Timeline */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Professional Training</span>
            <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-4">Internships</h3>
            <div className="flex flex-col gap-4">
              {workExperiences.map((exp) => (
                <div key={exp.company} className="border border-foreground/5 bg-muted/10 p-4 rounded-2xl">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{exp.role}</h4>
                      <p className="text-xs font-semibold text-yellow-600 mt-0.5">{exp.company}</p>
                    </div>
                    <span className="px-2 py-0.5 border border-yellow-400/20 bg-yellow-400/5 text-[9px] uppercase font-bold tracking-wider rounded text-yellow-600">
                      {exp.type}
                    </span>
                  </div>
                  <ul className="text-xs text-foreground/60 space-y-1.5 list-disc pl-4 leading-relaxed font-light">
                    {exp.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Academic Journey</span>
            <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-4">Education</h3>
            <div className="relative pl-6 border-l border-foreground/10 space-y-8 ml-2">
              {educationHistory.map((edu) => (
                <div key={edu.institution} className="relative">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-background border border-foreground/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  </div>
                  <span className="text-[10px] font-extrabold text-yellow-500 uppercase tracking-widest">{edu.period}</span>
                  <h4 className="text-sm font-bold text-foreground mt-0.5">{edu.degree}</h4>
                  <p className="text-xs font-semibold text-foreground/70">{edu.institution}</p>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-muted text-[10px] font-bold uppercase tracking-wide rounded border border-foreground/5">
                    {edu.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Capabilities</span>
            <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-4">Technical Skills</h3>
            <div className="flex flex-col gap-4">
              {techSkillsGroups.map((grp) => (
                <div key={grp.category} className="p-4 border border-foreground/5 bg-muted/10 rounded-2xl">
                  <h5 className="text-[9px] uppercase font-bold tracking-widest text-foreground/40 mb-2.5">{grp.category}</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-background border border-foreground/5 text-xs font-bold uppercase tracking-wider rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpersonal & Certifications */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Strengths</span>
              <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-3">Interpersonal Skills</h3>
              <div className="flex flex-wrap gap-2">
                {interpersonalSkills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 border border-foreground/5 bg-muted/20 text-xs uppercase font-bold tracking-wider rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Credentials</span>
              <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-3">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.title} className="p-3.5 border border-foreground/5 bg-muted/10 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{cert.title}</h4>
                      <p className="text-[10px] text-foreground/40 mt-0.5">{cert.provider} — {cert.credential}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-yellow-500 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Particulars & Contact */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Particulars</span>
            <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-3">Contact & Personal Info</h3>
            <div className="border border-foreground/5 rounded-2xl divide-y divide-foreground/5 bg-muted/10 overflow-hidden text-xs">
              <div className="flex justify-between p-3.5">
                <span className="text-foreground/40 font-bold uppercase">Phone</span>
                <span className="text-foreground font-bold select-all break-all">7339063909</span>
              </div>
              <div className="flex justify-between p-3.5">
                <span className="text-foreground/40 font-bold uppercase">Email</span>
                <span className="text-foreground font-bold select-all break-all">kn09960@gmail.com</span>
              </div>
              <div className="flex justify-between p-3.5">
                <span className="text-foreground/40 font-bold uppercase">Location</span>
                <span className="text-foreground font-bold">Cuddalore – 607302</span>
              </div>
              <div className="flex justify-between p-3.5">
                <span className="text-foreground/40 font-bold uppercase">Languages</span>
                <span className="text-foreground font-bold">Tamil, English</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION ───────────────────────────────────────────── */}
      <section id="projects" className="py-10 px-4 border-t border-foreground/5 bg-muted/10">
        <div className="w-full">
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">My Work</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground mt-1 mb-2">Projects</h2>
            <p className="text-xs text-foreground/60 font-light">
              Showcase of web applications and system designs.
            </p>
          </div>

          {/* Category Filters */}
          <div className="border-b border-foreground/5 mb-6 flex space-x-4 overflow-x-auto scrollbar-none pb-2">
            {['all', 'frontend', 'backend'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={cn(
                  "relative text-xs uppercase tracking-widest font-semibold pb-2 transition-colors whitespace-nowrap",
                  selectedCategory === category ? "text-foreground font-bold" : "text-foreground/40"
                )}
              >
                {category === 'all' ? 'All Projects' : category + ' end'}
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategoryIndicatorMobile"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-yellow-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Projects Stack */}
          <div className="flex flex-col gap-6">
            {filteredProjects.map((project) => {
              const ProjectSvg = project.svg;
              return (
                <div
                  key={project.id}
                  className="border border-foreground/5 bg-background p-4 rounded-2xl shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full bg-muted/10 rounded-xl overflow-hidden mb-4">
                    <span className="absolute top-2 left-2 bg-background/90 border border-foreground/5 px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest rounded text-foreground/60 z-10">
                      {project.category}
                    </span>
                    <ProjectSvg />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{project.name}</h4>
                      <p className="text-[11px] text-foreground/50">{project.status}</p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-1.5 rounded-full border border-foreground/10 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-foreground hover:text-background transition-all"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ───────────────────────────────────────────── */}
      <section id="services" className="py-10 px-4 border-t border-foreground/5 bg-background">
        <div className="w-full">
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Collaborations</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground mt-1 mb-2">Services</h2>
            <p className="text-xs text-foreground/60 font-light">
              Freelance software engineering services.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {services.map((service) => {
              const ServiceSvg = service.svg;
              return (
                <div key={service.id} className="border border-foreground/5 bg-muted/10 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="relative aspect-video w-full bg-background rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    <ServiceSvg />
                  </div>

                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="text-base font-bold text-foreground">{service.name}</h4>
                    <span className="text-sm font-extrabold text-yellow-600 flex-shrink-0">Est. ₹{service.price.toLocaleString('en-IN')}</span>
                  </div>

                  <p className="text-xs text-foreground/50 leading-relaxed font-light mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-background border border-foreground/5 rounded text-[9px] uppercase font-bold tracking-wider text-foreground/75">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart(service)}
                    className="w-full py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-foreground/80 transition-all active:scale-95"
                  >
                    Add to Inquiry Basket
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ────────────────────────────────────────────── */}
      <section id="contact" className="py-10 px-4 border-t border-foreground/5 bg-muted/10">
        <div className="w-full border border-foreground/5 bg-background p-6 rounded-2xl text-center">
          <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Connect</span>
          <h3 className="text-xl font-bold text-foreground mt-1 mb-2">Get in Touch</h3>
          <p className="text-xs text-foreground/50 font-light mb-5">Have an internship offer or freelance inquiry? Chat directly on WhatsApp.</p>

          <a
            href="https://wa.me/917339063909"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 w-full"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Message on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* ── MODALS ────────────────────────────────────────────────────── */}
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative w-full max-h-[90vh] overflow-y-auto bg-background border-t border-foreground/10 p-5 shadow-2xl rounded-t-3xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 rounded-full p-2 text-foreground/60 hover:bg-muted"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative aspect-square w-full bg-muted/30 rounded-xl overflow-hidden flex items-center justify-center mb-4">
                {selectedProject.svg()}
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500 block mb-1">
                {selectedProject.category}
              </span>
              <h3 className="text-xl font-extrabold text-foreground mb-1">
                {selectedProject.name}
              </h3>
              <p className="text-xs font-semibold text-yellow-600 mb-4">{selectedProject.status}</p>

              <p className="text-xs text-foreground/70 leading-relaxed font-light mb-4">
                {selectedProject.description}
              </p>

              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/50 block mb-2">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-muted border border-foreground/5 rounded text-[10px] uppercase font-bold text-foreground/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/50 block mb-2">Core Features</span>
                <ul className="text-xs text-foreground/70 space-y-1 list-disc pl-4 leading-relaxed font-light">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full py-3.5 bg-foreground text-background font-bold rounded-xl text-xs uppercase tracking-widest"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Modal */}
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

            <div className="absolute inset-y-0 right-0 w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 220 }}
                className="w-full bg-background border-l border-foreground/10 flex flex-col shadow-2xl relative"
              >
                <div className="p-5 border-b border-foreground/5 flex items-center justify-between">
                  <h3 className="text-base font-bold uppercase tracking-wider text-foreground">
                    {checkoutStep === 'cart' && 'Inquiry Basket'}
                    {checkoutStep === 'form' && 'Project Scope'}
                    {checkoutStep === 'success' && 'Inquiry Sent'}
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full text-foreground/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 scrollbar-none">
                  {checkoutStep === 'cart' && (
                    <>
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-14 h-14 text-foreground/20 mb-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                          <p className="text-xs text-foreground/40 font-medium">Your basket is empty.</p>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="mt-4 border border-foreground/10 px-5 py-2 rounded-xl text-xs font-bold uppercase text-foreground hover:bg-muted"
                          >
                            Explore Services
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cart.map((item) => (
                            <div key={item.service.id} className="flex gap-3 items-center py-2 border-b border-foreground/5 pb-3">
                              <div className="h-12 w-12 bg-muted/30 rounded-lg flex-shrink-0 border border-foreground/5 overflow-hidden">
                                {item.service.svg()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-foreground truncate">{item.service.name}</h4>
                                <span className="text-[11px] text-yellow-600 font-bold">Est. ₹{item.service.price.toLocaleString('en-IN')}</span>
                              </div>
                              <button
                                onClick={() => removeCartItem(item.service.id)}
                                className="text-foreground/30 hover:text-red-500 p-1"
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
                    <form onSubmit={handleBookingSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-foreground/60 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={emailBooking}
                          onChange={(e) => setEmailBooking(e.target.value)}
                          placeholder="client@domain.com"
                          className="w-full bg-muted/20 border border-foreground/10 px-3.5 py-2.5 rounded-xl text-xs text-foreground focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-foreground/60 mb-1.5">Project Brief & Details</label>
                        <textarea
                          required
                          rows={3}
                          value={briefBooking}
                          onChange={(e) => setBriefBooking(e.target.value)}
                          placeholder="Describe your project requirements..."
                          className="w-full bg-muted/20 border border-foreground/10 px-3.5 py-2.5 rounded-xl text-xs text-foreground focus:outline-none focus:border-yellow-400 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-foreground/60 mb-1.5">Preferred Timeline</label>
                        <input
                          type="text"
                          required
                          value={timelineBooking}
                          onChange={(e) => setTimelineBooking(e.target.value)}
                          placeholder="e.g. 2 months, urgent start"
                          className="w-full bg-muted/20 border border-foreground/10 px-3.5 py-2.5 rounded-xl text-xs text-foreground focus:outline-none focus:border-yellow-400"
                        />
                      </div>

                      <div className="bg-muted/30 p-3.5 rounded-xl space-y-1.5">
                        <div className="flex justify-between text-xs text-foreground/60 font-medium">
                          <span>Services Selected</span>
                          <span>{cart.length}</span>
                        </div>
                        <div className="flex justify-between text-xs text-foreground font-bold border-t border-foreground/5 pt-1.5 mt-1.5">
                          <span>Estimated Cost</span>
                          <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingBooking}
                        className="w-full py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                        Send via WhatsApp
                      </button>
                    </form>
                  )}

                  {checkoutStep === 'success' && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-2">
                      <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Inquiry Transmitted!</h4>
                      <p className="text-xs text-foreground/50 leading-relaxed font-light">
                        Thank you. Your project brief has been sent. I will review and follow up shortly.
                      </p>
                      <button
                        onClick={() => {
                          setCheckoutStep('cart');
                          setIsCartOpen(false);
                        }}
                        className="mt-6 px-6 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-xl"
                      >
                        Return to Services
                      </button>
                    </div>
                  )}
                </div>

                {cart.length > 0 && checkoutStep === 'cart' && (
                  <div className="p-5 border-t border-foreground/5 bg-background">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-foreground/50 font-medium">Estimated Cost</span>
                      <span className="text-lg font-extrabold text-foreground">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => setCheckoutStep('form')}
                      className="w-full py-3.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-xl text-center block"
                    >
                      Book Consultation
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

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@workspace/ui/lib/utils";

interface NavbarProps {
  forceMobile?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ forceMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // RESPONSIVE FIX: Auto-close mobile menu when viewport reaches desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !forceMobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [forceMobile]);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT ME', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      setTimeout(() => {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 50);
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled || isOpen
        ? "border-b border-foreground/10 bg-background/95 backdrop-blur-md h-16 sm:h-20"
        : "bg-transparent h-20 sm:h-24"
    )}>
      <div className="flex h-full w-full items-center justify-between px-4 sm:px-6 md:px-14">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-base sm:text-xl font-bold tracking-wider text-foreground hover:opacity-80 transition-opacity cursor-pointer"
        >
          KARTHIKEYAN
        </Link>

        {/* Desktop Nav */}
        <nav className={forceMobile ? "hidden" : "hidden items-center space-x-8 md:flex"}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm font-medium tracking-widest text-foreground/60 hover:text-foreground transition-colors py-2 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={forceMobile ? "flex flex-col space-y-1.5 z-50 p-2 -mr-1 cursor-pointer" : "flex flex-col space-y-1.5 md:hidden z-50 p-2 -mr-1 cursor-pointer"}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-foreground"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-foreground"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-5 bg-foreground align-right self-end"
          />
        </button>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Clickable backdrop overlay to close menu on outside tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className={forceMobile ? "fixed inset-0 bg-black/40 backdrop-blur-xs z-30" : "fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden"}
            />

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={forceMobile ? "absolute left-0 right-0 top-full border-b border-foreground/10 bg-background/95 backdrop-blur-md px-4 sm:px-6 pb-8 pt-4 z-40 overflow-hidden shadow-xl" : "absolute left-0 right-0 top-full border-b border-foreground/10 bg-background/95 backdrop-blur-md px-4 sm:px-6 pb-8 pt-4 md:hidden z-40 overflow-hidden shadow-xl"}
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
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block text-lg font-medium tracking-widest py-3 border-l-2 pl-4 border-transparent text-foreground/70 hover:text-foreground hover:border-yellow-400 transition-all cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};


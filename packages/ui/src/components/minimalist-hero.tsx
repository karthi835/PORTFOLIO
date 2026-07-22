'use client';

import React, { ComponentType, useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';

/* ─────────────────────────── types ─────────────────────────── */
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string };
  socialLinks: { icon: ComponentType<{ className?: string }>; href: string }[];
  locationText: string;
  className?: string;
  onCvClick?: () => void;
  forceMobile?: boolean;
}

/* ─────────────────────── motion presets ────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

const staggerList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ─────────────────── typewriter hook ───────────────────── */
function useTypewriter(words: string[], charDelay = 90, wordGap = 340) {
  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const word1 = words[0] ?? '';
    const word2 = words[1] ?? '';
    let cancelled = false;

    const type = async () => {
      // type word 1
      for (let i = 1; i <= word1.length; i++) {
        if (cancelled) return;
        await new Promise<void>(r => setTimeout(r, charDelay));
        setDisplayed1(word1.slice(0, i));
      }
      // gap between words
      await new Promise<void>(r => setTimeout(r, wordGap));
      // type word 2
      for (let i = 1; i <= word2.length; i++) {
        if (cancelled) return;
        await new Promise<void>(r => setTimeout(r, charDelay));
        setDisplayed2(word2.slice(0, i));
      }
      setDone(true);
    };

    type();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { displayed1, displayed2, done };
}

/* ─────────────────────────── component ─────────────────────── */
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
  onCvClick,
  forceMobile,
}: MinimalistHeroProps) => {
  return (
    <>
      {/* ── Hero page wrapper ── */}
      {/* RESPONSIVE: min-h-[calc(100vh-5rem)] on mobile prevents excessive whitespace above hero */}
      <div
        className={cn(
          'relative flex w-full flex-col overflow-hidden bg-black text-white font-sans',
          forceMobile
            ? 'min-h-fit py-2'
            : 'min-h-[500px] sm:min-h-[600px] md:min-h-[680px] lg:min-h-screen',
          className
        )}
      >

      {/* ── decorative grain overlay (desktop 1025px+ only) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.02] hidden lg:block"
        style={{
          backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      {navLinks && navLinks.length > 0 && (
        <header
          className="relative z-30 flex w-full items-center justify-between px-6 pt-6 md:px-14 md:pt-8"
        >
          {/* Logo */}
          <span
            className="text-base font-extrabold tracking-widest text-white uppercase"
          >
            {logoText}
          </span>

          {/* Nav links */}
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>
      )}

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <div className={forceMobile ? "relative z-10 flex flex-col items-center justify-center w-full pt-4 pb-4 px-4 gap-4" : "relative z-10 flex flex-1 items-stretch w-full pr-0 md:pr-14 md:-translate-y-[13vh] pb-[140px] md:pb-0"}>

        {/* ── Left: Bio, Read More & Icons — vertically centered (desktop only) ── */}
        <div
          className={forceMobile ? "hidden" : "hidden md:flex absolute top-1/2 -translate-y-1/2 left-6 md:left-10 lg:left-14 xl:left-20 z-30 flex-col gap-4 text-left items-start max-w-[280px] lg:max-w-[310px] pb-0"}
        >
          {/* Bio text */}
          <p
            className="text-[14px] leading-[1.85] text-zinc-400 font-normal"
          >
            {mainText}
          </p>

          {/* Read more */}
          <a
            href={readMoreLink}
            className="text-[11px] font-bold uppercase tracking-widest text-white hover:text-yellow-400 transition-colors w-fit"
          >
            Read More
          </a>
        </div>

        {/* ── Bottom-left: Social icons (desktop only) ── */}
        {socialLinks && socialLinks.length > 0 && (
          <div
            className={forceMobile ? "hidden" : "hidden md:flex absolute bottom-8 left-6 md:left-10 z-30 items-center gap-5"}
          >
            {socialLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-yellow-400 transition-colors"
                >
                  <Icon className="w-[20px] h-[20px]" />
                </a>
              );
            })}
          </div>
        )}

        {/* ── Center: Portrait ── */}
        <div className={forceMobile ? "relative z-20 flex items-center justify-center w-full" : "absolute inset-0 flex items-center md:items-end justify-center h-full pointer-events-none px-4"}>
          <motion.div
            className={forceMobile ? "relative flex items-end justify-center w-[260px] xs:w-[280px] sm:w-[320px] aspect-[3/4] pointer-events-auto overflow-hidden mx-auto" : "relative flex items-end justify-center w-[85vw] sm:w-[70vw] md:w-[450px] lg:w-[clamp(440px,33vw,500px)] xl:w-[500px] max-w-full aspect-[3/4] pointer-events-auto overflow-hidden mx-auto"}
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 90%)',
            }}
          >
            {/* Ambient volumetric golden backlight glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-[#E5B517]/25 blur-[60px] pointer-events-none z-0" />

            {/* 1. Yellow circle — scales proportionally with the image container */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.3,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute rounded-full bg-gradient-to-b from-[#E5B517] via-[#E5B517] to-transparent left-1/2 -translate-x-1/2 z-0 w-[95%] aspect-square"
              style={{
                top: '30%',
              }}
            />

            {/* 2. Portrait image — scales proportionally with h-auto max-w-full object-contain */}
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              initial={{ opacity: 0, y: -80, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.3,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="relative z-10 w-full h-auto object-contain filter grayscale select-none pointer-events-auto max-w-full"
              style={{ height: '108%', top: '5.5%' }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = 'https://placehold.co/400x600/eab308/1c1c1c?text=KN';
              }}
            />


          </motion.div>
        </div>

        {/* ── Right Side: KARTHIK DEVELOPER (typewriter, desktop/tablet only) ── */}
        <TypewriterWords
          part1={overlayText.part1}
          part2={overlayText.part2}
          onCvClick={onCvClick}
          forceMobile={forceMobile}
        />

        {/* ── Mobile-only: Heading + View CV button below portrait ── */}
        <div className={forceMobile ? "relative z-30 flex flex-col items-center gap-3 mt-2 px-6" : "md:hidden absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 pb-6 px-6 z-30"}>
          <h1 className="font-extrabold tracking-tight leading-tight text-white text-2xl uppercase text-center font-mono select-none">
            <span className="block">{overlayText.part1}</span>
            <span className="block">{overlayText.part2}</span>
          </h1>
          <button
            onClick={onCvClick}
            className="rounded-full border border-white/20 bg-black/80 px-6 py-2.5 backdrop-blur-sm pointer-events-auto cursor-pointer active:scale-95 transition-all text-[11px] font-extrabold uppercase tracking-widest text-white hover:bg-black/95 hover:border-white whitespace-nowrap shadow-lg"
          >
            View CV
          </button>
        </div>

      </div>

      {/* ── Mobile-only: Social icons strip directly below image ── */}
      {socialLinks && socialLinks.length > 0 && (
        <div className={forceMobile ? "relative z-30 flex items-center justify-center gap-6 pt-2 pb-4" : "relative z-30 flex md:hidden items-center justify-center gap-6 pb-6 pt-2"}>
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-yellow-400 transition-colors p-2"
                aria-label={`Social link ${i + 1}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      )}

      </div>
    </>
  );
};

/* ─────────────────── TypewriterWords sub-component ─────────────────── */
function TypewriterWords({
  part1,
  part2,
  onCvClick,
  forceMobile,
}: {
  part1: string;
  part2: string;
  onCvClick?: () => void;
  forceMobile?: boolean;
}) {
  const { displayed1, displayed2, done } = useTypewriter([part1, part2], 95, 320);

  return (
    <div className={forceMobile ? "hidden" : "hidden md:flex z-30 w-[25%] lg:w-[26%] xl:w-[28%] flex-col justify-center items-end text-right ml-auto gap-5 pr-2 md:pr-6 lg:pr-10 xl:pr-14"}>
      <h1
        className="font-extrabold tracking-tight leading-[1.05] text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase select-none font-mono"
        aria-label={`${part1} ${part2}`}
      >
        {/* Line 1 */}
        <span className="block">
          {displayed1}
        </span>

        {/* Line 2 */}
        <span className="block">
          {displayed2 || '\u00A0'}{/* non-breaking space keeps height reserved */}
        </span>
      </h1>

      {/* CV Button — fades in once both words are done */}
      <AnimatePresence>
        {done && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={onCvClick}
            className="px-4 md:px-5 py-2.5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white border border-white/20 hover:border-white hover:bg-white/10 rounded-full transition-all active:scale-95 cursor-pointer shadow-lg shadow-white/5 hover:shadow-white/10 w-fit"
          >
            View CV
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

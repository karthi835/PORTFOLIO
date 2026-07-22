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
}: MinimalistHeroProps) => {
  return (
    <>
      {/* ── Hero page wrapper ── */}
      {/* RESPONSIVE: min-h-[calc(100vh-5rem)] on mobile prevents excessive whitespace above hero */}
      <div
        className={cn(
          'relative flex min-h-[calc(100vh-5rem)] md:min-h-screen w-full flex-col overflow-hidden bg-black text-white font-sans',
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
      <div className="relative z-10 flex flex-1 items-stretch w-full pr-0 md:pr-14 md:-translate-y-[13vh] pb-[140px] md:pb-0">

        {/* ── Left: Bio, Read More & Icons — vertically centered (desktop only) ── */}
        <div
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-6 md:left-10 lg:left-14 xl:left-20 z-30 flex-col gap-4 text-left items-start max-w-[280px] lg:max-w-[310px] pb-0"
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
            className="hidden md:flex absolute bottom-8 left-6 md:left-10 z-30 items-center gap-5"
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

        {/* ── Center: Portrait with orbiting tech icons ── */}
        {/* RESPONSIVE: Vertically centered on mobile, items-end on desktop */}
        <div className="absolute inset-0 flex items-center md:items-end justify-center h-full pointer-events-none px-4">

          {/* Tech orbit animation styles */}
          <style>{`
            @keyframes orbit-cw {
              from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
              to   { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
            }
            @keyframes orbit-ccw {
              from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
              to   { transform: rotate(-360deg) translateX(var(--orbit-r)) rotate(360deg); }
            }
            .tech-orbit-cw  { animation: orbit-cw  18s linear infinite; }
            .tech-orbit-ccw { animation: orbit-ccw 22s linear infinite; }
            .tech-orbit-cw2 { animation: orbit-cw  28s linear infinite; }
          `}</style>

          {/* Orbiting icons layer — behind portrait (desktop only) */}
          <div
            className="absolute pointer-events-none z-0 hidden md:block"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -44%)',
              width: 'min(130%, 760px)',
              aspectRatio: '1 / 1',
            }}
          >
            {/* Orbit ring 1 (inner) — 5 icons CW */}
            {[
              { label: 'HTML5', color: '#E34F26', startDeg: 0,   emoji: null, svgPath: 'M1.5 0L4 21.5 10 23l6-1.5L18.5 0H1.5zm14.9 5.3H6.2l.3 3.7h9.5l-1 10.9-4 1.1-4.1-1.1-.3-3.3h3.7l.2 1.8 2.5.7 2.5-.7.3-3.4H5.4L4.7 5.3' },
              { label: 'CSS3',  color: '#264DE4', startDeg: 72,  svgPath: 'M1.5 0L4 21.5 10 23l6-1.5L18.5 0H1.5zm13.2 5H5.6l.3 3.5h8.6l-.4 4H9.3l.3 3.3 2.4.7 2.5-.7.3-2.7h3.7l-.7 6.7-5.6 1.5-5.6-1.5-.8-8.8H6l.3-3.5-.3-3.5' },
              { label: 'React', color: '#61DAFB', startDeg: 144, svgPath: 'M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 0M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z' },
              { label: 'JS',    color: '#F7DF1E', startDeg: 216, svgPath: 'M0 0h24v24H0V0zm16.5 14.5c-.32 0-.65-.17-.65-.35 0-.18.13-.3.32-.38l1.1-.43c.92-.35 1.13-1 1.13-1.5 0-1.27-.97-2.14-2.4-2.14-1.2 0-2 .67-2 1.6 0 .85.6 1.33 1.4 1.6l.97.3c.7.2.97.55.97.95 0 .35-.33.6-.88.6-.7 0-1.13-.4-1.13-.97h-1.1c0 1.1.85 1.8 2.23 1.8 1.2 0 2-.65 2-1.7 0-.73-.4-1.25-1.17-1.6l-.95-.35c-.72-.27-1-.48-1-.88 0-.37.3-.6.87-.6.55 0 .85.27.85.73h1.1c0-.97-.77-1.6-1.97-1.6-1.1 0-1.9.6-1.9 1.5 0 .75.5 1.22 1.3 1.5l.6.2c.25.08.7.22.7.7 0 .33-.27.55-.72.55zm-6.5-5h1.1v4.93c0 1.5-.73 2.17-1.9 2.17-.95 0-1.55-.5-1.8-1.1l.97-.58c.15.3.43.55.83.55.5 0 .8-.27.8-.98V9.5z' },
              { label: 'Node',  color: '#68A063', startDeg: 288, svgPath: 'M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.1.26 1.56 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2zM6.5 14.9v-5.8l5.5 3.2-5.5 2.6z' },
            ].map(({ label, color, startDeg, svgPath }) => (
              <div
                key={label}
                className="tech-orbit-cw absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ '--orbit-r': '36%' } as React.CSSProperties}
                title={label}
              >
                <div
                  className="flex items-center justify-center rounded-full border border-white/10 backdrop-blur-sm shadow-lg"
                  style={{
                    width: 48,
                    height: 48,
                    marginLeft: -24,
                    marginTop: -24,
                    background: 'rgba(0,0,0,0.65)',
                    transform: `rotate(${startDeg}deg) translateX(36cqi) rotate(-${startDeg}deg)`,
                    animation: `orbit-cw 18s linear infinite`,
                    animationDelay: `${-startDeg / 360 * 18}s`,
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
                    <path d={svgPath} />
                  </svg>
                </div>
              </div>
            ))}

            {/* Orbit ring 2 (outer) — 5 icons CCW */}
            {[
              { label: 'Python',   color: '#3776AB', startDeg: 36,  svgPath: 'M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.898S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.031v-2.864s-.109-3.402 3.345-3.402h5.765s3.236.052 3.236-3.127V3.127S18.28 0 11.914 0zm-3.2 1.812a1.046 1.046 0 011.047 1.047 1.046 1.046 0 01-1.047 1.046A1.046 1.046 0 017.667 2.86a1.046 1.046 0 011.047-1.047zM12 6.193h5.823S24 5.73 24 12.054c0 6.177-3.635 5.954-3.635 5.954h-1.958v-2.86s.113-3.4-3.344-3.4H9.297S6.061 11.7 6.061 8.517V5.02S5.72 2 12 2' },
              { label: 'Git',      color: '#F05032', startDeg: 108, svgPath: 'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.6.182-.18.387-.316.605-.406V8.835c-.217-.09-.424-.222-.604-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187' },
              { label: 'GitHub',   color: '#ffffff', startDeg: 180, svgPath: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
              { label: 'PostgreSQL',color:'#336791', startDeg: 252, svgPath: 'M15.56 12.06c.48.03.76.43.64.89-.12.45-.57.72-1.05.69-.49-.03-.76-.43-.64-.89.12-.46.57-.72 1.05-.69zm-7.12 0c.48.03.93.23 1.05.69.12.46-.15.86-.64.89-.48.03-.93-.24-1.05-.69-.12-.46.16-.86.64-.89zm8.51-8.45C15.5 1.7 13 .5 12 .5s-3.5 1.2-5 3.11a9.1 9.1 0 00-.5.76c-1.96.6-3.5 2.13-3.5 4.63v.5c0 2.05.77 3.81 1.96 4.9v2.1c0 1.5.9 2.5 2 2.5.6 0 1.1-.3 1.54-.7.25.05.5.07.75.07.26 0 .51-.02.75-.07.44.4.94.7 1.54.7h.92c1.1 0 2-.84 2-2.5v-2.1c1.19-1.09 1.96-2.85 1.96-4.9v-.5c0-2.5-1.54-4.03-3.5-4.63-.16-.27-.33-.52-.5-.76z' },
              { label: 'MongoDB', color: '#47A248', startDeg: 324, svgPath: 'M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z' },
            ].map(({ label, color, startDeg, svgPath }) => (
              <div
                key={label}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: 52,
                  height: 52,
                  marginLeft: -26,
                  marginTop: -26,
                  background: 'rgba(0,0,0,0.65)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 12px 2px ${color}33`,
                  animation: `orbit-ccw 22s linear infinite`,
                  animationDelay: `${-startDeg / 360 * 22}s`,
                  transform: `rotate(${startDeg}deg) translateX(48%) rotate(-${startDeg}deg)`,
                }}
                title={label}
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill={color}>
                  <path d={svgPath} />
                </svg>
              </div>
            ))}
          </div>

          {/* RESPONSIVE: Image container uses w-[85vw] sm:w-[70vw] md:w-[450px] lg:w-[clamp(440px,33vw,500px)] xl:w-[500px] max-w-full aspect-[3/4] */}
          <motion.div
            className="relative flex items-end justify-center w-[85vw] sm:w-[70vw] md:w-[450px] lg:w-[clamp(440px,33vw,500px)] xl:w-[500px] max-w-full aspect-[3/4] pointer-events-auto overflow-hidden mx-auto"
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
        />

        {/* ── Mobile-only: Heading + View CV button below portrait ── */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 pb-6 px-6 z-30">
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
        <div className="relative z-30 flex md:hidden items-center justify-center gap-6 pb-6 pt-2">
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
}: {
  part1: string;
  part2: string;
  onCvClick?: () => void;
}) {
  const { displayed1, displayed2, done } = useTypewriter([part1, part2], 95, 320);

  return (
    <div className="hidden md:flex z-30 w-[25%] lg:w-[26%] xl:w-[28%] flex-col justify-center items-end text-right ml-auto gap-5 pr-2 md:pr-6 lg:pr-10 xl:pr-14">
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

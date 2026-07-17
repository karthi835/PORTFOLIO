import { IconCloud } from "@/components/ui/interactive-icon-cloud"
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
]

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}

const logos = [
  {
    id: "logo-2",
    description: "Figma",
    render: () => (
      <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <path d="M30 45C30 20.1472 50.1472 0 75 0C99.8528 0 120 20.1472 120 45C120 69.8528 99.8528 90 75 90H30V45Z" fill="#FF7262" />
        <path d="M30 135C30 110.147 50.1472 90 75 90C99.8528 90 120 110.147 120 135C120 159.853 99.8528 180 75 180C50.1472 180 30 159.853 30 135Z" fill="#1ABC9C" />
        <path d="M0 135C0 110.147 20.1472 90 45 90H75V135C75 159.853 54.8528 180 30 180C13.4315 180 0 166.569 0 150C0 144.6 1.4 139.5 3.9 135.1" fill="#18A0FB" />
        <path d="M0 45C0 20.1472 20.1472 0 45 0H75V90H45C20.1472 90 0 69.8528 0 45Z" fill="#F24E1E" />
        <path d="M0 135C0 110.147 20.1472 90 45 90H75V180H45C20.1472 180 0 159.853 0 135Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    id: "logo-3",
    description: "Next.js",
    render: () => (
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto fill-current text-foreground">
        <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.05" />
        <path d="M149.508 157.52L69.142 54H54V126H68.858V74.142L139.383 165C143.082 162.775 146.467 160.258 149.508 157.52Z" fill="currentColor" />
        <rect x="115" y="54" width="15" height="72" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "logo-6",
    description: "Supabase",
    render: () => (
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <path d="M52.92 4.41a3.6 3.6 0 0 0-6.12 2.88l5.4 32.76H16.2a3.6 3.6 0 0 0-3.06 5.46l30.6 50.4a3.6 3.6 0 0 0 6.12-2.88l-5.4-32.76h35.28a3.6 3.6 0 0 0 3.06-5.46L52.92 4.41z" fill="#3ECF8E" />
      </svg>
    ),
  },
  {
    id: "logo-react",
    description: "React",
    render: () => (
      <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto text-[#00d8ff]">
        <circle cx="0" cy="0" r="2" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5"/>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  },
  {
    id: "logo-typescript",
    description: "TypeScript",
    render: () => (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto rounded text-[#3178c6]">
        <rect width="100" height="100" fill="#3178C6" rx="12"/>
        <text x="32" y="74" fill="white" fontSize="52" fontWeight="bold" fontFamily="system-ui, sans-serif">TS</text>
      </svg>
    ),
  },
  {
    id: "logo-github",
    description: "GitHub",
    render: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-auto text-foreground">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

export function LogosSlider() {
  return (
    <div 
      className='relative h-[100px] w-full overflow-hidden bg-transparent'
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <InfiniteSlider 
        className='flex h-full w-full items-center' 
        duration={30}
        gap={48}
      >
        {logos.map((logo) => (
          <div 
            key={logo.id} 
            className='flex w-32 items-center justify-center'
          >
            {logo.render()}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

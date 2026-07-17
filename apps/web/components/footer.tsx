import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-foreground/5 bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-6 text-center md:px-12">
        <div className="text-xs text-foreground/40 font-medium tracking-wide">
          © {new Date().getFullYear()} KARTHIKEYAN All rights reserved.
        </div>
        <div className="text-sm font-medium text-foreground/60">
          Cuddalore – 607302
        </div>
      </div>
    </footer>
  );
};

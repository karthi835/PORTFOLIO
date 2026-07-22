"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect physical mobile devices (phones).
 *
 * Accurately detects mobile hardware even if Chrome's "Desktop site" mode is enabled:
 * - "Desktop site" mode overrides window.innerWidth (~980px) and User-Agent.
 * - However, physical screen dimensions (window.screen.width, window.screen.height)
 *   and navigator.maxTouchPoints remain hardware-bound to the phone.
 */
export function useIsMobileDevice(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobileDevice = () => {
      if (typeof window === "undefined") return;
      // Match Tailwind 'md' breakpoint (< 768px is mobile layout, >= 768px is desktop layout)
      // This respects Chrome/Safari's "Desktop site" mode on mobile phones.
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobileDevice();

    window.addEventListener("resize", checkIsMobileDevice);
    window.addEventListener("orientationchange", checkIsMobileDevice);

    return () => {
      window.removeEventListener("resize", checkIsMobileDevice);
      window.removeEventListener("orientationchange", checkIsMobileDevice);
    };
  }, []);

  return isMobile;
}

export default useIsMobileDevice;

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

      // 1. Min physical screen dimension in CSS pixels (portrait width / landscape height)
      const minScreenDim = Math.min(window.screen.width, window.screen.height);

      // 2. Hardware touch capabilities
      const hasTouchSupport =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

      // 3. Standard mobile User-Agent check
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
        navigator.userAgent
      );

      // Physical phone detection criteria:
      // Mobile phones have small physical screen width/height (min dimension <= 820px) AND touch capabilities,
      // OR explicitly report a mobile user agent.
      // Desktop PCs have min dimension >= 720/768/1080 and 0 touch points (or min dimension > 820 for touch laptops).
      const isRealMobilePhone = (minScreenDim <= 820 && hasTouchSupport) || isMobileUA;

      setIsMobile(isRealMobilePhone);
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

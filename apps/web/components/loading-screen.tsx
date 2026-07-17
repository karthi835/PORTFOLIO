"use client";

import { useEffect, useState } from 'react';
import './loading-screen.css';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Disable body scrolling while loading screen is active
    document.body.style.overflow = 'hidden';

    // Start fading out slightly before unmounting
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2700);

    // Completely remove loader at 3 seconds
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`loader-container ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="mainWrap">
        <div className="wrapper">
          <div className="c1">
            <div className="c2">
              <div className="c3">
                <div className="rect1">
                  <div className="miniC">
                    <div className="miniC1"></div>
                    <div className="miniC2"></div>
                    <div className="miniC3"></div>
                    <div className="miniC4"></div>
                  </div>
                  <div className="c4">
                    <div className="rect2">
                      <div className="rect3"></div>
                    </div>
                  </div>
                  <div className="c5"></div>
                  <div className="c6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-12 text-sm font-semibold tracking-widest text-[#ffb61e] animate-pulse uppercase">
        Loading...
      </p>
    </div>
  );
}

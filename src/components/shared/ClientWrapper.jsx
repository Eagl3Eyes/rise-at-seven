'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Custom circular cursor — mirrors the Alpine.js component-cursor overlay.
 */
function CustomCursor() {
  const cursorRef = useRef(null);
  const [active, setActive] = useState(false);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      cursor.style.left = `${e.clientX - cursor.clientWidth / 2}px`;
      cursor.style.top = `${e.clientY - cursor.clientHeight / 2}px`;
    };

    const onCursor = (e) => {
      const isActive = !!e.detail.active;
      setActive(isActive);
      setIcon(e.detail.icon || null);
      if (isActive) {
        document.body.classList.add('hide-cursor');
        document.documentElement.classList.add('hide-cursor');
      } else {
        document.body.classList.remove('hide-cursor');
        document.documentElement.classList.remove('hide-cursor');
      }
    };

    document.addEventListener('pointermove', onMove);
    window.addEventListener('component-cursor', onCursor);
    return () => {
      document.removeEventListener('pointermove', onMove);
      window.removeEventListener('component-cursor', onCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 isolate overflow-hidden rounded-full transition items-center justify-center hidden pointer-fine:flex bg-mint text-grey-900 text-2xl w-24 h-24 lg:w-32 lg:h-32 lg:text-4xl${
        active ? ' scale-100' : ' scale-0'
      }`}
    >
      {icon && <i className={`fa-regular fa-sharp ${icon}`} />}
    </div>
  );
}

/**
 * SVG circle-mask page-reveal animation.
 */
function CircleMaskReveal() {
  const revealRef = useRef(null);

  useGSAP(
    () => {
      gsap.to('.js-reveal-ellipse', {
        attr: { rx: 2700, ry: 2150 },
        duration: 1.25,
        ease: 'power2.out',
      });
    },
    { scope: revealRef },
  );

  return (
    <div
      ref={revealRef}
      className="fixed inset-0 w-screen h-screen-fix h-svh z-[100] pointer-events-none hidden pointer-fine:block"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className="block w-screen h-svh"
      >
        <defs>
          <mask id="circle-reveal-mask">
            <rect width="100%" height="100%" fill="white" />
            <ellipse
              className="js-reveal-ellipse"
              cx="960"
              cy="2000"
              rx="0"
              ry="0"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="var(--mask-colour)"
          mask="url(#circle-reveal-mask)"
          className="js-enter-mask"
        />
      </svg>
    </div>
  );
}

export default function ClientWrapper({ children }) {
  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVh();
    window.addEventListener('resize', setVh, { passive: true });
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <>
      <CircleMaskReveal />
      <CustomCursor />
      {children}
    </>
  );
}

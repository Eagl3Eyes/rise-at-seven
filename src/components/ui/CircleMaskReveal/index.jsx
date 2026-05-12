'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CircleMaskReveal() {
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

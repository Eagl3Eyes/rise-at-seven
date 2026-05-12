'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToRise() {
  const triggerRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const headingWidth = heading.offsetWidth;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let yStart = 150;
    let yEnd = 400;

    const mm = gsap.matchMedia();
    mm.add('(max-width: 1023px)', () => {
      yStart = 100;
      yEnd = 200;
    });

    gsap.set(heading, {
      y: yStart,
      x: headingWidth - windowWidth + windowWidth * 0.5,
    });

    gsap.to(heading, {
      x: () => -(headingWidth - window.innerWidth + 1000),
      y: yEnd,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 70%',
        end: '+=' + (headingWidth - windowWidth + windowHeight * 0.35),
        scrub: true,
      },
    });
  }, { scope: triggerRef });

  return (
    <div className="overflow-hidden hidden lg:block">
      <div ref={triggerRef} className="flex h-[35vh] lg:h-[100vh]">
        <div
          ref={headingRef}
          className="shrink-0 text-[30vw] lg:text-[16vw] font-medium tracking-tight leading-tight font-sans-primary text-grey-900"
        >
          Ready to Rise at Seven?
        </div>
      </div>
    </div>
  );
}

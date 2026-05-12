'use client';

import { useEffect, useRef } from 'react';

// Real-site order: 8 inline SVG logos + 4 image logos = 12 total.
const SLIDES = [
  { id: 'ninja', src: '/images/Logos/Client/Black/logo-ninja.svg', alt: 'SharkNinja' },
  { id: 'brand-01j76', src: '/images/Logos/Client/Black/01J76SW385WN4X1CBJWJV7QSAP.webp', alt: 'Client logo' },
  { id: 'sn', src: '/images/Logos/Client/Black/SN.webp', alt: 'SN' },
  { id: 'kroger', src: '/images/Logos/Client/Black/logo-kroger.svg', alt: 'Kroger' },
  { id: 'redbull', src: '/images/Logos/Client/Black/red-bull-logo-black.webp', alt: 'Red Bull' },
  { id: 'depop', src: '/images/Logos/Client/Black/logo-depop.svg', alt: 'Depop' },
  { id: 'untitled', src: '/images/Logos/Client/Black/Untitled-design.webp', alt: 'Client logo' },
  { id: 'hubspot', src: '/images/Logos/Client/Black/logo-hubspot.svg', alt: 'HubSpot' },
  { id: 'boxxo', src: '/images/Logos/Client/Black/logo-boxxo.svg', alt: 'Client logo' },
  { id: 'sky', src: '/images/Logos/Client/Black/logo-sky.svg', alt: 'Sky' },
  { id: 'asos', src: '/images/Logos/Client/Black/logo-asos.svg', alt: 'ASOS' },
  { id: 'rtb', src: '/images/Logos/Client/Black/logo-rtb.svg', alt: 'RTB House' },
];

export default function LogoCarousel() {
  const trackRef   = useRef(null);
  const posRef     = useRef(0);          // current scroll position in px
  const rafRef     = useRef(null);
  const dragState  = useRef({ active: false, startX: 0, startPos: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.45; // px per frame at 60 fps — slower to match real site

    const step = () => {
      if (!dragState.current.active) {
        const halfWidth = track.scrollWidth / 2;
        posRef.current = (posRef.current + SPEED) % halfWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Drag / swipe handlers ─────────────────────────────────────
  const onDragStart = (clientX) => {
    dragState.current = { active: true, startX: clientX, startPos: posRef.current };
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const onDragMove = (clientX) => {
    if (!dragState.current.active) return;
    const delta = dragState.current.startX - clientX;
    const halfWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 0;
    posRef.current = ((dragState.current.startPos + delta) % halfWidth + halfWidth) % halfWidth;
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };

  const onDragEnd = () => {
    dragState.current.active = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  return (
    <section className="w-full pt-6 xl:pt-12 overflow-hidden">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-20 w-full gap-y-2">

          {/* Left label */}
          <div className="col-span-20 flex items-center md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="inline-flex flex-wrap text-balance text-left text-grey-900 text-sm/tight font-sans-primary font-medium tracking-tight sm:max-w-32">
              The agency behind&nbsp;…
            </h2>
          </div>

          {/* Carousel */}
          <div
            className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18"
            style={{ '--blur': 1, '--blurs': 5 }}
          >
            <div
              className="w-full relative overflow-hidden z-0 select-none"
              style={{ cursor: 'grab' }}
              onMouseDown={(e) => onDragStart(e.clientX)}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
              onTouchEnd={onDragEnd}
            >
              <div ref={trackRef} className="logo-marquee-track" style={{ willChange: 'transform' }}>
                {[...SLIDES, ...SLIDES].map((slide, i) => (
                  <div key={i} className="logo-marquee-item">
                    <div className="w-20 py-5 relative lg:w-24">
                      <div className="aspect-20/9 w-full relative">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-full object-contain absolute inset-0"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-blur section-blur--left">
              <div style={{ '--index': 0 }} />
              <div style={{ '--index': 1 }} />
              <div style={{ '--index': 2 }} />
              <div style={{ '--index': 3 }} />
              <div style={{ '--index': 4 }} />
            </div>
            <div className="section-blur section-blur--right">
              <div style={{ '--index': 0 }} />
              <div style={{ '--index': 1 }} />
              <div style={{ '--index': 2 }} />
              <div style={{ '--index': 3 }} />
              <div style={{ '--index': 4 }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

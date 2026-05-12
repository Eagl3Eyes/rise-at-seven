'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BG_IMAGES = [
  '/images/hero/unnamed-6.webp',
  '/images/hero/RedBull-Instagram-Post-45.webp',
  '/images/hero/Emirates-airpline-in-flight.webp',
  '/images/hero/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.webp',
  '/images/hero/Screenshot-2025-07-01-at-21.36.35.webp',
  '/images/hero/spaseekers.webp',
];

import { LeafSVGLeft, LeafSVGRight } from '@/components/ui/Logos';

export default function Hero() {
  const [bgImage, setBgImage] = useState(BG_IMAGES[0]);

  useEffect(() => {
    setBgImage(BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)]);
  }, []);

  const sectionRef = useRef(null);
  const h1Ref = useRef(null);
  const imageWrapperRef = useRef(null);
  const inlineImageRef = useRef(null);
  const bgImageRef = useRef(null);

  // Set background image on the inline image div (background-image on absolute inset-0 div)
  useEffect(() => {
    const el = inlineImageRef.current;
    if (el) {
      el.style.backgroundImage = `url(${bgImage})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
  }, [bgImage]);

  // GSAP: word reveal + image wrapper expand animation
  // matchMedia handles resize internally — no ResizeObserver needed
  useGSAP(() => {
    const mm = gsap.matchMedia();

    const getSize = () => {
      const h1 = h1Ref.current;
      if (!h1) return 0;
      const lh = parseFloat(window.getComputedStyle(h1).lineHeight);
      const fs = parseFloat(window.getComputedStyle(h1).fontSize);
      return lh > 10 ? lh : fs * 1.2;
    };

    mm.add('(pointer: fine)', () => {
      const words = sectionRef.current?.querySelectorAll('.js-word');
      const wrapper = imageWrapperRef.current;
      const h1 = h1Ref.current;
      if (!words?.length || !h1) return;

      const size = getSize();

      // Set word spacing
      words.forEach(word => gsap.set(word, { marginRight: `${size * 0.15}px` }));

      // Word slide-up reveal
      gsap.from(words, {
        y: '100%',
        opacity: 0,
        stagger: 0.08,
        delay: 0.3,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Image wrapper: hidden (width=0) then expands to a square matching line-height
      if (wrapper) {
        gsap.set(wrapper, {
          width: 0,
          height: size,
          borderRadius: '15%',
          marginRight: `${size * 0.15}px`,
          display: 'inline-flex',
          flexShrink: 0,
          overflow: 'hidden',
        });
        gsap.to(wrapper, {
          width: size,
          duration: 0.7,
          ease: 'power4.out',
          delay: 0.9,
        });
      }
    });

    mm.add('(pointer: coarse)', () => {
      const wrapper = imageWrapperRef.current;
      if (!wrapper) return;
      const size = getSize();
      gsap.set(wrapper, {
        width: size,
        height: size,
        borderRadius: '15%',
        display: 'inline-flex',
        flexShrink: 0,
        overflow: 'hidden',
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="w-full py-0" ref={sectionRef}>
      <div className="w-full h-screen-fix h-svh relative p-2">

        {/* Bottom info bar */}
        <div className="items-end justify-between absolute bottom-0 left-0 z-30 w-full p-7 flex">
          <p className="text-sm text-white hidden flex-shrink-0 md:inline font-sans-primary">
            Organic media planners creating, distributing &amp; optimising <br />
            <strong>search-first</strong> content for SEO, Social, PR, Ai and LLM search
          </p>
          <p className="text-sm text-white w-full text-center md:text-right font-sans-primary">
            <strong>4 Global Offices serving</strong><br />
            <strong>UK, USA (New York) &amp; EU</strong>
          </p>
        </div>

        {/* Main card */}
        <div className="w-full h-full relative overflow-hidden rounded-3xl">
          <div className="w-full h-full overflow-hidden grid bg-grey-900 rounded-3xl scale-105">

            {/* BG image layer (blurred) */}
            <div className="col-start-1 row-start-1 relative z-0 overflow-hidden blur-md lg:blur-xl">
              <img
                ref={bgImageRef}
                src={bgImage}
                alt=""
                className="w-full h-full object-cover absolute inset-0"
                aria-hidden="true"
              />
            </div>

            {/* Content overlay */}
            <div className="col-start-1 row-start-1 z-20 relative flex justify-center items-center bg-grey-900/30">
              <div className="flex flex-col items-center">

                {/* Award badge */}
                <div className="flex flex-col items-center justify-center mb-5">
                  <div className="uppercase text-xs font-medium leading-tight tracking-tightish max-w-52 text-balance text-center mb-2 text-white">
                    #1 Most recommended content marketing agency
                  </div>
                  <div className="flex items-center gap-x-2">
                    <LeafSVGLeft />
                    <div className="w-12 aspect-20/9 relative">
                      <img src="/images/brand/global-search-awards.webp" alt="Global Search Awards" className="w-full h-full object-contain absolute inset-0" />
                    </div>
                    <div className="w-12 aspect-20/9 relative">
                      <img src="/images/brand/Mask-group.webp" alt="" className="w-full h-full object-contain absolute inset-0" />
                    </div>
                    <div className="w-12 aspect-20/9 relative">
                      <img src="/images/brand/UKSocial-Media-Awards-White.webp" alt="UK Social Media Awards" className="w-full h-full object-contain absolute inset-0" />
                    </div>
                    <div className="w-12 aspect-20/9 relative hidden lg:inline-flex">
                      <img src="/images/Logos/Awards/White/UK-Content-Awards-White.webp" alt="UK Content Awards" className="w-full h-full object-contain absolute inset-0" />
                    </div>
                    <LeafSVGRight />
                  </div>
                </div>

                {/* H1 */}
                <h1
                  ref={h1Ref}
                  className="inline-flex flex-wrap flex-col text-balance relative pointer-fine:pr-1 pointer-fine:pb-2 pointer-fine:mt-4 pointer-fine:-mb-3 text-white text-6xl/[0.9] md:text-6xl/none lg:text-7xl/[0.9] xl:text-8.5xl/[0.9] font-sans-primary font-medium tracking-tight text-center justify-center"
                >
                  {/* Row 1 */}
                  <div className="flex flex-wrap relative pointer-fine:-mt-6 pointer-fine:pb-6 pointer-fine:overflow-hidden text-center justify-center">
                    <div className="inline mr-2 pointer-fine:mr-0 js-word">We</div>{' '}
                    <div className="inline mr-2 pointer-fine:mr-0 js-word">Create</div>
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-wrap relative pointer-fine:-mt-6 pointer-fine:pb-6 pointer-fine:overflow-hidden text-center justify-center items-center">
                    <div className="inline mr-2 pointer-fine:mr-0 js-word">Category</div>{' '}
                    {/* Inline image wrapper — sizing controlled entirely by GSAP */}
                    <div
                      ref={imageWrapperRef}
                      className="bg-black/5 relative mr-2 pointer-fine:mr-0"
                    >
                      <div ref={inlineImageRef} className="absolute inset-0 w-full h-full" />
                    </div>{' '}
                    <div className="inline mr-2 pointer-fine:mr-0 js-word">Leaders</div>
                  </div>
                </h1>

                {/* Subtitle */}
                <div className="text-white text-lg/tight md:text-xl/tight xl:text-2xl/none font-sans-primary font-medium tracking-tight mt-2 lg:mt-4">
                  on every searchable platform
                </div>

                {/* Platform logos row — visible from md up */}
                <div className="w-full hidden md:flex justify-center relative overflow-hidden z-0 mt-8 lg:mt-12 gap-x-6 lg:gap-x-10 items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
                  {[
                    { src: '/images/platforms/gogle.webp', alt: 'Google' },
                    { src: '/images/platforms/chat-gpt.webp', alt: 'ChatGPT' },
                    { src: '/images/Logos/Social/White/gemini.webp', alt: 'Gemini' },
                    { src: '/images/platforms/tiktok.webp', alt: 'TikTok' },
                    { src: '/images/platforms/youtube.webp', alt: 'YouTube' },
                    { src: '/images/Logos/Social/White/pinterest.webp', alt: 'Pinterest' },
                    { src: '/images/Logos/Social/White/giphy.webp', alt: 'Giphy' },
                    { src: '/images/Logos/Social/White/reddit.webp', alt: 'Reddit' },
                    { src: '/images/Logos/Social/White/amazon.webp', alt: 'Amazon' },
                  ].map((logo) => (
                    <div key={logo.alt} className="relative shrink-0" style={{ width: '67.2px', height: '30.24px' }}>
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-full h-full object-contain object-center absolute inset-0"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

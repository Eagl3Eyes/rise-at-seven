'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimButton({ href, label, filled }) {
  const cls = filled
    ? 'w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl bg-white text-grey-900 flex-row-reverse'
    : 'w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer md:w-auto text-base bg-transparent text-grey-900 flex-row-reverse';
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      <div className="relative overflow-hidden">
        <div className="transition pointer-fine:group-hover:-translate-y-6">
          <div className="flex items-center gap-x-2">
            <span>{label}</span>
            <span className="inline-block align-middle motion-safe:transition text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
          </div>
        </div>
        <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
          <div className="flex items-center gap-x-2">
            <span>{label}</span>
            <span className="inline-block align-middle motion-safe:transition text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function DrivingDemand() {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const imageWrapperRef = useRef(null);

  // GSAP word reveal + image wrapper animation (same pattern as Hero)
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(pointer: fine)', () => {
      const words = sectionRef.current?.querySelectorAll('.js-word');
      const wrapper = imageWrapperRef.current;
      const h2 = h2Ref.current;
      if (!h2) return;

      const lh = parseFloat(window.getComputedStyle(h2).lineHeight);
      const fs = parseFloat(window.getComputedStyle(h2).fontSize);
      const size = lh > 10 ? lh : fs * 1.2;
      const gap = `${size * 0.15}px`;

      if (words?.length) {
        words.forEach(word => gsap.set(word, { marginRight: gap }));
        gsap.from(words, {
          y: '100%',
          opacity: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }

      if (wrapper) {
        gsap.set(wrapper, {
          width: 0,
          height: size,
          borderRadius: '15%',
          marginRight: gap,
          display: 'inline-flex',
          flexShrink: 0,
          overflow: 'hidden',
        });
        gsap.to(wrapper, {
          width: size,
          duration: 0.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }
    });

    mm.add('(pointer: coarse)', () => {
      const wrapper = imageWrapperRef.current;
      const h2 = h2Ref.current;
      if (!wrapper || !h2) return;
      const lh = parseFloat(window.getComputedStyle(h2).lineHeight);
      const fs = parseFloat(window.getComputedStyle(h2).fontSize);
      const size = lh > 10 ? lh : fs * 1.2;
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
    <section className="w-full py-12 xl:py-24" ref={sectionRef}>
      <div className="w-full px-4 md:px-7">
        <div className="w-full flex justify-between items-start flex-col-reverse md:flex-row gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5">

          {/* Mobile-only buttons */}
          <div className="flex flex-wrap gap-4 w-full md:hidden">
            <AnimButton href="https://riseatseven.com/about/" label="Our Story" filled />
            <AnimButton href="https://riseatseven.com/services/" label="Our Services" />
          </div>

          {/* Subtitle (right-aligned on desktop) */}
          <div className="w-full mb-1 md:mt-2 md:mb-0 max-w-sm xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl">
            <div className="inline-flex flex-wrap text-balance text-left text-grey-900 text-lg/tight xl:text-2xl/none 4xl:text-3xl/none font-sans-primary font-medium tracking-tight">
              A global team of search-first content marketers engineering semantic relevancy &amp; category signals for both the internet and people
            </div>
          </div>

          {/* Main heading + buttons */}
          <div className="w-full grid max-w-[24rem] md:max-w-[40rem] xl:max-w-xl 2xl:max-w-[42rem] 3xl:max-w-[52rem] 4xl:max-w-5xl gap-y-3 md:gap-y-7">
            <h2
              ref={h2Ref}
              className="inline-flex flex-wrap text-balance flex flex-col text-left text-grey-900 text-5xl/none lg:text-6xl/none xl:text-7xl/[0.9] 3xl:text-7.5xl/[0.9] 4xl:text-8xl/[0.9] font-sans-primary font-medium tracking-tight"
            >
              <div className="flex flex-wrap relative text-left items-center">
                <div className="inline mr-2 pointer-fine:mr-0 js-word">Driving</div>{' '}
                <div className="inline mr-2 pointer-fine:mr-0 js-word">Demand</div>{' '}
                <div className="inline mr-2 pointer-fine:mr-0 js-word">&amp;</div>{' '}
                <div className="inline mr-2 pointer-fine:mr-0 js-word">Discovery</div>{' '}
                <div
                  ref={imageWrapperRef}
                  className="inline shrink-0 flex bg-black/5 relative overflow-hidden mr-2 pointer-fine:mr-0"
                >
                  <div className="w-full h-full relative">
                    <img
                      src="/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.webp"
                      alt=""
                      className="w-full h-full object-cover object-center absolute inset-0"
                    />
                  </div>
                </div>
              </div>
            </h2>

            {/* Desktop buttons */}
            <div className="flex flex-wrap gap-4 hidden md:flex">
              <AnimButton href="https://riseatseven.com/about/" label="Our Story" filled />
              <AnimButton href="https://riseatseven.com/services/" label="Our Services" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

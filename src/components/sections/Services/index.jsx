'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SERVICES = [
  { name: 'Digital PR', href: 'https://riseatseven.com/services/digital-pr/', image: '/images/services/Screenshot-2025-06-23-at-22.39.35.webp' },
  { name: 'Organic Social & Content', href: 'https://riseatseven.com/services/social/', image: '/images/services/Screenshot-2025-07-01-at-20.31.18.webp' },
  { name: 'Search & Growth Strategy', href: 'https://riseatseven.com/services/strategy-growth/', image: '/images/services/Screenshot-2025-06-25-at-14.37.50.webp' },
  { name: 'Content Experience', href: 'https://riseatseven.com/services/content-experience/', image: '/images/services/0B5A7499.webp' },
  { name: 'Data & Insights', href: 'https://riseatseven.com/services/data-insights/', image: '/images/services/e34acc13-be9a-4862-a3bd-95aa2738aeb3.webp' },
  { name: 'Onsite SEO', href: 'https://riseatseven.com/services/onsite-seo/', image: '/images/services/Screenshot-2025-06-24-at-00.20.47.webp' },
];

export default function Services() {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);

  useGSAP(() => {
    const words = sectionRef.current.querySelectorAll('.js-svc-word');
    const imageWrappers = sectionRef.current.querySelectorAll('.js-svc-image-wrapper');
    const h2 = h2Ref.current;

    function sizeAndMargin() {
      if (!words.length) return;
      const lh = h2 ? parseFloat(window.getComputedStyle(h2).lineHeight) : words[0].offsetHeight;
      const h = lh > 0 ? lh : words[0].offsetHeight;
      imageWrappers.forEach(wrapper => {
        wrapper.style.height = h + 'px';
        wrapper.style.width = h + 'px';
        wrapper.style.borderRadius = (h * 0.15) + 'px';
      });
    }

    const mm = gsap.matchMedia();
    mm.add('(pointer: fine)', () => {
      const lh = h2 ? parseFloat(window.getComputedStyle(h2).lineHeight) : 0;
      if (lh > 0) {
        const gap = `${lh * 0.15}px`;
        words.forEach(word => gsap.set(word, { marginRight: gap }));
        imageWrappers.forEach(wrapper => gsap.set(wrapper, { marginRight: gap }));
      }
    });

    sizeAndMargin();
    const ro = new ResizeObserver(sizeAndMargin);
    ro.observe(sectionRef.current);
    return () => { ro.disconnect(); mm.revert(); };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full pb-12 xl:pb-24">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-12 overflow-hidden lg:pt-5 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5">

          {/* Header row */}
          <div className="col-span-12">
            <div className="grid grid-cols-12 md:border-b md:border-grey-200 md:pb-5 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5">
              <div className="col-span-11 md:col-span-9 flex items-end">
                <h2 ref={h2Ref} className="inline-flex flex-wrap text-balance relative pointer-fine:pr-1 pointer-fine:pb-2 pointer-fine:mt-4 pointer-fine:-mb-3 flex-col text-left justify-start text-grey-900 text-6xl/[0.9] md:text-7xl/none lg:text-7xl/none 2xl:text-8xl/[0.9] font-sans-primary font-medium tracking-tight">
                  <div className="flex flex-wrap relative pointer-fine:-mt-6 pointer-fine:pb-6 pointer-fine:overflow-hidden text-left justify-start">
                    <span className="inline mr-2 pointer-fine:mr-0 js-svc-word">Our</span>{' '}
                    <span className="inline shrink-0 flex bg-black/10 relative overflow-hidden mr-2 pointer-fine:mr-0 js-svc-image-wrapper">
                      <span className="w-full h-full relative">
                        <img src="/images/services/IMG_5079.webp" alt="" className="w-full h-full object-cover object-center absolute inset-0" />
                      </span>
                    </span>{' '}
                    <span className="inline mr-2 pointer-fine:mr-0 js-svc-word">Services</span>
                  </div>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-3 md:items-center md:justify-end hidden md:flex">
                <a href="https://riseatseven.com/services/" className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl bg-white text-grey-900 ring-grey-900/5 flex-row-reverse">
                  <div className="relative overflow-hidden">
                    <div className="transition pointer-fine:group-hover:-translate-y-6">
                      <div className="flex items-center gap-x-2">
                        <span>View All Services</span>
                        <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                      </div>
                    </div>
                    <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
                      <div className="flex items-center gap-x-2">
                        <span>View All Services</span>
                        <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Services grid */}
          <div className="col-span-12 grid grid-cols-12 gap-x-2">
            {SERVICES.map(svc => (
              <div key={svc.name} className="col-span-12 -my-px md:col-span-6">
                <div className="group relative">
                  <div className="absolute w-full bottom-0 left-0 z-0 pointer-fine:px-12">
                    <div className="w-full h-px bg-grey-200" />
                  </div>
                  <a href={svc.href} className="grid grid-cols-1 relative z-10">
                    {/* Text layer */}
                    <div className="col-start-1 row-start-1 relative z-20 py-4 flex items-center gap-3 text-black transition duration-500 lg:py-6 pointer-fine:group-hover:text-white">
                      {/* Mobile thumbnail */}
                      <div className="inline-flex relative w-12 h-12 rounded-lg overflow-hidden md:rounded-xl md:w-16 md:h-16 pointer-fine:hidden">
                        <img src={svc.image} alt="" className="w-full h-full object-cover absolute inset-0" loading="lazy" />
                      </div>
                      <div className="pointer-fine:translate-x-10">
                        <div className="relative">
                          <div className="absolute pr-2 top-0 left-0 overflow-hidden">
                            <div className="transition -translate-x-full translate-y-full -rotate-45 pointer-fine:group-hover:rotate-0 pointer-fine:group-hover:translate-x-0 pointer-fine:group-hover:translate-y-0">
                              <span className="text-3xl/none lg:text-4xl/none xl:text-5xl/none font-sans-primary font-medium">
                                <i className="fa-regular fa-sharp fa-arrow-up-right" />
                              </span>
                            </div>
                          </div>
                          <div className="transition pointer-fine:group-hover:translate-x-14">
                            <span className="inline-flex flex-wrap text-balance text-3xl/none lg:text-4xl/none xl:text-5xl/none 3xl:text-6xl/none font-sans-primary font-medium tracking-tight">
                              {svc.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Background image layer */}
                    <div className="col-start-1 row-start-1 relative rounded-full overflow-hidden z-10 transition bg-black opacity-0 pointer-fine:group-hover:opacity-100">
                      <div className="w-full h-full opacity-60 transition pointer-fine:group-hover:scale-[1.05]">
                        <div className="relative overflow-hidden w-full h-full">
                          <img src={svc.image} alt="" className="absolute z-0 top-0 left-0 w-full h-full object-cover" style={{ objectPosition: '50% 50%' }} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}

            {/* Mobile button */}
            <div className="col-span-12 md:hidden mt-4">
              <a href="https://riseatseven.com/services/" className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl bg-white text-grey-900 ring-grey-900/5 flex-row-reverse">
                <div className="relative overflow-hidden">
                  <div className="transition pointer-fine:group-hover:-translate-y-6">
                    <div className="flex items-center gap-x-2">
                      <span>View All Services</span>
                      <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                    </div>
                  </div>
                  <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
                    <div className="flex items-center gap-x-2">
                      <span>View All Services</span>
                      <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

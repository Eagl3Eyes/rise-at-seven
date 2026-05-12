'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    id: 8366,
    href: 'https://riseatseven.com/work/sixt/',
    name: 'SIXT',
    dates: '[2023-2025]',
    colour: '#cb7b3a',
    img: '/images/featureWorkSection/sixt-1.webp',
    imgAlt: 'Sixt 1',
    tag: 'Car rental',
    result: 'An extra 3m clicks regionally through SEO',
  },
  {
    id: 7670,
    href: 'https://riseatseven.com/work/dojo/',
    name: 'Dojo - B2B',
    dates: '[2021-2025]',
    colour: '#fdd8c4',
    img: '/images/featureWorkSection/dojo-go-product-shot-1.webp',
    imgAlt: 'Dojo go product shot 1',
    tag: 'Card Machines',
    result: 'A B2B success story for Dojo card machines',
  },
  {
    id: 19708,
    href: 'https://riseatseven.com/work/magnet-trade-b2b/',
    name: 'Magnet Trade - B2B',
    dates: '[2023-2024]',
    colour: '#d8c4fd',
    img: '/images/featureWorkSection/Screenshot-2026-02-07-at-17.01.43.webp',
    imgAlt: 'Magnet Trade',
    tag: null,
    result: 'A full service SEO success story 170%+ increase',
  },
  {
    id: 16982,
    href: 'https://riseatseven.com/work/esim-case-study/',
    name: 'Leading E Sim brand globally',
    dates: '[2023-2025]',
    colour: '#cb7b3a',
    img: '/images/featureWorkSection/eSIM-Europe-p1-what-is-eSIM-2-1.webp',
    imgAlt: 'eSIM Europe',
    tag: 'Esims',
    result: 'Increasing brand and non brand visibility UK/ES',
  },
  {
    id: 17067,
    href: 'https://riseatseven.com/work/jd-sports-/',
    name: 'JD Sports',
    dates: '[2025]',
    colour: '#3a8ccb',
    img: '/images/featureWorkSection/maxresdefault_2025-10-22-141838_nmnu.webp',
    imgAlt: 'JD Sports',
    tag: 'Trainers',
    result: '65% up YoY in clicks for JDSports FR, IT, ES',
  },
  {
    id: 8221,
    href: 'https://riseatseven.com/work/parkdean-resorts-easter-breaks/',
    name: 'Parkdean Resorts',
    dates: '[2019-2025]',
    colour: '#d2b59d',
    img: '/images/featureWorkSection/easter-breaks.webp',
    imgAlt: 'Easter breaks',
    tag: 'Easter Breaks',
    result: 'Dominating Google and AI search',
  },
  {
    id: 301,
    href: 'https://riseatseven.com/work/pooky/',
    name: 'Pooky',
    dates: '[2025]',
    colour: '#39b0bd',
    img: '/images/featureWorkSection/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.webp',
    imgAlt: 'Pooky',
    tag: 'Rechargeable Lights',
    result: 'Driving demand for Pooky Rechargeable Lights',
  },
  {
    id: 11781,
    href: 'https://riseatseven.com/work/parkdean-resorts-social-search/',
    name: 'Parkdean Resorts',
    dates: '[2019-2025]',
    colour: '#d29dd0',
    img: '/images/featureWorkSection/1.webp',
    imgAlt: 'Parkdean',
    tag: 'UK holidays',
    result: 'Social search and multi channel content to #1',
  },
  {
    id: 27,
    href: 'https://riseatseven.com/work/revolution-beauty/',
    name: 'Revolution Beauty',
    dates: '[2022-2025]',
    colour: '#fecacc',
    img: '/images/featureWorkSection/Screenshot-2025-06-10-at-12.13.46.webp',
    imgAlt: 'Revolution Beauty',
    tag: 'Beauty Dupes',
    result: "Building the UK's leading beauty dupe brand",
  },
  {
    id: 297,
    href: 'https://riseatseven.com/work/lloyds-pharmacy/',
    name: 'Lloyds Pharmacy',
    dates: '[2022-23]',
    colour: '#60dcfb',
    img: '/images/featureWorkSection/Screenshot-2025-07-04-at-12.50.54.webp',
    imgAlt: 'Lloyds Pharmacy',
    tag: 'STI tests',
    result: 'Driving category leadership for STI tests',
  },
  {
    id: 8004,
    href: 'https://riseatseven.com/work/prettylittlething/',
    name: 'PrettyLittleThing',
    dates: '[2021-2023]',
    colour: '#fecacc',
    img: '/images/featureWorkSection/Screenshot-2025-06-23-at-14.43.56.webp',
    imgAlt: 'PrettyLittleThing',
    tag: 'Outfits',
    result: 'Driving discovery for everything "outfits" for PLT',
  },
];

import TagBadge from '@/components/ui/TagBadge';

function WorkCard({ cs, hovering, active, onEnter, onLeave }) {
  const isActive = hovering && active === cs.id;
  return (
    <a
      href={cs.href}
      target="_blank"
      rel="noreferrer"
      className={`grid group circle-mask-container rounded-2xl overflow-hidden mb-5 lg:mb-7 relative${isActive ? ' is-active' : ''}`}
      onMouseOver={() => {
        window.dispatchEvent(new CustomEvent('component-cursor', { detail: { active: true, icon: 'fa-arrow-up-right' } }));
        onEnter();
      }}
      onMouseLeave={() => {
        window.dispatchEvent(new CustomEvent('component-cursor', { detail: { active: false } }));
        onLeave();
      }}
    >
      {/* Image layer */}
      <div className="col-start-1 row-start-1 transition pointer-fine:group-hover:scale-105">
        <div className="relative overflow-hidden w-full" style={{ paddingTop: '75%' }}>
          <img
            src={cs.img}
            alt={cs.imgAlt}
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity"
            loading="lazy"
          />
        </div>
      </div>

      {/* Badge top-right (desktop bottom) */}
      <div className="col-start-1 row-start-1 p-3 z-30 flex justify-end items-start lg:items-end lg:p-5">
        <TagBadge tag={cs.tag} />
      </div>

      {/* Mobile title overlay */}
      <div className="col-start-1 row-start-1 p-3 z-30 relative flex justify-start items-end lg:hidden lg:p-5">
        <div className="grid gap-y-1 relative z-20">
          <div className="text-white text-xs font-medium mt-2">{cs.dates}</div>
          <div className="inline-flex flex-wrap text-white text-3xl/none font-sans-primary font-medium tracking-tight">
            {cs.name}
          </div>
        </div>
        <div className="absolute w-full bottom-0 left-0 h-32 bg-gradient-to-t from-black z-10 opacity-70" />
      </div>

      {/* Hover colour overlay */}
      <div
        className="col-start-1 row-start-1 flex flex-col items-start justify-between z-40 p-3 transition lg:p-5 circle-mask"
        style={{ backgroundColor: cs.colour, color: '#111212' }}
      >
        <div className="inline-flex flex-wrap text-balance text-left text-current text-3xl/none lg:text-4xl/none xl:text-5xl/none 3xl:text-6xl/none font-sans-primary font-medium tracking-tight">
          {cs.result}
        </div>
        <div className="w-full flex items-end justify-between">
          <div className="w-8 lg:w-24" />
          <TagBadge tag={cs.tag} textClass="text-current" bgClass="bg-white/15" />
        </div>
      </div>
    </a>
  );
}

export default function FeaturedWork() {
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(null);

  const triggerRef = useRef(null);
  const imagesRef = useRef(null);
  const headingsRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const trigger = triggerRef.current;
    const images = imagesRef.current;
    const headingsContainer = headingsRef.current;
    const headings = headingsContainer?.querySelectorAll('.js-heading-40');
    const windowHeight = window.innerHeight;

    const mm = gsap.matchMedia();

    mm.add('(pointer: fine)', () => {
      gsap.set(trigger, { height: `${images.offsetHeight}px` });
      gsap.to(images, {
        y: () => -(images.offsetHeight - windowHeight),
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: () => `+=${images.offsetHeight - windowHeight}`,
          scrub: true,
        },
      });
    });

    mm.add('(pointer: coarse)', () => {
      gsap.to(images, {
        y: () => -(images.offsetHeight - windowHeight * 1.1),
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: () => `+=${images.offsetHeight - windowHeight * 1.1}`,
          scrub: true,
          pin: true,
        },
      });
    });

    if (headings?.length && headingsContainer) {
      const headingsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: () => `+=${images.offsetHeight - windowHeight}`,
          scrub: true,
        },
      });
      headings.forEach((heading) => {
        headingsTimeline.fromTo(
          heading,
          { y: 150 },
          {
            y: -headingsContainer.offsetHeight + 300,
            duration: 4,
            ease: 'none',
          },
          0,
        );
      });
    }

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef}>
      <section className="w-full pb-12 xl:pb-24">
        <div className="w-full px-4 md:px-7">
          <div
            className="w-full relative -my-7 flex overflow-hidden pointer-fine:overflow-visible js-trigger-40"
            ref={triggerRef}
          >
            <div className="w-full py-7 top-0 h-screen-fix-110 pointer-fine:h-screen-fix pointer-fine:sticky">
              <div className="w-full h-full overflow-hidden bg-grey-900 rounded-3xl grid grid-cols-12 px-5 lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-10">

                {/* Left panel — desktop only */}
                <div className="relative col-span-12 items-start hidden lg:flex lg:flex-row lg:items-center lg:col-span-6 lg:h-[96svh] 4xl:col-span-6">
                  <div className="flex flex-col items-start relative z-10 h-full pt-16 lg:pt-24 lg:pb-32 lg:gap-y-20">
                    <h2 className="inline-flex flex-wrap text-balance text-left text-white text-md/tight lg:text-lg/tight xl:text-xl/tight 4xl:text-2xl/none font-sans-primary font-medium tracking-tight">
                      Featured Work
                    </h2>

                    <div className="relative flex-1 overflow-hidden hidden pr-5 lg:inline-block">
                      {/* fade overlays */}
                      <div className="absolute top-0 left-0 w-full h-1/3 z-20 pointer-events-none bg-gradient-to-b from-grey-900 hidden lg:flex" />
                      <div className="absolute bottom-0 left-0 w-full h-1/3 z-20 pointer-events-none bg-gradient-to-t from-grey-900 hidden lg:flex" />

                      <div className="grid gap-y-2 relative z-10 2xl:gap-y-3 4xl:gap-y-5 js-headings-40" ref={headingsRef}>
                        {CASE_STUDIES.map((cs) => (
                          <div key={cs.id} className="relative transition js-heading-40">
                            <a
                              href={cs.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex items-start gap-x-2 transition${hovering && active === cs.id ? ' translate-x-3' : ''}`}
                              onMouseEnter={() => {
                                window.dispatchEvent(new CustomEvent('component-cursor', { detail: { active: true, icon: 'fa-arrow-up-right' } }));
                                setHovering(true);
                                setActive(cs.id);
                              }}
                              onMouseLeave={() => {
                                window.dispatchEvent(new CustomEvent('component-cursor', { detail: { active: false } }));
                                setHovering(false);
                                setActive(null);
                              }}
                            >
                              <div className="inline-flex flex-wrap text-balance text-left text-white text-5xl/none lg:text-6xl/none xl:text-7xl/[0.9] 3xl:text-7.5xl/[0.9] 4xl:text-8xl/[0.9] font-sans-primary font-medium tracking-tight">
                                {cs.name}
                              </div>
                              <div className="text-white text-xs font-medium mt-2">{cs.dates}</div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right panel — scrolling images */}
                <div
                  className="col-span-12 grid pt-7 pb-14 lg:col-span-6 lg:col-start-7 3xl:col-span-5 3xl:col-start-8 4xl:col-span-5 4xl:col-start-8 js-images-40"
                  ref={imagesRef}
                >
                  {/* Mobile label */}
                  <div className="mb-5 lg:hidden">
                    <h2 className="inline-flex flex-wrap text-balance text-left text-white text-md/tight lg:text-lg/tight xl:text-xl/tight 4xl:text-2xl/none font-sans-primary font-medium tracking-tight">
                      Featured Work
                    </h2>
                  </div>

                  {CASE_STUDIES.map((cs) => (
                    <WorkCard
                      key={cs.id}
                      cs={cs}
                      hovering={hovering}
                      active={active}
                      onEnter={() => { setHovering(true); setActive(cs.id); }}
                      onLeave={() => { setHovering(false); setActive(null); }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-3 lg:mt-7">
            <a
              href="https://riseatseven.com/work/"
              target="_blank"
              rel="noreferrer"
              className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl bg-white text-grey-900 flex-row-reverse"
            >
              <div className="relative overflow-hidden">
                <div className="transition pointer-fine:group-hover:-translate-y-6">
                  <div className="flex items-center gap-x-2">
                    <span>Explore Our Work</span>
                    <span className="inline-block align-middle motion-safe:transition text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                  </div>
                </div>
                <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
                  <div className="flex items-center gap-x-2">
                    <span>Explore Our Work</span>
                    <span className="inline-block align-middle motion-safe:transition text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

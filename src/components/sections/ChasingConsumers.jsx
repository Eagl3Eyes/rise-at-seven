'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ported from the original site's gsapHorizontalLoop helper
function gsapHorizontalLoop(items, config = {}) {
  items = gsap.utils.toArray(items);
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete() { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
  });
  const length = items.length;
  if (!length) return tl;
  const startX = items[0].offsetLeft;
  const times = [], widths = [], xPercents = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    xPercent(i, el) {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
        gsap.getProperty(el, 'xPercent'),
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  const totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
    (parseFloat(config.paddingRight) || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
    tl.to(item, { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false },
        distanceToLoop / pixelsPerSecond,
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  tl.progress(1, true).progress(0, true);
  if (config.reversed) { tl.vars.onReverseComplete(); tl.reverse(); }
  return tl;
}

// 4 repetitions of the two pairs = 8 group divs (matches clone's js-scrolling-items-42 count)
const GROUPS = [
  { text: 'Chasing Consumers', imgSrc: '/images/Screenshot-2025-06-25-at-14.49.00.webp' },
  { text: 'Not Algorithms',    imgSrc: '/images/IMG_5023.webp' },
  { text: 'Chasing Consumers', imgSrc: '/images/Screenshot-2025-06-25-at-14.49.00.webp' },
  { text: 'Not Algorithms',    imgSrc: '/images/IMG_5023.webp' },
  { text: 'Chasing Consumers', imgSrc: '/images/Screenshot-2025-06-25-at-14.49.00.webp' },
  { text: 'Not Algorithms',    imgSrc: '/images/IMG_5023.webp' },
  { text: 'Chasing Consumers', imgSrc: '/images/Screenshot-2025-06-25-at-14.49.00.webp' },
  { text: 'Not Algorithms',    imgSrc: '/images/IMG_5023.webp' },
];

export default function ChasingConsumers() {
  const containerRef = useRef(null);
  const groupRefs   = useRef([]);

  useGSAP(() => {
    const groups = groupRefs.current.filter(Boolean);
    if (!groups.length) return;

    // Continuous horizontal loop (speed matches clone: 0.5)
    gsapHorizontalLoop(groups, { repeat: -1, speed: 0.5 });

    // Scroll-driven parallax shift (pointer:fine only)
    const mm = gsap.matchMedia();
    mm.add('(pointer: fine)', () => {
      gsap.to(containerRef.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 100%',
          end: 'bottom -100%',
          scrub: true,
        },
      });
    });
    mm.add('(pointer: coarse)', () => {
      gsap.set(containerRef.current, { xPercent: 0 });
    });
  });

  return (
    <div className="overflow-hidden">
      <section className="w-full py-0">
        <div className="w-full px-0">
          <a
            href="https://riseatseven.com/contact/"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('component-cursor-button', { detail: { active: true, text: 'Send Us Your Brief' } }))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('component-cursor-button', { detail: { active: false, text: false } }))}
            className="w-full relative overflow-hidden block"
          >
            <div ref={containerRef} className="w-[120vw] flex relative z-0 overflow-hidden">
              {GROUPS.map((group, i) => (
                <div
                  key={i}
                  ref={el => { groupRefs.current[i] = el; }}
                  className="shrink-0 flex items-center gap-x-4 px-2 pb-3 lg:pt-5 lg:pb-10 lg:gap-x-10 lg:px-5"
                >
                  <h2 className="inline-flex flex-wrap text-balance relative text-left text-grey-900 text-7xl/[0.9] md:text-7xl/[0.9] lg:text-8xl/[0.9] xl:text-10xl/[0.9] font-sans-primary font-medium tracking-tight flex-1 lg:pb-10 whitespace-nowrap">
                    {group.text}
                  </h2>
                  <div className="shrink-0 rounded-2xl overflow-hidden w-[20vw] md:w-[15vw] lg:mb-10 lg:rounded-3xl lg:w-[12vw]">
                    <div className="relative overflow-hidden w-full" style={{ paddingTop: '100%' }}>
                      <img
                        src={group.imgSrc}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity"
                        loading="lazy"
                        style={{ opacity: 0 }}
                        onLoad={e => { e.currentTarget.style.opacity = '1'; }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

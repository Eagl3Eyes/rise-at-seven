'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    bg: 'bg-black',
    textColor: 'text-white',
    descColor: 'text-white',
    image: '/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.webp',
    title: 'Pioneers',
    paragraphs: [
      "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
      "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    ],
    rotate: 4,
    zIndex: 2,
  },
  {
    bg: 'bg-mint',
    textColor: 'text-grey-900',
    descColor: 'text-grey-900',
    image: '/images/d4df0d30-d590-4e94-9056-9491f4beacba.webp',
    title: 'Award Winning',
    paragraphs: [
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    ],
    rotate: 8,
    zIndex: 1,
  },
  {
    bg: 'bg-white',
    textColor: 'text-grey-900',
    descColor: 'text-grey-900',
    image: '/images/Screenshot-2025-06-23-at-23.15.19.webp',
    title: 'Speed',
    paragraphs: [
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    ],
    rotate: 12,
    zIndex: 0,
  },
];

function Card({ card }) {
  return (
    <div className={`w-full flex-col text-center rounded-2xl grid p-7 lg:items-center lg:rounded-3xl lg:aspect-square xl:py-10 xl:px-14 ${card.bg}`}>
      <div className="col-start-1 row-start-1 flex flex-col text-center lg:items-center gap-y-3 md:gap-y-5">
        <div className="rounded-xl overflow-hidden w-full aspect-[4/3] relative lg:aspect-square lg:rounded-2xl lg:w-48">
          <img src={card.image} alt="" className="absolute top-0 left-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <h2 className={`inline-flex flex-wrap text-balance text-center justify-center text-3xl/none lg:text-5xl/none xl:text-6xl/none 3xl:text-7xl/[0.9] font-sans-primary font-medium tracking-tight ${card.textColor}`}>
            {card.title}
          </h2>
          <div className="w-full">
            {card.paragraphs.map((p, i) => (
              <p key={i} className={`text-sm font-sans-primary leading-normal text-pretty mb-5 lg:text-base ${card.descColor} ${i === card.paragraphs.length - 1 ? '!mb-0' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Legacy() {
  const triggerRef = useRef(null);

  useGSAP(() => {
    const items = triggerRef.current ? triggerRef.current.querySelectorAll('.js-legacy-item') : [];
    if (!items.length) return;

    gsap.to(items, {
      yPercent: -100,
      rotate: -50,
      stagger: 1,
      ease: 'power2.inOut',
      duration: 3,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 30%',
        end: 'bottom -50%',
        scrub: true,
      },
    });
  }, { scope: triggerRef });

  return (
    <div>
      {/* Mobile: Swiper carousel */}
      <section className="w-full py-0 lg:hidden">
        <div className="w-full py-10 px-4 md:px-7 gap-y-3 md:gap-y-5" style={{ '--swiper-pagination-color': '#000', '--swiper-pagination-progressbar-bg-color': '#fff' }}>
          <div className="flex justify-center mb-3">
            <h2 className="text-md/tight lg:text-lg/tight xl:text-xl/tight font-sans-primary font-medium tracking-tight text-grey-900">
              Legacy In The Making
            </h2>
          </div>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={15}
            loop={true}
            speed={700}
            breakpoints={{ 640: { slidesPerView: 1.55 } }}
            pagination={{ el: '.js-legacy-pagination', type: 'progressbar' }}
            className="w-full"
          >
            {CARDS.map((card, i) => (
              <SwiperSlide key={i} className="!flex !h-auto">
                <Card card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full relative mt-3">
            <div className="js-legacy-pagination w-full swiper-pagination" />
          </div>
        </div>
      </section>

      {/* Desktop: stacked cards with GSAP scroll */}
      <div className="w-full relative hidden lg:flex" ref={triggerRef} style={{ height: '300vh' }}>
        <div className="w-full h-svh sticky top-0 left-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full flex justify-center mt-10 3xl:mt-16">
            <h2 className="text-md/tight lg:text-lg/tight xl:text-xl/tight font-sans-primary font-medium tracking-tight text-grey-900">
              Legacy In The Making
            </h2>
          </div>

          {CARDS.map((card, i) => (
            <div
              key={i}
              className="w-full h-full absolute left-0 flex items-center justify-center top-8 js-legacy-item"
              style={{ zIndex: card.zIndex, willChange: 'transform' }}
            >
              <div className="w-full max-w-lg xl:max-w-xl" style={{ transform: `rotate(${card.rotate}deg)` }}>
                <Card card={card} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const POSTS = [
  {
    href: 'https://riseatseven.com/blog/global-operations-director-promotion/',
    image: '/images/news/0B5A7827.webp',
    category: 'News',
    author: 'Carrie Rose',
    authorAvatar: '/images/news/84b3917f166d7feb4c2376f78ce33ae432656999.webp',
    readTime: '2 mins',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
  },
  {
    href: 'https://riseatseven.com/blog/coneys-chooses-riseatseven-for-demand-brief-2/',
    image: '/images/news/3-copy.webp',
    category: 'Food/Hospitality/Drink',
    author: 'Ray Saddiq',
    authorAvatar: '/images/news/WhatsApp-Image-2025-06-23-at-22.50.52.webp',
    readTime: '2 mins',
    title: 'Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category',
  },
  {
    href: 'https://riseatseven.com/blog/noomz-chooses-riseatseven-for-demand-brief/',
    image: '/images/news/Noomz1-4.webp',
    category: 'Food/Hospitality/Drink',
    author: 'Carrie Rose',
    authorAvatar: '/images/news/84b3917f166d7feb4c2376f78ce33ae432656999.webp',
    readTime: '2 mins',
    title: "Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz",
  },
];

function PostCard({ post }) {
  return (
    <a
      href={post.href}
      className="w-full flex flex-col items-start gap-y-5 pointer-fine:hover:-translate-y-2 transition circle-mask-container"
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('component-cursor', { detail: { active: true, icon: 'fa-arrow-up-right' } }))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('component-cursor', { detail: { active: false, icon: false } }))}
    >
      <div className="w-full grid">
        <div className="col-start-1 row-start-1 z-20 p-3">
          <div className="flex flex-wrap gap-1">
            <div className="inline-flex items-center font-sans-primary font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1 min-h-7 xl:min-h-8 xl:py-1.5 xl:text-base text-white bg-white/20 backdrop-blur-sm">
              {post.category}
            </div>
          </div>
        </div>

        <div className="col-start-1 row-start-1 z-10 relative rounded-2xl overflow-hidden aspect-square lg:rounded-3xl">
          <div className="w-full h-full transition blur-md duration-1000 scale-[1.2] circle-mask">
            <img src={post.image} alt="" className="h-full w-full object-cover absolute top-0 left-0" loading="lazy" />
          </div>
        </div>

        <div className="col-start-1 row-start-1 aspect-square relative rounded-2xl overflow-hidden lg:rounded-3xl">
          <img src={post.image} alt="" className="h-full w-full object-cover absolute top-0 left-0" loading="lazy" />
        </div>
      </div>

      <div className="flex flex-col items-start gap-y-3">
        <div className="flex items-start gap-1 mt-1">
          <div className="inline-flex items-center font-sans-primary font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1 min-h-7 xl:min-h-8 xl:py-1.5 xl:text-base text-grey-300 bg-white">
            <div className="inline-flex items-center justify-center -ml-1.5">
              <div className="rounded-full overflow-hidden -mr-1 w-5 h-5">
                <img src={post.authorAvatar} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>{post.author}</div>
          </div>

          <div className="inline-flex items-center font-sans-primary font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1 min-h-7 xl:min-h-8 xl:py-1.5 xl:text-base text-grey-300 bg-white">
            <i className="fa-sharp fa-regular fa-stopwatch" />
            <div>{post.readTime}</div>
          </div>
        </div>

        <h2 className="inline-flex flex-wrap text-balance text-left text-grey-900 text-2xl/none xl:text-3xl/none font-sans-primary font-medium tracking-tight">
          {post.title}
        </h2>
      </div>
    </a>
  );
}

export default function WhatsNew() {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);

  useGSAP(() => {
    const words = sectionRef.current.querySelectorAll('.js-wn-word');
    const imageWrappers = sectionRef.current.querySelectorAll('.js-wn-image-wrapper');
    const h2 = h2Ref.current;

    function sizeAndMargin() {
      if (!words.length) return;
      const lh = h2 ? parseFloat(window.getComputedStyle(h2).lineHeight) : words[0].offsetHeight;
      const h = lh > 0 ? lh : words[0].offsetHeight;
      imageWrappers.forEach((wrapper) => {
        wrapper.style.height = `${h}px`;
        wrapper.style.width = `${h}px`;
        wrapper.style.borderRadius = `${h * 0.15}px`;
      });
    }

    const mm = gsap.matchMedia();
    mm.add('(pointer: fine)', () => {
      const lh = h2 ? parseFloat(window.getComputedStyle(h2).lineHeight) : 0;
      if (lh > 0) {
        const gap = `${lh * 0.15}px`;
        words.forEach((word) => gsap.set(word, { marginRight: gap }));
        imageWrappers.forEach((wrapper) => gsap.set(wrapper, { marginRight: gap }));
      }
    });

    sizeAndMargin();
    const ro = new ResizeObserver(sizeAndMargin);
    ro.observe(sectionRef.current);
    return () => {
      ro.disconnect();
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full pb-12 xl:pb-24">
      <div className="w-full px-0">
        <div className="grid grid-cols-12 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5">
          <div className="col-span-12 px-4 md:px-7">
            <div className="grid grid-cols-12 md:border-b md:border-grey-200 md:pb-5 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5">
              <div className="col-span-11 md:col-span-9 flex items-end">
                <h2 ref={h2Ref} className="inline-flex flex-wrap text-balance relative pointer-fine:pr-1 pointer-fine:pb-2 pointer-fine:mt-4 pointer-fine:-mb-3 flex-col text-left justify-start text-grey-900 text-6xl/[0.9] md:text-7xl/none lg:text-7xl/none 2xl:text-8xl/[0.9] font-sans-primary font-medium tracking-tight">
                  <div className="flex flex-wrap relative pointer-fine:-mt-6 pointer-fine:pb-6 pointer-fine:overflow-hidden text-left justify-start">
                    <span className="inline mr-2 pointer-fine:mr-0 js-wn-word">What's</span>{' '}
                    <span className="inline shrink-0 flex bg-black/10 relative overflow-hidden mr-2 pointer-fine:mr-0 js-wn-image-wrapper">
                      <span className="w-full h-full relative">
                        <img src="/images/news/FOS25-3380.webp" alt="" className="w-full h-full object-cover object-center absolute inset-0" />
                      </span>
                    </span>{' '}
                    <span className="inline mr-2 pointer-fine:mr-0 js-wn-word">New</span>
                  </div>
                </h2>
              </div>

              <div className="col-span-12 md:col-span-3 md:items-center md:justify-end hidden md:flex">
                <a href="https://riseatseven.com/blog/" className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl bg-white text-grey-900 ring-grey-900/5 flex-row-reverse">
                  <div className="relative overflow-hidden">
                    <div className="transition pointer-fine:group-hover:-translate-y-6">
                      <div className="flex items-center gap-x-2">
                        <span>Explore More Thoughts</span>
                        <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                      </div>
                    </div>
                    <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
                      <div className="flex items-center gap-x-2">
                        <span>Explore More Thoughts</span>
                        <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:px-7" style={{ '--swiper-pagination-color': '#000', '--swiper-pagination-progressbar-bg-color': '#fff' }}>
            <Swiper
              modules={[Pagination]}
              slidesPerView={1.15}
              spaceBetween={15}
              loop={false}
              rewind={true}
              grabCursor={true}
              allowTouchMove={true}
              slidesOffsetBefore={15}
              speed={700}
              pagination={{ el: '.js-wn-pagination', type: 'progressbar' }}
              breakpoints={{
                768: { slidesPerView: 2.15 },
                1024: { slidesPerView: 3, spaceBetween: 15, slidesOffsetBefore: 0 },
                1280: { slidesPerView: 3, spaceBetween: 20, slidesOffsetBefore: 0 },
              }}
              className="w-full"
            >
              {POSTS.map((post, i) => (
                <SwiperSlide key={i} className="py-2">
                  <PostCard post={post} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="w-full relative py-3 mt-5 px-4 md:px-7 lg:hidden">
              <div className="w-full relative">
                <div className="js-wn-pagination w-full swiper-pagination" />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:hidden px-4 md:px-7">
            <a href="https://riseatseven.com/blog/" className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl bg-white text-grey-900 ring-grey-900/5 flex-row-reverse">
              <div className="relative overflow-hidden">
                <div className="transition pointer-fine:group-hover:-translate-y-6">
                  <div className="flex items-center gap-x-2">
                    <span>Explore More Thoughts</span>
                    <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                  </div>
                </div>
                <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
                  <div className="flex items-center gap-x-2">
                    <span>Explore More Thoughts</span>
                    <span className="inline-block align-middle text-xs mt-1" aria-hidden="true"><i className="fa-regular fa-sharp fa-arrow-up-right" /></span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

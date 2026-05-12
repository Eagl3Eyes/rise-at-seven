'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

/** The Rise at Seven wordmark SVG — fill-current so parent controls colour. */
function RiseAtSevenLogo() {
  return (
    <svg
      className="w-full h-full object-contain fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 168 21"
    >
      <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z" />
      <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z" />
      <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z" />
      <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z" />
      <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z" />
      <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z" />
      <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z" />
      <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z" />
      <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z" />
      <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z" />
      <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z" />
      <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z" />
      <path d="M164.759 7.94414L166.061 8.71517V8.08955L165.395 7.69051C165.437 7.68172 165.48 7.66954 165.521 7.65466C165.869 7.53157 166.061 7.24209 166.061 6.84034C166.061 6.57725 165.966 6.33579 165.801 6.17753C165.583 5.9638 165.277 5.93945 165.065 5.93945H164.191V8.63807H164.758V7.94346L164.759 7.94414ZM164.908 7.22856H164.76V6.47715H165.043C165.261 6.47715 165.495 6.57251 165.495 6.84102C165.495 7.10953 165.297 7.22856 164.908 7.22856H164.908Z" />
      <path d="M165.127 10.1622C166.714 10.1622 168 8.87583 168 7.28913C168 5.70242 166.714 4.41602 165.127 4.41602C163.54 4.41602 162.254 5.70242 162.254 7.28913C162.254 8.87583 163.54 10.1622 165.127 10.1622ZM165.127 5.22763C166.264 5.22763 167.189 6.15219 167.189 7.28913C167.189 8.42606 166.264 9.35062 165.127 9.35062C163.99 9.35062 163.066 8.42606 163.066 7.28913C163.066 6.15219 163.99 5.22763 165.127 5.22763Z" />
    </svg>
  );
}

/**
 * Reusable CTA button with the double-text hover-slide animation.
 * variant: 'white'  → bg-white  text-grey-900
 * variant: 'dark'   → bg-grey-900 text-white
 * variant: 'mint'   → bg-mint   text-grey-900
 */
function CTAButton({ href, children, variant = 'white', className = '' }) {
  const variantClass =
    variant === 'dark'
      ? 'bg-grey-900 text-white'
      : variant === 'mint'
        ? 'bg-mint text-grey-900'
        : 'bg-white text-grey-900';

  return (
    <a
      href={href}
      className={`w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-sans-primary font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none md:w-auto text-base px-6 py-3 rounded-3xl transition pointer-fine:hover:rounded-xl ring-grey-900/5 flex-row-reverse ${variantClass} ${className}`}
    >
      <div className="relative overflow-hidden">
        <div className="transition pointer-fine:group-hover:-translate-y-6">
          <div className="flex items-center gap-x-2">
            <span>{children}</span>
            <span className="inline-block align-middle motion-safe:transition text-xs mt-1" aria-hidden="true">
              <i className="fa-regular fa-sharp fa-arrow-up-right" />
            </span>
          </div>
        </div>
        <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
          <div className="flex items-center gap-x-2">
            <span>{children}</span>
            <span className="inline-block align-middle motion-safe:transition text-xs mt-1" aria-hidden="true">
              <i className="fa-regular fa-sharp fa-arrow-up-right" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * Two-bar hamburger / X toggle button.
 * barColor: a Tailwind bg-* class e.g. 'bg-white' or 'bg-grey-900'
 */
function HamburgerButton({ isOpen, onClick, barColor }) {
  return (
    <button
      className="inline-flex items-center justify-center w-12 h-8"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="flex w-5 h-2 flex-col items-start justify-between">
        <div
          className={`w-full h-px relative -top-px transition-transform duration-500 ${isOpen ? 'transform rotate-45 translate-y-1' : 'transform rotate-0'
            }`}
        >
          <div className={`w-full h-0.5 ${barColor}`} />
        </div>
        <div
          className={`w-full h-px transition-transform duration-500 ${isOpen ? 'transform -rotate-45 -translate-y-1' : 'transform rotate-0'
            }`}
        >
          <div className={`w-full h-0.5 ${barColor}`} />
        </div>
      </div>
    </button>
  );
}

/**
 * A desktop nav link with the slide-up-on-hover double-text animation.
 * Triggers the mega menu open + hover-background pill update.
 */
function DesktopNavLink({ href, label, badge, menuId, activeMegaMenu, isTransparent, onMouseEnter }) {
  const isActive = activeMegaMenu === menuId;
  const textClass =
    isTransparent && !isActive ? 'text-white' : 'text-grey-900';

  return (
    <div className="z-10 relative">
      <a
        href={href}
        className={`group inline-flex tracking-tight leading-tight py-1 font-medium relative duration-300 px-4 pointer-fine:hover:text-grey-900 ${textClass}`}
        onMouseEnter={onMouseEnter}
      >
        {label}
        {badge != null && (
          <div className="inline-flex pointer-events-none absolute top-0 right-0 -translate-y-2.5 rounded-full px-1.5 py-0.5 text-2xs font-thin transition pointer-fine:group-hover:-translate-y-4 bg-mint text-grey-900">
            {badge}
          </div>
        )}
        {menuId && (
          <span className="hidden ml-1 pointer-events-none pointer-fine:inline">+</span>
        )}
      </a>
    </div>
  );
}

/**
 * A single mega menu image layer — visible when isActive, blurred + hidden otherwise.
 * Mirrors the x-bind:class opacity/blur pattern from the original.
 */
function MegaMenuImage({ src, alt, isActive }) {
  return (
    <div
      className={`absolute inset-0 transition duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
        loading="lazy"
        style={{ opacity: 0 }}
        onLoad={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      />
    </div>
  );
}

/**
 * Shared structure for mega menu image panels (right column).
 */
function MegaMenuImagePanel({ images, activeId, width = 'w-80' }) {
  return (
    <div className={`shrink-0 relative ${width}`}>
      <div className="relative rounded-2xl overflow-hidden bg-grey-900 aspect-1/1 w-full shrink-0">
        <div className="w-full h-full relative">
          {images.map((img) => (
            <MegaMenuImage
              key={img.id}
              src={img.src}
              alt={img.alt}
              isActive={activeId === img.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A single link inside a desktop mega menu column, with the slide-up hover animation.
 */
function MegaMenuLink({ href, label, size = 'text-xl', onMouseEnter }) {
  return (
    <a
      href={href}
      className={`group inline-flex tracking-tight leading-tight font-medium relative ${size}`}
      onMouseEnter={onMouseEnter}
    >
      <div className="relative overflow-hidden truncate">
        <div className="transition pointer-fine:group-hover:-translate-y-8">{label}</div>
        <div className="transition absolute top-0 left-0 translate-y-8 pointer-fine:group-hover:translate-y-0">
          {label}
        </div>
      </div>
    </a>
  );
}

/**
 * A collapsible mobile nav item (top-level entry with optional sub-links).
 */
function MobileNavItem({ label, href, itemId, expandedItem, onToggle, children }) {
  const isExpanded = expandedItem === itemId;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <a
          href={href}
          className="text-white text-4xl tracking-tight font-medium leading-none md:text-5xl"
        >
          {label}
        </a>
        {children && (
          <button
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border border-white border-solid transition ${isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
            onClick={() => onToggle(itemId)}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${label}`}
          >
            <i className="fa-sharp fa-regular fa-angle-down" />
          </button>
        )}
      </div>

      {children && isExpanded && (
        <div className="w-full">
          <div className="grid gap-y-1 py-4">{children}</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────

const SERVICES_LINKS_COL1 = [
  { id: 4790, href: 'https://riseatseven.com/services/strategy-growth/', label: 'Search & Growth Strategy' },
  { id: 11981, href: 'https://riseatseven.com/services/onsite-seo/', label: 'Onsite SEO' },
  { id: 4789, href: 'https://riseatseven.com/services/content-experience/', label: 'Content Experience' },
  { id: 22669, href: 'https://riseatseven.com/services/b2b-marketing/', label: 'B2B Marketing' },
];

const SERVICES_LINKS_COL2 = [
  { id: 12019, href: 'https://riseatseven.com/services/digital-pr/', label: 'Digital PR' },
  { id: 12020, href: 'https://riseatseven.com/services/social/', label: 'Social Media & Campaigns' },
  { id: 12021, href: 'https://riseatseven.com/services/data-insights/', label: 'Data & Insights' },
  { id: 16559, href: 'https://riseatseven.com/services/social-seo-tiktok-youtube/', label: 'Social SEO/Search' },
];

const SERVICES_IMAGES = [
  { id: 4790, src: '/images/navbar/Screenshot-2025-06-23-at-23.14.49.webp', alt: 'Search & Growth Strategy' },
  { id: 11981, src: '/images/navbar/WhatsApp-Image-2025-06-03-at-08.34.50.webp', alt: 'Onsite SEO' },
  { id: 4789, src: '/images/navbar/Screenshot-2025-06-23-at-23.16.14.webp', alt: 'Content Experience' },
  { id: 22669, src: '/images/navbar/0B5A6875.webp', alt: 'B2B Marketing' },
  { id: 12019, src: '/images/services/Screenshot-2025-06-23-at-22.39.35.webp', alt: 'Digital PR' },
  { id: 12020, src: '/images/navbar/temp_image_43CEDE6C-4430-479F-9DBF-B348FA9AC991.webp', alt: 'Social Media & Campaigns' },
  { id: 12021, src: '/images/navbar/data.webp', alt: 'Data & Insights' },
  { id: 16559, src: '/images/navbar/Screenshot-2025-09-24-at-11.47.25.webp', alt: 'Social SEO/Search' },
];

const INTERNATIONAL_LINKS = [
  { id: 4762, href: 'https://riseatseven.com/international/us-digital-pr/', label: 'US Digital PR' },
  { id: 23207, href: 'https://riseatseven.com/spain-digital-pr/', label: 'Spain Digital PR' },
  { id: 23208, href: 'https://riseatseven.com/germany-digital-pr/', label: 'Germany Digital PR' },
  { id: 23603, href: 'https://riseatseven.com/netherlands-digital-pr/', label: 'Netherlands Digital PR' },
];

const INTERNATIONAL_IMAGES = [
  { id: 4762, src: '/images/navbar/d4df0d30-d590-4e94-9056-9491f4beacba.webp', alt: 'US Digital PR' },
  { id: 23207, src: '/images/navbar/Logos_2026-04-23-101020_frxy.webp', alt: 'Spain Digital PR' },
  { id: 23208, src: '/images/navbar/27.webp', alt: 'Germany Digital PR' },
  { id: 23603, src: '/images/navbar/Logos_2026-04-23-095313_xfhk.webp', alt: 'Netherlands Digital PR' },
];

const INDUSTRIES_LINKS = [
  { id: 22669, href: 'https://riseatseven.com/services/b2b-marketing/', label: 'B2B Marketing' },
];

const INDUSTRIES_IMAGES = [
  { id: 22669, src: '/images/navbar/0B5A6875.webp', alt: 'B2B Marketing' },
];

const ABOUT_LINKS = [
  { id: 16915, href: 'https://riseatseven.com/about/', label: 'About Us' },
  { id: 16916, href: 'https://riseatseven.com/meet-the-team/', label: 'Meet The Risers' },
  { id: 16917, href: 'https://riseatseven.com/culture/', label: 'Culture' },
  { id: 16918, href: 'https://riseatseven.com/testimonials/', label: 'Testimonials' },
];

const ABOUT_IMAGES = [
  { id: 16915, src: '/images/navbar/0B5A7487.webp', alt: 'About Us' },
  { id: 16916, src: '/images/navbar/Screenshot-2025-06-23-at-23.14.49.webp', alt: 'Meet The Risers' },
  { id: 16917, src: '/images/navbar/IMG_4280-2.webp', alt: 'Culture' },
  { id: 16918, src: '/images/navbar/d4df0d30-d590-4e94-9056-9491f4beacba.webp', alt: 'Testimonials' },
];

const DEFAULT_ANNOUNCEMENT = {
  text: '🚨 Where are your customers actually searching? Download the report',
  href: 'https://riseatseven.com/multi-channel-search-report-2026-/',
};

const LIVE_SITE_MIRROR_URL = 'https://r.jina.ai/http://riseatseven.com/';

// ─────────────────────────────────────────────────────────────────
// Main Navbar component
// ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  // ── UI state ──────────────────────────────────────────────────
  const [mobileMenu, setMobileMenu] = useState(false);
  // activeMegaMenu holds the numeric ID of the open mega menu, or false
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  // true = at top of page (header transparent), false = scrolled (frosted glass)
  const [hideHeaderBackground, setHideHeaderBackground] = useState(true);
  const [hideAnnouncementBar, setHideAnnouncementBar] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  // Allows external components to force-hide the header via a custom DOM event
  const [hideHeaderOverride, setHideHeaderOverride] = useState(false);
  // Mobile accordion: tracks which top-level item is expanded
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  // Per-mega-menu active image IDs
  const [servicesActive, setServicesActive] = useState(4790);
  const [industriesActive, setIndustriesActive] = useState(22669);
  const [intlActive, setIntlActive] = useState(4762);
  const [aboutActive, setAboutActive] = useState(16915);
  const [announcementBar, setAnnouncementBar] = useState(DEFAULT_ANNOUNCEMENT);

  // ── Refs ──────────────────────────────────────────────────────
  const navRef = useRef(null);   // GSAP scope
  const hoverBgRef = useRef(null);   // hover-background pill element
  const navLinksRef = useRef(null);   // the group/links container
  // Map of mega menu DOM elements keyed by their numeric ID
  const megaMenuElsRef = useRef({});
  // Tracks previous mega menu dimensions for the morph animation
  const prevMenuData = useRef({ width: null, height: null });
  // Ref mirror of hoveringLink to avoid stale closures inside the scroll handler
  const hoveringLinkRef = useRef(false);

  // ── GSAP: initialise mega menus (opacity 0) ───────────────────
  // useGSAP with scope avoids double-run issues in React 18 Strict Mode.
  useGSAP(
    () => {
      Object.values(megaMenuElsRef.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scaleX: 1, scaleY: 1 });
      });
    },
    { scope: navRef, dependencies: [] },
  );

  // ── GSAP mega-menu morph animation (event-driven, not scroll) ──
  // Using contextSafe ensures the tweens are registered to the GSAP
  // context created by useGSAP above, so they clean up on unmount.
  const { contextSafe } = useGSAP({ scope: navRef });

  const animateMegaMenu = useCallback(
    contextSafe((newId) => {
      // Small setTimeout mirrors the original Alpine code's setTimeout(fn, 10)
      // which lets the browser paint the newly-visible menu before measuring it.
      setTimeout(() => {
        const activeEl = megaMenuElsRef.current[newId];
        if (!activeEl) return;

        const newRect = activeEl.getBoundingClientRect();
        const newW = newRect.width;
        const newH = newRect.height;
        const fromW = prevMenuData.current.width ?? newW;
        const fromH = prevMenuData.current.height ?? newH;

        // Morph from previous menu dimensions → natural size
        gsap.set(activeEl, {
          transformOrigin: 'top center',
          scaleX: fromW / newW,
          scaleY: fromH / newH,
          opacity: 1,
        });
        gsap.to(activeEl, { scaleX: 1, scaleY: 1, duration: 0.4, ease: 'power4.out' });

        // Hide all other mega menus instantly
        Object.values(megaMenuElsRef.current).forEach((el) => {
          if (el && el !== activeEl) gsap.set(el, { opacity: 0, scaleX: 1, scaleY: 1 });
        });

        prevMenuData.current = { width: newW, height: newH };
      }, 10);
    }),
    // contextSafe is stable; no other deps needed
    [contextSafe],
  );

  // ── Effect: body overflow lock when mega menu is open ──────────
  useEffect(() => {
    if (activeMegaMenu) {
      document.body.classList.add('overflow-hidden');
      animateMegaMenu(activeMegaMenu);
    } else {
      document.body.classList.remove('overflow-hidden');
      // Fade all mega menus out
      Object.values(megaMenuElsRef.current).forEach((el) => {
        if (el) gsap.to(el, { opacity: 0, duration: 0.2 });
      });
      prevMenuData.current = { width: null, height: null };
    }
  }, [activeMegaMenu, animateMegaMenu]);

  // ── Effect: html overflow lock when mobile menu is open ────────
  // NOTE: scroll lock is applied to <html>, not <body>, to preserve
  // the sticky behaviour on the desktop nav — exactly as the original.
  useEffect(() => {
    if (mobileMenu) {
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.documentElement.classList.remove('overflow-hidden');
    }
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [mobileMenu]);

  // ── Effect: master scroll handler ─────────────────────────────
  useEffect(() => {
    let prevY = 0;

    const handleScroll = () => {
      const y = window.scrollY;

      // Close mega menu on any scroll (mirrors x-on:scroll.window)
      setActiveMegaMenu(false);
      hoveringLinkRef.current = false;
      setHoveringLink(false);

      setHideAnnouncementBar(y > 20);
      setHideHeaderBackground(y <= 100);

      // Hide header on scroll-down past 100 px; show on scroll-up.
      // While a nav link is hovered we never hide the header.
      const scrollingDown = y > prevY;
      if (scrollingDown && y > 100 && !hoveringLinkRef.current) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      prevY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Effect: Escape key closes mega menu ───────────────────────
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(false);
        hoveringLinkRef.current = false;
        setHoveringLink(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  // ── Effect: external component-header event ───────────────────
  useEffect(() => {
    const handler = (e) => {
      setHideHeaderOverride(!!e.detail?.hideHeaderOverride);
    };
    window.addEventListener('component-header', handler);
    return () => window.removeEventListener('component-header', handler);
  }, []);

  // ── Effect: force header visible while a link is hovered ──────
  useEffect(() => {
    if (hoveringLink) setHideHeader(false);
  }, [hoveringLink]);

  // ── Effect: sync announcement bar text/link from live site ─────
  useEffect(() => {
    const normalizeAnnouncementText = (text) => {
      const compact = text.replace(/\s+/g, ' ').trim();

      // Some mirrored sources include the same announcement phrase multiple times.
      const segments = compact
        .split('🚨')
        .map((s) => s.trim())
        .filter(Boolean);

      if (segments.length > 1) {
        const normalizedSet = new Set(
          segments.map((s) => s.replace(/\s+/g, ' ').toLowerCase()),
        );

        if (normalizedSet.size === 1) {
          return `🚨 ${segments[0]}`;
        }
      }

      return compact;
    };

    const parseLiveAnnouncement = (raw) => {
      const lineMatch = raw.match(/\[\s*(🚨[^\]]+)\]\((https?:\/\/riseatseven\.com\/[^)]+)\)/i);
      if (!lineMatch) return null;

      const text = normalizeAnnouncementText(lineMatch[1]);
      const href = lineMatch[2].trim();
      if (!text || !href) return null;

      return { text, href };
    };

    const syncAnnouncement = async (signal) => {
      try {
        const res = await fetch(LIVE_SITE_MIRROR_URL, { signal, cache: 'no-store' });
        if (!res.ok) return;

        const raw = await res.text();
        const parsed = parseLiveAnnouncement(raw);
        if (parsed) setAnnouncementBar(parsed);
      } catch {
        // Keep fallback content silently when remote content isn't reachable.
      }
    };

    const controller = new AbortController();
    syncAnnouncement(controller.signal);

    const intervalId = window.setInterval(() => {
      const refreshController = new AbortController();
      syncAnnouncement(refreshController.signal);
    }, 5 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  // ── Hover background pill helper ──────────────────────────────
  const updateHoverBackground = useCallback((event, value) => {
    if (value) {
      hoveringLinkRef.current = true;
      setHoveringLink(true);
      setHideHeader(false);

      if (hoverBgRef.current && navLinksRef.current) {
        const containerRect = navLinksRef.current.getBoundingClientRect();
        const targetRect = event.currentTarget.getBoundingClientRect();
        hoverBgRef.current.style.width = `${targetRect.width}px`;
        hoverBgRef.current.style.left = `${targetRect.left - containerRect.left}px`;
      }
    } else {
      hoveringLinkRef.current = false;
      setHoveringLink(false);
    }
  }, []);

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(false);
    updateHoverBackground(null, false);
  }, [updateHoverBackground]);

  const toggleMobileItem = useCallback((id) => {
    setExpandedMobileItem((prev) => (prev === id ? null : id));
  }, []);

  // Derived: is the header bar visually transparent (at top of page)?
  const isTransparent = hideHeaderBackground;

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <div ref={navRef}>
      {/* ── Announcement bar ────────────────────────────────────
          Fades out (opacity-0) when mobile menu opens.
          Not fixed — scrolls naturally with the page.       */}
      <div
        className={`pt-2.5 px-2.5 w-full transition-opacity ${mobileMenu ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
      >
        <a
          href={announcementBar.href}
          className="group flex justify-center z-[60] relative items-center text-xs w-full py-2 px-5 text-balance text-center tracking-tight leading-none font-semibold rounded-2xl transition pointer-fine:hover:rounded-md text-grey-900 bg-mint"
        >
          {/* Mobile: single line */}
          <div className="block mt-0.5 lg:hidden">
            {announcementBar.text}
          </div>
          {/* Desktop: slide-up hover duplicate */}
          <div className="relative overflow-hidden mt-0.5 hidden lg:block">
            <div className="transition pointer-fine:group-hover:-translate-y-6">
              {announcementBar.text}
            </div>
            <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
              {announcementBar.text}
            </div>
          </div>
        </a>
      </div>

      {/* ── Fixed header strip ──────────────────────────────────
          Slides fully off-screen (-translate-y-full) when
          hideHeader || hideHeaderOverride is true.          */}
      <div
        className={`w-full fixed top-0 left-0 z-50 flex transition duration-700 h-18 lg:h-22 lg:p-3 ${hideHeader || hideHeaderOverride ? '-translate-y-full' : ''
          }`}
      >
        {/* ── Mobile full-screen overlay menu ─────────────────
            opacity-0 / pointer-events-none when closed.
            js-modal class provides the custom opacity transition. */}
        <div
          className={`w-full h-svh fixed top-0 left-0 z-50 transition p-2 backdrop-blur-sm duration-1000 js-modal lg:hidden ${mobileMenu
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
            }`}
        >
          <div className="w-full h-full bg-grey-900/80 rounded-3xl px-4 py-2.5 flex flex-col items-start justify-between">
            <div className="w-full grid gap-y-10">
              {/* Mobile header row: logo + close button */}
              <div className="w-full flex flex-wrap items-center justify-between">
                <a href="https://riseatseven.com/" className="w-32 inline-flex md:w-40">
                  <div className="text-white">
                    <RiseAtSevenLogo />
                  </div>
                </a>
                <div className="-mr-2">
                  <div className="inline-flex lg:hidden">
                    <HamburgerButton
                      isOpen={mobileMenu}
                      onClick={() => setMobileMenu(false)}
                      barColor="bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile nav items with accordion */}
              <div className="flex flex-col items-start gap-y-1">
                <MobileNavItem
                  label="Services"
                  href="https://riseatseven.com/services/"
                  itemId="102"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                >
                  {[...SERVICES_LINKS_COL1, ...SERVICES_LINKS_COL2].map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="group inline-flex tracking-tight leading-tight font-medium relative text-white text-xl"
                    >
                      {link.label}
                    </a>
                  ))}
                </MobileNavItem>

                <MobileNavItem
                  label="Industries"
                  href="https://riseatseven.com/services/b2b-marketing/"
                  itemId="industries"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                >
                  <a
                    href="https://riseatseven.com/services/b2b-marketing/"
                    className="group inline-flex tracking-tight leading-tight font-medium relative text-white text-xl"
                  >
                    B2B Marketing
                  </a>
                </MobileNavItem>

                <MobileNavItem
                  label="International"
                  href="https://riseatseven.com/international/"
                  itemId="103"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                >
                  {INTERNATIONAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="group inline-flex tracking-tight leading-tight font-medium relative text-white text-xl"
                    >
                      {link.label}
                    </a>
                  ))}
                </MobileNavItem>

                <MobileNavItem
                  label="About"
                  href="https://riseatseven.com/about/"
                  itemId="16913"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                >
                  {ABOUT_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="group inline-flex tracking-tight leading-tight font-medium relative text-white text-xl"
                    >
                      {link.label}
                    </a>
                  ))}
                </MobileNavItem>

                <MobileNavItem
                  label="Work"
                  href="https://riseatseven.com/work/"
                  itemId="104"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                />

                <MobileNavItem
                  label="Careers"
                  href="https://riseatseven.com/careers/"
                  itemId="105"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                />

                <MobileNavItem
                  label="Blog & Resources"
                  href="https://riseatseven.com/blog/"
                  itemId="106"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                />

                <MobileNavItem
                  label="Webinar"
                  href="https://riseatseven.com/webinars/"
                  itemId="107"
                  expandedItem={expandedMobileItem}
                  onToggle={toggleMobileItem}
                />
              </div>
            </div>

            {/* Mobile CTA */}
            <CTAButton href="https://riseatseven.com/connect-with-us/" variant="white" className="w-full">
              Get in touch
            </CTAButton>
          </div>
        </div>

        {/* ── Click-away + backdrop-blur overlay behind mega menus ──
            Covers the full screen; clicking it closes the mega menu.
            backdrop-blur-lg fires only when a mega menu is open.   */}
        <div
          className={`fixed top-0 left-0 w-screen h-svh z-10 transition-all duration-400 pointer-events-none ${activeMegaMenu ? 'pointer-events-auto backdrop-blur-lg' : ''
            } ${hoveringLink && !activeMegaMenu ? 'pointer-events-auto' : ''}`}
          onClick={closeMegaMenu}
          onMouseEnter={closeMegaMenu}
        />

        {/* ── Services mega menu (ID 102) ──────────────────────── */}
        <div
          ref={(el) => { megaMenuElsRef.current[102] = el; }}
          data-menu-id="102"
          className={`flex-shrink-0 absolute z-20 left-1/2 -translate-x-1/2 translate-y-full hidden pt-10 pointer-fine:flex js-mega-menu ${hideAnnouncementBar ? 'bottom-10' : 'bottom-0'
            } ${activeMegaMenu === 102 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ opacity: 0 }}
        >
          <div className="bg-white rounded-3xl flex shrink-0 transition">
            {/* Links columns */}
            <div className="flex-1 inline-flex items-center justify-center px-12">
              <div className="flex gap-x-12">
                {/* Column 1: Core Services */}
                <div className="flex-1 -mt-3">
                  <ul className="flex flex-col gap-y-0.5">
                    <div className="h-8">
                      <div className="inline-flex flex-wrap text-balance relative text-left justify-start text-grey-300 text-base leading-tight font-sans-primary font-medium tracking-tight">
                        Core Services
                      </div>
                    </div>
                    {SERVICES_LINKS_COL1.map((link) => (
                      <MegaMenuLink
                        key={link.id}
                        href={link.href}
                        label={link.label}
                        size="text-xl"
                        onMouseEnter={() => setServicesActive(link.id)}
                      />
                    ))}
                  </ul>
                </div>
                {/* Column 2 */}
                <div className="flex-1 -mt-3">
                  <ul className="flex flex-col gap-y-0.5">
                    <div className="h-8" />
                    {SERVICES_LINKS_COL2.map((link) => (
                      <MegaMenuLink
                        key={link.id}
                        href={link.href}
                        label={link.label}
                        size="text-xl"
                        onMouseEnter={() => setServicesActive(link.id)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Image panel + footer CTA */}
            <div className="shrink-0 relative p-3" style={{ width: '334.8px' }}>
              <div className="absolute bottom-6 left-6 right-6 z-30">
                <CTAButton href="https://riseatseven.com/services/" variant="dark" className="w-full !rounded-2xl">
                  View All Services
                </CTAButton>
              </div>
              <div style={{ width: '310.8px', height: '310.8px' }}>
                <MegaMenuImagePanel images={SERVICES_IMAGES} activeId={servicesActive} width="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Industries mega menu (ID 201) ─────────────────── */}
        <div
          ref={(el) => { megaMenuElsRef.current[201] = el; }}
          data-menu-id="201"
          className={`flex-shrink-0 absolute z-20 left-1/2 -translate-x-1/2 translate-y-full hidden pt-10 pointer-fine:flex js-mega-menu ${hideAnnouncementBar ? 'bottom-10' : 'bottom-0'
            } ${activeMegaMenu === 201 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ opacity: 0 }}
        >
          <div className="bg-white rounded-3xl flex shrink-0 transition">
            <div className="flex-1 inline-flex items-center justify-center px-12">
              <div className="flex gap-x-12">
                <div className="flex-1 -mt-3">
                  <ul className="flex flex-col gap-y-0.5">
                    <div className="h-8" />
                    {INDUSTRIES_LINKS.map((link) => (
                      <MegaMenuLink
                        key={link.id}
                        href={link.href}
                        label={link.label}
                        size="text-3xl"
                        onMouseEnter={() => setIndustriesActive(link.id)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <MegaMenuImagePanel images={INDUSTRIES_IMAGES} activeId={industriesActive} width="w-72" />
          </div>
        </div>

        {/* ── International mega menu (ID 103) ─────────────────── */}
        <div
          ref={(el) => { megaMenuElsRef.current[103] = el; }}
          data-menu-id="103"
          className={`flex-shrink-0 absolute z-20 left-1/2 -translate-x-1/2 translate-y-full hidden pt-10 pointer-fine:flex js-mega-menu ${hideAnnouncementBar ? 'bottom-10' : 'bottom-0'
            } ${activeMegaMenu === 103 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ opacity: 0 }}
        >
          <div className="bg-white rounded-3xl flex shrink-0 transition">
            <div className="flex-1 inline-flex items-center justify-center px-12">
              <div className="flex gap-x-12">
                <div className="flex-1 -mt-3">
                  <ul className="flex flex-col gap-y-0.5">
                    <div className="h-8" />
                    {INTERNATIONAL_LINKS.map((link) => (
                      <MegaMenuLink
                        key={link.id}
                        href={link.href}
                        label={link.label}
                        size="text-3xl"
                        onMouseEnter={() => setIntlActive(link.id)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <MegaMenuImagePanel images={INTERNATIONAL_IMAGES} activeId={intlActive} width="w-72" />
          </div>
        </div>

        {/* ── About mega menu (ID 16913) ────────────────────────── */}
        <div
          ref={(el) => { megaMenuElsRef.current[16913] = el; }}
          data-menu-id="16913"
          className={`flex-shrink-0 absolute z-20 left-1/2 -translate-x-1/2 translate-y-full hidden pt-10 pointer-fine:flex js-mega-menu ${hideAnnouncementBar ? 'bottom-10' : 'bottom-0'
            } ${activeMegaMenu === 16913 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ opacity: 0 }}
        >
          <div className="bg-white rounded-3xl flex shrink-0 transition">
            <div className="flex-1 inline-flex items-center justify-center px-12">
              <div className="flex gap-x-12">
                <div className="flex-1 -mt-3">
                  <ul className="flex flex-col gap-y-0.5">
                    <div className="h-8" />
                    {ABOUT_LINKS.map((link) => (
                      <MegaMenuLink
                        key={link.id}
                        href={link.href}
                        label={link.label}
                        size="text-3xl"
                        onMouseEnter={() => setAboutActive(link.id)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <MegaMenuImagePanel images={ABOUT_IMAGES} activeId={aboutActive} width="w-72" />
          </div>
        </div>

        {/* ── Desktop nav bar ──────────────────────────────────────
            translate-y-12 when announcement bar is visible (pushes bar
            down to sit below it); translate-y-0 once bar is hidden.
            bg-white/60 backdrop-blur-lg applied when scrolled past 100 px. */}
        <div
          className={`w-full flex items-center justify-between relative z-20 px-4 transition lg:px-3 lg:rounded-full ${!isTransparent ? 'bg-white/60 backdrop-blur-lg' : ''
            } ${hideAnnouncementBar ? 'translate-y-0' : 'translate-y-12'}`}
        >
          {/* Logo */}
          <a
            href="https://riseatseven.com/"
            className={`flex w-32 ml-2 md:w-40 ${isTransparent ? 'text-white' : 'text-grey-900'}`}
          >
            <div className="aspect-4/3 text-current">
              <RiseAtSevenLogo />
            </div>
          </a>

          {/* Desktop nav links + hover-background pill */}
          <div
            ref={navLinksRef}
            className="relative ml-10 group/links hidden lg:inline-flex"
          >
            {/* Sliding hover-background pill */}
            <div
              ref={hoverBgRef}
              className={`bg-grey-50 z-0 h-full rounded-full absolute pointer-events-none opacity-0 transition-all duration-300 hidden pointer-fine:flex group-hover/links:opacity-100 ${activeMegaMenu !== false ? 'opacity-100' : ''
                }`}
            />

            <DesktopNavLink
              href="https://riseatseven.com/services/"
              label="Services"
              menuId={102}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(102);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/services/b2b-marketing/"
              label="Industries"
              menuId={201}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(201);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/international/"
              label="International"
              menuId={103}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(103);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/about/"
              label="About"
              menuId={16913}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(16913);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/work/"
              label="Work"
              badge={25}
              menuId={null}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(false);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/careers/"
              label="Careers"
              menuId={null}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(false);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/blog/"
              label="Blog & Resources"
              menuId={106}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(false);
                updateHoverBackground(e, true);
              }}
            />
            <DesktopNavLink
              href="https://riseatseven.com/webinars/"
              label="Webinar"
              menuId={null}
              activeMegaMenu={activeMegaMenu}
              isTransparent={isTransparent}
              onMouseEnter={(e) => {
                setActiveMegaMenu(false);
                updateHoverBackground(e, true);
              }}
            />
          </div>

          {/* Desktop CTA — hidden on mobile */}
          <div className="hidden lg:inline-flex">
            {/* White button when header is transparent (at top of page) */}
            {isTransparent && (
              <CTAButton href="https://riseatseven.com/connect-with-us/" variant="white">
                Get in touch
              </CTAButton>
            )}
            {/* Dark button when header has frosted glass background */}
            {!isTransparent && (
              <CTAButton href="https://riseatseven.com/connect-with-us/" variant="dark">
                Get in touch
              </CTAButton>
            )}
          </div>

          {/* Mobile hamburger — hidden on desktop */}
          <div className="lg:hidden">
            {/* White bars when at top of page */}
            {isTransparent && (
              <div className="inline-flex lg:hidden">
                <HamburgerButton
                  isOpen={mobileMenu}
                  onClick={() => setMobileMenu((v) => !v)}
                  barColor="bg-white"
                />
              </div>
            )}
            {/* Grey bars when scrolled (frosted glass header) */}
            {!isTransparent && (
              <div className="inline-flex lg:hidden">
                <HamburgerButton
                  isOpen={mobileMenu}
                  onClick={() => setMobileMenu((v) => !v)}
                  barColor="bg-grey-900"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

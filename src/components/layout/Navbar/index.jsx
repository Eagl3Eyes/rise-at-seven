'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

import CTAButton from '@/components/ui/CTAButton';
import HamburgerButton from '@/components/ui/HamburgerButton';
import { RiseAtSevenLogo } from '@/components/ui/Logos';

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

const BLOG_LINKS = [
  { id: 1061, href: 'https://riseatseven.com/blog/', label: 'Blog' },
  { id: 1062, href: 'https://riseatseven.com/category-leaderboard/', label: 'Category Leaderboard' },
  { id: 1063, href: 'https://riseatseven.com/multi-channel-search-report-2026-/', label: 'Multi-Channel Search Report' },
];

const BLOG_IMAGES = [
  { id: 1061, src: '/images/navbar/blog.webp', alt: 'Blog' },
  { id: 1062, src: '/images/navbar/blog_resources.webp', alt: 'Category Leaderboard' },
  { id: 1063, src: '/images/navbar/multi channel search report.webp', alt: 'Multi-Channel Search Report' },
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
  const [blogActive, setBlogActive] = useState(1061);
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
            <div className="shrink-0 relative p-3" style={{ width: '301.2px' }}>
              <div style={{ width: '277.2px', height: '277.2px' }}>
                <MegaMenuImagePanel images={INDUSTRIES_IMAGES} activeId={industriesActive} width="w-full" />
              </div>
            </div>
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
            <div className="shrink-0 relative p-3" style={{ width: '301.2px' }}>
              <div style={{ width: '277.2px', height: '277.2px' }}>
                <MegaMenuImagePanel images={INTERNATIONAL_IMAGES} activeId={intlActive} width="w-full" />
              </div>
            </div>
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
            <div className="shrink-0 relative p-3" style={{ width: '301.2px' }}>
              <div style={{ width: '277.2px', height: '277.2px' }}>
                <MegaMenuImagePanel images={ABOUT_IMAGES} activeId={aboutActive} width="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Blog mega menu (ID 106) ────────────────────────── */}
        <div
          ref={(el) => { megaMenuElsRef.current[106] = el; }}
          data-menu-id="106"
          className={`flex-shrink-0 absolute z-20 left-1/2 -translate-x-1/2 translate-y-full hidden pt-10 pointer-fine:flex js-mega-menu ${hideAnnouncementBar ? 'bottom-10' : 'bottom-0'
            } ${activeMegaMenu === 106 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ opacity: 0 }}
        >
          <div className="bg-white rounded-3xl flex shrink-0 transition">
            <div className="flex-1 inline-flex items-center justify-center px-12">
              <div className="flex gap-x-12">
                <div className="flex-1 -mt-3">
                  <ul className="flex flex-col gap-y-0.5">
                    <div className="h-8" />
                    {BLOG_LINKS.map((link) => (
                      <MegaMenuLink
                        key={link.id}
                        href={link.href}
                        label={link.label}
                        size="text-3xl"
                        onMouseEnter={() => setBlogActive(link.id)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="shrink-0 relative p-3" style={{ width: '301.2px' }}>
              <div style={{ width: '277.2px', height: '277.2px' }}>
                <MegaMenuImagePanel images={BLOG_IMAGES} activeId={blogActive} width="w-full" />
              </div>
            </div>
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
                setActiveMegaMenu(106);
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

'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [active, setActive] = useState(false);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      cursor.style.left = `${e.clientX - cursor.clientWidth / 2}px`;
      cursor.style.top = `${e.clientY - cursor.clientHeight / 2}px`;
    };

    const onCursor = (e) => {
      const isActive = !!e.detail.active;
      setActive(isActive);
      setIcon(e.detail.icon || null);
      if (isActive) {
        document.body.classList.add('hide-cursor');
        document.documentElement.classList.add('hide-cursor');
      } else {
        document.body.classList.remove('hide-cursor');
        document.documentElement.classList.remove('hide-cursor');
      }
    };

    document.addEventListener('pointermove', onMove);
    window.addEventListener('component-cursor', onCursor);
    return () => {
      document.removeEventListener('pointermove', onMove);
      window.removeEventListener('component-cursor', onCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 isolate overflow-hidden rounded-full transition items-center justify-center hidden pointer-fine:flex bg-mint text-grey-900 text-2xl w-24 h-24 lg:w-32 lg:h-32 lg:text-4xl${
        active ? ' scale-100' : ' scale-0'
      }`}
    >
      {icon && <i className={`fa-regular fa-sharp ${icon}`} />}
    </div>
  );
}

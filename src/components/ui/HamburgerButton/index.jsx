'use client';

export default function HamburgerButton({ isOpen, onClick, barColor }) {
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

'use client';

export default function CTAButton({ href, children, variant = 'white', className = '' }) {
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

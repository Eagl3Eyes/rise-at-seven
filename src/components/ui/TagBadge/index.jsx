'use client';

export default function TagBadge({ tag, textClass = 'text-white', bgClass = 'bg-white/20' }) {
  if (!tag) return null;
  return (
    <div className={`shrink-0 inline-flex items-center rounded-full tracking-tight font-medium leading-none ${textClass} ${bgClass} backdrop-blur-sm text-sm gap-x-3 py-2.5 px-3.5 lg:text-base`}>
      <i className="fa-regular fa-sharp fa-magnifying-glass" />
      <div>{tag}</div>
      <i className="fa-regular fa-sharp fa-chart-line-up" />
    </div>
  );
}

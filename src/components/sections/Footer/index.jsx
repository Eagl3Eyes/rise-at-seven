export default function Footer() {
  return (
    <section className="w-full py-0" id="footer">
      <div className="w-full px-0">
        <div className="p-2 grid relative mt-8 lg:mt-0">
          {/* Dark background */}
          <div className="absolute inset-0 p-2 flex" aria-hidden="true">
            <div className="w-full h-full bg-grey-900 rounded-3xl" />
          </div>

          {/* Content */}
          <div className="col-start-1 row-start-1 grid grid-cols-12 pt-14 pb-6 relative z-20 lg:py-10 px-4 md:px-7 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-7">

            {/* Newsletter + socials */}
            <div className="flex flex-col items-start justify-start col-span-12 mb-10 lg:mb-0 lg:col-span-4 gap-y-3 md:gap-y-5">
              <h2 className="text-white text-2xl/none xl:text-3xl/none font-sans-primary font-medium tracking-tight">
                Stay updated with Rise news
              </h2>

              <div className="w-full relative group">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="appearance-none transition bg-grey-400 rounded-full w-full h-14 lg:h-16 text-white font-medium tracking-tight leading-none text-lg px-6 lg:text-xl lg:px-8 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/15"
                />
                <div className="absolute inset-y-0 right-0 p-1.5 flex items-center justify-center">
                  <button
                    type="button"
                    className="size-11 bg-mint text-grey-900 text-lg rounded-full flex items-center justify-center cursor-pointer transition lg:size-15 lg:text-2xl pointer-fine:hover:bg-white pointer-fine:hover:rotate-90"
                  >
                    <i className="fa-regular fa-sharp fa-arrow-up-right" />
                  </button>
                </div>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {[
                  { icon: 'fa-brands fa-facebook-f', href: 'https://www.facebook.com/riseatseven' },
                  { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/riseatseven' },
                  { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/company/riseatseven/' },
                  { icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/channel/UCAjOP9BgpZPTgae-QT9HGCw' },
                  { icon: 'fa-brands fa-tiktok', href: 'https://www.tiktok.com/@riseatseven' },
                  { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/riseatseven/' },
                ].map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-x-1.5 rounded-full text-xs px-2.5 py-1.5 transition pointer-fine:hover:rounded-sm bg-white text-grey-900">
                    <i className={s.icon} />
                    <i className="fa-regular fa-sharp fa-arrow-up-right text-xs" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div className="flex justify-between col-span-12 flex-wrap md:flex-row md:col-span-11 lg:col-span-6 lg:col-start-6 gap-y-10">
              {[
                [
                  { label: 'Services', href: 'https://riseatseven.com/services/' },
                  { label: 'Work', href: 'https://riseatseven.com/work/' },
                  { label: 'About', href: 'https://riseatseven.com/about/' },
                  { label: 'Culture', href: 'https://riseatseven.com/culture/' },
                  { label: 'Meet The Risers', href: 'https://riseatseven.com/meet-the-team/' },
                ],
                [
                  { label: 'Testimonials', href: 'https://riseatseven.com/testimonials/' },
                  { label: 'Blog & Resources', href: 'https://riseatseven.com/blog/' },
                  { label: 'Webinars', href: 'https://riseatseven.com/webinars/' },
                  { label: 'Careers', href: 'https://riseatseven.com/careers/' },
                ],
                [
                  { label: 'Sheffield', href: 'https://g.co/kgs/4Br7JaS' },
                  { label: 'Manchester', href: 'https://g.co/kgs/9vh5imK' },
                  { label: 'London', href: 'https://g.co/kgs/hsv6LhR' },
                  { label: 'New York', href: 'https://g.co/kgs/NxzhAKU' },
                  { label: 'Contact', href: 'https://riseatseven.com/contact/' },
                ],
              ].map((col, ci) => (
                <div key={ci} className="flex flex-col items-start gap-y-1.5 border-l border-white/20 pl-4 w-1/2 md:w-auto">
                  {col.map(link => (
                    <a key={link.label} href={link.href}
                      className="group inline-flex text-white font-medium tracking-tight leading-tight text-lg lg:text-xl pointer-fine:hover:text-mint">
                      <div className="relative overflow-hidden">
                        <div className="transition pointer-fine:group-hover:-translate-y-7">{link.label}</div>
                        <div className="transition absolute top-0 left-0 translate-y-7 pointer-fine:group-hover:translate-y-0">{link.label}</div>
                      </div>
                    </a>
                  ))}
                </div>
              ))}
            </div>

            {/* Logo SVG */}
            <div className="col-span-12 mt-10 lg:mt-32">
              <div className="text-white">
                <svg className="w-full h-full object-contain fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 21">
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
              </div>
            </div>

            {/* Bottom bar */}
            <div className="col-span-12 flex justify-between flex-col mt-10 items-end md:flex-row lg:items-center lg:mt-0">
              <div className="flex gap-x-2 gap-y-2 flex-wrap items-center md:gap-3">
                {[
                  { text: '© 2026 Rise at Seven Ltd. All rights reserved' },
                  { dot: true },
                  { text: 'Company Number 11955187' },
                  { dot: true },
                  { text: 'VAT Registered GB 322402945' },
                  { dot: true },
                  { text: 'Privacy Policy', href: 'https://riseatseven.com/privacy-policy/' },
                  { dot: true },
                  { text: 'Terms & conditions', href: 'https://riseatseven.com/terms-conditions/' },
                ].map((item, i) =>
                  item.dot ? (
                    <div key={i} className="w-1 h-1 rounded-full bg-white inline-flex md:mt-0.5" />
                  ) : item.href ? (
                    <a key={i} href={item.href} className="text-white font-light leading-tight text-xs link">{item.text}</a>
                  ) : (
                    <div key={i} className="text-white font-light leading-tight text-xs">{item.text}</div>
                  )
                )}
              </div>
              <div className="w-full mt-1 md:ml-auto md:text-right lg:mt-0 lg:w-auto">
                <a href="" target="_blank" rel="noreferrer" className="text-white font-light leading-tight text-xs link">
                  Website MadeByShape
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

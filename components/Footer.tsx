import { forwardRef } from 'react';

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contacts', href: '#contacts' },
  { label: 'Typefaces', href: '#typefaces' }
];

const socialLinks = [
  { label: 'Dribbble', href: '#dribbble' },
  { label: 'Behance', href: '#behance' },
  { label: 'Logopond', href: '#logopond' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'LinkedIn', href: '#linkedin' }
];

const Footer = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <footer 
      ref={ref}
      className="relative min-h-screen bg-black text-white py-20 px-8 z-10"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6">NAVIGATION</h3>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-2xl hover:text-cyan-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6">SOCIAL</h3>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-2xl hover:text-cyan-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1 flex items-start">
            <div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full mb-6"></div>
              <a href="mailto:hi@vysakh.com" className="text-4xl md:text-5xl lg:text-6xl font-light hover:text-cyan-400 transition-colors break-words">
                hi@vysakh.com
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
            I believe in the power of <br className="hidden md:block" />
            exciting brands and <br className="hidden md:block" />
            thoughtful digital <br className="hidden md:block" />
            experiences.
          </p>
          <h2 className="text-4xl sm:text-2xl md:text-2xl lg:text-[12rem] xl:text-[15rem] font-bold w-full">
            IamVysakh
          </h2>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
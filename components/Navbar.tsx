import { useState } from 'react';

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Info', href: '#info' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' }
];

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick();
  };

  return (
    <>
      {/* Cyan Top Line */}
      <div className="w-full h-2 bg-cyan-400 absolute top-0 left-0 z-50"></div>
      
      
      {/* Navbar */}
      <nav className="relative z-40 w-full px-8 py-4 flex justify-end items-center">
        <button 
          onClick={handleMenuClick}
          className="text-xl md:text-2xl font-light hover:text-cyan-400 transition-colors"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 z-30 bg-black/95 backdrop-blur-md px-8 py-8">
          <div className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl md:text-3xl font-light hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
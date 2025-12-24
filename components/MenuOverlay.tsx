interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'About Us', href: '#about' }
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <div 
      className={`fixed inset-0 bg-cyan-400 z-50 transform transition-transform duration-700 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="min-h-screen flex flex-col">
        <div className="p-8 flex justify-end">
          <button 
            onClick={onClose}
            className="text-4xl text-black hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-12 pb-20">
          {menuItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="text-4xl md:text-6xl font-light text-black hover:text-white transition-colors"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
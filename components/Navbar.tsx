interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <>
      {/* Cyan Top Line */}
      <div className="w-full h-2 bg-cyan-400 absolute top-0 left-0 z-50"></div>
      
      {/* Second Cyan Top Line */}
      <div className="w-full h-1 bg-cyan-300 absolute top-3 left-0 z-50"></div>
      
      {/* Navbar */}
      <nav className="relative z-40 w-full px-8 py-4 flex justify-end items-center">
        <button 
          onClick={onMenuClick}
          className="text-xl md:text-2xl font-light hover:text-cyan-400 transition-colors"
        >
          Menu
        </button>
      </nav>
    </>
  );
}
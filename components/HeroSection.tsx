import { useState, useEffect } from 'react';
import Navbar from './Navbar';

interface HeroSectionProps {
  onMenuClick: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function HeroSection({ onMenuClick }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const roles = ['Quality Analyst', 'Tosca Tester'];
  const staticText = ',\nfrom India.';

  useEffect(() => {
    const currentRole = roles[loopNum % roles.length];
    
    const handleType = () => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      
      if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        return;
      }
      
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }
    };
    
    const timer = setTimeout(handleType, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1500);
  };

  return (
    <div 
      className="relative h-screen bg-black text-white overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Click Ripple Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-cyan-400 animate-ripple-expand"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar onMenuClick={onMenuClick} />
        </div>

        {/* Main Content */}
        <div className="h-[calc(100vh-80px)] flex flex-col justify-between pointer-events-none">
          {/* Header */}
          <header className="px-8 pt-4">
            <h1 className="text-5xl md:text-9xl lg:text-[12rem] font-bold">IamVysakh</h1>
          </header>

          {/* Bottom Section with Text and Buttons */}
          <div className="p-4 md:p-8 pb-28 md:pb-36">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              {/* Left: Typing Text */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight whitespace-pre-line">
                  {displayedText}
                  <span className="inline-block w-1 h-6 md:h-10 lg:h-12 bg-cyan-400 ml-1 animate-pulse"></span>
                  {staticText}
                </h2>
              </div>

              {/* Right: Connect Button */}
              <div className="flex gap-4 pointer-events-auto">
                <a 
                  href="#contact" 
                  className="group flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black rounded-full font-medium text-lg hover:bg-cyan-300 transition-all duration-300 hover:gap-5"
                >
                  <span>Connect</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
          }
        }

        .animate-ripple-expand {
          animation: ripple-expand 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
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
      {/* Animated Ripple Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Ambient ripple circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/5 rounded-full blur-3xl animate-pulse-slowest"></div>
        
        {/* Additional ripple layers for more depth */}
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

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

      {/* Overlay gradient for smoother blend */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none"></div>

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
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        @keyframes pulse-slowest {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.4;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
            opacity: 0.35;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.25;
          }
          33% {
            transform: translate(-40px, 40px) scale(1.05);
            opacity: 0.35;
          }
          66% {
            transform: translate(30px, -20px) scale(0.98);
            opacity: 0.3;
          }
        }

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

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }

        .animate-pulse-slowest {
          animation: pulse-slowest 12s ease-in-out infinite;
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 18s ease-in-out infinite;
        }

        .animate-ripple-expand {
          animation: ripple-expand 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

interface HeroSectionProps {
  onMenuClick: () => void;
}

export default function HeroSection({ onMenuClick }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const roles = ['Quality Analyst', 'TOSCA Automation Tester'];
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

  return (
    <div id="home" className="relative h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar onMenuClick={onMenuClick} />
        </div>

        {/* Main Content */}
        <div className="h-[calc(100vh-80px)] flex flex-col justify-start md:justify-between pointer-events-none">
          {/* Header */}
          <header className="px-8 pt-20 md:pt-4">
            <h1 className="text-6xl md:text-9xl lg:text-[12rem] font-bold">iamvysakh</h1>
          </header>

          {/* Bottom Section with Text and Buttons */}
          <div className="p-4 md:p-8 pb-15 md:pb-36 mt-auto md:mt-0" style={{ marginTop: 'min(10vh, calc(100vh - 400px))' }}>
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
                  href="#info" 
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
    </div>
  );
}
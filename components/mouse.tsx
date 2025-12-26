'use client';
import { useEffect, useRef, useState } from 'react';
import { Rocket, MessageCircle, Home, User, Briefcase, FolderOpen, Link2, RotateCw } from 'lucide-react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [trail, setTrail] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isIdle, setIsIdle] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; angle: number }>>([]);
  const [idleStage, setIdleStage] = useState(0);
  const [outlinePos, setOutlinePos] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showNavPrompt, setShowNavPrompt] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const message1TimerRef = useRef<NodeJS.Timeout | null>(null);
  const message2TimerRef = useRef<NodeJS.Timeout | null>(null);
  const message3TimerRef = useRef<NodeJS.Timeout | null>(null);
  const navPromptTimerRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    { icon: RotateCw, label: 'Reload', action: () => window.location.reload() },
    { icon: Home, label: 'Home', action: () => scrollToSection('home') },
    { icon: User, label: 'Info', action: () => scrollToSection('info') },
    { icon: Briefcase, label: 'Skills', action: () => scrollToSection('skills') },
    { icon: Briefcase, label: 'Experience', action: () => scrollToSection('experience') },
    { icon: FolderOpen, label: 'Projects', action: () => scrollToSection('projects') },
    { icon: Link2, label: 'Copy Link', action: () => copyLink() },
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setContextMenu(null);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setContextMenu(null);
  };

  const getIdleMessage = () => {
    switch(idleStage) {
      case 1:
        return "Let's go to a new section!";
      case 2:
        return "Let's connect!";
      case 3:
        return "Hey, are you there?";
      default:
        return "";
    }
  };

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const resetIdleTimers = () => {
      setIsIdle(false);
      setIdleStage(0);
      setParticles([]);
      setShowNavPrompt(false);
      
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (message1TimerRef.current) clearTimeout(message1TimerRef.current);
      if (message2TimerRef.current) clearTimeout(message2TimerRef.current);
      if (message3TimerRef.current) clearTimeout(message3TimerRef.current);
      if (navPromptTimerRef.current) clearTimeout(navPromptTimerRef.current);
    };

    const startIdleTimers = () => {
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        const newParticles = Array.from({ length: 6 }, (_, i) => ({
          id: Date.now() + i,
          angle: (i * 60)
        }));
        setParticles(newParticles);
      }, 2000);

      // Show navigation prompt after 15 seconds
      navPromptTimerRef.current = setTimeout(() => {
        setShowNavPrompt(true);
      }, 15000);

      message1TimerRef.current = setTimeout(() => {
        setIdleStage(1);
      }, 20000);

      message2TimerRef.current = setTimeout(() => {
        setIdleStage(2);
      }, 40000);

      message3TimerRef.current = setTimeout(() => {
        setIdleStage(3);
      }, 60000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      resetIdleTimers();
      startIdleTimers();

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      setIsPointer(!!isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleMouseDown = () => {
      setIsClicking(true);
      const rippleId = Date.now();
      setRipples(prev => [...prev, { id: rippleId, x: mouseX, y: mouseY }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== rippleId));
      }, 600);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleActivity = () => {
      resetIdleTimers();
      startIdleTimers();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
      resetIdleTimers();
      startIdleTimers();
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.context-menu')) {
        setContextMenu(null);
      }
      handleActivity();
    };

    let trailCounter = 0;
    const createTrail = () => {
      trailCounter++;
      if (trailCounter % 3 === 0) {
        const trailId = Date.now() + Math.random();
        setTrail(prev => {
          const newTrail = [...prev, { id: trailId, x: mouseX, y: mouseY }];
          return newTrail.slice(-8);
        });
        setTimeout(() => {
          setTrail(prev => prev.filter(t => t.id !== trailId));
        }, 500);
      }
    };

    const animateOutline = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;

      outlineX += distX * 0.15;
      outlineY += distY * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      
      setOutlinePos({ x: outlineX, y: outlineY });

      createTrail();

      requestAnimationFrame(animateOutline);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('scroll', handleActivity);
    
    animateOutline();
    startIdleTimers();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (message1TimerRef.current) clearTimeout(message1TimerRef.current);
      if (message2TimerRef.current) clearTimeout(message2TimerRef.current);
      if (message3TimerRef.current) clearTimeout(message3TimerRef.current);
      if (navPromptTimerRef.current) clearTimeout(navPromptTimerRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }

        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(35px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(35px) rotate(-360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes breathe {
          0%, 100% {
            box-shadow: 0 0 15px #22d3ee30, 0 0 30px #22d3ee20;
          }
          50% {
            box-shadow: 0 0 25px #22d3ee50, 0 0 50px #22d3ee30;
          }
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(-5px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(5px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes menuSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* Cursor Dot - Triangle */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[10000] transition-all ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isPointer ? 'scale-0' : 'scale-100'} ${isClicking ? 'scale-75' : 'scale-100'} ${
          isIdle ? 'duration-1000' : 'duration-100'
        }`}
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '14px solid #22d3ee',
          transform: 'translate(-50%, -50%) rotate(0deg)',
          filter: 'drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 12px #22d3ee50)',
          animation: isIdle ? 'pulse 2s ease-in-out infinite' : 'none',
        }}
      />

      {/* Trail Effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] animate-pulse"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: '7px solid #22d3ee',
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trail.length * 0.6,
            filter: 'blur(1px)',
            animation: 'fadeOut 0.5s ease-out forwards',
          }}
        />
      ))}

      {/* Click Ripple Effect */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] rounded-full border-2 border-cyan-400"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}

      {/* Cursor Outline */}
      <div
        ref={cursorOutlineRef}
        className={`fixed w-12 h-12 border-2 rounded-full pointer-events-none z-[10000] transition-all duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isPointer ? 'scale-150 bg-cyan-400/20' : 'scale-100'} ${isClicking ? 'scale-75 bg-cyan-400/40' : ''}`}
        style={{
          borderColor: '#22d3ee',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px #22d3ee30',
          animation: isIdle ? 'breathe 3s ease-in-out infinite' : 'none',
        }}
      />

      {/* Idle State - Orbiting Particles */}
      {isIdle && particles.map((particle, index) => {
        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: `${outlinePos.x}px`,
              top: `${outlinePos.y}px`,
              width: '6px',
              height: '6px',
              backgroundColor: '#22d3ee',
              borderRadius: '50%',
              animation: `orbit ${3 + index * 0.2}s linear infinite`,
              animationDelay: `${index * 0.1}s`,
              boxShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee50',
            }}
          />
        );
      })}

      {/* Idle Messages - Progressive - LEFT SIDE - Hidden on small/medium devices */}
      {idleStage > 0 && (
        <div
          className="fixed pointer-events-none z-[10001] hidden lg:block"
          style={{
            left: `${outlinePos.x}px`,
            top: `${outlinePos.y}px`,
            transform: 'translate(-100%, -50%)',
            marginLeft: '70px'
          }}
        >
          <div className="relative">
            <div 
              className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
              style={{
                animation: 'float 2s ease-in-out infinite, bounce 0.6s ease-in-out 3',
                animationDelay: '0s, 0s',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              <p className="text-sm font-medium flex items-center gap-2">
                {idleStage === 1 ? <Rocket className="w-4 h-4" /> : idleStage === 2 ? <MessageCircle className="w-4 h-4" /> : <MessageCircle className="w-4 h-4 animate-pulse" />}
                {getIdleMessage()}
              </p>
              <div 
                className="absolute"
                style={{
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '8px solid #22d3ee',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Prompt - 15 seconds - RIGHT SIDE - Hidden on small/medium devices */}
      {showNavPrompt && !contextMenu && (
        <div
          className="fixed pointer-events-none z-[10001] hidden lg:block"
          style={{
            left: `${outlinePos.x}px`,
            top: `${outlinePos.y}px`,
            transform: 'translate(0, -50%)',
            marginLeft: '140px'
          }}
        >
          <div className="relative">
            <div 
              className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
              style={{
                animation: 'float 2s ease-in-out infinite, bounce 0.6s ease-in-out 3',
                animationDelay: '0s, 0s',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              <p className="text-sm font-medium flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Right-click to navigate!
              </p>
              <div 
                className="absolute"
                style={{
                  left: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '8px solid #22d3ee',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu fixed z-[10002] bg-gray-900/95 backdrop-blur-md border-2 border-cyan-400 rounded-lg shadow-2xl overflow-hidden"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            animation: 'menuSlideIn 0.2s ease-out',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.3), 0 10px 50px rgba(0, 0, 0, 0.5)',
            minWidth: '200px',
          }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full px-4 py-3 text-left text-cyan-400 hover:bg-cyan-400/20 transition-all duration-200 flex items-center gap-3 group cursor-pointer"
                style={{
                  borderBottom: index < menuItems.length - 1 ? '1px solid rgba(34, 211, 238, 0.2)' : 'none',
                }}
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
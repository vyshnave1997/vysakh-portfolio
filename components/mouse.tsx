'use client';
import { useEffect, useRef, useState } from 'react';
import { Rocket, MessageCircle } from 'lucide-react';

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
  const [idleStage, setIdleStage] = useState(0); // 0: no message, 1: 20s message, 2: 40s message
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const message1TimerRef = useRef<NodeJS.Timeout | null>(null);
  const message2TimerRef = useRef<NodeJS.Timeout | null>(null);

  const getIdleMessage = () => {
    switch(idleStage) {
      case 1:
        return "Let's go to a new section!";
      case 2:
        return "Let's connect!";
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
      
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (message1TimerRef.current) clearTimeout(message1TimerRef.current);
      if (message2TimerRef.current) clearTimeout(message2TimerRef.current);
    };

    const startIdleTimers = () => {
      // Start idle animation after 2 seconds
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        const newParticles = Array.from({ length: 6 }, (_, i) => ({
          id: Date.now() + i,
          angle: (i * 60)
        }));
        setParticles(newParticles);
      }, 2000);

      // Show first message after 20 seconds
      message1TimerRef.current = setTimeout(() => {
        setIdleStage(1);
      }, 20000);

      // Show second message after 40 seconds
      message2TimerRef.current = setTimeout(() => {
        setIdleStage(2);
      }, 40000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Reset idle state and timers
      resetIdleTimers();
      startIdleTimers();

      // Update dot position immediately
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // Check if hovering over interactive elements
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

    // Create trailing effect
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

    // Animate outline with faster follow effect
    const animateOutline = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;

      outlineX += distX * 0.15;
      outlineY += distY * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      createTrail();

      requestAnimationFrame(animateOutline);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleActivity);
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
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (message1TimerRef.current) clearTimeout(message1TimerRef.current);
      if (message2TimerRef.current) clearTimeout(message2TimerRef.current);
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
        const outlineLeft = cursorOutlineRef.current?.style.left || '0px';
        const outlineTop = cursorOutlineRef.current?.style.top || '0px';
        
        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: outlineLeft,
              top: outlineTop,
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

      {/* Idle Messages - Progressive */}
      {idleStage > 0 && (
        <div
          ref={cursorOutlineRef}
          className="fixed pointer-events-none z-[10001] whitespace-nowrap"
          style={{
            left: cursorOutlineRef.current?.style.left,
            top: cursorOutlineRef.current?.style.top,
            animation: 'slideIn 0.5s ease-out, float 2s ease-in-out infinite',
            animationDelay: '0s, 0.5s',
          }}
        >
          <div className="relative">
            {/* Speech Bubble */}
            <div 
              className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-full mb-16 backdrop-blur-sm"
              style={{
                animation: 'bounce 0.6s ease-in-out 3',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
              }}
            >
              <p className="text-sm font-medium flex items-center gap-2">
                {idleStage === 1 ? <Rocket className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                {getIdleMessage()}
              </p>
              {/* Tail */}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid #22d3ee',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
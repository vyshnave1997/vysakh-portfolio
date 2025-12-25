'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

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

    // Animate outline with faster follow effect (increased from 0.5 to 0.15)
    const animateOutline = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;

      outlineX += distX * 0.15;
      outlineY += distY * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateOutline);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    animateOutline();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
      `}</style>

      {/* Cursor Dot - Triangle */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[10000] transition-all duration-100 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isPointer ? 'scale-0' : 'scale-100'}`}
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '14px solid #22d3ee',
          transform: 'translate(-50%, -50%) rotate(0deg)',
          filter: 'drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 12px #22d3ee50)',
        }}
      />

      {/* Cursor Outline */}
      <div
        ref={cursorOutlineRef}
        className={`fixed w-12 h-12 border-2 rounded-full pointer-events-none z-[10000] transition-all duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isPointer ? 'scale-150 bg-cyan-400/20' : 'scale-100'}`}
        style={{
          borderColor: '#22d3ee',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px #22d3ee30',
        }}
      />
    </>
  );
}
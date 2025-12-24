'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollQuote() {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!textElement || !container) return;

    // Split text into characters
    const text = textElement.textContent;
    textElement.innerHTML = '';
    
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      textElement.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      // Animate each character
      gsap.fromTo(chars, 
        {
          opacity: 0,
          y: 50,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.02,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );

      // Reverse animation on scroll down
      gsap.to(chars, {
        opacity: 0,
        y: -50,
        rotationX: 90,
        stagger: 0.02,
        scrollTrigger: {
          trigger: container,
          start: 'bottom 60%',
          end: 'bottom 20%',
          scrub: 1,
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="h-[30vh] bg-black">
      <div />
      
      {/* Quote Section - 30% height */}
      <div 
        ref={containerRef}
        className="h-[30vh] flex items-center justify-center px-4 md:px-8"
      >
        <div className="max-w-4xl w-full text-center">
          <h2 
            ref={textRef}
            className="text-2xl md:text-4xl lg:text-5xl font-light text-cyan-400 leading-relaxed"
            style={{ perspective: '1000px' }}
          >
            Quality is not an act, it is a habit
          </h2>
        </div>
      </div>

      <div className="h-screen" />
    </div>
  );
}
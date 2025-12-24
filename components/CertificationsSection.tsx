'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    year: '2023',
    title: 'ISTQB Certified Tester',
    level: 'Foundation Level',
    organization: 'International Software Testing Qualifications Board'
  },
  {
    year: '2022',
    title: 'Tricentis Tosca Certified',
    level: 'Automation Specialist Level 1',
    organization: 'Tricentis'
  },
  {
    year: '2022',
    title: 'Agile Tester Certification',
    level: 'Advanced Level',
    organization: 'ISTQB'
  },
  {
    year: '2021',
    title: 'Certified SAFe Practitioner',
    level: 'Scaled Agile Framework',
    organization: 'Scaled Agile, Inc.'
  },
  {
    year: '2023',
    title: 'Selenium WebDriver',
    level: 'Advanced Automation Testing',
    organization: 'Test Automation University'
  },
  {
    year: '2021',
    title: 'API Testing Professional',
    level: 'REST & SOAP Services',
    organization: 'Postman'
  },
  {
    year: '2020',
    title: 'Performance Testing',
    level: 'LoadRunner Certified Professional',
    organization: 'Micro Focus'
  },
  {
    year: '2020',
    title: 'Test Management',
    level: 'JIRA & Test Planning Specialist',
    organization: 'Atlassian'
  }
];

export default function CertificationsSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial card animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              rotateX: -45,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Floating animation
          gsap.to(card, {
            y: -10,
            duration: 2 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.15,
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedCard !== null) {
      const selectedCardElement = cardRefs.current[selectedCard];
      
      if (selectedCardElement) {
        // Calculate position adjustment to keep card centered in viewport
        const expandedWidth = 500;
        const currentWidth = 120;
        const widthDifference = expandedWidth - currentWidth;
        
        let translateX = 0;
        
        // If card is on the left side, shift it right
        if (selectedCard < 3) {
          translateX = widthDifference / 2;
        }
        // If card is on the right side, shift it left
        else if (selectedCard > 4) {
          translateX = -widthDifference / 2;
        }
        
        // Expand animation with rotation
        gsap.to(selectedCardElement, {
          width: `${expandedWidth}px`,
          height: '400px',
          x: translateX,
          rotateY: 360,
          duration: 0.6,
          ease: 'power3.out',
          zIndex: 50,
          onComplete: () => {
            gsap.set(selectedCardElement, { rotateY: 0 });
          }
        });

        // Animate content fade in
        const contentElements = selectedCardElement.querySelectorAll('.card-content > *');
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.1,
            delay: 0.4,
            ease: 'power2.out' 
          }
        );
      }
      
      // Animate other cards
      cardRefs.current.forEach((card, i) => {
        if (i !== selectedCard && card) {
          gsap.to(card, {
            opacity: 0.3,
            scale: 0.95,
            rotateY: i < selectedCard ? -5 : 5,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });

      // Auto-close after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setSelectedCard(null);
      }, 2000);
    } else {
      // Close animation
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.to(card, {
            width: '120px',
            height: '500px',
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.5,
            ease: 'power3.inOut',
            zIndex: 1
          });
        }
      });
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedCard]);

  const handleCardClick = (index: number) => {
    // Add click animation
    const clickedCard = cardRefs.current[index];
    if (clickedCard && selectedCard !== index) {
      gsap.to(clickedCard, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
    
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-black text-white py-20 px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">PROFESSIONAL CREDENTIALS</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Certifications
          </h2>
        </div>

        {/* Mobile/Tablet Grid */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800"
            >
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">{cert.year}</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-base mb-3">{cert.level}</p>
              <span className="text-sm text-gray-500">{cert.organization}</span>
            </div>
          ))}
        </div>

        {/* Desktop Vertical Tray */}
        <div className="hidden lg:block relative mt-20">
          {/* Cyan Bottom Container */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-3xl backdrop-blur-sm border-t border-cyan-500/30 z-30"></div>
          
          <div 
            ref={containerRef}
            className="relative flex gap-6 pb-8 pt-12 justify-center overflow-hidden"
          >
          {certifications.map((cert, index) => {
            const isSelected = selectedCard === index;
            
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => handleCardClick(index)}
                className="relative bg-gray-900 rounded-2xl cursor-pointer flex-shrink-0 overflow-hidden group"
                style={{
                  width: '120px',
                  height: '500px',
                  zIndex: isSelected ? 100 : 10
                }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ padding: '2px' }}>
                  <div className="absolute inset-[2px] bg-gray-900 rounded-2xl"></div>
                </div>
                
                {/* Animated gradient border for selected card */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-cyan-400 to-white" 
                         style={{ 
                           padding: '2px',
                           backgroundSize: '200% 200%',
                           animation: 'borderFlow 3s linear infinite'
                         }}>
                      <div className="absolute inset-[2px] bg-gray-900 rounded-2xl"></div>
                    </div>
                  </div>
                )}

                <div 
                  className="relative z-10 h-full"
                  style={{
                    writingMode: isSelected ? 'horizontal-tb' : 'vertical-rl',
                    textOrientation: 'mixed',
                    perspective: '1000px'
                  }}
                >
                  {isSelected ? (
                    <div className="p-8 h-full flex flex-col justify-between card-content">
                      <div>
                        <div className="text-cyan-400 text-sm uppercase tracking-widest mb-4">{cert.year}</div>
                        <h3 className="text-3xl font-bold mb-4">{cert.title}</h3>
                        <p className="text-gray-400 text-lg mb-4">{cert.level}</p>
                        <p className="text-gray-500 text-base mb-6">{cert.organization}</p>
                        <div className="border-t border-gray-700 pt-6 mt-6">
                          <p className="text-sm text-gray-400 leading-relaxed">
                            This certification demonstrates proficiency in industry-standard testing practices and methodologies, 
                            ensuring quality software delivery through comprehensive testing strategies.
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(null);
                        }}
                        className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 h-full flex items-center justify-center hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="text-center">
                        <div className="text-cyan-400 text-xs uppercase tracking-widest mb-3 rotate-180">{cert.year}</div>
                        <h3 className="text-xl font-bold mb-2 rotate-180">{cert.title}</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
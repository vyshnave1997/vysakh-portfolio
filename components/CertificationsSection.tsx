import { useEffect, useRef, useState } from 'react';

const certifications = [
  {
    year: '2024',
    title: 'Test Design Specialist Level 2 (TDS-2)',
    level: 'Advanced Test Design',
    organization: 'Tricentis',
    description: 'Advanced certification demonstrating expertise in test design principles, optimization techniques, and complex test scenario creation using Tosca.'
  },
  {
    year: '2023',
    title: 'Tosca Product Consultant',
    level: 'Expert Level',
    organization: 'Tricentis',
    description: 'Expert-level certification showcasing comprehensive knowledge in implementing and consulting on Tosca automation solutions for enterprise clients.'
  },
  {
    year: '2023',
    title: 'Tosca Test Architect (TA-1)',
    level: 'Architecture Level',
    organization: 'Tricentis',
    description: 'Specialized certification in designing scalable test automation architectures and frameworks using Tosca best practices.'
  },
  {
    year: '2022',
    title: 'Tosca Automating API Test Cases (API)',
    level: 'API Testing Specialist',
    organization: 'Tricentis',
    description: 'Certification focused on automating RESTful and SOAP API testing with Tosca, including validation and integration testing.'
  },
  {
    year: '2022',
    title: 'Tosca Automating Database TestCases (DB)',
    level: 'Database Testing',
    organization: 'Tricentis',
    description: 'Specialized training in database testing automation, including query validation, data integrity checks, and database operations with Tosca.'
  },
  {
    year: '2022',
    title: 'GIS ESRI Certifications',
    level: 'Geographic Information Systems',
    organization: 'ESRI',
    description: 'Certification in testing and validating GIS applications, spatial data analysis, and geographic information system workflows.'
  },
  {
    year: '2021',
    title: 'ALM Compliance Domain Authorized Tester',
    level: 'Compliance Testing',
    organization: 'HP/Micro Focus',
    description: 'Authorized certification in Application Lifecycle Management with focus on compliance testing and regulatory requirement validation.'
  },
  {
    year: '2021',
    title: 'HP ALM General Training',
    level: 'Test Management',
    organization: 'HP/Micro Focus',
    description: 'Comprehensive training in HP ALM for test planning, execution tracking, defect management, and quality reporting.'
  }
];

export default function CertificationsSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window === 'undefined') return;
      
      if ((window as any).gsap && (window as any).ScrollTrigger) {
        initAnimation();
        return;
      }

      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      document.head.appendChild(gsapScript);

      gsapScript.onload = () => {
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollTriggerScript.async = true;
        document.head.appendChild(scrollTriggerScript);

        scrollTriggerScript.onload = () => {
          initAnimation();
        };
      };
    };

    const initAnimation = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.innerWidth < 768;

      // Animate subtitle with typewriter reveal
      if (subtitleRef.current) {
        const subtitleText = subtitleRef.current.textContent || '';
        subtitleRef.current.innerHTML = '';
        
        const subtitleChars = subtitleText.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.className = 'subtitle-char';
          subtitleRef.current?.appendChild(span);
          return span;
        });

        // Typewriter reveal
        gsap.to(subtitleChars, {
          opacity: 1,
          stagger: 0.05,
          duration: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });

        // Flicker effect after reveal
        subtitleChars.forEach((char, index) => {
          gsap.to(char, {
            opacity: 0.7,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
            delay: (index * 0.05) + 0.5,
            ease: 'power2.inOut'
          });
        });
      }

      // Animate main heading with shatter and rebuild effect
      if (headingRef.current) {
        const headingText = headingRef.current.textContent || '';
        headingRef.current.innerHTML = '';
        
        const chars = headingText.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.className = 'heading-char';
          headingRef.current?.appendChild(span);
          return span;
        });

        // Shatter entrance - characters explode in from random directions
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });

        tl.fromTo(
          chars,
          {
            opacity: 0,
            x: () => (Math.random() - 0.5) * (isMobile ? 400 : 800),
            y: () => (Math.random() - 0.5) * (isMobile ? 400 : 800),
            rotation: () => Math.random() * 360,
            scale: () => Math.random() * 2 + 0.5,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            stagger: {
              each: 0.03,
              from: 'random',
            },
            duration: 1.2,
            ease: 'power4.out',
          }
        ).to(
          chars,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            stagger: 0.01,
          },
          '+=0.3'
        );

        // Create glowing trail effect
        chars.forEach((char, index) => {
          gsap.to(char, {
            textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)',
            color: '#06b6d4',
            duration: 0.3,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: 1,
            },
            delay: index * 0.05,
          });
        });

        // Subtle rotation on hover area
        if (headingRef.current.parentElement) {
          headingRef.current.parentElement.addEventListener('mouseenter', () => {
            chars.forEach((char, index) => {
              gsap.to(char, {
                rotationY: 360,
                duration: 0.8,
                delay: index * 0.02,
                ease: 'back.out(1.5)',
              });
            });
          });
        }
      }

      // Card animations
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              rotateY: -90,
              x: -200,
            },
            {
              opacity: 1,
              rotateY: 0,
              x: 0,
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

          card.addEventListener('mouseenter', () => {
            if (selectedCard !== index) {
              gsap.to(card, {
                height: '550px',
                y: -25,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            if (selectedCard !== index) {
              gsap.to(card, {
                height: '500px',
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    };

    loadGSAP();

    return () => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        const triggers = (window as any).ScrollTrigger.getAll();
        triggers.forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;
    
    const gsap = (window as any).gsap;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedCard !== null) {
      const selectedCardElement = cardRefs.current[selectedCard];
      
      if (selectedCardElement) {
        const expandedWidth = 500;
        
        gsap.to(selectedCardElement, {
          width: `${expandedWidth}px`,
          height: '400px',
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          zIndex: 50,
          transformOrigin: 'left center',
        });

        const contentElements = selectedCardElement.querySelectorAll('.card-content > *');
        gsap.fromTo(
          contentElements,
          { opacity: 0, x: -30, rotateY: -20 },
          { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            duration: 0.6, 
            stagger: 0.08,
            delay: 0.5,
            ease: 'power2.out' 
          }
        );
      }
      
      cardRefs.current.forEach((card, i) => {
        if (i !== selectedCard && card) {
          const direction = i < selectedCard ? -1 : 1;
          gsap.to(card, {
            opacity: 0.4,
            scaleX: 0.95,
            rotateY: direction * 8,
            x: direction * 20,
            duration: 0.5,
            ease: 'power2.out',
            transformOrigin: 'center center'
          });
        }
      });

      timeoutRef.current = setTimeout(() => {
        setSelectedCard(null);
      }, 3000);
    } else {
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.to(card, {
            width: '120px',
            height: '500px',
            x: 0,
            opacity: 1,
            scaleX: 1,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            zIndex: 1,
            transformOrigin: 'left center'
          });
        }
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedCard]);

  const handleCardClick = (index: number) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;
    
    const gsap = (window as any).gsap;
    const clickedCard = cardRefs.current[index];
    
    if (clickedCard && selectedCard !== index) {
      gsap.to(clickedCard, {
        scaleX: 1.1,
        x: 10,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
    
    setSelectedCard(selectedCard === index ? null : index);
  };

  const handleMobileCardClick = (index: number) => {
    setExpandedMobile(expandedMobile === index ? null : index);
  };

  return (
    <div id="certifications" className="relative w-full min-h-screen bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 z-10">
      <div className="w-full">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <p 
            ref={subtitleRef}
            className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-3 sm:mb-4"
            style={{ perspective: '1000px' }}
          >
            PROFESSIONAL CREDENTIALS
          </p>
          <h2 
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight"
            style={{ perspective: '2000px' }}
          >
            Certifications
          </h2>
        </div>

        {/* Mobile/Tablet Grid - Vertical Cards with Click to Expand */}
        <div className="lg:hidden space-y-4 sm:space-y-6 mt-12 sm:mt-16 md:mt-20">
          {certifications.map((cert, index) => {
            const isExpanded = expandedMobile === index;
            
            return (
              <div 
                key={index}
                onClick={() => handleMobileCardClick(index)}
                className={`bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-gray-800 transition-all duration-300 border border-gray-800 cursor-pointer ${
                  isExpanded ? 'ring-2 ring-cyan-400' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-cyan-400 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">{cert.year}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{cert.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-2 sm:mb-3">{cert.level}</p>
                    
                    {/* Expanded content */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <span className="text-xs sm:text-sm text-gray-500 block mb-4">{cert.organization}</span>
                      <div className="border-t border-gray-700 pt-4">
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Click indicator */}
                {!isExpanded && (
                  <div className="mt-3 text-xs text-cyan-400/60 flex items-center gap-1">
                    <span>Click to expand</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Bookshelf */}
        <div className="hidden lg:block relative mt-12 xl:mt-20">
          <div className="absolute bottom-0 left-0 right-0 h-20 xl:h-24 bg-gradient-to-b from-cyan-900/40 to-black/60 rounded-lg backdrop-blur-sm border-t-2 border-cyan-700/50 z-30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-700/20 to-transparent"></div>
          </div>
          
          <div 
            ref={containerRef}
            className="relative flex gap-4 xl:gap-6 pb-6 xl:pb-8 pt-8 xl:pt-12 justify-center"
            style={{ perspective: '2000px' }}
          >
          {certifications.map((cert, index) => {
            const isSelected = selectedCard === index;
            
            const spineColors = [
              'from-cyan-900 to-black',
              'from-cyan-800 to-gray-900',
              'from-gray-900 to-black',
              'from-cyan-700 to-gray-800',
              'from-black to-cyan-900',
              'from-gray-800 to-black',
              'from-cyan-900 to-gray-900',
              'from-gray-900 to-cyan-800'
            ];
            
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => handleCardClick(index)}
                className={`relative bg-gradient-to-r ${spineColors[index]} rounded-r-lg xl:rounded-r-xl cursor-pointer flex-shrink-0 overflow-hidden group shadow-2xl`}
                style={{
                  width: '120px',
                  height: '500px',
                  zIndex: isSelected ? 100 : 10,
                  transformStyle: 'preserve-3d',
                  boxShadow: isSelected 
                    ? '0 20px 60px rgba(0,0,0,0.8), inset -5px 0 15px rgba(0,0,0,0.5)' 
                    : 'inset -5px 0 15px rgba(0,0,0,0.5), 5px 5px 20px rgba(0,0,0,0.6)'
                }}
              >
                <div className="absolute inset-0 opacity-20" 
                     style={{
                       backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                     }}>
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-400 opacity-70"></div>
                
                <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                     style={{
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                     }}>
                </div>

                <div 
                  className="relative z-10 h-full"
                  style={{
                    writingMode: isSelected ? 'horizontal-tb' : 'vertical-rl',
                    textOrientation: 'mixed',
                  }}
                >
                  {isSelected ? (
                    <div className="p-6 xl:p-8 h-full flex flex-col justify-between card-content bg-gradient-to-br from-gray-900 to-gray-800 rounded-r-lg xl:rounded-r-xl">
                      <div>
                        <div className="text-cyan-400 text-xs xl:text-sm uppercase tracking-widest mb-3 xl:mb-4">{cert.year}</div>
                        <h3 className="text-2xl xl:text-3xl font-bold mb-3 xl:mb-4">{cert.title}</h3>
                        <p className="text-gray-400 text-base xl:text-lg mb-3 xl:mb-4">{cert.level}</p>
                        <p className="text-gray-500 text-sm xl:text-base mb-4 xl:mb-6">{cert.organization}</p>
                        <div className="border-t border-gray-700 pt-4 xl:pt-6 mt-4 xl:mt-6">
                          <p className="text-xs xl:text-sm text-gray-400 leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(null);
                        }}
                        className="mt-3 xl:mt-4 px-4 xl:px-6 py-1.5 xl:py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-xs xl:text-sm font-semibold transition-all hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 xl:p-4 h-full flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
                      <div className="text-center">
                        <div className="text-cyan-400 text-[10px] xl:text-xs uppercase tracking-widest mb-2 xl:mb-3 rotate-180 font-bold">{cert.year}</div>
                        <h3 className="text-sm xl:text-lg font-bold rotate-180 leading-tight px-1 xl:px-2" style={{ letterSpacing: '0.05em' }}>
                          {cert.title}
                        </h3>
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
    </div>
  );
}
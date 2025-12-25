import { useEffect, useRef, useState } from 'react';

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

      cardRefs.current.forEach((card, index) => {
        if (card) {
          // Initial book spine appearance
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

          // Hover effect - increase height
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
        
        // Book opening animation
        gsap.to(selectedCardElement, {
          width: `${expandedWidth}px`,
          height: '400px',
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          zIndex: 50,
          transformOrigin: 'left center',
        });

        // Animate content fade in like pages turning
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
      
      // Other books lean away
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
      // Book closing animation
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
      // Book pull animation
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

        {/* Desktop Bookshelf */}
        <div className="hidden lg:block relative mt-20">
          {/* Wooden shelf effect */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-cyan-900/40 to-black/60 rounded-lg backdrop-blur-sm border-t-2 border-cyan-700/50 z-30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-700/20 to-transparent"></div>
          </div>
          
          <div 
            ref={containerRef}
            className="relative flex gap-3 pb-8 pt-12 justify-center"
            style={{ perspective: '2000px' }}
          >
          {certifications.map((cert, index) => {
            const isSelected = selectedCard === index;
            
            // Book spine colors
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
                className={`relative bg-gradient-to-r ${spineColors[index]} rounded-r-xl cursor-pointer flex-shrink-0 overflow-hidden group shadow-2xl`}
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
                {/* Book spine texture */}
                <div className="absolute inset-0 opacity-20" 
                     style={{
                       backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                     }}>
                </div>

                {/* Gilded edge effect */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-400 opacity-70"></div>
                
                {/* Leather texture overlay */}
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
                    <div className="p-8 h-full flex flex-col justify-between card-content bg-gradient-to-br from-gray-900 to-gray-800 rounded-r-xl">
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
                    <div className="p-4 h-full flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
                      <div className="text-center">
                        <div className="text-cyan-400 text-xs uppercase tracking-widest mb-3 rotate-180 font-bold">{cert.year}</div>
                        <h3 className="text-lg font-bold rotate-180 leading-tight px-2" style={{ letterSpacing: '0.05em' }}>
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
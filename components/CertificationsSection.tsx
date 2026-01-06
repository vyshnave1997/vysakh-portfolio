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
  },
  {
    year: '2021',
    title: 'Agile Testing Certification',
    level: 'Agile Methodologies',
    organization: 'ISTQB',
    description: 'Certification in agile testing practices, sprint planning, and continuous integration testing methodologies.'
  },
  {
    year: '2020',
    title: 'ISTQB Advanced Test Analyst',
    level: 'Advanced Testing',
    organization: 'ISTQB',
    description: 'Advanced certification in test analysis, specification techniques, and defect management strategies.'
  },
  {
    year: '2020',
    title: 'Performance Testing Specialist',
    level: 'Performance Engineering',
    organization: 'LoadRunner',
    description: 'Specialized certification in performance testing, load testing, and application performance optimization.'
  },
  {
    year: '2020',
    title: 'Security Testing Foundation',
    level: 'Security Testing',
    organization: 'OWASP',
    description: 'Foundation certification in security testing, vulnerability assessment, and penetration testing basics.'
  },
  {
    year: '2019',
    title: 'Mobile Testing Certification',
    level: 'Mobile QA',
    organization: 'Appium',
    description: 'Certification in mobile application testing for iOS and Android platforms using Appium automation framework.'
  },
  {
    year: '2019',
    title: 'CI/CD Pipeline Specialist',
    level: 'DevOps Testing',
    organization: 'Jenkins',
    description: 'Specialized training in continuous integration and deployment testing within DevOps pipelines.'
  },
  {
    year: '2019',
    title: 'Test Data Management',
    level: 'Data Management',
    organization: 'IBM',
    description: 'Certification in test data creation, masking, and management strategies for enterprise testing.'
  },
  {
    year: '2018',
    title: 'ISTQB Foundation Level',
    level: 'Foundation',
    organization: 'ISTQB',
    description: 'Foundation level certification covering software testing fundamentals, test design techniques, and quality principles.'
  },
  {
    year: '2018',
    title: 'Selenium WebDriver Expert',
    level: 'Web Automation',
    organization: 'Selenium',
    description: 'Expert certification in web automation using Selenium WebDriver, including advanced techniques for dynamic web applications.'
  },
  {
    year: '2017',
    title: 'Cloud Testing Fundamentals',
    level: 'Cloud QA',
    organization: 'AWS',
    description: 'Certification in cloud-based testing strategies, scalability testing, and distributed testing architectures on AWS.'
  },
  {
    year: '2017',
    title: 'Microservices Testing',
    level: 'Architecture Testing',
    organization: 'Docker',
    description: 'Specialized training in testing microservices architectures, containerized applications, and service mesh validation.'
  },
  {
    year: '2016',
    title: 'Blockchain Testing Certification',
    level: 'Emerging Technologies',
    organization: 'Hyperledger',
    description: 'Certification in testing blockchain applications, smart contracts, and distributed ledger technology validation.'
  }
];

export default function CertificationsSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

      // Horizontal scroll animation for desktop
      if (scrollContainerRef.current && window.innerWidth >= 1024) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        
        // Calculate how much to scroll so last card ends at 75% of screen
        const maxScroll = scrollWidth - (windowWidth * 0.75);
        
        gsap.to(scrollContainerRef.current, {
          x: -maxScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${maxScroll * 1.5}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      }

      // Card entrance animations
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
              delay: index * 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
              },
            }
          );
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

  const handleCardClick = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  const handleMobileCardClick = (index: number) => {
    setExpandedMobile(expandedMobile === index ? null : index);
  };

  const displayedCertifications = showAllMobile ? certifications : certifications.slice(0, 10);

  return (
    <div id="certifications" className="relative w-full bg-black text-white overflow-hidden">
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg uppercase tracking-widest text-gray-500 mb-4 sm:mb-5"
            style={{ perspective: '1000px' }}
          >
            PROFESSIONAL CREDENTIALS
          </p>
          <h2 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight"
            style={{ perspective: '2000px' }}
          >
            Certifications
          </h2>
        </div>

        {/* Mobile/Tablet Grid - Vertical Cards with Click to Expand */}
        <div className="lg:hidden mt-12 sm:mt-16 md:mt-20">
          <div className="space-y-5 sm:space-y-7">
            {displayedCertifications.map((cert, index) => {
              const isExpanded = expandedMobile === index;
              
              return (
                <div 
                  key={index}
                  onClick={() => handleMobileCardClick(index)}
                  className={`bg-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-gray-800 transition-all duration-300 border border-gray-800 cursor-pointer ${
                    isExpanded ? 'ring-2 ring-cyan-400' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-cyan-400 text-sm sm:text-base md:text-lg uppercase tracking-widest mb-3 sm:mb-4 font-semibold">{cert.year}</div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">{cert.title}</h3>
                      <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">{cert.level}</p>
                      
                      {/* Expanded content */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <span className="text-sm sm:text-base md:text-lg text-gray-500 block mb-5">{cert.organization}</span>
                        <div className="border-t border-gray-700 pt-5">
                          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400/20 flex items-center justify-center transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Click indicator */}
                  {!isExpanded && (
                    <div className="mt-4 text-sm sm:text-base text-cyan-400/60 flex items-center gap-2">
                      <span>Click to expand</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* See More / See Less Button */}
          {!showAllMobile && certifications.length > 10 && (
            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                onClick={() => setShowAllMobile(true)}
                className="group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  See More ({certifications.length - 10} more)
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {showAllMobile && (
            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                onClick={() => {
                  setShowAllMobile(false);
                  setExpandedMobile(null);
                }}
                className="group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-gray-500/50 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  See Less
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {/* Bottom Spacing */}
          <div className="h-12 sm:h-16 md:h-20"></div>
        </div>

        {/* Desktop Horizontal Scrolling Bookshelf */}
        <div ref={containerRef} className="hidden lg:block relative mt-12 xl:mt-20 min-h-screen">
          <div className="sticky top-0 h-screen flex items-center">
            <div className="absolute bottom-20 left-0 right-0 h-20 xl:h-24 bg-gradient-to-b from-cyan-900/40 to-black/60 rounded-lg backdrop-blur-sm border-t-2 border-cyan-700/50 z-30 shadow-2xl pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-700/20 to-transparent"></div>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 xl:gap-6 pb-32 pt-12 px-8"
              style={{ perspective: '2000px' }}
            >
              {certifications.slice(0, 16).map((cert, index) => {
                const isSelected = selectedCard === index;
                
                const spineColors = [
                  'from-cyan-900 to-black',
                  'from-cyan-800 to-gray-900',
                  'from-gray-900 to-black',
                  'from-cyan-700 to-gray-800',
                  'from-black to-cyan-900',
                  'from-gray-800 to-black',
                  'from-cyan-900 to-gray-900',
                  'from-gray-900 to-cyan-800',
                  'from-cyan-600 to-black',
                  'from-gray-700 to-cyan-900',
                  'from-black to-gray-800',
                  'from-cyan-800 to-black',
                  'from-gray-900 to-cyan-700',
                  'from-cyan-900 to-black',
                  'from-black to-cyan-800',
                  'from-gray-800 to-cyan-900'
                ];
                
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    onClick={() => handleCardClick(index)}
                    className={`relative bg-gradient-to-r ${spineColors[index]} rounded-r-lg xl:rounded-r-xl cursor-pointer flex-shrink-0 overflow-hidden group shadow-2xl transition-all duration-300 hover:scale-105`}
                    style={{
                      width: isSelected ? '400px' : '120px',
                      height: '500px',
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
                            <h3 className="text-xl xl:text-2xl font-bold mb-3 xl:mb-4">{cert.title}</h3>
                            <p className="text-gray-400 text-sm xl:text-base mb-3 xl:mb-4">{cert.level}</p>
                            <p className="text-gray-500 text-xs xl:text-sm mb-4 xl:mb-6">{cert.organization}</p>
                            <div className="border-t border-gray-700 pt-4 xl:pt-6 mt-4 xl:mt-6">
                              <p className="text-xs xl:text-sm text-gray-400 leading-relaxed">
                                {cert.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col group-hover:bg-cyan-500/10 transition-all">
                          {/* Year at top - horizontal */}
                          <div className="p-2 xl:p-3 border-b border-cyan-700/30" style={{ writingMode: 'horizontal-tb' }}>
                            <div className="text-cyan-400 text-sm xl:text-base uppercase tracking-widest font-bold text-center">
                              {cert.year}
                            </div>
                          </div>
                          
                          {/* Title - vertical */}
                          <div className="flex-1 flex items-center justify-center p-3 xl:p-4">
                            <h3 className="text-base xl:text-lg font-bold rotate-180 leading-tight px-1 xl:px-2 text-center" style={{ letterSpacing: '0.05em' }}>
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
    </div>
  );
}
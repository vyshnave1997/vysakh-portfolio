import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'EDMS - Electronic Document Management System (D2)',
    role: 'Automation Test Engineer',
    duration: 'Project-based',
    year: '2022-2024',
    teamSize: '3',
    toscaVersion: '14.2',
    workspace: 'AWS',
    tools: ['ALM', 'JIRA', 'TOSCA'],
    overview: 'Automated regression testing for Thermo Fisher Scientific\'s document management system, developing the automation framework from scratch using Tosca 14.2.',
    responsibilities: [
      'Led the development of comprehensive automation framework covering document creation, approval, submission and printing validations',
      'Optimized functionality using Business Parameters, Test Configuration Parameters, Steering Parameters, and Reusable test step blocks',
      'Successfully integrated Tosca with Micro Focus ALM for execution status updates and generated customized validation reports',
      'Managed application changes across multiple releases (R6, R7, R8)'
    ]
  },
  {
    title: 'Clinical Trial Management System',
    role: 'Senior QA Automation Engineer',
    duration: 'Full-time',
    year: '2021-2022',
    teamSize: '5',
    toscaVersion: '13.4',
    workspace: 'Azure',
    tools: ['TestRail', 'JIRA', 'TOSCA', 'Selenium'],
    overview: 'Developed end-to-end automated testing solution for clinical trial management platform handling patient enrollment, data collection, and regulatory compliance.',
    responsibilities: [
      'Architected scalable test automation framework supporting 200+ test cases',
      'Implemented API testing strategy for RESTful services integration',
      'Established CI/CD pipeline integration with Azure DevOps',
      'Reduced regression testing time by 70% through automation'
    ]
  },
  {
    title: 'Healthcare Insurance Portal',
    role: 'Test Automation Lead',
    duration: 'Contract',
    year: '2020-2021',
    teamSize: '8',
    toscaVersion: '13.0',
    workspace: 'On-Premise',
    tools: ['HP ALM', 'JIRA', 'TOSCA', 'SQL Server'],
    overview: 'Led automation efforts for insurance claims processing system handling policy management, claims submission, and payment processing workflows.',
    responsibilities: [
      'Designed and implemented modular test automation architecture',
      'Created data-driven testing framework for policy variations',
      'Integrated automated database validation for claims processing',
      'Mentored team of 4 junior automation engineers'
    ]
  },
  {
    title: 'Banking Core System Modernization',
    role: 'QA Automation Specialist',
    duration: 'Project-based',
    year: '2019-2020',
    teamSize: '12',
    toscaVersion: '12.3',
    workspace: 'Hybrid Cloud',
    tools: ['JIRA', 'TOSCA', 'Jenkins', 'Oracle DB'],
    overview: 'Supported digital transformation initiative migrating legacy banking system to modern microservices architecture with comprehensive test coverage.',
    responsibilities: [
      'Automated critical banking workflows including transactions and account management',
      'Developed performance testing scripts for high-volume scenarios',
      'Created automated regression suite for backward compatibility validation',
      'Coordinated with 3 offshore teams for test execution'
    ]
  },
  {
    title: 'Supply Chain Management Platform',
    role: 'Automation Engineer',
    duration: 'Full-time',
    year: '2018-2019',
    teamSize: '6',
    toscaVersion: '12.0',
    workspace: 'AWS',
    tools: ['TestRail', 'TOSCA', 'REST Assured', 'MongoDB'],
    overview: 'Built automated testing framework for supply chain platform managing inventory, orders, shipments, and vendor relationships across multiple regions.',
    responsibilities: [
      'Implemented end-to-end test automation for supply chain workflows',
      'Created API automation suite for third-party integrations',
      'Established mobile testing strategy for iOS and Android apps',
      'Achieved 85% test automation coverage'
    ]
  },
  {
    title: 'E-Commerce Platform Upgrade',
    role: 'QA Engineer',
    duration: 'Contract',
    year: '2017-2018',
    teamSize: '4',
    toscaVersion: '11.2',
    workspace: 'GCP',
    tools: ['JIRA', 'TOSCA', 'Selenium', 'MySQL'],
    overview: 'Participated in major platform upgrade project implementing new payment gateway, search functionality, and recommendation engine with full regression coverage.',
    responsibilities: [
      'Automated checkout and payment processing workflows',
      'Developed cross-browser testing suite for 5+ browsers',
      'Created performance benchmarking scripts for load testing',
      'Collaborated with development team for bug triage and resolution'
    ]
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      // Animate subtitle with glitch effect
      if (subtitleRef.current) {
        const subtitleText = subtitleRef.current.textContent || '';
        subtitleRef.current.innerHTML = '';
        
        const subtitleChars = subtitleText.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          subtitleRef.current?.appendChild(span);
          return span;
        });

        gsap.to(subtitleChars, {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.03,
            from: 'random'
          },
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Animate heading with explosive entrance
      if (headingRef.current) {
        const headingText = headingRef.current.textContent || '';
        headingRef.current.innerHTML = '';
        
        const chars = headingText.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
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
            scale: 0,
            rotation: () => Math.random() * 720 - 360,
            x: () => (Math.random() - 0.5) * 1000,
            y: () => (Math.random() - 0.5) * 1000,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0,
            y: 0,
            stagger: {
              each: 0.04,
              from: 'center',
            },
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)',
          }
        );
      }

      // Horizontal scroll for desktop
      if (scrollContainerRef.current && window.innerWidth >= 1024) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const maxScroll = scrollWidth - windowWidth + (windowWidth * 0.5);
        
        gsap.to(scrollContainerRef.current, {
          x: -maxScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${maxScroll * 4}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      }

      // Card entrance animations with 3D effects
      cardRefs.current.forEach((card, index) => {
        if (card) {
          // Main card animation
          gsap.fromTo(
            card,
            {
              opacity: 0,
              scale: 0.5,
              rotateY: -90,
              z: -500,
            },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              z: 0,
              duration: 1.2,
              delay: index * 0.15,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Continuous floating animation
          gsap.to(card, {
            y: '+=20',
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          });

          // Glow pulse effect
          gsap.to(card, {
            boxShadow: '0 0 60px rgba(0, 255, 255, 0.4), 0 0 120px rgba(0, 255, 255, 0.2)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
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

  return (
    <div id="projects" className="relative w-full bg-black text-cyan-400 overflow-hidden">
      {/* Hide scrollbar */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cyber-border {
          position: relative;
        }
        .cyber-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, #00ffff, transparent, #00ffff);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 3s linear infinite;
        }
        @keyframes borderRotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] text-cyan-500 mb-4 sm:mb-5 font-mono"
          >
            PORTFOLIO SHOWCASE
          </p>
          <h2 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-cyan-400 leading-tight"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
            }}
          >
            Projects
          </h2>
        </div>

        {/* Mobile/Tablet Vertical Stack */}
        <div className="lg:hidden mt-12 sm:mt-16 space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-black rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all duration-300 cyber-border"
            >
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-cyan-300">
                  {project.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-cyan-500 uppercase tracking-wider mb-1 font-mono">Role</div>
                    <div className="text-cyan-300 font-medium">{project.role}</div>
                  </div>
                  <div>
                    <div className="text-cyan-500 uppercase tracking-wider mb-1 font-mono">Year</div>
                    <div className="text-cyan-300 font-medium">{project.year}</div>
                  </div>
                  <div>
                    <div className="text-cyan-500 uppercase tracking-wider mb-1 font-mono">Team Size</div>
                    <div className="text-cyan-300 font-medium">{project.teamSize}</div>
                  </div>
                  <div>
                    <div className="text-cyan-500 uppercase tracking-wider mb-1 font-mono">Tosca Version</div>
                    <div className="text-cyan-300 font-medium">{project.toscaVersion}</div>
                  </div>
                </div>

                <div>
                  <div className="text-cyan-500 uppercase tracking-wider text-xs sm:text-sm mb-2 font-mono">Overview</div>
                  <p className="text-cyan-200 text-sm sm:text-base leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <div className="text-cyan-500 uppercase tracking-wider text-xs sm:text-sm mb-2 font-mono">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-cyan-500/10 rounded-full text-xs sm:text-sm border border-cyan-500/50 text-cyan-300 font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Horizontal Scrolling */}
        <div ref={containerRef} className="hidden lg:block relative mt-12 xl:mt-20 min-h-screen">
          <div className="sticky top-0 h-screen flex items-center">
            <div 
              ref={scrollContainerRef}
              className="flex gap-16 xl:gap-20 pb-20 pt-12 px-8"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="relative bg-black rounded-2xl xl:rounded-3xl flex-shrink-0 overflow-hidden border-2 border-cyan-500/50 cyber-border"
                  style={{
                    width: '90vw',
                    height: '90vh',
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Animated grid background */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                      backgroundSize: '50px 50px',
                    }}
                  />
                  
                  <div className="relative z-10 p-8 xl:p-12 h-full flex flex-col overflow-y-auto no-scrollbar">
                    <div className="flex-1">
                      <h3 
                        className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-6 xl:mb-8 leading-tight text-cyan-300"
                        style={{
                          textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                        }}
                      >
                        {project.title}
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-6 xl:gap-8 mb-8">
                        <div>
                          <div className="text-cyan-500 uppercase tracking-wider text-sm mb-2 font-mono">Role</div>
                          <div className="text-cyan-300 font-medium text-lg">{project.role}</div>
                        </div>
                        <div>
                          <div className="text-cyan-500 uppercase tracking-wider text-sm mb-2 font-mono">Duration</div>
                          <div className="text-cyan-300 font-medium text-lg">{project.duration}</div>
                        </div>
                        <div>
                          <div className="text-cyan-500 uppercase tracking-wider text-sm mb-2 font-mono">Year</div>
                          <div className="text-cyan-300 font-medium text-lg">{project.year}</div>
                        </div>
                        <div>
                          <div className="text-cyan-500 uppercase tracking-wider text-sm mb-2 font-mono">Team Size</div>
                          <div className="text-cyan-300 font-medium text-lg">{project.teamSize}</div>
                        </div>
                        <div>
                          <div className="text-cyan-500 uppercase tracking-wider text-sm mb-2 font-mono">Tosca Version</div>
                          <div className="text-cyan-300 font-medium text-lg">{project.toscaVersion}</div>
                        </div>
                        <div>
                          <div className="text-cyan-500 uppercase tracking-wider text-sm mb-2 font-mono">Workspace</div>
                          <div className="text-cyan-300 font-medium text-lg">{project.workspace}</div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <div className="text-cyan-500 uppercase tracking-wider text-sm mb-3 font-mono">Tools</div>
                        <div className="flex flex-wrap gap-3">
                          {project.tools.map((tool, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 bg-cyan-500/10 rounded-full text-base border border-cyan-500/50 font-medium text-cyan-300 font-mono hover:bg-cyan-500/20 transition-colors duration-300"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <div className="text-cyan-500 uppercase tracking-wider text-sm mb-3 font-mono">Overview</div>
                        <p className="text-cyan-200 leading-relaxed text-lg">
                          {project.overview}
                        </p>
                      </div>

                      <div>
                        <div className="text-cyan-500 uppercase tracking-wider text-sm mb-4 font-mono">Key Responsibilities</div>
                        <ul className="space-y-3">
                          {project.responsibilities.map((resp, i) => (
                            <li key={i} className="text-cyan-200 text-base leading-relaxed flex items-start">
                              <span className="text-cyan-400 mr-3 mt-1.5 text-lg">▸</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

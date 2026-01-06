import { useEffect, useRef, useState } from 'react';

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
    ],
    color: 'from-cyan-900 to-blue-900'
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
    ],
    color: 'from-purple-900 to-indigo-900'
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
    ],
    color: 'from-emerald-900 to-teal-900'
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
    ],
    color: 'from-orange-900 to-red-900'
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
    ],
    color: 'from-violet-900 to-purple-900'
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
    ],
    color: 'from-pink-900 to-rose-900'
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
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

      // Animate subtitle
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
          stagger: 0.05,
          duration: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Animate heading
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
            x: () => (Math.random() - 0.5) * 800,
            y: () => (Math.random() - 0.5) * 800,
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
        );
      }

      // Horizontal scroll for desktop
      if (scrollContainerRef.current && window.innerWidth >= 1024) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const maxScroll = scrollWidth - windowWidth + 400;
        
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
    <div id="projects" className="relative w-full bg-black text-white overflow-hidden">
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg uppercase tracking-widest text-gray-500 mb-4 sm:mb-5"
          >
            PORTFOLIO SHOWCASE
          </p>
          <h2 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight"
          >
            Projects
          </h2>
        </div>

        {/* Mobile/Tablet Vertical Stack */}
        <div className="lg:hidden mt-12 sm:mt-16 space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${project.color} rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-2xl hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  {project.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-cyan-400 uppercase tracking-wider mb-1">Role</div>
                    <div className="text-white font-medium">{project.role}</div>
                  </div>
                  <div>
                    <div className="text-cyan-400 uppercase tracking-wider mb-1">Year</div>
                    <div className="text-white font-medium">{project.year}</div>
                  </div>
                  <div>
                    <div className="text-cyan-400 uppercase tracking-wider mb-1">Team Size</div>
                    <div className="text-white font-medium">{project.teamSize}</div>
                  </div>
                  <div>
                    <div className="text-cyan-400 uppercase tracking-wider mb-1">Tosca Version</div>
                    <div className="text-white font-medium">{project.toscaVersion}</div>
                  </div>
                </div>

                <div>
                  <div className="text-cyan-400 uppercase tracking-wider text-xs sm:text-sm mb-2">Overview</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <div className="text-cyan-400 uppercase tracking-wider text-xs sm:text-sm mb-2">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-black/40 rounded-full text-xs sm:text-sm border border-cyan-500/30">
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
              className="flex gap-8 xl:gap-10 pb-20 pt-12 px-8"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                  className={`relative bg-gradient-to-br ${project.color} rounded-2xl xl:rounded-3xl cursor-pointer flex-shrink-0 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-700/50`}
                  style={{
                    width: selectedProject === index ? '800px' : '500px',
                    height: '600px',
                  }}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  <div className="relative z-10 p-8 xl:p-10 h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                      <h3 className="text-3xl xl:text-4xl font-bold mb-6 leading-tight">
                        {project.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-1">Role</div>
                          <div className="text-white font-medium">{project.role}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-1">Duration</div>
                          <div className="text-white font-medium">{project.duration}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-1">Year</div>
                          <div className="text-white font-medium">{project.year}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-1">Team Size</div>
                          <div className="text-white font-medium">{project.teamSize}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-1">Tosca Version</div>
                          <div className="text-white font-medium">{project.toscaVersion}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-1">Workspace</div>
                          <div className="text-white font-medium">{project.workspace}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-cyan-400 uppercase tracking-wider text-xs mb-2">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, i) => (
                            <span key={i} className="px-3 py-1.5 bg-black/40 rounded-full text-sm border border-cyan-500/30 font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-cyan-400 uppercase tracking-wider text-xs mb-2">Overview</div>
                        <p className="text-gray-200 leading-relaxed">
                          {project.overview}
                        </p>
                      </div>

                      {selectedProject === index && (
                        <div className="animate-fadeIn">
                          <div className="text-cyan-400 uppercase tracking-wider text-xs mb-3">Key Responsibilities</div>
                          <ul className="space-y-2">
                            {project.responsibilities.map((resp, i) => (
                              <li key={i} className="text-gray-200 text-sm leading-relaxed flex items-start">
                                <span className="text-cyan-400 mr-2 mt-1">▸</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {selectedProject !== index && (
                      <div className="mt-4 text-sm text-cyan-400/80 flex items-center gap-2">
                        <span>Click to expand</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
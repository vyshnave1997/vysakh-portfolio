'use client';
import { forwardRef, useEffect, useRef } from 'react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(({ projects }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

      if (!gsap || !ScrollTrigger || !containerRef.current || !wrapperRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // Kill existing triggers for this section
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.vars?.trigger === wrapperRef.current || trigger.vars?.id === 'projects-horizontal') {
          trigger.kill();
        }
      });

      const isMobile = window.innerWidth < 768;
      
      // For mobile, don't apply horizontal scroll
      if (isMobile) {
        containerRef.current.style.display = 'block';
        return;
      }

      const sections = gsap.utils.toArray('.project-card');

      if (sections.length === 0) return;

      // Calculate the total width needed
      const totalWidth = window.innerWidth * sections.length;
      
      // Set container width
      if (containerRef.current) {
        containerRef.current.style.width = `${totalWidth}px`;
      }

      // Calculate scroll distance (3x multiplier for slower scroll)
      const scrollMultiplier = 3;
      const scrollDistance = window.innerWidth * (sections.length - 1) * scrollMultiplier;

      // Main horizontal scroll animation
      const horizontalTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          id: 'projects-horizontal',
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: 'power1.inOut'
          },
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onLeave: () => {
            // Ensure smooth transition to footer
            ScrollTrigger.refresh();
          },
        },
      });

      // Animate project elements
      sections.forEach((section: any, index: number) => {
        // Animate title characters
        const titleChars = section.querySelectorAll('.title-char');
        if (titleChars.length > 0) {
          gsap.fromTo(
            titleChars,
            {
              opacity: 0,
              y: 100,
              rotateX: -90,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.03,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalTween,
                start: 'left 80%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        // Animate description characters
        const descChars = section.querySelectorAll('.desc-char');
        if (descChars.length > 0) {
          gsap.fromTo(
            descChars,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.01,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalTween,
                start: 'left 80%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.3,
            }
          );
        }

        // Animate images
        const images = section.querySelectorAll('.project-image');
        images.forEach((img: any, imgIndex: number) => {
          gsap.fromTo(
            img,
            {
              opacity: 0,
              scale: 0.8,
              y: 50,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalTween,
                start: 'left 80%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.5 + (imgIndex * 0.2),
            }
          );
        });

        // Animate lines
        const lines = section.querySelectorAll('.project-line');
        lines.forEach((line: any, lineIndex: number) => {
          gsap.fromTo(
            line,
            {
              scaleX: 0,
              transformOrigin: 'left center',
            },
            {
              scaleX: 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalTween,
                start: 'left 80%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.2 + (lineIndex * 0.1),
            }
          );
        });
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadGSAP();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.vars?.trigger === wrapperRef.current || trigger.vars?.id === 'projects-horizontal') {
            trigger.kill();
          }
        });
      }
    };
  }, [projects]);

  const splitText = (text: string, className: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className={`${className} inline-block`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div ref={wrapperRef} className="relative bg-black overflow-hidden">
      <div ref={containerRef} className="flex">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="project-card w-screen h-screen flex-shrink-0 px-8 md:px-16 py-20 flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full">
              {/* Projects Header */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-light text-white/60 mb-3">
                  PROJECTS
                </h3>
                <div className="project-line h-px bg-cyan-400/30 mb-6"></div>
              </div>

              {/* Project Title */}
              <div className="mb-8" style={{ perspective: '1000px' }}>
                <h2 className="project-title text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                  {splitText(project.title, 'title-char')}
                </h2>
                <div className="project-line h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mb-6"></div>
              </div>

              {/* Three Sections Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Section 1: Role & Duration */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-4"></div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1.5">ROLE</h4>
                      <p className="text-base font-medium text-white desc-char">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1.5">DURATION</h4>
                      <p className="text-base font-medium text-white desc-char">{project.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1.5">YEAR</h4>
                      <p className="text-base font-medium text-white desc-char">{project.year}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Description */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-4"></div>
                  <div className="space-y-3">
                    <p className="text-base md:text-lg font-light text-white/90 leading-relaxed">
                      {splitText(project.description, 'desc-char')}
                    </p>
                  </div>
                </div>

                {/* Section 3: Details */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-4"></div>
                  <div className="space-y-3">
                    <p className="text-base md:text-lg font-light text-white/90 leading-relaxed">
                      {splitText(project.details, 'desc-char')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="project-image">
                    <div className="w-full h-56 md:h-72 bg-gray-900 rounded-2xl overflow-hidden border border-cyan-400/20 shadow-lg shadow-cyan-400/10">
                      <img 
                        src={image} 
                        alt={`${project.title} - Image ${imgIndex + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Number Indicator */}
              <div className="absolute bottom-6 right-6 md:right-12">
                <div className="flex flex-col items-end">
                  <p className="text-5xl md:text-7xl font-bold text-white/10">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="text-sm text-white/40 mt-2">
                    OF {String(projects.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 text-white/60 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        <span className="uppercase tracking-wider">Scroll Horizontally</span>
        <svg 
          className="w-5 h-5 animate-bounce-horizontal" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }

        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
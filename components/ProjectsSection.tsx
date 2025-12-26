'use client';
import { useEffect, useRef } from 'react';

interface Project {
  id: string | number;
  title: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  details: string;
  images: string[];
  teamSize?: string;
  toscaVersion?: string;
  workspace?: string;
  tools?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const initAnimations = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        console.log('GSAP not loaded yet');
        return;
      }

      if (!sectionRef.current) {
        console.log('Section ref not ready');
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Animate section heading
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

        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      const cards = gsap.utils.toArray('.project-card');
      if (cards.length === 0) {
        console.log('No cards found');
        return;
      }

      // Animate each card on scroll
      cards.forEach((card: any, index: number) => {
        // Card fade in
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Title animation
        const titleChars = card.querySelectorAll('.title-char');
        if (titleChars.length > 0) {
          gsap.fromTo(titleChars,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Description animation
        const descChars = card.querySelectorAll('.desc-char');
        if (descChars.length > 0) {
          gsap.fromTo(descChars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.003,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 65%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Images animation
        const images = card.querySelectorAll('.project-image');
        images.forEach((img: any, idx: number) => {
          gsap.fromTo(img,
            { opacity: 0, scale: 0.9, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              delay: idx * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        // Lines animation
        const lines = card.querySelectorAll('.project-line');
        lines.forEach((line: any, idx: number) => {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1,
              delay: idx * 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });

      console.log('Project animations initialized');
      ScrollTrigger.refresh();
    };

    // Load GSAP if not already loaded
    if (typeof window !== 'undefined') {
      if ((window as any).gsap && (window as any).ScrollTrigger) {
        setTimeout(initAnimations, 100);
      } else {
        const loadGSAP = () => {
          const script1 = document.createElement('script');
          script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
          script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            script2.onload = () => {
              setTimeout(initAnimations, 100);
            };
            document.head.appendChild(script2);
          };
          document.head.appendChild(script1);
        };
        loadGSAP();
      }
    }

    return () => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((t: any) => {
          const trigger = t.trigger;
          if (trigger && sectionRef.current?.contains(trigger)) {
            t.kill(true);
          }
        });
      }
    };
  }, [projects]);

  const splitText = (text: string, className: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`${className} inline-block`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Section Heading */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">
          FEATURED WORK
        </p>
        <h2 
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          style={{ perspective: '1000px' }}
        >
          Projects
        </h2>
      </div>

      <div className="space-y-20 sm:space-y-24 md:space-y-32">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card"
          >
            <div className="w-full">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl font-light text-white/60 mb-2 sm:mb-3">
                  PROJECT {String(index + 1).padStart(2, '0')}
                </h3>
                <div className="project-line h-px bg-cyan-400/30 mb-4 sm:mb-6" style={{ transformOrigin: 'left' }}></div>
              </div>

              {/* Title */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4">
                  {splitText(project.title, 'title-char')}
                </h2>
                <div className="project-line h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mb-4 sm:mb-6" style={{ transformOrigin: 'left' }}></div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* Project Info & Technical Details */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-3 sm:mb-4" style={{ transformOrigin: 'left' }}></div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">ROLE</h4>
                      <p className="text-sm sm:text-base font-medium text-white">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">DURATION</h4>
                      <p className="text-sm sm:text-base font-medium text-white">{project.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">YEAR</h4>
                      <p className="text-sm sm:text-base font-medium text-white">{project.year}</p>
                    </div>
                    {project.teamSize && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">TEAM SIZE</h4>
                        <p className="text-sm sm:text-base font-medium text-white">{project.teamSize}</p>
                      </div>
                    )}
                    {project.toscaVersion && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">TOSCA VERSION</h4>
                        <p className="text-sm sm:text-base font-medium text-white">{project.toscaVersion}</p>
                      </div>
                    )}
                    {project.workspace && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">WORKSPACE</h4>
                        <p className="text-sm sm:text-base font-medium text-white">{project.workspace}</p>
                      </div>
                    )}
                    {project.tools && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1 sm:mb-1.5">TOOLS</h4>
                        <p className="text-sm sm:text-base font-medium text-white">{project.tools}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-3 sm:mb-4" style={{ transformOrigin: 'left' }}></div>
                  <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-2 sm:mb-3">OVERVIEW</h4>
                  <p className="text-sm sm:text-base md:text-lg font-light text-white/90 leading-relaxed">
                    {splitText(project.description, 'desc-char')}
                  </p>
                </div>

                {/* Details */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-3 sm:mb-4" style={{ transformOrigin: 'left' }}></div>
                  <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-2 sm:mb-3">KEY RESPONSIBILITIES</h4>
                  <p className="text-sm sm:text-base md:text-lg font-light text-white/90 leading-relaxed">
                    {splitText(project.details, 'desc-char')}
                  </p>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="project-image">
                    <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-cyan-400/20 shadow-lg shadow-cyan-400/10">
                      <img
                        src={image}
                        alt={`${project.title} - ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
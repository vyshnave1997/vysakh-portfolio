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
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="relative w-full bg-black py-20">
      <div className="space-y-32">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card px-8 md:px-16"
          >
            <div className="max-w-7xl mx-auto w-full">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-light text-white/60 mb-3">
                  PROJECTS {String(index + 1).padStart(2, '0')}
                </h3>
                <div className="project-line h-px bg-cyan-400/30 mb-6" style={{ transformOrigin: 'left' }}></div>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                  {splitText(project.title, 'title-char')}
                </h2>
                <div className="project-line h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mb-6" style={{ transformOrigin: 'left' }}></div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Role & Duration */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-4" style={{ transformOrigin: 'left' }}></div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1.5">ROLE</h4>
                      <p className="text-base font-medium text-white">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1.5">DURATION</h4>
                      <p className="text-base font-medium text-white">{project.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-1.5">YEAR</h4>
                      <p className="text-base font-medium text-white">{project.year}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-4" style={{ transformOrigin: 'left' }}></div>
                  <p className="text-base md:text-lg font-light text-white/90 leading-relaxed">
                    {splitText(project.description, 'desc-char')}
                  </p>
                </div>

                {/* Details */}
                <div>
                  <div className="project-line h-px bg-cyan-400/20 mb-4" style={{ transformOrigin: 'left' }}></div>
                  <p className="text-base md:text-lg font-light text-white/90 leading-relaxed">
                    {splitText(project.details, 'desc-char')}
                  </p>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="project-image">
                    <div className="w-full h-56 md:h-72 bg-gray-900 rounded-2xl overflow-hidden border border-cyan-400/20 shadow-lg shadow-cyan-400/10">
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
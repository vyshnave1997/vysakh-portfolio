import { forwardRef, useEffect } from 'react';

const skills = [
  'Tosca', 'Selenium', 'JIRA', 'API Testing', 'SQL', 'Postman',
  'TestRail', 'Agile', 'Jenkins', 'Git', 'LoadRunner', 'Python'
];

interface SkillsSectionProps {
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

const SkillsSection = forwardRef<HTMLDivElement, SkillsSectionProps>(({ headingRef }, ref) => {
  useEffect(() => {
    // Load GSAP scripts
    const loadGSAP = async () => {
      if (typeof window === 'undefined') return;
      
      // Check if already loaded
      if ((window as any).gsap && (window as any).ScrollTrigger) {
        initAnimation();
        return;
      }

      // Load GSAP
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      document.head.appendChild(gsapScript);

      gsapScript.onload = () => {
        // Load ScrollTrigger
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

      if (!gsap || !ScrollTrigger || !headingRef?.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const sectionElement = typeof ref === 'object' && ref !== null && ref.current ? ref.current : null;
      if (!sectionElement) return;

      // Check if mobile for adjusted animations
      const isMobile = window.innerWidth < 768;

      // Split heading text into characters (original heading)
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

      // Animate each character with wave effect (adjusted for mobile)
      gsap.fromTo(
        chars,
        {
          y: isMobile ? 50 : 100,
          x: isMobile ? -25 : -50,
          opacity: 0,
          rotationX: -90,
          scale: 0.5,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          stagger: isMobile ? 0.03 : 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Move only the text content left to right on scroll (inline-block for width constraint)
      gsap.set(headingRef.current, { display: 'inline-block' });
      
      gsap.to(headingRef.current, {
        x: () => {
          const viewportWidth = window.innerWidth;
          const maxMovement = isMobile 
            ? Math.min(viewportWidth * 0.15, 100) 
            : Math.min(viewportWidth * 0.3, 400);
          return maxMovement;
        },
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
        }
      });

      // Color wave effect
      chars.forEach((char, index) => {
        gsap.to(char, {
          color: '#06b6d4',
          scrollTrigger: {
            trigger: sectionElement,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
          delay: index * 0.02,
        });
      });

      // Animate skill cards with standard fade-up effect
      const cards = sectionElement.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
        // Simple fade up and scale animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: isMobile ? 40 : 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.5 : 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * (isMobile ? 0.05 : 0.08),
          }
        );
      });
    };

    loadGSAP();

    // Cleanup
    return () => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        const sectionElement = typeof ref === 'object' && ref !== null && ref.current ? ref.current : null;
        const triggers = (window as any).ScrollTrigger.getAll();
        triggers.forEach((trigger: any) => {
          if (sectionElement && trigger.trigger === sectionElement) {
            trigger.kill();
          }
        });
      }
    };
  }, [headingRef, ref]);

  return (
    <div 
      ref={ref}
      className="relative w-full min-h-screen bg-white text-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 z-10" 
      id="skills-section"
    >
      <div className="w-full">
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black"
            style={{ perspective: '1000px' }}
          >
            Technologies I'm Good With
          </h2>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {skills.map((skill) => (
            <div 
              key={skill}
              className="skill-card bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex items-center justify-center aspect-square hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              style={{ 
                perspective: '1000px',
                boxShadow: '0 10px 30px rgba(34, 211, 238, 0.3), 0 4px 8px rgba(34, 211, 238, 0.2)'
              }}
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black via-cyan-500 to-black p-[2px]">
                <div className="bg-gray-100 w-full h-full rounded-xl sm:rounded-2xl"></div>
              </div>
              <div className="text-center relative z-10">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">{skill}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
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

      // Check if mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile) return; // Skip animations on mobile

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

      // Animate each character with wave effect (original heading)
      gsap.fromTo(
        chars,
        {
          y: 100,
          x: -50,
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
          stagger: 0.05,
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
          const textWidth = headingRef.current?.offsetWidth || 0;
          const viewportWidth = window.innerWidth;
          const maxMovement = Math.min(viewportWidth * 0.3, 400);
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

      // Animate skill cards
      const cards = sectionElement.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
        // Staggered fade in and scale up
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.5,
            y: 100,
            rotateY: -180,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );

        // Floating animation on scroll
        gsap.to(card, {
          y: -20,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        });
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
      className="relative min-h-screen bg-white text-black py-20 px-8 z-10" 
      id="skills-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold text-black"
            style={{ perspective: '1000px' }}
          >
            Technologies I'm Good With
          </h2>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill}
              className="skill-card bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow relative overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black via-cyan-500 to-black p-[2px]">
                <div className="bg-gray-100 w-full h-full rounded-2xl"></div>
              </div>
              <div className="text-center relative z-10">
                <div className="text-3xl font-light mb-2">{skill}</div>
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
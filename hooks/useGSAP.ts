import { useEffect, RefObject, useMemo } from 'react';

interface UseGSAPProps {
  secondSectionRef: RefObject<HTMLDivElement | null>;
  horizontalScrollRef: RefObject<HTMLDivElement | null>;
  infoSectionRef: RefObject<HTMLDivElement | null>;
  skillsSectionRef: RefObject<HTMLDivElement | null>;
  infoTitleRef: RefObject<HTMLHeadingElement | null>;
  infoMainTextRef: RefObject<HTMLDivElement | null>;
  infoDescriptionRef: RefObject<HTMLParagraphElement | null>;
  skillsHeadingRef: RefObject<HTMLHeadingElement | null>;
}

export function useGSAP(props: UseGSAPProps) {
  const { 
    secondSectionRef, 
    horizontalScrollRef, 
    infoSectionRef, 
    skillsSectionRef, 
    infoTitleRef, 
    infoMainTextRef, 
    infoDescriptionRef 
  } = props;
  
  // Memoize refs to prevent dependency array changes
  const refs = useMemo(() => ({
    secondSectionRef,
    horizontalScrollRef,
    infoSectionRef,
    skillsSectionRef,
    infoTitleRef,
    infoMainTextRef,
    infoDescriptionRef
  }), [secondSectionRef, horizontalScrollRef, infoSectionRef, skillsSectionRef, infoTitleRef, infoMainTextRef, infoDescriptionRef]);

  useEffect(() => {
    // Check if scripts are already loaded
    if (typeof (window as any).gsap !== 'undefined') {
      initGSAP();
      return;
    }

    // Only load scripts if not already present
    const existingGsapScript = document.querySelector('script[src*="gsap.min.js"]');
    const existingScrollTriggerScript = document.querySelector('script[src*="ScrollTrigger.min.js"]');

    if (!existingGsapScript) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (!existingScrollTriggerScript) {
          const gsapScript = document.createElement('script');
          gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
          gsapScript.async = true;
          document.head.appendChild(gsapScript);

          gsapScript.onload = () => {
            initGSAP();
          };
        } else {
          initGSAP();
        }
      };
    }

    function initGSAP() {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      
      if (!gsap || !ScrollTrigger) return;
      
      gsap.registerPlugin(ScrollTrigger);

      // Clean up any existing ScrollTriggers from this hook only
      // Don't kill triggers from ProjectsSection component
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (!trigger.vars?.id?.startsWith('project-') && 
            trigger.vars?.trigger !== refs.horizontalScrollRef?.current &&
            !trigger.vars?.containerAnimation) {
          trigger.kill();
        }
      });

      // Wait for DOM to be ready
      setTimeout(() => {
        if (refs.secondSectionRef?.current) {
          gsap.fromTo(
            refs.secondSectionRef.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: refs.secondSectionRef.current,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          );
        }

        // Character animation for Info title
        if (refs.infoTitleRef?.current) {
          const titleChars = refs.infoTitleRef.current.querySelectorAll('.char');
          if (titleChars.length > 0) {
            gsap.fromTo(
              titleChars,
              { 
                opacity: 0, 
                y: 50 
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: refs.infoTitleRef.current,
                  start: 'top 80%',
                  end: 'top 50%',
                  toggleActions: 'play none none none'
                }
              }
            );
          }
        }

        // Character animation for Info main text
        if (refs.infoMainTextRef?.current) {
          const mainChars = refs.infoMainTextRef.current.querySelectorAll('.char');
          if (mainChars.length > 0) {
            gsap.fromTo(
              mainChars,
              { 
                opacity: 0, 
                y: 30 
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.03,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: refs.infoMainTextRef.current,
                  start: 'top 75%',
                  end: 'top 45%',
                  toggleActions: 'play none none none'
                }
              }
            );
          }
        }

        // Character animation for Info description
        if (refs.infoDescriptionRef?.current) {
          const descChars = refs.infoDescriptionRef.current.querySelectorAll('.char');
          if (descChars.length > 0) {
            gsap.fromTo(
              descChars,
              { 
                opacity: 0, 
                y: 20 
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.01,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: refs.infoDescriptionRef.current,
                  start: 'top 75%',
                  end: 'top 45%',
                  toggleActions: 'play none none none'
                }
              }
            );
          }
        }

        // NOTE: Horizontal scroll animation is now handled by ProjectsSection component itself
        // This hook no longer manages the horizontal scroll to avoid conflicts

        // Fade effect from black to white between Info and Skills sections
        if (refs.infoSectionRef?.current && refs.skillsSectionRef?.current) {
          gsap.to(refs.infoSectionRef.current, {
            scrollTrigger: {
              trigger: refs.infoSectionRef.current,
              start: 'top 20%',
              end: 'bottom top',
              scrub: 1,
              onUpdate: (self: any) => {
                const progress = self.progress;
                const r = Math.round(progress * 255);
                const g = Math.round(progress * 255);
                const b = Math.round(progress * 255);
                if (refs.infoSectionRef.current) {
                  refs.infoSectionRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }
              }
            }
          });
        }

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
      }, 100);
    }

    // Cleanup function
    return () => {
      if (typeof (window as any).ScrollTrigger !== 'undefined') {
        (window as any).ScrollTrigger.getAll().forEach((trigger: any) => {
          // Don't kill any project-related triggers
          if (!trigger.vars?.id?.startsWith('project-') && 
              trigger.vars?.trigger !== refs.horizontalScrollRef?.current &&
              !trigger.vars?.containerAnimation) {
            trigger.kill();
          }
        });
      }
    };
  }, [refs]);
}
import { useEffect, useRef } from 'react';

const services = [
  { id: '01', title: 'Tosca Automation', description: 'Expertise in Tricentis Tosca versions 13-16 with Vision AI for comprehensive test automation' },
  { id: '02', title: 'SAP Testing', description: 'Automated and manual testing of SAP applications with Tosca' },
  { id: '03', title: 'Mainframe Automation', description: 'Specialized in mainframe application testing using Tosca automation' },
  { id: '04', title: 'Module Scanning', description: 'Efficient module scanning, test case design, and TCD development' },
  { id: '05', title: 'CI/CD Integration', description: 'Jenkins pipeline integration for continuous testing and deployment' },
  { id: '06', title: 'Test Management', description: 'Proficient in ALM, JIRA Xray for test planning and execution tracking' },
  { id: '07', title: 'Oracle Cloud', description: 'Patch release automation for Oracle Cloud applications (22A-23A)' },
  { id: '08', title: 'API Testing', description: 'RESTful API testing and database validation with Postman' },
  { id: '09', title: 'Quality Assurance', description: 'Comprehensive test requirement analysis and quality metrics reporting' }
];

const workExperience = [
  {
    company: 'Planit Testing India Pvt Ltd',
    period: 'January 2025 - Present',
    role: 'Senior Test Automation Engineer',
    description: 'Domain: SCM, Logistics'
  },
  {
    company: 'Vaisesika Consulting PVT Ltd',
    period: 'August 2021 - January 2025',
    role: 'Associate Software Engineer',
    description: 'Domain: Life Science'
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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

      if (!gsap || !ScrollTrigger || !servicesRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const serviceItems = servicesRef.current.querySelectorAll('.service-item');
      const heading = sectionRef.current?.querySelector('h2');
      const areasHeading = sectionRef.current?.querySelector('.areas-heading');
      const servicesHeading = sectionRef.current?.querySelector('.services-heading');
      const servicesChars = sectionRef.current?.querySelectorAll('.services-char');
      const valueCards = sectionRef.current?.querySelectorAll('.value-card');

      // Fade in services heading characters on initial view
      if (servicesChars && servicesChars.length > 0) {
        gsap.fromTo(servicesChars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'power3.out',
            duration: 0.6,
            scrollTrigger: {
              trigger: servicesHeading,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Fade out "AREAS OF EXPERTISE:" as you scroll
      if (areasHeading) {
        gsap.fromTo(areasHeading, {
          opacity: 1,
          y: 0,
        }, {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'top -150px',
            scrub: 0.6,
          }
        });
      }

      // Fade out main heading as you scroll down
      if (heading) {
        gsap.fromTo(heading, {
          opacity: 1,
          y: 0,
        }, {
          opacity: 0,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'top -200px',
            scrub: 0.6,
          }
        });
      }

      // Fade out "SERVICES" heading as you scroll
      if (servicesHeading) {
        gsap.fromTo(servicesHeading, {
          opacity: 1,
          y: 0,
        }, {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 200px',
            end: 'top 100px',
            scrub: 0.6,
          }
        });
      }

      // Fade in services as they scroll
      serviceItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: -20,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              end: 'top 30%',
              toggleActions: 'play reverse play reverse',
            },
            delay: index * 0.2,
          }
        );

        // Fade out services when they reach the heading area
        gsap.fromTo(item, {
          opacity: 1,
          scale: 1,
        }, {
          opacity: 0,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 280px',
            end: 'top 30px',
            scrub: 3,
          }
        });
      });

      // Modern card animations for work experience
      if (valueCards && valueCards.length > 0) {
        valueCards.forEach((card: any, index: number) => {
          // Simple fade up animation with stagger
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 50,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              delay: index * 0.15
            }
          );
        });
      }
    };

    loadGSAP();

    return () => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        const triggers = (window as any).ScrollTrigger.getAll();
        triggers.forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  const splitText = (text: string, className: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`${className} inline-block`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div id="experience" ref={sectionRef} className="relative w-full bg-gray-50 text-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 z-10" style={{ minHeight: '200vh' }}>
      <div className="w-full">
        {/* Header Section */}
        <div className="mb-12 sm:mb-14 md:mb-16 sticky top-12 sm:top-16 md:top-20">
          <p className="areas-heading text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">
            AREAS OF EXPERTISE:
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-black leading-tight">
            Quality Assurance & Testing
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mt-12 sm:mt-16 md:mt-20">
          {/* Left Side - Services List */}
          <div ref={servicesRef}>
            <p className="services-heading text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-6 sm:mb-8 sticky top-28 sm:top-32 md:top-40">
              {splitText('SERVICES', 'services-char')}
            </p>
            <div className="space-y-6 sm:space-y-8">
              {services.map((service) => (
                <div key={service.id} className="service-item border-t border-gray-300 pt-6 sm:pt-8 hover:border-cyan-400 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                    <span className="text-cyan-400 font-light text-xl sm:text-2xl md:text-3xl flex-shrink-0">{service.id}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{service.title}</h4>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Work Experience */}
          <div className="lg:sticky lg:top-28 xl:top-40 h-fit">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">PREVIOUS WORKSPACES</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-8">
              Building Quality <span className="bg-cyan-400 px-1 sm:px-2">Excellence</span> Across Organizations
            </h3>
            
            <div className="mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-6">
              {workExperience.map((work, index) => (
                <div 
                  key={index} 
                  className="value-card bg-white p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200"
                  style={{ boxShadow: '0 4px 12px rgba(6, 182, 212, 0.15)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg sm:text-xl">{work.company}</h4>
                    <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">{work.period}</span>
                  </div>
                  <p className="text-cyan-400 font-medium text-sm sm:text-base mb-1">{work.role}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{work.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

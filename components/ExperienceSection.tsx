import { useEffect, useRef } from 'react';

const services = [
  { id: '01', title: 'Test Automation', description: 'Building robust automated test suites with Selenium, Tosca, and Python' },
  { id: '02', title: 'Manual Testing & QA', description: 'Comprehensive testing strategies and quality assurance processes' },
  { id: '03', title: 'Performance Testing', description: 'Load and stress testing with LoadRunner and performance optimization' },
  { id: '04', title: 'API Testing', description: 'RESTful API testing and validation using Postman and custom frameworks' },
  { id: '05', title: 'CI/CD Integration', description: 'Automated testing pipelines with Jenkins and continuous deployment' },
  { id: '06', title: 'Database Testing', description: 'SQL query validation and data integrity verification' },
  { id: '07', title: 'Test Strategy', description: 'Comprehensive test planning and agile methodology implementation' },
  { id: '08', title: 'Bug Tracking', description: 'Efficient defect management using JIRA and TestRail' },
  { id: '09', title: 'Quality Metrics', description: 'Test coverage analysis and quality reporting dashboards' }
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
      const bottomText = sectionRef.current?.querySelector('.bottom-text');
      const bottomTextChars = sectionRef.current?.querySelectorAll('.bottom-char');

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
            x: -100,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 3.5,
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

      // Modern 3D card flip and parallax effect for value cards
      if (valueCards && valueCards.length > 0) {
        valueCards.forEach((card: any, index: number) => {
          // Initial state - cards start rotated and scaled down
          gsap.set(card, {
            rotationY: -90,
            scale: 0.8,
            opacity: 0,
            transformPerspective: 1000,
            transformOrigin: 'left center'
          });

          // 3D flip in animation with stagger
          gsap.to(card, {
            rotationY: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          });

          // Parallax scroll effect - cards move at different speeds
          gsap.to(card, {
            y: -50 * (index + 1),
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });

          // Hover-like scale effect on scroll proximity
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(34, 211, 238, 0.3)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
              end: 'top 40%',
              scrub: 1,
              toggleActions: 'play reverse play reverse'
            }
          });
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
    <div ref={sectionRef} className="relative bg-gray-50 text-black py-20 px-8 z-10" style={{ minHeight: '200vh' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 sticky top-20">
          <p className="areas-heading text-sm uppercase tracking-widest text-gray-500 mb-4">
            AREAS OF EXPERTISE:
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-tight">
            Quality Assurance & Testing
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
          {/* Left Side - Services List */}
          <div ref={servicesRef}>
            <p className="services-heading text-sm uppercase tracking-widest text-gray-500 mb-8 sticky top-40">
              {splitText('SERVICES', 'services-char')}
            </p>
            <div className="space-y-8">
              {services.map((service) => (
                <div key={service.id} className="service-item border-t border-gray-300 pt-8 hover:border-cyan-400 transition-colors">
                  <div className="flex items-start gap-6">
                    <span className="text-cyan-400 font-light text-3xl">{service.id}</span>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h4>
                      <p className="text-gray-600 text-lg">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Value Proposition */}
          <div className="lg:sticky lg:top-40 h-fit">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">WHAT I CAN DO FOR YOUR TEAM</p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              I ensure <span className="bg-cyan-400 px-2">reliable</span> software quality that helps teams deliver with confidence.
            </h3>
            
            <div className="mt-12 space-y-6">
              <div className="value-card bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-xl mb-2">8+ Years Experience</h4>
                <p className="text-gray-600">Delivering quality solutions across multiple industries</p>
              </div>
              
              <div className="value-card bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-xl mb-2">End-to-End Testing</h4>
                <p className="text-gray-600">From test strategy to automation implementation</p>
              </div>
              
              <div className="value-card bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-xl mb-2">Agile Methodology</h4>
                <p className="text-gray-600">Seamless integration with development teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
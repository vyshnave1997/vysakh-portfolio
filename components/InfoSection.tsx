import { forwardRef, useEffect, useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Clipboard, Check, ExternalLink } from 'lucide-react';

interface InfoSectionProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  mainTextRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLParagraphElement | null>;
}

const InfoSection = forwardRef<HTMLDivElement, InfoSectionProps>(({ titleRef, mainTextRef, descriptionRef }, ref) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<HTMLDivElement>(null);
  const connectTitleRef = useRef<HTMLHeadingElement>(null);
  const connectParaRef = useRef<HTMLParagraphElement>(null);
  const getInTouchRef = useRef<HTMLHeadingElement>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  const titleText = "Info";
  const mainText = "I ensure quality and excellence";
  const descriptionText = "I'm a dedicated Quality Analyst and Tosca Tester from India, passionate about ensuring software excellence through rigorous testing and quality assurance practices. With expertise in automated testing and quality control, I help teams deliver flawless products that exceed expectations.";

  const contactItems = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'your.email@example.com',
      action: 'copy'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      action: 'copy'
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile',
      action: 'link'
    },
    {
      id: 'github',
      icon: Github,
      label: 'GitHub',
      value: 'github.com/yourusername',
      link: 'https://github.com/yourusername',
      action: 'link'
    }
  ];

  const handleCopyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleItemClick = (item: typeof contactItems[0]) => {
    if (item.action === 'copy') {
      handleCopyToClipboard(item.value, item.id);
    } else if (item.action === 'link' && item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

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

      // Title character animation with stagger
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 100,
            rotationX: -90
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Main text character animation with wave effect
      if (mainTextRef.current) {
        const chars = mainTextRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
            stagger: {
              amount: 0.8,
              from: 'start'
            },
            scrollTrigger: {
              trigger: mainTextRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Description character animation with fade-in
      if (descriptionRef.current) {
        const chars = descriptionRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: {
              amount: 1.5,
              from: 'start'
            },
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // "Let's Connect" title animation
      if (connectTitleRef.current) {
        gsap.fromTo(
          connectTitleRef.current,
          {
            opacity: 0,
            x: -100,
            rotationY: -45
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: connectTitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Connect paragraph animation with split text effect
      if (connectParaRef.current) {
        const words = connectParaRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.02,
            scrollTrigger: {
              trigger: connectParaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // "Get in Touch" title animation
      if (getInTouchRef.current) {
        gsap.fromTo(
          getInTouchRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotationZ: -10
          },
          {
            opacity: 1,
            scale: 1,
            rotationZ: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: getInTouchRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Image reveal animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 100,
            rotation: -5
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Parallax effect on image
        gsap.to(imageRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      }

      // Animate each contact item
      if (contactItemsRef.current) {
        const items = contactItemsRef.current.querySelectorAll('.contact-item');
        items.forEach((item: any, index: number) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: 100,
              scale: 0.9,
              rotationY: 45
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    };

    loadGSAP();

    return () => {
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        const triggers = (window as any).ScrollTrigger.getAll();
        triggers.forEach((trigger: any) => {
          if (trigger.vars?.trigger && 
              (imageRef.current?.contains(trigger.vars.trigger) || 
               contactItemsRef.current?.contains(trigger.vars.trigger) ||
               titleRef.current?.contains(trigger.vars.trigger) ||
               mainTextRef.current?.contains(trigger.vars.trigger) ||
               descriptionRef.current?.contains(trigger.vars.trigger) ||
               connectTitleRef.current?.contains(trigger.vars.trigger) ||
               connectParaRef.current?.contains(trigger.vars.trigger) ||
               getInTouchRef.current?.contains(trigger.vars.trigger))) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  // Helper function to split text into words with spans
  const splitIntoWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block mr-1">
        {word}
      </span>
    ));
  };

  return (
    <div ref={ref} className="relative w-full min-h-screen text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 z-10 transition-colors duration-300" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Side - Text Content */}
          <div className="space-y-4 sm:space-y-6 w-full">
            {/* Title with character animation */}
            <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400 mb-8 sm:mb-10 md:mb-12 overflow-hidden">
              {titleText.split('').map((char, index) => (
                <span key={index} className="char inline-block">
                  {char}
                </span>
              ))}
            </h2>
            
            {/* Text Reveal Card with character animation */}
            <div className="relative overflow-hidden">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                <div className="relative">
                  {/* Background text */}
                  <p className="text-gray-700">
                    {mainText}
                  </p>
                  {/* Reveal text with character animation */}
                  <p ref={mainTextRef} className="absolute top-0 left-0 text-cyan-400">
                    {mainText.split('').map((char, index) => (
                      <span key={index} className="char inline-block">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Image - Mobile Only */}
            <div className="block lg:hidden my-8 sm:my-10 md:my-12">
              <div ref={imageRef} className="relative w-full flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-sm sm:max-w-md mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-t-2 border-l-2 border-cyan-400 opacity-50"></div>
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-b-2 border-r-2 border-cyan-400 opacity-50"></div>
                  
                  {/* Main image container */}
                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent z-10"></div>
                    
                    {/* Image - Replace with your actual image */}
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
                      alt="Quality Analyst"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-cyan-400 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg">
                    <p className="font-bold text-xs sm:text-sm">8+ Years</p>
                    <p className="text-[10px] sm:text-xs">Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description with character animation */}
            <p ref={descriptionRef} className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mt-6 sm:mt-8 text-gray-300">
              {descriptionText.split('').map((char, index) => (
                <span key={index} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>

            {/* Additional Paragraph */}
            <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-cyan-400/30">
              <h3 ref={connectTitleRef} className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-3 sm:mb-4">
                Let's Connect
              </h3>
              <p ref={connectParaRef} className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-gray-300">
                {splitIntoWords("I'm always open to discussing new opportunities, collaborations, or just having a conversation about quality assurance and testing. Feel free to reach out through any of the channels, and let's create something exceptional together.")}
              </p>
            </div>

            {/* Contact Items - Mobile Only */}
            <div className="block lg:hidden mt-8 sm:mt-10 md:mt-12">
              <div ref={contactItemsRef} className="space-y-3 sm:space-y-4">
                <h3 ref={getInTouchRef} className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Get in Touch</h3>
                
                {contactItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="contact-item group relative cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:border-cyan-400 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-1">
                        {/* Icon and Label */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 flex-shrink-0" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-cyan-400 mb-0.5">{item.label}</h4>
                            <p className="text-xs sm:text-sm font-medium text-white group-hover:text-cyan-400 transition-colors truncate">
                              {item.value}
                            </p>
                          </div>
                          
                          {/* Action Icon */}
                          <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            {item.action === 'copy' ? (
                              copiedItem === item.id ? (
                                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <Clipboard className="w-4 h-4 sm:w-5 sm:h-5" />
                              )
                            ) : (
                              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </div>
                        </div>

                        {/* Copied notification */}
                        {copiedItem === item.id && (
                          <div className="absolute top-2 right-2 bg-cyan-400 text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            Copied!
                          </div>
                        )}

                        {/* Bottom accent line */}
                        <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mt-2 sm:mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Image and Contact Items - Desktop Only */}
          <div className="hidden lg:block space-y-8">
            {/* Image with Scroll Trigger */}
            <div ref={imageRef} className="relative w-full flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-cyan-400 opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-cyan-400 opacity-50"></div>
                
                {/* Main image container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent z-10"></div>
                  
                  {/* Image - Replace with your actual image */}
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
                    alt="Quality Analyst"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-cyan-400 text-black px-6 py-3 rounded-full shadow-lg">
                  <p className="font-bold text-sm">8+ Years</p>
                  <p className="text-xs">Experience</p>
                </div>
              </div>
            </div>

            {/* Contact Items Below Image */}
            <div ref={contactItemsRef} className="space-y-4 mt-12">
              <h3 ref={getInTouchRef} className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
              
              {contactItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="contact-item group relative cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 transition-all duration-300 hover:border-cyan-400 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-1">
                      {/* Icon and Label */}
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                        <div className="flex-1">
                          <h4 className="text-xs uppercase tracking-widest text-cyan-400 mb-0.5">{item.label}</h4>
                          <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                            {item.value}
                          </p>
                        </div>
                        
                        {/* Action Icon */}
                        <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.action === 'copy' ? (
                            copiedItem === item.id ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Clipboard className="w-5 h-5" />
                            )
                          ) : (
                            <ExternalLink className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {/* Copied notification */}
                      {copiedItem === item.id && (
                        <div className="absolute top-2 right-2 bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                          Copied!
                        </div>
                      )}

                      {/* Bottom accent line */}
                      <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

InfoSection.displayName = 'InfoSection';

export default InfoSection;
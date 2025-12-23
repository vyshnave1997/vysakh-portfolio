'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const roles = ['Quality Analyst', 'Tosca Tester'];
  const staticText = ',\nfrom India.';
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const imageRef = useRef(null);
  const infoTitleRef = useRef(null);
  const infoPara1Ref = useRef(null);
  const infoPara2Ref = useRef(null);
  const footerRef = useRef(null);
  
  useEffect(() => {
    const currentRole = roles[loopNum % roles.length];
    
    const handleType = () => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      
      if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        return;
      }
      
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }
    };
    
    const timer = setTimeout(handleType, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      gsapScript.async = true;
      document.body.appendChild(gsapScript);

      gsapScript.onload = () => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Animate second section
        gsap.fromTo(
          secondSectionRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: secondSectionRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );

        // Animate the main image - move and enlarge it with higher z-index
        const mainImage = document.getElementById('main-image');
        gsap.to(mainImage, {
          scale: 2.5,
          x: -100,
          y: -200,
          zIndex: 100,
          scrollTrigger: {
            trigger: secondSectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        });
      };
    };
  }, []);

  return (
    <>
      {/* First Section */}
      <div className="relative h-screen bg-black text-white overflow-hidden">
        {/* Cyan Top Line */}
        <div className="w-full h-2 bg-cyan-400 absolute top-0 left-0 z-50"></div>
        
        {/* Navbar */}
        <nav className="relative z-40 w-full px-8 py-6 flex justify-end items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl md:text-2xl font-light hover:text-cyan-400 transition-colors"
          >
            Menu
          </button>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col pt-8">
          {/* Header */}
          <header className="px-8">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold">IamVysakh</h1>
          </header>

          {/* Bottom Text */}
          <div className="mt-auto p-4 md:p-8 pb-8 md:pb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight max-w-2xl whitespace-pre-line">
              {displayedText}
              <span className="inline-block w-1 h-6 md:h-10 lg:h-12 bg-cyan-400 ml-1 animate-pulse"></span>
              {staticText}
            </h2>
          </div>

          {/* Bottom Right Small Image - Will enlarge in second section */}
          <div id="main-image" className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-48 h-36 md:w-80 md:h-60 lg:w-96 lg:h-64" style={{zIndex: 100}}>
            <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" 
                alt="Abstract" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Full Width Image */}
      <div 
        ref={secondSectionRef}
        className="relative min-h-screen text-white z-10"
        style={{backgroundColor: 'transparent'}}
      >
        {/* Spacer for image display */}
        <div className="h-screen"></div>
      </div>

      {/* Third Section - Info Content */}
      <div ref={thirdSectionRef} className="relative min-h-screen bg-black text-white py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top Left Content with Text Reveal */}
          <div className="space-y-6 max-w-4xl">
            <h2 ref={infoTitleRef} className="text-5xl md:text-7xl font-bold text-cyan-400 mb-12">Info</h2>
            
            {/* Text Reveal Card */}
            <div className="relative overflow-hidden">
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {/* Background text */}
                <div className="relative">
                  <p className="text-gray-700">
                    I ensure quality and excellence
                  </p>
                  {/* Reveal text on scroll */}
                  <p 
                    ref={infoPara1Ref}
                    className="absolute top-0 left-0 text-cyan-400 clip-text"
                    style={{
                      clipPath: 'inset(0 100% 0 0)',
                    }}
                  >
                    I ensure quality and excellence
                  </p>
                </div>
              </div>
            </div>

            <p ref={infoPara2Ref} className="text-xl md:text-2xl font-light leading-relaxed mt-8 text-gray-300">
              I'm a dedicated Quality Analyst and Tosca Tester from India, 
              passionate about ensuring software excellence through rigorous 
              testing and quality assurance practices. With expertise in automated 
              testing and quality control, I help teams deliver flawless products 
              that exceed expectations.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="relative min-h-screen bg-white text-black py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-16">Skills & Tools</h2>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Skill Card 1 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Tosca</div>
              </div>
            </div>

            {/* Skill Card 2 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Selenium</div>
              </div>
            </div>

            {/* Skill Card 3 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">JIRA</div>
              </div>
            </div>

            {/* Skill Card 4 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">API Testing</div>
              </div>
            </div>

            {/* Skill Card 5 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">SQL</div>
              </div>
            </div>

            {/* Skill Card 6 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Postman</div>
              </div>
            </div>

            {/* Skill Card 7 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">TestRail</div>
              </div>
            </div>

            {/* Skill Card 8 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Agile</div>
              </div>
            </div>

            {/* Skill Card 9 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Jenkins</div>
              </div>
            </div>

            {/* Skill Card 10 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Git</div>
              </div>
            </div>

            {/* Skill Card 11 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">LoadRunner</div>
              </div>
            </div>

            {/* Skill Card 12 */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Python</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="relative min-h-screen bg-gray-50 text-black py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">AREAS OF EXPERTISE:</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-tight">
              Quality Assurance & Testing
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
            {/* Left Column */}
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">WHAT I CAN DO FOR YOUR TEAM</p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                I ensure <span className="bg-cyan-400 px-2">reliable</span> software quality that helps teams deliver with confidence.
              </h3>
            </div>

            {/* Right Column - Services */}
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-8">SERVICES</p>
              <div className="space-y-6">
                {/* Service 1 */}
                <div className="border-t border-gray-300 pt-6">
                  <div className="flex items-start gap-4">
                    <span className="text-gray-400 font-light text-2xl">01</span>
                    <h4 className="text-2xl md:text-3xl font-bold">Test Automation</h4>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="border-t border-gray-300 pt-6">
                  <div className="flex items-start gap-4">
                    <span className="text-gray-400 font-light text-2xl">02</span>
                    <h4 className="text-2xl md:text-3xl font-bold">Manual Testing & QA</h4>
                  </div>
                </div>

                {/* Service 3 */}
                <div className="border-t border-gray-300 pt-6">
                  <div className="flex items-start gap-4">
                    <span className="text-gray-400 font-light text-2xl">03</span>
                    <h4 className="text-2xl md:text-3xl font-bold">Performance Testing</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="relative min-h-screen bg-black text-white py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">PROFESSIONAL CREDENTIALS</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Certifications
            </h2>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            {/* Certification Card 1 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2023</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">ISTQB Certified Tester</h3>
              <p className="text-gray-400 text-base mb-3">Foundation Level</p>
              <span className="text-sm text-gray-500">International Software Testing Qualifications Board</span>
            </div>

            {/* Certification Card 2 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2022</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Tricentis Tosca Certified</h3>
              <p className="text-gray-400 text-base mb-3">Automation Specialist Level 1</p>
              <span className="text-sm text-gray-500">Tricentis</span>
            </div>

            {/* Certification Card 3 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2022</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Agile Tester Certification</h3>
              <p className="text-gray-400 text-base mb-3">Advanced Level</p>
              <span className="text-sm text-gray-500">ISTQB</span>
            </div>

            {/* Certification Card 4 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2021</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Certified SAFe Practitioner</h3>
              <p className="text-gray-400 text-base mb-3">Scaled Agile Framework</p>
              <span className="text-sm text-gray-500">Scaled Agile, Inc.</span>
            </div>

            {/* Certification Card 5 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2023</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Selenium WebDriver</h3>
              <p className="text-gray-400 text-base mb-3">Advanced Automation Testing</p>
              <span className="text-sm text-gray-500">Test Automation University</span>
            </div>

            {/* Certification Card 6 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2021</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">API Testing Professional</h3>
              <p className="text-gray-400 text-base mb-3">REST & SOAP Services</p>
              <span className="text-sm text-gray-500">Postman</span>
            </div>

            {/* Certification Card 7 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2020</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Performance Testing</h3>
              <p className="text-gray-400 text-base mb-3">LoadRunner Certified Professional</p>
              <span className="text-sm text-gray-500">Micro Focus</span>
            </div>

            {/* Certification Card 8 */}
            <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="text-cyan-400 text-sm uppercase tracking-widest mb-3">2020</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Test Management</h3>
              <p className="text-gray-400 text-base mb-3">JIRA & Test Planning Specialist</p>
              <span className="text-sm text-gray-500">Atlassian</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative min-h-screen bg-white text-black py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">RECENT WORK:</p>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black leading-tight mb-8">
              E-Commerce Platform
            </h2>
          </div>

          {/* Project Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-xl md:text-2xl font-normal leading-relaxed">
                Comprehensive testing solution for a large-scale e-commerce platform, implementing automated test suites that reduced testing time by 60%.
              </p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-normal leading-relaxed">
                The project encompassed end-to-end testing, performance optimization, and continuous integration workflows.
              </p>
            </div>
          </div>

          {/* Project Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large Image */}
            <div className="lg:col-span-1">
              <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" 
                  alt="Project Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Second Image */}
            <div className="lg:col-span-1">
              <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                  alt="Testing Analytics" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">ROLE</h4>
              <p className="text-lg font-medium">Lead QA Engineer</p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">DURATION</h4>
              <p className="text-lg font-medium">6 Months</p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">YEAR</h4>
              <p className="text-lg font-medium">2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer 
        ref={footerRef}
        className="relative min-h-screen bg-black text-white py-20 px-8 z-10"
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-between">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {/* Navigation Links */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6">NAVIGATION</h3>
              <ul className="space-y-4">
                <li><a href="#home" className="text-2xl hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="#services" className="text-2xl hover:text-cyan-400 transition-colors">Services</a></li>
                <li><a href="#work" className="text-2xl hover:text-cyan-400 transition-colors">Work</a></li>
                <li><a href="#contacts" className="text-2xl hover:text-cyan-400 transition-colors">Contacts</a></li>
                <li><a href="#typefaces" className="text-2xl hover:text-cyan-400 transition-colors">Typefaces</a></li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6">SOCIAL</h3>
              <ul className="space-y-4">
                <li><a href="#dribbble" className="text-2xl hover:text-cyan-400 transition-colors">Dribbble</a></li>
                <li><a href="#behance" className="text-2xl hover:text-cyan-400 transition-colors">Behance</a></li>
                <li><a href="#logopond" className="text-2xl hover:text-cyan-400 transition-colors">Logopond</a></li>
                <li><a href="#instagram" className="text-2xl hover:text-cyan-400 transition-colors">Instagram</a></li>
                <li><a href="#linkedin" className="text-2xl hover:text-cyan-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            {/* Contact Email */}
            <div className="md:col-span-1 flex items-start">
              <div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full mb-6"></div>
                <a href="mailto:hi@vysakh.com" className="text-4xl md:text-5xl lg:text-6xl font-light hover:text-cyan-400 transition-colors break-words">
                  hi@vysakh.com
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom - Statement and Name */}
          <div className="space-y-8">
            <p className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
              I believe in the power of <br className="hidden md:block" />
              exciting brands and <br className="hidden md:block" />
              thoughtful digital <br className="hidden md:block" />
              experiences.
            </p>
            <h2 className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-bold w-full">
              IamVysakh
            </h2>
          </div>
        </div>
      </footer>

      {/* Navigation Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-cyan-400 z-50 transform transition-transform duration-700 ease-in-out ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Close Button */}
          <div className="p-8 flex justify-end">
            <button 
              onClick={() => setMenuOpen(false)}
              className="text-4xl text-black hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-12 pb-20">
            <a 
              href="#experience" 
              className="text-4xl md:text-6xl font-light text-black hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Experience
            </a>
            <a 
              href="#certifications" 
              className="text-4xl md:text-6xl font-light text-black hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Certifications
            </a>
            <a 
              href="#about" 
              className="text-4xl md:text-6xl font-light text-black hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
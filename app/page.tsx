'use client';
import { useState, useRef } from 'react';
import Loader from '@/components/Loader';
import HeroSection from '@/components/HeroSection';
import ImageSection from '@/components/ImageSection';
import InfoSection from '@/components/InfoSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import CertificationsSection from '@/components/CertificationsSection';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import MenuOverlay from '@/components/MenuOverlay';
import { useLoader } from '@/hooks/useLoader';
import { useGSAP } from '@/hooks/useGSAP';
import { projectsData } from '@/types';


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, progress } = useLoader();
  
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const infoTitleRef = useRef<HTMLHeadingElement>(null);
  const infoMainTextRef = useRef<HTMLDivElement>(null);
  const infoDescriptionRef = useRef<HTMLParagraphElement>(null);
  const skillsHeadingRef = useRef<HTMLHeadingElement>(null);
  
  useGSAP({ 
    secondSectionRef, 
    horizontalScrollRef, 
    infoSectionRef: thirdSectionRef, 
    skillsSectionRef,
    infoTitleRef,
    infoMainTextRef,
    infoDescriptionRef,
    skillsHeadingRef
  });

  return (
    <>
      <Loader progress={progress} loading={loading} />
      
      <HeroSection onMenuClick={() => setMenuOpen(true)} />
      
      {/* <ImageSection ref={secondSectionRef} /> */}
      
      <InfoSection 
        ref={thirdSectionRef}
        titleRef={infoTitleRef}
        mainTextRef={infoMainTextRef}
        descriptionRef={infoDescriptionRef}
      />
      
      <SkillsSection ref={skillsSectionRef} headingRef={skillsHeadingRef} />
      
      <ExperienceSection />
      
      <CertificationsSection />
      
      <ProjectsSection projects={projectsData} />
      
      <Footer ref={footerRef} />
      
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
import { forwardRef } from 'react';

interface InfoSectionProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  mainTextRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLParagraphElement | null>;
}

const InfoSection = forwardRef<HTMLDivElement, InfoSectionProps>(({ titleRef, mainTextRef, descriptionRef }, ref) => {
  const titleText = "Info";
  const mainText = "I ensure quality and excellence";
  const descriptionText = "I'm a dedicated Quality Analyst and Tosca Tester from India, passionate about ensuring software excellence through rigorous testing and quality assurance practices. With expertise in automated testing and quality control, I help teams deliver flawless products that exceed expectations.";

  return (
    <div ref={ref} className="relative min-h-screen text-white py-20 px-8 z-10 transition-colors duration-300" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
      <div className="w-full">
        {/* Top Left Content with Text Reveal */}
        <div className="space-y-6 w-full">
          {/* Title with character animation */}
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold text-cyan-400 mb-12 overflow-hidden">
            {titleText.split('').map((char, index) => (
              <span key={index} className="char inline-block">
                {char}
              </span>
            ))}
          </h2>
          
          {/* Text Reveal Card with character animation */}
          <div className="relative overflow-hidden">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
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

          {/* Description with character animation */}
          <p ref={descriptionRef} className="text-xl md:text-2xl font-light leading-relaxed mt-8 text-gray-300">
            {descriptionText.split('').map((char, index) => (
              <span key={index} className="char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
});

InfoSection.displayName = 'InfoSection';

export default InfoSection;
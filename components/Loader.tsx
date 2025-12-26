interface LoaderProps {
  progress: number;
  loading: boolean;
}

export default function Loader({ progress, loading }: LoaderProps) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-cyan-400 z-[100] flex items-center justify-center overflow-hidden transition-transform duration-1000 ease-in-out ${
          !loading ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Moving Text - Responsive sizing */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap animate-slide">
          <h1 className="text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] xl:text-[20rem] font-bold text-black">
            iamvysakh
          </h1>
        </div>
        
        {/* Progress Counter - Responsive positioning and sizing */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 text-black">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
            {progress}%
          </div>
          
          {/* Parallelogram Progress Bar - Responsive width */}
          <div className="mt-3 md:mt-4 relative w-40 sm:w-48 md:w-56 lg:w-64 h-2 md:h-3">
            <div 
              className="absolute inset-0"
              style={{
                transform: 'skewX(-20deg)',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
              }}
            />
            <div 
              className="absolute inset-0 transition-all duration-300"
              style={{
                transform: 'skewX(-20deg)',
                width: `${progress}%`,
                background: 'linear-gradient(to top, #000000, transparent)',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(100vw) translateY(-50%);
          }
          100% {
            transform: translateX(-100%) translateY(-50%);
          }
        }
        
        .animate-slide {
          animation: slide 8s ease-in-out infinite;
        }
        
        /* Prevent horizontal scroll on mobile */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
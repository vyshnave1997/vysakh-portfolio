interface LoaderProps {
  progress: number;
  loading: boolean;
}

export default function Loader({ progress, loading }: LoaderProps) {
  if (!loading) return null;

  return (
    <>
      <div className="fixed inset-0 bg-cyan-400 z-[100] flex items-center justify-center overflow-hidden">
        {/* Moving Text */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap animate-slide">
          <h1 className="text-[10rem] md:text-[15rem] lg:text-[20rem] font-bold text-black">
            IamVysakh
          </h1>
        </div>
        
        {/* Progress Counter */}
        <div className="absolute bottom-12 right-12 text-black">
          <div className="text-7xl md:text-8xl lg:text-9xl font-bold">
            {progress}%
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%) translateY(-50%);
          }
          100% {
            transform: translateX(100vw) translateY(-50%);
          }
        }
        
        .animate-slide {
          animation: slide 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
import { forwardRef } from 'react';

const ImageSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div 
      ref={ref}
      className="relative min-h-screen bg-black z-10 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl px-8">
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop" 
            alt="Abstract" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
});

ImageSection.displayName = 'ImageSection';

export default ImageSection;
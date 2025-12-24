import { forwardRef } from 'react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(({ projects }, ref) => {
  return (
    <div ref={ref} className="relative bg-white overflow-hidden">
      <div className="flex w-max">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="project-card w-screen h-screen flex-shrink-0 px-8 py-20"
          >
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
              {/* Section Header */}
              <div className="mb-12">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                  PROJECT {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-tight mb-8">
                  {project.title}
                </h2>
              </div>

              {/* Project Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <p className="text-xl md:text-2xl font-normal leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-normal leading-relaxed">
                    {project.details}
                  </p>
                </div>
              </div>

              {/* Project Images */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="lg:col-span-1">
                    <div className="w-full h-72 bg-gray-200 rounded-2xl overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${project.title} - Image ${imgIndex + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">ROLE</h4>
                  <p className="text-lg font-medium">{project.role}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">DURATION</h4>
                  <p className="text-lg font-medium">{project.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">YEAR</h4>
                  <p className="text-lg font-medium">{project.year}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
export interface Project {
  id: string | number;
  title: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  details: string;
  images: string[];
}


export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Comprehensive testing solution for a large-scale e-commerce platform, implementing automated test suites that reduced testing time by 60%.",
    details: "The project encompassed end-to-end testing, performance optimization, and continuous integration workflows.",
    role: "Lead QA Engineer",
    duration: "6 Months",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Banking Mobile App",
    description: "End-to-end testing framework for a secure banking application, ensuring compliance with financial regulations and zero critical bugs in production.",
    details: "Implemented security testing protocols, automated regression suites, and performance testing under high load conditions.",
    role: "Senior QA Analyst",
    duration: "8 Months",
    year: "2022",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Healthcare Management System",
    description: "Quality assurance for a patient management system serving 500+ hospitals, focusing on data integrity and HIPAA compliance.",
    details: "Developed comprehensive test strategies covering data migration, API testing, and cross-platform compatibility testing.",
    role: "QA Team Lead",
    duration: "10 Months",
    year: "2021",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
    ]
  }
];
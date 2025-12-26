export interface Project {
  id: string | number;
  title: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  details: string;
  images: string[];
  teamSize?: string;
  toscaVersion?: string;
  workspace?: string;
  tools?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "EDMS - Electronic Document Management System (D2)",
    description: "Automated regression testing for Thermo Fisher Scientific's document management system, developing the automation framework from scratch using Tosca 14.2.",
    details: "Led the development of comprehensive automation framework covering document creation, approval, submission and printing validations. Optimized functionality using Business Parameters, Test Configuration Parameters, Steering Parameters, and Reusable test step blocks. Successfully integrated Tosca with Micro Focus ALM for execution status updates and generated customized validation reports. Managed application changes across multiple releases (R6, R7, R8).",
    role: "Automation Test Engineer",
    duration: "Project-based",
    year: "2022-2024",
    teamSize: "3",
    toscaVersion: "14.2",
    workspace: "AWS",
    tools: "ALM, JIRA, TOSCA",
    images: [
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 2,
    title: "CMD PLM - Oracle Cloud Project Lifecycle Management",
    description: "Performed regression testing for Thermo Fisher Scientific's Oracle Cloud-based project lifecycle management system with continuous patch release support.",
    details: "Automated various test cases using TOSCA and prepared comprehensive test sheets using Test Case Design (TCD). Integrated Tosca executions with ALM for real-time status updates. Successfully supported multiple Oracle patch releases (22A, 22B, 22C, 22D, 23A) and performed regression suite executions after each patch. Generated daily execution reports and maintained defect tracking throughout the project lifecycle.",
    role: "QA Analyst",
    duration: "Project-based",
    year: "2022-2024",
    teamSize: "2",
    toscaVersion: "14.2",
    workspace: "AWS",
    tools: "Tosca, ALM",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 3,
    title: "SDG Vantaa - Special Diagnostics Group (Oracle)",
    description: "Executed regression testing for Thermo Fisher Scientific's Oracle Cloud-based Special Diagnostics Group application with focus on quality assurance and continuous integration.",
    details: "Automated different test cases using TOSCA and integrated with Micro Focus ALM for seamless execution tracking. Prepared detailed test sheets using Test Case Design (TCD) and generated daily execution reports. Supported Oracle patch releases (22C, 22D, 23A) with comprehensive regression suite executions. Analyzed application changes during releases and incorporated necessary modifications to ensure application stability.",
    role: "QA Analyst",
    duration: "Project-based",
    year: "2023-2024",
    teamSize: "2",
    toscaVersion: "14.2",
    workspace: "Microsoft 365",
    tools: "Tosca, ALM",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
    ]
  }
];
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Check, Clock, Users, BookOpen, 
  Globe, Award, Calendar, FileText, Target,
  Zap, Briefcase, GraduationCap
} from 'lucide-react';
import { TbCurrencyNaira } from 'react-icons/tb';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';

// Course data structure
const coursesData: Record<string, any> = {
  // ACE-SPED Graduate Programs Courses
  'renewable-new-energy-systems': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Renewable and New Energy Systems',
    level: 'M.Eng/M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time / Part-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'This program focuses on sustainable energy solutions including solar, wind, hydro, and emerging renewable technologies. Students will gain expertise in designing, implementing, and managing renewable energy systems.',
    objectives: [
      'Understand the principles and technologies of renewable energy systems',
      'Design and optimize renewable energy installations',
      'Analyze energy efficiency and sustainability metrics',
      'Develop innovative solutions for energy challenges',
      'Conduct advanced research in renewable energy',
    ],
    curriculum: [
      'Advanced Renewable Energy Technologies',
      'Solar Photovoltaic Systems Design',
      'Wind Energy Systems',
      'Biomass and Bioenergy',
      'Energy Storage Systems',
      'Grid Integration of Renewable Energy',
      'Energy Economics and Policy',
      'Research Methodology',
      'Thesis/Dissertation',
    ],
    requirements: [
      'Bachelor\'s degree in Engineering or related field (minimum 2nd Class Upper)',
      'For PhD: Master\'s degree in relevant field',
      'Strong background in mathematics and physics',
      'Research proposal (for PhD applicants)',
      'Two academic references',
    ],
    careerPaths: [
      'Renewable Energy Engineer',
      'Solar Energy Consultant',
      'Wind Energy Specialist',
      'Energy Systems Designer',
      'Research Scientist',
      'University Lecturer',
      'Energy Policy Analyst',
      'Sustainability Consultant',
    ],
    fee: '₦400,000 per session',
    duration_details: {
      masters: '18-24 months',
      phd: '3-5 years',
    },
  },
  'power-engineering': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Power Engineering',
    level: 'M.Eng/M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time / Part-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'Advanced study in electric power generation, transmission, distribution, and utilization. This program prepares students for careers in power systems design, operation, and management.',
    objectives: [
      'Master advanced power systems analysis and design',
      'Understand power generation and distribution technologies',
      'Develop expertise in power electronics and drives',
      'Learn smart grid and microgrid technologies',
      'Conduct cutting-edge research in power engineering',
    ],
    curriculum: [
      'Advanced Power Systems Analysis',
      'Power Generation Technologies',
      'High Voltage Engineering',
      'Power Electronics and Drives',
      'Smart Grid Technologies',
      'Power System Protection',
      'Energy Management Systems',
      'Power Quality and Reliability',
      'Thesis/Dissertation',
    ],
    requirements: [
      'Bachelor\'s degree in Electrical Engineering or related field',
      'Minimum CGPA of 3.50/5.00 or 2nd Class Upper',
      'For PhD: Master\'s degree with research experience',
      'GRE/GMAT scores (optional but advantageous)',
    ],
    careerPaths: [
      'Power Systems Engineer',
      'Electrical Design Engineer',
      'Grid Operations Manager',
      'Protection Engineer',
      'Power Plant Manager',
      'Energy Consultant',
      'Research Engineer',
      'University Faculty',
    ],
    fee: '₦450,000 per session',
  },
  'sustainable-energy-materials': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Sustainable Energy Materials Engineering',
    level: 'M.Eng/M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'Focus on materials science for energy applications including battery technologies, fuel cells, solar cells, and advanced materials for energy conversion and storage.',
    objectives: [
      'Understand materials properties for energy applications',
      'Design and synthesize advanced energy materials',
      'Characterize materials using advanced techniques',
      'Develop sustainable and eco-friendly materials',
      'Innovate in energy storage and conversion technologies',
    ],
    curriculum: [
      'Advanced Materials Science',
      'Energy Storage Materials',
      'Solar Cell Materials and Technologies',
      'Battery Technologies',
      'Fuel Cell Systems',
      'Nanomaterials for Energy',
      'Materials Characterization Techniques',
      'Sustainable Materials Design',
      'Research Project/Thesis',
    ],
    requirements: [
      'Bachelor\'s degree in Materials Engineering, Chemistry, Physics, or related field',
      'Strong foundation in chemistry and physics',
      'Laboratory experience preferred',
      'Research interest in materials science',
    ],
    careerPaths: [
      'Materials Scientist',
      'Battery Development Engineer',
      'Solar Cell Researcher',
      'R&D Engineer',
      'Quality Control Specialist',
      'Materials Characterization Expert',
      'Energy Storage Consultant',
      'University Researcher',
    ],
    fee: '₦420,000 per session',
  },
  'industrial-electronics-power-devices': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Industrial Electronics and Power Devices',
    level: 'M.Eng/M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time / Part-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'Advanced study in power electronics, industrial control systems, and semiconductor devices for power applications. Prepare for careers in industrial automation and power electronics design.',
    objectives: [
      'Master power electronics fundamentals and applications',
      'Design and analyze industrial control systems',
      'Understand semiconductor power devices',
      'Develop motor drive and control systems',
      'Conduct research in advanced power electronics',
    ],
    curriculum: [
      'Advanced Power Electronics',
      'Industrial Control Systems',
      'Semiconductor Power Devices',
      'Motor Drives and Control',
      'Power Converters and Inverters',
      'Industrial Automation',
      'PLC and SCADA Systems',
      'Electrical Machine Design',
      'Power Device Modeling and Simulation',
      'Research Methodology and Thesis',
    ],
    requirements: [
      'Bachelor\'s degree in Electrical/Electronics Engineering (minimum 2nd Class Upper)',
      'Strong background in electronics and circuit theory',
      'For PhD: Master\'s degree in relevant field',
      'Knowledge of control systems preferred',
      'Two academic/professional references',
    ],
    careerPaths: [
      'Power Electronics Engineer',
      'Industrial Automation Engineer',
      'Control Systems Engineer',
      'Drive Systems Specialist',
      'R&D Engineer',
      'Applications Engineer',
      'University Lecturer/Researcher',
      'Technical Consultant',
    ],
    fee: '₦400,000 per session',
  },
  'control-instrumentation-engineering': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Control and Instrumentation Engineering',
    level: 'M.Eng/M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time / Part-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'Comprehensive program in control systems design, instrumentation, and process automation for industrial and energy applications.',
    objectives: [
      'Design advanced control systems for complex processes',
      'Master instrumentation and measurement techniques',
      'Develop automation solutions for industrial applications',
      'Understand modern control theory and applications',
      'Conduct innovative research in control engineering',
    ],
    curriculum: [
      'Advanced Control Systems Theory',
      'Digital Control Systems',
      'Process Control and Automation',
      'Industrial Instrumentation',
      'Sensors and Transducers',
      'PLC Programming and Applications',
      'SCADA and DCS Systems',
      'Optimal and Robust Control',
      'Control System Design Project',
      'Thesis/Dissertation',
    ],
    requirements: [
      'Bachelor\'s degree in Electrical/Electronics Engineering',
      'Minimum 2nd Class Upper division',
      'Basic knowledge of control theory',
      'For PhD: Master\'s degree with research focus',
      'Programming skills advantageous',
    ],
    careerPaths: [
      'Control Systems Engineer',
      'Instrumentation Engineer',
      'Process Control Engineer',
      'Automation Engineer',
      'Systems Integration Engineer',
      'Plant Engineer',
      'Research Scientist',
      'Control Systems Consultant',
    ],
    fee: '₦400,000 per session',
  },
  'energy-policy-regulation-management': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Energy Policy, Regulation and Management',
    level: 'M.Eng/M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time / Part-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'Interdisciplinary program focusing on energy economics, policy formulation, regulatory frameworks, and strategic management of energy systems.',
    objectives: [
      'Understand energy economics and market structures',
      'Analyze and formulate energy policies',
      'Navigate energy regulatory frameworks',
      'Develop energy management strategies',
      'Conduct policy research and analysis',
    ],
    curriculum: [
      'Energy Economics and Markets',
      'Energy Policy Analysis',
      'Regulatory Frameworks in Energy Sector',
      'Strategic Energy Management',
      'Energy Law and Governance',
      'Sustainable Development and Energy',
      'Energy Project Management',
      'Energy Finance and Investment',
      'Policy Research Methods',
      'Research Thesis/Dissertation',
    ],
    requirements: [
      'Bachelor\'s degree in Engineering, Economics, Management, or related field',
      'Minimum 2nd Class Upper division',
      'Interest in policy and management',
      'For PhD: Master\'s degree with policy/management focus',
      'Professional experience advantageous',
    ],
    careerPaths: [
      'Energy Policy Analyst',
      'Regulatory Affairs Specialist',
      'Energy Economist',
      'Energy Project Manager',
      'Energy Consultant',
      'Government Energy Advisor',
      'International Development Specialist',
      'University Faculty',
    ],
    fee: '₦380,000 per session',
  },
  'energy-design-product-development': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Energy Design & Product Development',
    level: 'M.Sc & PhD',
    duration: '18-24 Months (Masters) / 3-5 Years (PhD)',
    studyMode: 'Full-time',
    color: 'from-green-500 to-emerald-500',
    overview: 'Innovative program combining engineering design principles with product development for energy systems and devices.',
    objectives: [
      'Master energy system design methodologies',
      'Develop innovative energy products',
      'Apply design thinking to energy challenges',
      'Prototype and test energy devices',
      'Commercialize energy innovations',
    ],
    curriculum: [
      'Energy Systems Design',
      'Product Development Process',
      'CAD/CAM for Energy Systems',
      'Prototyping and Testing',
      'Energy Device Design',
      'Innovation and Entrepreneurship',
      'Intellectual Property in Energy',
      'Design Optimization',
      'Capstone Design Project',
      'Thesis/Dissertation',
    ],
    requirements: [
      'Bachelor\'s degree in Engineering',
      'Strong design and analytical skills',
      'CAD software experience preferred',
      'Creative and innovative mindset',
    ],
    careerPaths: [
      'Energy Product Designer',
      'R&D Engineer',
      'Innovation Manager',
      'Product Development Engineer',
      'Energy Entrepreneur',
      'Design Consultant',
      'Technical Project Manager',
    ],
    fee: '₦400,000 per session',
  },
  'management-technology-innovation': {
    programSlug: 'ace-sped-graduate-programs',
    programTitle: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    title: 'Management of Technology and Innovation (MoTI)',
    level: 'Post Graduate Diploma / M.Sc',
    duration: '12 Months (PGD) / 18-24 Months (M.Sc)',
    studyMode: 'Part-time / Executive',
    color: 'from-green-500 to-emerald-500',
    overview: 'Executive program for professionals seeking to lead technology-driven organizations and manage innovation processes effectively.',
    objectives: [
      'Lead technology-driven change in organizations',
      'Manage innovation and R&D processes',
      'Make strategic technology decisions',
      'Foster innovation culture',
      'Bridge technical and business domains',
    ],
    curriculum: [
      'Technology Strategy and Planning',
      'Innovation Management',
      'Research and Development Management',
      'Project Management for Technology',
      'Technology Entrepreneurship',
      'Digital Transformation',
      'Intellectual Property Management',
      'Technology Assessment',
      'Leadership and Change Management',
      'Capstone Project/Thesis',
    ],
    requirements: [
      'Bachelor\'s degree in any field (minimum 2nd Class Lower)',
      'Minimum 2 years work experience',
      'Management or leadership experience preferred',
      'No technical background required',
    ],
    careerPaths: [
      'Technology Manager',
      'Innovation Director',
      'R&D Manager',
      'Chief Technology Officer',
      'Technology Consultant',
      'Product Manager',
      'Business Development Manager',
      'Technology Entrepreneur',
    ],
    fee: '₦350,000 per session',
  },
  // IVET-HUB Courses
  'full-stack-web-development': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Full Stack Web Development',
    level: 'Certificate',
    duration: '6 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Comprehensive training in modern web development covering both frontend and backend technologies. Learn to build complete web applications from scratch.',
    objectives: [
      'Master HTML, CSS, and JavaScript fundamentals',
      'Learn React.js for frontend development',
      'Build backend APIs with Node.js and Express',
      'Work with databases (MongoDB, PostgreSQL)',
      'Deploy applications to production',
    ],
    curriculum: [
      'HTML5 & CSS3 Fundamentals',
      'JavaScript ES6+',
      'React.js & Next.js',
      'Node.js & Express.js',
      'Database Design (SQL & NoSQL)',
      'RESTful API Development',
      'Authentication & Security',
      'Version Control with Git',
      'Deployment & DevOps Basics',
      'Capstone Project',
    ],
    requirements: [
      'Basic computer literacy',
      'Secondary school certificate',
      'Personal laptop',
      'No prior programming experience required',
    ],
    careerPaths: [
      'Full Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'Web Application Developer',
      'Freelance Web Developer',
      'Software Engineer',
    ],
    fee: '₦150,000',
  },
  'data-analysis-visualization': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Data Analysis & Visualization',
    level: 'Certificate',
    duration: '4 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Learn to analyze data, extract insights, and create compelling visualizations. Master tools like Excel, Python, SQL, and Tableau.',
    objectives: [
      'Analyze and interpret complex datasets',
      'Create insightful data visualizations',
      'Use Python for data analysis',
      'Query databases with SQL',
      'Build interactive dashboards',
    ],
    curriculum: [
      'Data Analysis Fundamentals',
      'Excel for Data Analysis',
      'Python Programming for Data',
      'Pandas & NumPy Libraries',
      'SQL Database Queries',
      'Data Visualization with Matplotlib & Seaborn',
      'Tableau & Power BI',
      'Statistical Analysis',
      'Final Project',
    ],
    requirements: [
      'Basic computer skills',
      'Interest in working with data',
      'Personal laptop',
      'No programming experience required',
    ],
    careerPaths: [
      'Data Analyst',
      'Business Analyst',
      'Data Visualization Specialist',
      'Market Research Analyst',
      'Operations Analyst',
      'Reporting Analyst',
    ],
    fee: '₦100,000',
  },
  'cyber-security-fundamentals': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Cyber Security Fundamentals',
    level: 'Certificate',
    duration: '5 Months',
    studyMode: 'Full-time / Part-time',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Comprehensive cybersecurity training covering network security, ethical hacking, risk management, and security best practices.',
    objectives: [
      'Understand cybersecurity principles and threats',
      'Implement security measures and protocols',
      'Conduct security assessments and audits',
      'Respond to security incidents',
      'Develop security awareness',
    ],
    curriculum: [
      'Introduction to Cybersecurity',
      'Network Security Fundamentals',
      'Ethical Hacking Basics',
      'Security Tools & Technologies',
      'Risk Assessment & Management',
      'Cryptography Essentials',
      'Security Policies & Compliance',
      'Incident Response',
      'Hands-on Labs & Projects',
    ],
    requirements: [
      'Basic networking knowledge',
      'Computer literacy',
      'Interest in information security',
    ],
    careerPaths: [
      'Cyber Security Analyst',
      'Security Administrator',
      'Network Security Engineer',
      'IT Security Specialist',
      'Security Consultant',
    ],
    fee: '₦120,000',
  },
  'database-management': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Database Management',
    level: 'Certificate',
    duration: '3 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Master database design, implementation, and management. Learn to work with both SQL and NoSQL databases, optimize queries, ensure data integrity, and manage database systems effectively.',
    objectives: [
      'Understand database fundamentals and design principles',
      'Master SQL for data manipulation and querying',
      'Design and normalize database schemas',
      'Work with both relational and NoSQL databases',
      'Implement database security and backup strategies',
      'Optimize database performance',
      'Manage database administration tasks',
    ],
    curriculum: [
      'Introduction to Databases',
      'Database Design & Normalization',
      'SQL Fundamentals (SELECT, INSERT, UPDATE, DELETE)',
      'Advanced SQL (Joins, Subqueries, Views)',
      'Stored Procedures & Functions',
      'Database Indexing & Optimization',
      'NoSQL Databases (MongoDB, Redis)',
      'Database Security & Access Control',
      'Backup & Recovery Strategies',
      'Database Administration',
      'Data Migration & Integration',
      'Capstone Project',
    ],
    requirements: [
      'Basic computer literacy',
      'Understanding of data structures helpful',
      'Logical thinking and problem-solving skills',
      'Personal laptop',
      'No prior database experience required',
    ],
    careerPaths: [
      'Database Administrator',
      'Database Developer',
      'Data Analyst',
      'Backend Developer',
      'Database Designer',
      'Data Engineer',
      'Business Intelligence Analyst',
      'Database Consultant',
    ],
    fee: '₦110,000',
  },
  'devops-engineering': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'DevOps Engineering',
    level: 'Certificate',
    duration: '4 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Master the art of DevOps engineering and learn to automate, deploy, and manage modern software infrastructure. Gain expertise in CI/CD pipelines, containerization, cloud platforms, and infrastructure as code.',
    objectives: [
      'Understand DevOps principles and practices',
      'Master containerization with Docker and Kubernetes',
      'Build and manage CI/CD pipelines',
      'Deploy applications to cloud platforms (AWS, Azure, GCP)',
      'Implement Infrastructure as Code (IaC)',
      'Monitor and maintain production systems',
      'Automate deployment and scaling processes',
    ],
    curriculum: [
      'Introduction to DevOps',
      'Linux Fundamentals & Shell Scripting',
      'Version Control with Git & GitHub',
      'Docker & Containerization',
      'Kubernetes Orchestration',
      'CI/CD Pipelines (Jenkins, GitHub Actions, GitLab CI)',
      'Infrastructure as Code (Terraform, Ansible)',
      'Cloud Platforms (AWS/Azure/GCP)',
      'Monitoring & Logging (Prometheus, Grafana, ELK Stack)',
      'Security in DevOps (DevSecOps)',
      'Microservices Architecture',
      'Capstone Project',
    ],
    requirements: [
      'Basic knowledge of Linux/Unix systems',
      'Understanding of software development lifecycle',
      'Familiarity with command line interface',
      'Basic programming knowledge (helpful but not required)',
      'Personal laptop with virtualization support',
    ],
    careerPaths: [
      'DevOps Engineer',
      'Site Reliability Engineer (SRE)',
      'Cloud Engineer',
      'Platform Engineer',
      'Infrastructure Engineer',
      'CI/CD Engineer',
      'Automation Engineer',
      'DevOps Consultant',
    ],
    fee: '₦130,000',
  },
  'cloud-computing': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Cloud Computing',
    level: 'Certificate',
    duration: '4 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Learn to design, deploy, and manage cloud infrastructure on major cloud platforms. Master cloud services, architecture patterns, and best practices for scalable and secure cloud solutions.',
    objectives: [
      'Understand cloud computing fundamentals and service models',
      'Master major cloud platforms (AWS, Azure, GCP)',
      'Design scalable and resilient cloud architectures',
      'Implement cloud security and compliance',
      'Deploy and manage cloud applications',
      'Optimize cloud costs and performance',
      'Automate cloud infrastructure management',
    ],
    curriculum: [
      'Introduction to Cloud Computing',
      'Cloud Service Models (IaaS, PaaS, SaaS)',
      'Amazon Web Services (AWS) Fundamentals',
      'Microsoft Azure Essentials',
      'Google Cloud Platform (GCP) Basics',
      'Cloud Architecture & Design Patterns',
      'Cloud Storage & Database Services',
      'Cloud Networking & Security',
      'Serverless Computing (Lambda, Functions)',
      'Container Services (ECS, AKS, GKE)',
      'Cloud Monitoring & Management',
      'Cost Optimization & Migration Strategies',
      'Capstone Project',
    ],
    requirements: [
      'Basic computer literacy',
      'Understanding of networking fundamentals helpful',
      'Familiarity with operating systems',
      'Personal laptop with internet connection',
      'No prior cloud experience required',
    ],
    careerPaths: [
      'Cloud Architect',
      'Cloud Engineer',
      'Cloud Solutions Architect',
      'DevOps Engineer',
      'Cloud Administrator',
      'Cloud Security Specialist',
      'Cloud Consultant',
      'Infrastructure Engineer',
    ],
    fee: '₦125,000',
  },
  'mobile-app-development': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Mobile App Development',
    level: 'Certificate',
    duration: '6 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Learn to build native and cross-platform mobile applications for iOS and Android. Master mobile development frameworks, UI/UX design for mobile, and app deployment to app stores.',
    objectives: [
      'Build native mobile apps for iOS and Android',
      'Master cross-platform development with React Native or Flutter',
      'Design intuitive mobile user interfaces',
      'Implement mobile app features and functionality',
      'Integrate APIs and backend services',
      'Deploy apps to App Store and Google Play',
      'Understand mobile app architecture and best practices',
    ],
    curriculum: [
      'Introduction to Mobile Development',
      'Mobile App Design Principles',
      'JavaScript/TypeScript Fundamentals',
      'React Native Development',
      'Flutter Development (Alternative)',
      'Mobile UI/UX Design',
      'State Management in Mobile Apps',
      'API Integration & Backend Services',
      'Mobile App Navigation',
      'Data Storage & Caching',
      'Push Notifications',
      'App Testing & Debugging',
      'App Store Deployment (iOS & Android)',
      'App Monetization Strategies',
      'Capstone Project',
    ],
    requirements: [
      'Basic programming knowledge helpful',
      'Understanding of JavaScript or any programming language',
      'Personal laptop (Mac recommended for iOS development)',
      'Interest in mobile technology',
      'No prior mobile development experience required',
    ],
    careerPaths: [
      'Mobile App Developer',
      'iOS Developer',
      'Android Developer',
      'React Native Developer',
      'Flutter Developer',
      'Mobile UI/UX Designer',
      'Mobile App Architect',
      'Freelance Mobile Developer',
    ],
    fee: '₦150,000',
  },
  'digital-marketing': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Digital Marketing',
    level: 'Certificate',
    duration: '3 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Master the art and science of digital marketing. Learn to create effective marketing campaigns, analyze performance, and grow businesses through various digital channels including social media, SEO, email marketing, and paid advertising.',
    objectives: [
      'Develop comprehensive digital marketing strategies',
      'Master social media marketing across all platforms',
      'Understand SEO and content marketing',
      'Create and manage paid advertising campaigns',
      'Analyze marketing performance with analytics tools',
      'Build and nurture email marketing campaigns',
      'Understand digital marketing trends and best practices',
    ],
    curriculum: [
      'Introduction to Digital Marketing',
      'Digital Marketing Strategy & Planning',
      'Search Engine Optimization (SEO)',
      'Search Engine Marketing (SEM) & Google Ads',
      'Social Media Marketing (Facebook, Instagram, Twitter, LinkedIn)',
      'Content Marketing & Blogging',
      'Email Marketing & Automation',
      'Pay-Per-Click (PPC) Advertising',
      'Social Media Advertising',
      'Web Analytics (Google Analytics)',
      'Conversion Rate Optimization (CRO)',
      'Influencer Marketing',
      'E-commerce Marketing',
      'Marketing Automation Tools',
      'Digital Marketing Campaign Management',
      'Capstone Project',
    ],
    requirements: [
      'Basic computer literacy',
      'Access to social media accounts',
      'Interest in marketing and business',
      'Creative thinking skills',
      'Personal laptop or smartphone',
      'No prior marketing experience required',
    ],
    careerPaths: [
      'Digital Marketing Specialist',
      'Social Media Manager',
      'SEO Specialist',
      'Content Marketer',
      'PPC Specialist',
      'Email Marketing Manager',
      'Digital Marketing Manager',
      'Marketing Analyst',
      'Freelance Digital Marketer',
    ],
    fee: '₦100,000',
  },
  'ui-ux-design': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'UI/UX Design',
    level: 'Certificate',
    duration: '4 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Learn to create beautiful, intuitive, and user-friendly digital interfaces. Master user experience design principles, wireframing, prototyping, and design tools to build engaging web and mobile applications.',
    objectives: [
      'Understand user-centered design principles',
      'Master UI/UX design tools (Figma, Adobe XD, Sketch)',
      'Create wireframes and prototypes',
      'Conduct user research and usability testing',
      'Design responsive web and mobile interfaces',
      'Apply design systems and style guides',
      'Build a professional design portfolio',
    ],
    curriculum: [
      'Introduction to UI/UX Design',
      'Design Thinking & User-Centered Design',
      'User Research & Personas',
      'Information Architecture',
      'Wireframing & Low-Fidelity Prototyping',
      'Visual Design Principles',
      'Color Theory & Typography',
      'UI Design Tools (Figma, Adobe XD)',
      'High-Fidelity Prototyping',
      'Interaction Design & Micro-interactions',
      'Responsive Design & Mobile-First Approach',
      'Design Systems & Component Libraries',
      'Usability Testing & User Feedback',
      'Accessibility in Design',
      'Portfolio Development',
      'Capstone Project',
    ],
    requirements: [
      'Basic computer literacy',
      'Creative mindset and attention to detail',
      'Interest in design and user experience',
      'Personal laptop (Mac or Windows)',
      'No prior design experience required',
    ],
    careerPaths: [
      'UI/UX Designer',
      'User Experience Designer',
      'User Interface Designer',
      'Product Designer',
      'Interaction Designer',
      'Visual Designer',
      'UX Researcher',
      'Design Consultant',
      'Freelance UI/UX Designer',
    ],
    fee: '₦120,000',
  },
  'ai-machine-learning': {
    programSlug: 'ace-sped-ivet-hub',
    programTitle: 'IVET-HUB',
    title: 'Artificial Intelligence & Machine Learning',
    level: 'Certificate',
    duration: '5 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Dive into the world of artificial intelligence and machine learning. Learn to build intelligent systems, create predictive models, and develop AI applications using Python, TensorFlow, and other cutting-edge tools.',
    objectives: [
      'Understand AI and machine learning fundamentals',
      'Master Python for data science and ML',
      'Build and train machine learning models',
      'Work with deep learning frameworks (TensorFlow, PyTorch)',
      'Implement neural networks and deep learning',
      'Apply ML to real-world problems',
      'Deploy ML models to production',
    ],
    curriculum: [
      'Introduction to AI & Machine Learning',
      'Python Programming for Data Science',
      'Data Preprocessing & Feature Engineering',
      'Mathematics for Machine Learning',
      'Supervised Learning Algorithms',
      'Unsupervised Learning & Clustering',
      'Neural Networks Fundamentals',
      'Deep Learning with TensorFlow/Keras',
      'Convolutional Neural Networks (CNN)',
      'Recurrent Neural Networks (RNN) & LSTM',
      'Natural Language Processing (NLP)',
      'Computer Vision',
      'Model Evaluation & Validation',
      'ML Model Deployment',
      'AI Ethics & Responsible AI',
      'Capstone Project',
    ],
    requirements: [
      'Basic programming knowledge (Python preferred)',
      'Understanding of mathematics (algebra, statistics)',
      'Logical thinking and problem-solving skills',
      'Personal laptop with good processing power',
      'Interest in data science and AI',
    ],
    careerPaths: [
      'Machine Learning Engineer',
      'AI Engineer',
      'Data Scientist',
      'ML Researcher',
      'Deep Learning Engineer',
      'NLP Engineer',
      'Computer Vision Engineer',
      'AI Consultant',
      'Data Analyst',
    ],
    fee: '₦140,000',
  },
  // C-Code Studio Courses
  'professional-video-editing': {
    programSlug: 'ace-sped-c-code-studio',
    programTitle: 'C-Code Studio',
    title: 'Professional Video Editing (Adobe Premiere Pro)',
    level: 'Certificate',
    duration: '3 Months',
    studyMode: 'Full-time / Part-time',
    color: 'from-purple-500 to-pink-500',
    overview: 'Master professional video editing using Adobe Premiere Pro. Learn industry-standard techniques for creating engaging video content.',
    objectives: [
      'Master Adobe Premiere Pro interface and tools',
      'Edit videos professionally with transitions and effects',
      'Work with audio mixing and color grading',
      'Create professional video projects',
      'Build a portfolio of video work',
    ],
    curriculum: [
      'Introduction to Video Editing',
      'Adobe Premiere Pro Interface',
      'Cutting and Trimming Techniques',
      'Transitions and Effects',
      'Audio Editing and Mixing',
      'Color Correction and Grading',
      'Motion Graphics Basics',
      'Export Settings and Formats',
      'Portfolio Projects',
    ],
    requirements: [
      'Basic computer skills',
      'Creative mindset',
      'Personal laptop (recommended)',
      'No prior editing experience required',
    ],
    careerPaths: [
      'Video Editor',
      'Content Creator',
      'YouTube Editor',
      'Freelance Video Editor',
      'Post-Production Specialist',
    ],
    fee: '₦80,000',
  },
  'podcast-production': {
    programSlug: 'ace-sped-c-code-studio',
    programTitle: 'C-Code Studio',
    title: 'Podcast Production & Audio Engineering',
    level: 'Certificate',
    duration: '2 Months',
    studyMode: 'Full-time / Part-time',
    color: 'from-purple-500 to-pink-500',
    overview: 'Learn the art and science of podcast production from recording to publishing. Master audio engineering fundamentals.',
    objectives: [
      'Set up professional podcast recording',
      'Master audio editing and mixing',
      'Learn podcast hosting and distribution',
      'Develop engaging podcast content',
      'Build a podcast brand',
    ],
    curriculum: [
      'Podcast Basics & Planning',
      'Audio Equipment Setup',
      'Recording Techniques',
      'Audio Editing with Audacity/Adobe Audition',
      'Sound Design and Mixing',
      'Podcast Hosting Platforms',
      'Distribution & RSS Feeds',
      'Podcast Marketing',
      'Final Podcast Project',
    ],
    requirements: [
      'Interest in audio and podcasting',
      'Basic computer skills',
      'Creativity and storytelling ability',
    ],
    careerPaths: [
      'Podcast Producer',
      'Audio Engineer',
      'Content Creator',
      'Radio Producer',
      'Voice-over Artist',
    ],
    fee: '₦60,000',
  },
  'social-media-content-creation': {
    programSlug: 'ace-sped-c-code-studio',
    programTitle: 'C-Code Studio',
    title: 'Social Media Content Creation',
    level: 'Certificate',
    duration: '2 Months',
    studyMode: 'Full-time / Part-time / Online',
    color: 'from-purple-500 to-pink-500',
    overview: 'Master the art of creating engaging social media content that captivates audiences and drives engagement. Learn to create professional content for Instagram, Facebook, Twitter, LinkedIn, TikTok, and more.',
    objectives: [
      'Create compelling visual content for social media platforms',
      'Master content planning and scheduling strategies',
      'Understand platform-specific best practices',
      'Develop engaging copywriting skills',
      'Build a strong personal or brand social media presence',
      'Analyze content performance and optimize strategies',
    ],
    curriculum: [
      'Introduction to Social Media Marketing',
      'Content Strategy & Planning',
      'Visual Content Creation (Canva, Adobe Express)',
      'Video Content Creation for Social Media',
      'Copywriting for Social Media',
      'Platform-Specific Content (Instagram, Facebook, Twitter, LinkedIn, TikTok)',
      'Storytelling & Brand Voice',
      'Content Calendar & Scheduling Tools',
      'Analytics & Performance Measurement',
      'Community Management & Engagement',
      'Influencer Marketing Basics',
      'Final Portfolio Project',
    ],
    requirements: [
      'Basic computer skills',
      'Access to social media accounts',
      'Creative mindset',
      'Interest in digital marketing and content creation',
      'Personal laptop or smartphone',
    ],
    careerPaths: [
      'Social Media Manager',
      'Content Creator',
      'Social Media Strategist',
      'Digital Marketing Specialist',
      'Community Manager',
      'Influencer',
      'Brand Ambassador',
      'Freelance Content Creator',
    ],
    fee: '₦70,000',
  },
  'motion-graphics-animation': {
    programSlug: 'ace-sped-c-code-studio',
    programTitle: 'C-Code Studio',
    title: 'Motion Graphics & Animation',
    level: 'Certificate',
    duration: '4 Months',
    studyMode: 'Full-time / Part-time / Workshop',
    color: 'from-purple-500 to-pink-500',
    overview: 'Learn to create stunning motion graphics and animations for video, web, and digital media. Master industry-standard tools like After Effects, Cinema 4D, and Blender to bring your creative visions to life.',
    objectives: [
      'Master Adobe After Effects for motion graphics',
      'Create dynamic animations and visual effects',
      'Work with 3D animation software',
      'Design animated graphics for video and web',
      'Understand animation principles and timing',
      'Produce professional motion graphics projects',
      'Build a portfolio of animated work',
    ],
    curriculum: [
      'Introduction to Motion Graphics',
      'Animation Principles & Timing',
      'Adobe After Effects Fundamentals',
      'Keyframe Animation & Easing',
      'Text Animation & Typography in Motion',
      'Shape Layers & Vector Graphics',
      'Effects & Presets',
      '3D Animation Basics',
      'Cinema 4D Lite / Blender Introduction',
      'Compositing & Layering',
      'Color Grading & Visual Effects',
      'Motion Tracking & Stabilization',
      'Character Animation Basics',
      'Export Settings & Formats',
      'Portfolio Development',
      'Capstone Project',
    ],
    requirements: [
      'Basic computer skills',
      'Creative mindset and visual design sense',
      'Interest in animation and motion graphics',
      'Personal laptop (Mac or Windows)',
      'Adobe Creative Suite access (recommended)',
      'No prior animation experience required',
    ],
    careerPaths: [
      'Motion Graphics Designer',
      'Animator',
      'Video Editor',
      'Visual Effects Artist',
      'Motion Designer',
      'Broadcast Designer',
      'UI/UX Animator',
      'Freelance Motion Graphics Artist',
      'Content Creator',
    ],
    fee: '₦90,000',
  },
  'photography-photo-editing': {
    programSlug: 'ace-sped-c-code-studio',
    programTitle: 'C-Code Studio',
    title: 'Photography & Photo Editing',
    level: 'Certificate',
    duration: '3 Months',
    studyMode: 'Full-time / Part-time / Workshop',
    color: 'from-purple-500 to-pink-500',
    overview: 'Master the art of photography and professional photo editing. Learn camera techniques, composition, lighting, and post-processing using Adobe Lightroom and Photoshop to create stunning visual content.',
    objectives: [
      'Master camera settings and photography fundamentals',
      'Understand composition, lighting, and exposure',
      'Learn professional photo editing techniques',
      'Work with Adobe Lightroom and Photoshop',
      'Develop a unique photographic style',
      'Create professional photo portfolios',
      'Apply photography skills to various genres',
    ],
    curriculum: [
      'Introduction to Photography',
      'Camera Settings & Manual Mode',
      'Composition & Framing Techniques',
      'Understanding Light & Exposure',
      'Portrait Photography',
      'Landscape & Nature Photography',
      'Event & Wedding Photography',
      'Product Photography',
      'Adobe Lightroom Fundamentals',
      'Photo Editing & Retouching',
      'Adobe Photoshop Essentials',
      'Color Correction & Grading',
      'Advanced Retouching Techniques',
      'Photo Organization & Workflow',
      'Portfolio Development',
      'Capstone Project',
    ],
    requirements: [
      'Digital camera (DSLR or mirrorless recommended)',
      'Basic computer skills',
      'Creative eye and passion for photography',
      'Personal laptop',
      'Adobe Creative Suite access (recommended)',
      'No prior photography experience required',
    ],
    careerPaths: [
      'Professional Photographer',
      'Portrait Photographer',
      'Wedding Photographer',
      'Product Photographer',
      'Photo Editor',
      'Retoucher',
      'Freelance Photographer',
      'Content Creator',
      'Photojournalist',
    ],
    fee: '₦85,000',
  },
};

export default function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string; courseSlug: string }> 
}) {
  const router = useRouter();
  const { slug, courseSlug } = React.use(params);
  const course = coursesData[courseSlug];

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <button
            onClick={() => router.push(`/programs/${slug}`)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Program
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <button onClick={() => router.push('/')} className="hover:text-green-600 transition-colors">
              Home
            </button>
            <span className="mx-2">/</span>
            <button onClick={() => router.push('/programs')} className="hover:text-green-600 transition-colors">
              Programs
            </button>
            <span className="mx-2">/</span>
            <button onClick={() => router.push(`/programs/${course.programSlug}`)} className="hover:text-green-600 transition-colors">
              {course.programTitle}
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 to-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              {course.level}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-xl text-white/90 leading-relaxed">{course.overview}</p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-0 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Duration</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{course.duration}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Study Mode</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{course.studyMode}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">
                  <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Level</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{course.level}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg mr-4">
                  <TbCurrencyNaira className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Course Fee</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{course.fee}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Master the essential skills and knowledge to excel in this field
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {course.objectives.map((objective: string, index: number) => (
              <div key={index} className="flex items-start bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Course Curriculum
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive syllabus covering all essential topics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {course.curriculum.map((module: string, index: number) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-5 flex items-center hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg">
                  {index + 1}
                </div>
                <p className="text-gray-900 dark:text-white font-medium">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Career Paths */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-3">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Entry Requirements
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Prerequisites to enroll in this course
                </p>
              </div>
              <div className="space-y-4">
                {course.requirements.map((req: string, index: number) => (
                  <div key={index} className="flex items-start bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-4 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-3">
                    <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Career Opportunities
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Potential career paths after completing this course
                </p>
              </div>
              <div className="space-y-3">
                {course.careerPaths.map((career: string, index: number) => (
                  <div key={index} className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800">
                    <div className="bg-green-600 text-white rounded-lg p-2 mr-4">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-green-100">
              Join hundreds of students who have transformed their careers
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Investment</p>
                <div className="flex items-center justify-center md:justify-start">
                  <TbCurrencyNaira className="h-10 w-10 text-green-600 mr-2" />
                  <p className="text-5xl font-bold text-gray-900 dark:text-white">{course.fee.replace('₦', '')}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">One-time course fee</p>
              </div>
              
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Duration</p>
                <div className="flex items-center justify-center md:justify-start">
                  <Clock className="h-10 w-10 text-blue-600 mr-2" />
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{course.duration}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{course.studyMode}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/application')}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
              >
                <GraduationCap className="h-6 w-6 mr-2" />
                Apply Now
              </button>
              <button 
                onClick={() => router.push(`/programs/${course.programSlug}`)}
                className="flex-1 px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center"
              >
                <BookOpen className="h-6 w-6 mr-2" />
                View All Courses
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Rolling Admissions - Apply Anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


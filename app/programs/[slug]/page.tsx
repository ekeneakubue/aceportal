'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Check, GraduationCap, Clock, Users, BookOpen, 
  Globe, Award, DollarSign, Calendar, FileText, Microscope,
  Lightbulb, Briefcase
} from 'lucide-react';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';

// Program data - this should match the slugs in your home page
const programsData: Record<string, any> = {
  'ace-sped-graduate-programs': {
    title: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
    subtitle: 'Impactful Educational Research and Development Programs',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    heroImage: '/images/lab.jpg',
    description: 'ACE-SPED offers world-class graduate programs designed to produce researchers and professionals who will provide sustainable solutions to developmental challenges in the Sub-Saharan Africa region.',
    duration: '2-5 Years',
    studyMode: 'Full-time / Part-time',
    totalCourses: 9,
    thematicAreas: [
      'Renewable and New Energy Systems',
      'Power Engineering',
      'Sustainable Energy Materials Engineering',
      'Industrial Electronics and Power Devices',
      'Control and Instrumentation Engineering',
      'Energy Policy, Regulation and Management',
      'Energy Design, & Product Development',
      'Management of Technology and Innovation (MoTI)',
    ],
    programs: [
      {
        name: 'Renewable and New Energy Systems',
        duration: '18-24 Months',
        level: 'M.Eng/M.Sc & PhD',
        slug: 'renewable-new-energy-systems',
      },
      {
        name: 'Power Engineering',
        duration: '18-24 Months',
        level: 'M.Eng/M.Sc & PhD',
        slug: 'power-engineering',
      },
      {
        name: 'Sustainable Energy Materials Engineering',
        duration: '3-5 Years',
        level: 'M.Eng/M.Sc & PhD',
        slug: 'sustainable-energy-materials',
      },
      {
        name: 'Industrial Electronics and Power Devices',
        duration: '18-24 Months',
        level: 'M.Eng/M.Sc & PhD',
        slug: 'industrial-electronics-power-devices',
      },
      {
        name: 'Control and Instrumentation Engineering',
        duration: '18-24 Months',
        level: 'M.Eng/M.Sc & PhD',
        slug: 'control-instrumentation-engineering',
      },
      {
        name: 'Energy Policy, Regulation and Management',
        duration: '18-24 Months',
        level: 'M.Eng/M.Sc & PhD',
        slug: 'energy-policy-regulation-management',
      },
      {
        name: 'Energy Design, & Product Development',
        duration: '3-5 Years',
        level: 'M.Sc & PhD',
        slug: 'energy-design-product-development',
      },
      {
        name: 'Management of Technology and Innovation (MoTI)',
        duration: '3-5 Years',
        level: 'Post Graduate',
        slug: 'management-technology-innovation',
      },
    ],
    requirements: [
      'Bachelor\'s degree in relevant field with minimum 2nd Class Upper',
      'For PhD: Master\'s degree in relevant field',
      'Research proposal (for PhD applicants)',
      'Two academic/professional references',
      'English language proficiency',
    ],
    careerProspects: [
      'Energy Consultant',
      'Power Systems Engineer',
      'Renewable Energy Specialist',
      'Research Scientist',
      'University Lecturer/Professor',
      'Energy Policy Analyst',
    ],
    fee: '₦350,000 - ₦500,000 per session',
    applicationDeadline: 'December 31, 2025',
  },
  'ace-sped-ivet-hub': {
    title: 'ACE-SPED Innovation, Vocational & Entrepreneurship Training (IVET-HUB)',
    subtitle: 'Practical Skills for the Digital Age',
    icon: Microscope,
    color: 'from-blue-500 to-cyan-500',
    heroImage: '/images/lab.jpg',
    description: 'The IVET-HUB provides hands-on training in high-demand digital skills, preparing participants for successful careers in technology and innovation.',
    duration: '3-6 Months',
    studyMode: 'Full-time / Part-time / Online',
    totalCourses: 10,
    programs: [
      {
        name: 'Full Stack Web Development',
        duration: '6 Months',
        level: 'Certificate',
        slug: 'full-stack-web-development',
      },
      {
        name: 'Data Analysis & Visualization',
        duration: '4 Months',
        level: 'Certificate',
        slug: 'data-analysis-visualization',
      },
      {
        name: 'Cyber Security Fundamentals',
        duration: '5 Months',
        level: 'Certificate',
        slug: 'cyber-security-fundamentals',
      },
      {
        name: 'Mobile App Development',
        duration: '6 Months',
        level: 'Certificate',
        slug: 'mobile-app-development',
      },
      {
        name: 'Digital Marketing',
        duration: '3 Months',
        level: 'Certificate',
        slug: 'digital-marketing',
      },
      {
        name: 'UI/UX Design',
        duration: '4 Months',
        level: 'Certificate',
        slug: 'ui-ux-design',
      },
      {
        name: 'Cloud Computing',
        duration: '4 Months',
        level: 'Certificate',
        slug: 'cloud-computing',
      },
      {
        name: 'Artificial Intelligence & Machine Learning',
        duration: '5 Months',
        level: 'Certificate',
        slug: 'ai-machine-learning',
      },
      {
        name: 'Database Management',
        duration: '3 Months',
        level: 'Certificate',
        slug: 'database-management',
      },
      {
        name: 'DevOps Engineering',
        duration: '4 Months',
        level: 'Certificate',
        slug: 'devops-engineering',
      },
    ],
    requirements: [
      'Basic computer literacy',
      'Secondary school certificate (WAEC/NECO) or equivalent',
      'Interest in technology and innovation',
      'No prior programming experience required for beginner courses',
    ],
    careerProspects: [
      'Web Developer',
      'Data Analyst',
      'Cyber Security Analyst',
      'Mobile App Developer',
      'Digital Marketer',
      'UI/UX Designer',
      'DevOps Engineer',
      'Freelance Developer',
    ],
    fee: '₦50,000 - ₦150,000 per course',
    applicationDeadline: 'Rolling Admissions',
  },
  'ace-sped-c-code-studio': {
    title: 'ACE-SPED C-Code Studio',
    subtitle: 'Content Creation & Media Production Excellence',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
    heroImage: '/images/lab.jpg',
    description: 'C-Code Studio is your gateway to professional content creation, video production, and digital media. Learn from industry experts and build a portfolio that stands out.',
    duration: '2-4 Months',
    studyMode: 'Full-time / Part-time / Workshop',
    totalCourses: 5,
    programs: [
      {
        name: 'Professional Video Editing (Adobe Premiere Pro)',
        duration: '3 Months',
        level: 'Certificate',
        slug: 'professional-video-editing',
      },
      {
        name: 'Podcast Production & Audio Engineering',
        duration: '2 Months',
        level: 'Certificate',
        slug: 'podcast-production',
      },
      {
        name: 'Social Media Content Creation',
        duration: '2 Months',
        level: 'Certificate',
        slug: 'social-media-content-creation',
      },
      {
        name: 'Motion Graphics & Animation',
        duration: '4 Months',
        level: 'Certificate',
        slug: 'motion-graphics-animation',
      },
      {
        name: 'Photography & Photo Editing',
        duration: '3 Months',
        level: 'Certificate',
        slug: 'photography-photo-editing',
      },
    ],
    requirements: [
      'Basic computer skills',
      'Creative mindset and passion for content creation',
      'Personal laptop (recommended)',
      'No prior experience required',
    ],
    careerProspects: [
      'Video Editor',
      'Content Creator',
      'Podcast Producer',
      'Social Media Manager',
      'Motion Graphics Designer',
      'Photographer/Videographer',
      'YouTube Content Creator',
      'Freelance Media Producer',
    ],
    fee: '₦40,000 - ₦100,000 per course',
    applicationDeadline: 'Rolling Admissions',
  },
  'sales-repairs-gadgets': {
    title: 'Sales & Repairs of Gadgets',
    subtitle: 'Technical Service & Support Center',
    icon: Briefcase,
    color: 'from-orange-500 to-red-500',
    heroImage: '/images/lab.jpg',
    description: 'Our technical service center provides professional repair services for laptops, printers, and computer accessories. We also offer training programs for aspiring technicians.',
    duration: 'Service-based / 3-6 Months Training',
    studyMode: 'In-person / Hands-on Training',
    totalCourses: 4,
    services: [
      'Laptop Repair & Maintenance',
      'Printer Repair & Servicing',
      'Computer Hardware Upgrade',
      'Software Installation & Troubleshooting',
      'Data Recovery Services',
      'Network Setup & Configuration',
      'Sales of Computer Accessories',
      'Sales of Laptops & Printers',
    ],
    programs: [
      {
        name: 'Computer Hardware Repair Technician',
        duration: '4 Months',
        level: 'Certificate',
        slug: 'computer-hardware-repair',
      },
      {
        name: 'Laptop & Mobile Device Repair',
        duration: '3 Months',
        level: 'Certificate',
        slug: 'laptop-mobile-repair',
      },
      {
        name: 'Printer Repair & Maintenance',
        duration: '2 Months',
        level: 'Certificate',
        slug: 'printer-repair-maintenance',
      },
      {
        name: 'Computer Networking Basics',
        duration: '3 Months',
        level: 'Certificate',
        slug: 'computer-networking-basics',
      },
    ],
    requirements: [
      'Basic technical aptitude',
      'Secondary school certificate',
      'Interest in hardware and electronics',
      'Willingness to learn hands-on skills',
    ],
    careerProspects: [
      'Computer Repair Technician',
      'Laptop Service Engineer',
      'IT Support Specialist',
      'Hardware Entrepreneur',
      'Technical Service Provider',
      'Electronics Repair Specialist',
    ],
    fee: '₦30,000 - ₦80,000 per course',
    applicationDeadline: 'Rolling Admissions',
  },
};

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = React.use(params);
  const program = programsData[slug];

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Program Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = program.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/programs')}
            className="flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Programs
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex p-4 bg-gradient-to-br ${program.color} rounded-xl mb-6`}>
                <Icon className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-green-100 mb-6">{program.subtitle}</p>
              <p className="text-lg text-white/90 mb-8">{program.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push('/application')}
                  className="px-8 py-4 bg-white text-green-800 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center"
                >
                  Apply Now
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-800 transition-all">
                  Download Brochure
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="h-8 w-8 mb-3" />
                <p className="text-sm text-green-100 mb-1">Duration</p>
                <p className="text-lg font-semibold">{program.duration}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="h-8 w-8 mb-3" />
                <p className="text-sm text-green-100 mb-1">Study Mode</p>
                <p className="text-lg font-semibold">{program.studyMode}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="h-8 w-8 mb-3" />
                <p className="text-sm text-green-100 mb-1">Programs</p>
                <p className="text-lg font-semibold">{program.totalCourses}+</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Calendar className="h-8 w-8 mb-3" />
                <p className="text-sm text-green-100 mb-1">Deadline</p>
                <p className="text-sm font-semibold">{program.applicationDeadline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs/Courses Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {program.programs ? 'Available Courses' : 'Services Offered'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.programs && program.programs.map((course: any, index: number) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${program.color} rounded-lg`}>
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{course.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex items-center mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </p>
                <button
                  onClick={() => router.push(`/programs/${slug}/courses/${course.slug}`)}
                  className="mt-auto w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center"
                >
                  View Details
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </button>
              </div>
            ))}
            {program.services && program.services.map((service: string, index: number) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-3">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thematic Areas (for graduate programs) */}
      {program.thematicAreas && (
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Thematic Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.thematicAreas.map((area: string, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                    <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{area}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Entry Requirements
              </h2>
              <ul className="space-y-4">
                {program.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Career Prospects
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {program.careerProspects.map((career: string, index: number) => (
                  <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <Award className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees & Application */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Take the first step towards your future. Apply now and join a community of learners and innovators.
                </p>
                <div className="flex items-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Program Fee</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{program.fee}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Application Deadline</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{program.applicationDeadline}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => router.push('/application')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Apply for This Program
                </button>
                <button className="w-full px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                  Request More Information
                </button>
                <button className="w-full px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  Contact Admissions Office
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


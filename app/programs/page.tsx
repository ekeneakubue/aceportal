'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, Microscope, Lightbulb, Briefcase, ArrowRight, ArrowLeft,
  Users, Clock, Award, BookOpen
} from 'lucide-react';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';

export default function ProgramsPage() {
  const router = useRouter();

  const programs = [
    {
      icon: GraduationCap,      
      title: 'ACE-SPED M.Eng/M.Sc and Ph.D. Programs',
      description: 'ACE-SPED Impactful Educational Research and Development Programs',
      courses: 9,
      color: 'from-green-500 to-emerald-500',
      slug: 'ace-sped-graduate-programs',
      duration: '2-5 Years',
      studyMode: 'Full-time / Part-time',
    },
    {
      icon: Microscope,
      title: 'ACE-SPED Innovation, Vocational & Entrepreneurship Training (IVET-HUB)',
      description: 'Web Development | Data Analysis | Cyber Security and More...',
      courses: 10,
      color: 'from-blue-500 to-cyan-500',
      slug: 'ace-sped-ivet-hub',
      duration: '3-6 Months',
      studyMode: 'Full-time / Part-time / Online',
    },    
    {
      icon: Lightbulb,
      title: 'ACE-SPED C-Code Studio',
      description: 'Video Editing | Podcast Production | Content Creation and More...',
      courses: 5,
      color: 'from-purple-500 to-pink-500',
      slug: 'ace-sped-c-code-studio',
      duration: '2-4 Months',
      studyMode: 'Full-time / Part-time / Workshop',
    },
    {
      icon: Briefcase,      
      title: 'Sales & Repairs of Gadgets',
      description: 'Laptop Repair | Printers Repair | Computer Accessories and More...',
      courses: 4,
      color: 'from-orange-500 to-red-500',
      slug: 'sales-repairs-gadgets',
      duration: '3-6 Months',
      studyMode: 'In-person / Hands-on',
    },    
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Discover world-class programs designed to prepare you for success in sustainable power and energy development
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-0 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">28+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1000+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">95%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Programs Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${program.color} rounded-xl mb-6 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {program.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {program.duration}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        {program.studyMode}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {program.courses} courses available
                      </span>
                      <button 
                        onClick={() => router.push(`/programs/${program.slug}`)}
                        className="text-green-600 dark:text-green-400 font-semibold flex items-center group-hover:gap-2 transition-all"
                      >
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-green-100 mb-12 leading-relaxed">
            Join ACE-SPED and be part of sustainable solutions for Africa's developmental challenges
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => router.push('/application')}
              className="px-8 py-4 bg-white text-green-800 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center group"
            >
              Apply for Admission
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-green-800 transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  GraduationCap,
  BookOpen,
  Loader2,
  Check,
  ChevronRight,
  Calendar,
  FileText,
  Briefcase,
  Award,
} from 'lucide-react';
import { TbCurrencyNaira } from 'react-icons/tb';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';

// Helper function to get level display name
const getLevelDisplayName = (level: string) => {
  const levelMap: { [key: string]: string } = {
    'CERTIFICATE': 'Certificate',
    'DIPLOMA': 'Diploma',
    'BACHELORS': 'Bachelors',
    'MASTERS': 'Masters',
    'PHD': 'Ph.D',
    'MASTERS_AND_PHD': 'Ph.D/M.Sc.',
  };
  return levelMap[level] || level.replace(/_/g, ' ');
};

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProgram(slug);
    }
  }, [slug]);

  const fetchProgram = async (programSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/programs/${programSlug}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch program: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProgram(data.program);
      } else {
        setError('Program not found');
      }
    } catch (err) {
      console.error('Error fetching program:', err);
      setError(err instanceof Error ? err.message : 'Error loading program');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">Loading program...</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Program Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'The program you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/programs')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Programs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse JSON arrays
  const objectives = Array.isArray(program.objectives) ? program.objectives : [];
  const curriculum = Array.isArray(program.curriculum) ? program.curriculum : [];
  const requirements = Array.isArray(program.requirements) ? program.requirements : [];
  const careerPaths = Array.isArray(program.careerPaths) ? program.careerPaths : [];

  // Build breadcrumb
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
  ];
  
  if (program.service) {
    breadcrumbItems.push({ 
      label: program.service.title.toUpperCase().replace(/-/g, ' '), 
      href: `/services/${program.service.slug}` 
    });
  }
  
  breadcrumbItems.push({ label: program.title, href: `#` });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Breadcrumb */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 to-emerald-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Level Badge */}
            {program.level && (
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-green-100 rounded-full text-sm font-semibold mb-4">
                {getLevelDisplayName(program.level)}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-50 mb-4 sm:mb-6 break-words">
              {program.title}
            </h1>

            {/* Description */}
            {program.overview && (
              <p className="text-base sm:text-lg md:text-xl text-gray-100/90 mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto">
                {program.overview}
              </p>
            )}

            {/* Sub text */}
            <p className="text-xs sm:text-sm text-green-100/80">
              Designed to equip you with practical, job-ready skills for today&apos;s digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-0 -mt-8 sm:-mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Duration
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words leading-tight">
                    {program.duration || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Study Mode
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words leading-tight">
                    {program.studyMode || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Level
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words leading-tight">
                    {program.level ? getLevelDisplayName(program.level) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="flex items-start">
                <div className="bg-orange-100 dark:bg-orange-900 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                  <TbCurrencyNaira className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Course Fee
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words leading-tight">
                    {program.fee || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      {objectives.length > 0 && (
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What You&apos;ll Learn
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Master the essential skills and knowledge to excel in this field.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {objectives.map((objective: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 sm:p-6 border border-green-100 dark:border-green-800"
                >
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course Curriculum Section */}
      {curriculum.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Course Curriculum
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Comprehensive syllabus covering all essential topics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {curriculum.map((module: string, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 flex items-center hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 font-bold text-sm sm:text-lg">
                    {index + 1}
                  </div>
                  <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium break-words">
                    {module}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Entry Requirements & Career Opportunities */}
      {(requirements.length > 0 || careerPaths.length > 0) && (
        <section
          className={`py-12 sm:py-16 lg:py-20 ${
            curriculum.length > 0
              ? 'bg-white dark:bg-gray-900'
              : objectives.length > 0
              ? 'bg-gray-50 dark:bg-gray-950'
              : 'bg-white dark:bg-gray-900'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
              {requirements.length > 0 && (
                <div className="flex flex-col">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                        Entry Requirements
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                      Prerequisites to enroll in this course
                    </p>
                  </div>
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    {requirements.map((requirement: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 sm:mr-4 flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words flex-1">
                          {requirement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {careerPaths.length > 0 && (
                <div className="flex flex-col">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                        Career Opportunities
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                      Potential career paths after completing this course
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3 flex-1">
                    {careerPaths.map((path: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 sm:p-5 border border-green-100 dark:border-green-800"
                      >
                        <div className="bg-green-600 text-white rounded-lg p-1.5 sm:p-2 mr-3 sm:mr-4 flex-shrink-0">
                          <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold break-words flex-1">
                          {path}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Ready to Start Your Journey CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-900 to-emerald-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 break-words">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg sm:text-xl text-green-100 break-words">
              Join hundreds of students who have transformed their careers
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start mb-8 sm:mb-10">
              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Investment
                </p>
                <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                  <TbCurrencyNaira className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 flex-shrink-0" />
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white break-words leading-none">
                    {program.fee ? program.fee.replace(/₦/g, '').trim() : 'N/A'}
                  </p>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  One-time course fee
                </p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Duration
                </p>
                <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                  <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 flex-shrink-0" />
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words leading-none">
                    {program.duration || 'N/A'}
                  </p>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 break-words">
                  {program.studyMode || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const isIvetHubProgram =
                    slug.toLowerCase().includes('ivet') ||
                    program.service?.slug?.toLowerCase().includes('ivet');
                  if (isIvetHubProgram) {
                    router.push('/skill-application');
                  } else {
                    const searchParams = new URLSearchParams();
                    if (program.service?.slug) {
                      searchParams.set('service', program.service.slug);
                    }
                    if (slug) {
                      searchParams.set('program', slug);
                    }
                    const queryString = searchParams.toString();
                    const targetUrl = queryString
                      ? `/application?${queryString}`
                      : '/application';
                    router.push(targetUrl);
                  }
                }}
                className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
              >
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                Apply Now
              </button>
              {program.service && (
                <button
                  onClick={() => router.push(`/services/${program.service.slug}`)}
                  className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center"
                >
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  View All Courses
                </button>
              )}
            </div>

            <div className="mt-4 sm:mt-6 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
              <span className="break-words">Rolling Admissions - Apply Anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

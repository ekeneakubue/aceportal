'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Check, GraduationCap, Clock, FileText, 
  Microscope, Briefcase, Loader2
} from 'lucide-react';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';

// Icon mapping function
const getIconComponent = (iconName: string | null) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'GraduationCap': GraduationCap,
    'Microscope': Microscope,
    'Briefcase': Briefcase,
    'BookOpen': FileText,
  };
  return iconMap[iconName || ''] || GraduationCap;
};

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

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchService(slug);
    }
  }, [slug]);

  const fetchService = async (serviceSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/services/${serviceSlug}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch service: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Ensure programs are available
        const serviceData = data.service;
        const programs = serviceData.programs || serviceData.courses || [];
        console.log(`Loaded ${programs.length} programs for service: ${serviceData.title}`);
        
        setService({
          ...serviceData,
          programs: programs,
          courses: programs, // Ensure courses is also set
        });
      } else {
        setError(data.message || 'Service not found');
      }
    } catch (err) {
      console.error('Error fetching service:', err);
      setError(err instanceof Error ? err.message : 'Error loading service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        
        {/* Hero Section Skeleton */}
        <section className="relative bg-gradient-to-br from-green-900 to-emerald-900 text-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
              <p className="text-white/90 text-lg mb-2">Loading service...</p>
              <p className="text-white/70 text-sm">Please wait while we fetch the service details</p>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'The service you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/services')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Services
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = getIconComponent(service.icon);
  const color = service.color || 'from-green-500 to-emerald-500';
  const thematicAreas = Array.isArray(service.thematicAreas) ? service.thematicAreas : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 to-emerald-900 text-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/services')}
            className="flex items-center text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors text-sm sm:text-base w-fit"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Back to Services</span>
          </button>

          <div className="w-full">
            <div className="max-w-6xl">
              <div className={`inline-flex p-3 sm:p-4 bg-gradient-to-br ${color} rounded-xl mb-4 sm:mb-6 flex-shrink-0`}>
                <Icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-5 break-words leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{service.title}</h1>
              {service.subtitle && (
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-green-100 mb-4 sm:mb-6 break-words leading-relaxed">{service.subtitle}</p>
              )}
              <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 lg:mb-10 break-words leading-relaxed max-w-5xl">{service.description}</p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold flex items-center justify-center sm:justify-start flex-shrink-0 w-full sm:w-auto">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mr-2 sm:mr-3 whitespace-nowrap">{service.programs?.length || service.totalCourses || 0}</span>
                  <span className="text-xs sm:text-sm lg:text-base text-white/90 whitespace-nowrap">Programs Available</span>
                </div>
                <button className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-xs sm:text-sm lg:text-base hover:bg-white hover:text-green-800 transition-all whitespace-nowrap flex-shrink-0 w-full sm:w-auto text-center">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thematic Areas Section (if available) */}
      {thematicAreas.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 lg:mb-10">
              Thematic Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {thematicAreas.map((area: string, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words leading-relaxed">{area}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Available Programs Section */}
      {((service.programs && service.programs.length > 0) || (service.courses && service.courses.length > 0)) && (
        <section className={`py-12 sm:py-16 lg:py-20 ${thematicAreas.length > 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 lg:mb-10">
              Available Programs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {(service.programs || service.courses || []).map((course: any) => (
                <div key={course.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div className={`p-2 sm:p-3 bg-gradient-to-br ${color} rounded-lg flex-shrink-0`}>
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {course.level && (
                      <span className="px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium break-words ml-auto flex-shrink-0">
                        {getLevelDisplayName(course.level)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 break-words leading-tight line-clamp-3 min-h-[3.5rem]">{course.title}</h3>
                  {course.duration && (
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center mb-2 break-words">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{course.duration}</span>
                    </p>
                  )}
                  {course.studyMode && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 break-words line-clamp-2">
                      {course.studyMode}
                    </p>
                  )}
                  <button
                    onClick={() => router.push(`/programs/${course.slug}`)}
                    className="mt-auto w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center"
                  >
                    View Details
                    <ArrowLeft className="ml-2 h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!service.programs || service.programs.length === 0) && (!service.courses || service.courses.length === 0) && (
        <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">No programs available for this service yet.</p>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 mt-2">Check back soon for new program offerings.</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}


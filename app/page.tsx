"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from './components/navbar/page';
import Footer from './components/footer/page';
import Image1 from '@/public/images/news/1.jpg';
import Image2 from '@/public/images/news/2.jpg';
import Image3 from '@/public/images/news/3.jpg';
import Image4 from '@/public/images/lab.jpg';
import Acesped from '@/public/images/acesped.png';
import Slide2 from '@/public/images/caroucel/slide2.png';
import Slide4 from '@/public/images/caroucel/slide4.png';
import { 
  BookOpen, Users, Award, TrendingUp, Microscope, Globe, 
  Lightbulb, Target, ArrowRight, Calendar, MapPin, Clock,
  GraduationCap, Briefcase, Zap, Heart, Star, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Research & Innovation",
      subtitle: "Leading the Way",
      description: "Discover groundbreaking research opportunities in sustainable energy, technology, and sciences. Be part of solutions that matter.",
      image: Slide4,
    },   
    {
      title: "Research & Innovation",
      subtitle: "Leading the Way",
      description: "Discover groundbreaking research opportunities in sustainable energy, technology, and sciences. Be part of solutions that matter.",
      image: Slide2,
    },           
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const programs = [
    {
      icon: GraduationCap,
      title: 'Engineering & Technology',
      description: 'Cutting-edge programs in Computer Science, AI, Robotics, and Sustainable Energy.',
      courses: 45,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Microscope,
      title: 'Health Sciences',
      description: 'Comprehensive medical, nursing, and public health programs with clinical excellence.',
      courses: 38,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Briefcase,
      title: 'Business & Management',
      description: 'MBA, Finance, Marketing, and Entrepreneurship programs for future leaders.',
      courses: 52,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Arts & Humanities',
      description: 'Creative arts, literature, philosophy, and cultural studies programs.',
      courses: 41,
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: GraduationCap,
      title: 'Engineering & Technology',
      description: 'Cutting-edge programs in Computer Science, AI, Robotics, and Sustainable Energy.',
      courses: 45,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Microscope,
      title: 'Health Sciences',
      description: 'Comprehensive medical, nursing, and public health programs with clinical excellence.',
      courses: 38,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Briefcase,
      title: 'Business & Management',
      description: 'MBA, Finance, Marketing, and Entrepreneurship programs for future leaders.',
      courses: 52,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Arts & Humanities',
      description: 'Creative arts, literature, philosophy, and cultural studies programs.',
      courses: 41,
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: GraduationCap,
      title: 'Engineering & Technology',
      description: 'Cutting-edge programs in Computer Science, AI, Robotics, and Sustainable Energy.',
      courses: 45,
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const stats = [
    { label: 'Students Enrolled', value: '25,000+', icon: Users },
    { label: 'Expert Faculty', value: '1,200+', icon: Award },
    { label: 'Research Projects', value: '500+', icon: Microscope },
    { label: 'Global Partners', value: '150+', icon: Globe },
  ];

  const news = [
    {
      category: 'Research',
      title: 'Nigerian Army Pays Courtesy Visit To ACE-SPED, Seeks Collaboration',
      excerpt: 'The Nigerian Army paid a courtesy visit to the Africa Center of Excellence for Sustainable Power and Energy Development (ACE-SPED)...',
      date: 'May 11, 2025',
      image: Image1,
    },
    {
      category: 'Achievement',
      title: 'ACE-SPED Showcases Innovations at NUC Launch of ACE Alliance and Compendium',
      excerpt: 'The Africa Center of Excellence for Sustainable Power and Energy Development (ACE-SPED), University of Nigeria, Nsukka, Participat...',
      date: 'April 11, 2025',
      image: Image2,
    },
    {
      category: 'Achievement',
      title: 'UNN secures over $3 million grant to boost ICT development',
      excerpt: 'The Acting Vice-Chancellor of the University of Nigeria, Prof. Oguejiofor T. Ujam on Tuesday, July 1, 2025, received an award letter confirming over $3 million ICT-Development Grant...',
      date: 'July 1, 2025',
      image: Image3,
    },
  ];

  const features = [
    {
      icon: Target,
      title: 'Career-Focused',
      description: '95% employment rate within 6 months of graduation',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Partnership with 150+ universities across 60 countries',
    },
    {
      icon: Zap,
      title: 'Innovation Hub',
      description: 'State-of-the-art labs and research facilities',
    },
    {
      icon: Heart,
      title: 'Student Support',
      description: '24/7 counseling, mentorship, and wellness programs',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section Slider */}
      <section className="relative min-h-150 flex justify-center items-end overflow-hidden">
        {/* Slider Wrapper */}
        <div className="absolute inset-0 opacity-100">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/40 via-gray-900/40 to-gray-900/40"></div>
              </div>

              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relativ max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          <div className="transition-all duration-500">
            <div className="flex  sm:flex-row gap-4">
              <button 
                onClick={() => router.push('/application')}
                className="px-8 py-4 bg-white text-green-800 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center group"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-green-800 transition-all duration-200">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110 border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110 border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-white w-8 h-2'
                  : 'bg-white/40 hover:bg-white/60 w-2 h-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* AboutUs Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-full">
              <div className="aspect-square bg-linear-to-br from-green-900 to-emerald-900 rounded-3xl shadow-2xl flex items-center justify-center">
                <Image src={Acesped} alt="Research" fill className="object-cover" />
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About ACE-SPED
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Africa Centre of Excellence for Sustainable Power and Energy Development (ACE-SPED), 
                is a World Bank assisted project domiciled at the University of Nigeria, Nsukka. 
                The Centre was conceptualized to proffer sustainable solutions to some developmental 
                challenges peculiar to the Sub-Saharan Africa region.
              </p>
              <p>The fundamental aim of ACE-SPED is to carry out impactful educational research development and training activities in five major thematic areas:</p>
              <ul className="space-y-4 mb-8 mt-4">
                {[
                  'Electric power systems development',
                  'Renewable energy, waste-to-energy and energy conservation',
                  'Energy resources assessment and forecasting',
                  'Sustainable energy materials',
                  'Energy policy, regulation and management',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="h-2 w-2 bg-green-800 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center group">
                More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover world-class programs designed to prepare you for success in your chosen field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${program.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-4 bg-linear-to-br ${program.color} rounded-xl mb-6 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {program.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {program.courses} courses available
                      </span>
                      <button className="text-green-600 dark:text-green-400 font-semibold flex items-center group-hover:gap-2 transition-all">
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

      {/* Why Choose Us Section */}
      <section className="py-24 bg-linear-to-br from-green-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              WHY CHOOSE ACE-SPED?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              We provide more than education - we provide a launchpad for your dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Icon className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-green-100">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Leading Research & Innovation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our research centers are at the forefront of scientific discovery and technological innovation. With over $100M in annual research funding, we're solving real-world problems and shaping the future.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'AI & Machine Learning Research Center',
                  'Sustainable Energy Laboratory',
                  'Biotechnology Innovation Hub',
                  'Quantum Computing Research',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="h-2 w-2 bg-green-800 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center group">
                Explore Research
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-green-900 to-emerald-900 rounded-3xl shadow-2xl flex items-center justify-center">
                <Image src={Image4} alt="Research" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section id="news" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest News & Events
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest happenings, achievements, and upcoming events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-video bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-8xl">
                  {typeof item.image === 'string' ? (
                    item.image
                  ) : (
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                    <span className="ml-auto text-sm text-gray-500 dark:text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item.excerpt}
                  </p>
                  <button className="text-green-600 dark:text-green-400 font-semibold flex items-center group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-green-900 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-green-100 mb-12 leading-relaxed">
            Join thousands of students who have transformed their lives at AcademiaHub. Your future starts here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => router.push('/application')}
              className="px-8 py-4 bg-white text-green-800 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center group"
            >
              Apply for Admission
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-green-800 transition-all duration-200">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

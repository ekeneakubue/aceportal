'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, BookOpen, Users, Search, ChevronDown } from 'lucide-react';
import { FaGraduationCap, FaUsers, FaSearch, FaBookReader, FaRegNewspaper } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isMobileAdmissionOpen, setIsMobileAdmissionOpen] = useState(false);
  
  // Refs for timeout management
  const admissionTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const coursesTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup timeouts on unmount
      if (admissionTimeoutRef.current) clearTimeout(admissionTimeoutRef.current);
      if (coursesTimeoutRef.current) clearTimeout(coursesTimeoutRef.current);
    };
  }, []);

  // Handle admission dropdown with delay
  const handleAdmissionMouseEnter = () => {
    if (admissionTimeoutRef.current) {
      clearTimeout(admissionTimeoutRef.current);
    }
    setIsAdmissionOpen(true);
  };

  const handleAdmissionMouseLeave = () => {
    admissionTimeoutRef.current = setTimeout(() => {
      setIsAdmissionOpen(false);
    }, 200); // 200ms delay before closing
  };

  // Handle courses dropdown with delay
  const handleCoursesMouseEnter = () => {
    if (coursesTimeoutRef.current) {
      clearTimeout(coursesTimeoutRef.current);
    }
    setIsCoursesOpen(true);
  };

  const handleCoursesMouseLeave = () => {
    coursesTimeoutRef.current = setTimeout(() => {
      setIsCoursesOpen(false);
    }, 200); // 200ms delay before closing
  };

  const navLinksBeforeAdmission = [
    { name: 'About', href: '#about', icon: FaUsers },
  ];

  const navLinksAfterCourses = [
    { name: 'Research', href: '#research', icon: FaSearch },
    { name: 'News', href: '#news', icon: FaRegNewspaper },    
  ];

  const admissionDropdown = [
    { name: 'Application', href: '/application', onClick: () => router.push('/application') },
    { name: 'Admission List', href: '#admission-list', onClick: null },
  ];

  const coursesDropdown = [
    { name: 'All Programs', href: '/programs', onClick: () => router.push('/programs') },
    { name: 'A to Z Courses', href: '/courses/all', onClick: () => router.push('/courses/all') },
  ];

  return (
    <nav
      className={`sticky py-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
                <img src="/images/ace-logo.png" alt="Ace-Sped" className="h-20 w-20 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-linear-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">
                ACE-SPED
              </span>
              <span className="text-xs text-gray-600">
                Africa Centre Of Excellence For Sustainable Power And Energy Development
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Links Before Admission */}
            {navLinksBeforeAdmission.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
            
            {/* Admission Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleAdmissionMouseEnter}
              onMouseLeave={handleAdmissionMouseLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group">
                <FaGraduationCap className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Admission</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isAdmissionOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isAdmissionOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {admissionDropdown.map((item) => (
                    item.onClick ? (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          if (admissionTimeoutRef.current) {
                            clearTimeout(admissionTimeoutRef.current);
                          }
                          setIsAdmissionOpen(false);
                        }}
                        className="w-full text-left block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
            
            {/* Courses Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group">
                <FaBookReader className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Courses</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isCoursesOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {coursesDropdown.map((item) => (
                    item.onClick ? (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          if (coursesTimeoutRef.current) {
                            clearTimeout(coursesTimeoutRef.current);
                          }
                          setIsCoursesOpen(false);
                        }}
                        className="w-full text-left block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Links After Courses */}
            {navLinksAfterCourses.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}

            <button className="ml-4 px-6 py-2.5 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
              Portal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-6 space-y-3">
              {/* Links Before Admission */}
              {navLinksBeforeAdmission.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                );
              })}
              
              {/* Mobile Admission Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileAdmissionOpen(!isMobileAdmissionOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FaGraduationCap className="h-5 w-5" />
                    <span className="font-medium">Admission</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileAdmissionOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileAdmissionOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {admissionDropdown.map((item) => (
                      item.onClick ? (
                        <button
                          key={item.name}
                          onClick={() => {
                            item.onClick();
                            setIsOpen(false);
                            setIsMobileAdmissionOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setIsOpen(false);
                            setIsMobileAdmissionOpen(false);
                          }}
                        >
                          {item.name}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile Courses Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FaBookReader className="h-5 w-5" />
                    <span className="font-medium">Courses</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileCoursesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileCoursesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {coursesDropdown.map((item) => (
                      item.onClick ? (
                        <button
                          key={item.name}
                          onClick={() => {
                            item.onClick();
                            setIsOpen(false);
                            setIsMobileCoursesOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setIsOpen(false);
                            setIsMobileCoursesOpen(false);
                          }}
                        >
                          {item.name}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Links After Courses */}
              {navLinksAfterCourses.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                );
              })}

              <button 
                onClick={() => router.push('/application')}
                className="w-full px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

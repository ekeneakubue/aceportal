'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';
import Image1 from '@/public/images/news/1.jpg';
import Image2 from '@/public/images/news/2.jpg';
import Image3 from '@/public/images/news/3.jpg';
import { 
  Calendar, ArrowRight, Search, Filter, 
  Clock, User, Tag, ChevronRight
} from 'lucide-react';

const newsData = [
  {
    id: 1,
    category: 'Research',
    title: 'Nigerian Army Pays Courtesy Visit To ACE-SPED, Seeks Collaboration',
    excerpt: 'The Nigerian Army paid a courtesy visit to the Africa Center of Excellence for Sustainable Power and Energy Development (ACE-SPED) to explore potential collaboration opportunities in research and development.',
    date: 'May 11, 2025',
    author: 'ACE-SPED Media',
    image: Image1,
    content: 'The Nigerian Army paid a courtesy visit to the Africa Center of Excellence for Sustainable Power and Energy Development (ACE-SPED), University of Nigeria, Nsukka, to explore potential collaboration opportunities in research and development. The visit, led by senior military officials, focused on areas of mutual interest including renewable energy solutions, power systems development, and sustainable energy technologies that could benefit military operations and infrastructure.',
    tags: ['Research', 'Collaboration', 'Military', 'Energy'],
  },
  {
    id: 2,
    category: 'Achievement',
    title: 'ACE-SPED Showcases Innovations at NUC Launch of ACE Alliance and Compendium',
    excerpt: 'The Africa Center of Excellence for Sustainable Power and Energy Development (ACE-SPED), University of Nigeria, Nsukka, participated in the National Universities Commission (NUC) launch of the ACE Alliance and Compendium.',
    date: 'April 11, 2025',
    author: 'ACE-SPED Media',
    image: Image2,
    content: 'The Africa Center of Excellence for Sustainable Power and Energy Development (ACE-SPED), University of Nigeria, Nsukka, participated in the National Universities Commission (NUC) launch of the ACE Alliance and Compendium. The event showcased various innovations and research achievements from centers of excellence across Nigeria. ACE-SPED presented its groundbreaking work in sustainable power and energy development, highlighting its contributions to addressing energy challenges in Sub-Saharan Africa.',
    tags: ['Achievement', 'Innovation', 'NUC', 'Excellence'],
  },
  {
    id: 3,
    category: 'Achievement',
    title: 'UNN secures over $3 million grant to boost ICT development',
    excerpt: 'The Acting Vice-Chancellor of the University of Nigeria, Prof. Oguejiofor T. Ujam on Tuesday, July 1, 2025, received an award letter confirming over $3 million ICT-Development Grant.',
    date: 'July 1, 2025',
    author: 'UNN Media',
    image: Image3,
    content: 'The Acting Vice-Chancellor of the University of Nigeria, Prof. Oguejiofor T. Ujam on Tuesday, July 1, 2025, received an award letter confirming over $3 million ICT-Development Grant. This significant funding will be used to enhance information and communication technology infrastructure, support research initiatives, and improve digital learning capabilities across the university. The grant represents a major milestone in the university\'s commitment to technological advancement and innovation.',
    tags: ['Grant', 'ICT', 'Development', 'Funding'],
  },
  {
    id: 4,
    category: 'Research',
    title: 'New Research Initiative on Renewable Energy Solutions',
    excerpt: 'ACE-SPED launches a groundbreaking research initiative focused on developing innovative renewable energy solutions for rural communities in Sub-Saharan Africa.',
    date: 'June 15, 2025',
    author: 'Research Team',
    image: Image1,
    content: 'ACE-SPED has launched a groundbreaking research initiative focused on developing innovative renewable energy solutions for rural communities in Sub-Saharan Africa. The project aims to address energy poverty by creating affordable, sustainable power systems that can be deployed in remote areas. This initiative brings together researchers, engineers, and community stakeholders to develop practical solutions that will improve the quality of life for millions of people.',
    tags: ['Research', 'Renewable Energy', 'Rural Development', 'Sustainability'],
  },
  {
    id: 5,
    category: 'Event',
    title: 'Annual Energy Summit 2025: Call for Papers',
    excerpt: 'ACE-SPED announces the Annual Energy Summit 2025, inviting researchers, practitioners, and policymakers to submit papers on sustainable energy development.',
    date: 'May 20, 2025',
    author: 'Events Committee',
    image: Image2,
    content: 'ACE-SPED is pleased to announce the Annual Energy Summit 2025, a premier conference bringing together researchers, practitioners, and policymakers to discuss the latest developments in sustainable energy. The summit will feature keynote presentations, panel discussions, and technical sessions covering topics such as renewable energy technologies, energy policy, power systems, and sustainable development. We invite submissions of research papers, case studies, and innovative solutions.',
    tags: ['Event', 'Conference', 'Call for Papers', 'Energy Summit'],
  },
  {
    id: 6,
    category: 'Achievement',
    title: 'ACE-SPED Students Win International Research Competition',
    excerpt: 'Students from ACE-SPED have won first place in an international research competition for their innovative work on energy storage systems.',
    date: 'April 5, 2025',
    author: 'Student Affairs',
    image: Image3,
    content: 'Students from ACE-SPED have achieved a remarkable victory by winning first place in an international research competition for their innovative work on energy storage systems. The winning project demonstrated a novel approach to improving battery efficiency and sustainability, addressing critical challenges in renewable energy storage. This achievement highlights the quality of research and innovation at ACE-SPED and showcases the talent of our students on the global stage.',
    tags: ['Achievement', 'Students', 'Competition', 'Innovation'],
  },
];

const categories = ['All', 'Research', 'Achievement', 'Event'];

export default function NewsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<typeof newsData[0] | null>(null);

  const filteredNews = newsData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (selectedNews) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        
        {/* News Detail */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setSelectedNews(null)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 mb-8 transition-colors"
          >
            <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
            Back to News
          </button>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative aspect-video">
              <Image 
                src={selectedNews.image} 
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-medium">
                  {selectedNews.category}
                </span>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {selectedNews.date}
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <User className="h-4 w-4 mr-2" />
                  {selectedNews.author}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedNews.title}
              </h1>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {selectedNews.excerpt}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedNews.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedNews.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                  Back to All News
                </button>
              </div>
            </div>
          </article>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Events
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Stay updated with the latest happenings, achievements, and upcoming events at ACE-SPED
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No news found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNews(item)}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-green-500 to-emerald-600">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                      <span className="ml-auto text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:gap-2 transition-all">
                      Read More
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}


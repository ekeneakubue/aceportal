"use client"

import React from 'react';
import CenterLeaderLayout from '../components/CenterLeaderLayout';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <CenterLeaderLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate and view system reports
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This feature is coming soon
          </p>
        </div>
      </div>
    </CenterLeaderLayout>
  );
}


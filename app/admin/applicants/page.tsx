"use client"

import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { UserPlus } from 'lucide-react';

export default function ManageApplicantsPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Applicants
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage applicant submissions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Applicants
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This feature is coming soon
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}


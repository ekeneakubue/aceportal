"use client"

import React, { useState, useEffect } from 'react';
import CenterLeaderLayout from '../components/CenterLeaderLayout';
import { Shield, Users, Edit, Check, X, Plus, Trash2, Save, AlertCircle } from 'lucide-react';

interface RolePermissions {
  role: string;
  displayName: string;
  userCount: number;
  permissions: string[];
  description: string;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<RolePermissions[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RolePermissions | null>(null);
  const [editForm, setEditForm] = useState({
    displayName: '',
    description: '',
    permissions: [] as string[],
  });
  const [newPermission, setNewPermission] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    // Initialize roles with permissions (excluding SUPER_ADMIN)
    const rolesData: RolePermissions[] = [
      {
        role: 'Center_Leader',
        displayName: 'Center Leader',
        userCount: 0,
        permissions: [
            'Full system access',
            'Manage center staff',
            'View reports',
            'Approve programs',
            'Access analytics',
            'Manage departments',
        ],
        description: 'Oversees center operations and manages staff within their department.',
      },
      {
        role: 'Deputy_Center_Leader',
        displayName: 'Deputy Center Leader',
        userCount: 0,
        permissions: [
          'Assist center leader',
          'View reports',
          'Manage programs',
          'Access analytics',
        ],
        description: 'Assists the center leader in managing operations and programs.',
      },
      {
        role: 'Academic_Program_Coordinator',
        displayName: 'Academic Program Coordinator',
        userCount: 0,
        permissions: [
          'Manage academic programs',
          'Coordinate courses',
          'View student records',
          'Generate reports',
        ],
        description: 'Coordinates academic programs and manages course offerings.',
      },
      {
        role: 'Head_of_Program',
        displayName: 'Head of Program',
        userCount: 0,
        permissions: [
          'Manage program content',
          'Review applications',
          'Assign lecturers',
          'Access program data',
        ],
        description: 'Leads specific academic programs and manages program-level operations.',
      },
      {
        role: 'Lecturer',
        displayName: 'Lecturer',
        userCount: 0,
        permissions: [
          'Manage courses',
          'Grade students',
          'Upload materials',
          'View student list',
        ],
        description: 'Teaches courses and manages student assessments.',
      },
      {
        role: 'Student',
        displayName: 'Student',
        userCount: 0,
        permissions: [
          'View courses',
          'Submit assignments',
          'View grades',
          'Access materials',
        ],
        description: 'Enrolled student with access to learning materials and courses.',
      },
      {
        role: 'Applicant',
        displayName: 'Applicant',
        userCount: 0,
        permissions: [
          'Submit application',
          'View application status',
          'Upload documents',
        ],
        description: 'Prospective student applying for admission.',
      },
      {
        role: 'Staff',
        displayName: 'Staff',
        userCount: 0,
        permissions: [
          'Access staff portal',
          'View schedules',
          'Manage assigned tasks',
        ],
        description: 'Administrative and support staff member.',
      },
      {
        role: 'Head_of_Finance',
        displayName: 'Head of Finance',
        userCount: 0,
        permissions: [
          'Manage finances',
          'View transactions',
          'Generate financial reports',
          'Approve payments',
        ],
        description: 'Manages financial operations and budgets.',
      },
      {
        role: 'Industrial_Liaison_Officer',
        displayName: 'Industrial Liaison Officer',
        userCount: 0,
        permissions: [
          'Manage partnerships',
          'Coordinate internships',
          'View industry contacts',
          'Generate partnership reports',
        ],
        description: 'Manages industry partnerships and internship programs.',
      },
    ];

    setRoles(rolesData);
    fetchUserCounts();
  }, []);

  const fetchUserCounts = async () => {
    try {
      const response = await fetch('/api/center-leader/stats');
      const data = await response.json();
      if (data.success) {
        // Update role counts based on stats
        setRoles(prev => prev.map(role => {
          let count = 0;
          switch (role.role) {
            case 'Center_Leader':
              count = data.stats.centerLeaders || 0;
              break;
            case 'Lecturer':
              count = data.stats.lecturers || 0;
              break;
            case 'Student':
              count = data.stats.students || 0;
              break;
            case 'Applicant':
              count = data.stats.applicants || 0;
              break;
          }
          return { ...role, userCount: count };
        }));
      }
    } catch (error) {
      console.error('Error fetching user counts:', error);
    }
  };

  const openEditModal = (role: RolePermissions) => {
    setSelectedRole(role);
    setEditForm({
      displayName: role.displayName,
      description: role.description,
      permissions: [...role.permissions],
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedRole(null);
    setNewPermission('');
  };

  const addPermission = () => {
    if (newPermission.trim() && !editForm.permissions.includes(newPermission.trim())) {
      setEditForm({
        ...editForm,
        permissions: [...editForm.permissions, newPermission.trim()],
      });
      setNewPermission('');
    }
  };

  const removePermission = (permission: string) => {
    setEditForm({
      ...editForm,
      permissions: editForm.permissions.filter(p => p !== permission),
    });
  };

  const handleSaveRole = () => {
    if (!selectedRole) return;

    // Update the role in the state
    setRoles(prev => prev.map(role => 
      role.role === selectedRole.role
        ? {
            ...role,
            displayName: editForm.displayName,
            description: editForm.description,
            permissions: editForm.permissions,
          }
        : role
    ));

    showMessage('success', `${editForm.displayName} permissions updated successfully`);
    closeEditModal();
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <CenterLeaderLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Role Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage user roles and their permissions
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <Check className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage(null)}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {/* Role Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${
                    role.role.includes('Leader') || role.role.includes('Head')
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                      : role.role === 'Lecturer'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-gradient-to-br from-green-500 to-green-600'
                  }`}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {role.displayName}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{role.userCount} users</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(role)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit permissions"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {role.description}
              </p>

              {/* Permissions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Permissions & Capabilities
                </h4>
                <div className="space-y-2">
                  {role.permissions.map((permission, pIndex) => (
                    <div
                      key={pIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Badge */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {role.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                About Role Permissions
              </h3>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                Each role has specific permissions tailored to their responsibilities. 
                Role assignments can be changed through the User Management section. 
                Click the edit button on any role card to modify its permissions and capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Edit Role Modal */}
        {showEditModal && selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Role: {selectedRole.displayName}
                  </h2>
                  <button
                    onClick={closeEditModal}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSaveRole(); }} className="p-6">
                <div className="space-y-6">
                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  {/* Role ID (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role ID
                    </label>
                    <input
                      type="text"
                      value={selectedRole.role}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Role ID cannot be changed
                    </p>
                  </div>

                  {/* Permissions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Permissions & Capabilities
                    </label>
                    
                    {/* Add Permission Input */}
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newPermission}
                        onChange={(e) => setNewPermission(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPermission())}
                        placeholder="Add new permission..."
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={addPermission}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Permissions List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      {editForm.permissions.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                          No permissions added yet
                        </p>
                      ) : (
                        editForm.permissions.map((permission, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center flex-1">
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {permission}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removePermission(permission)}
                              className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* User Count Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800 dark:text-blue-300">
                        <p className="font-medium mb-1">
                          This role currently has {selectedRole.userCount} user(s)
                        </p>
                        <p className="text-xs">
                          Changes to permissions will affect all users with this role. Make sure you understand the implications before saving.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CenterLeaderLayout>
  );
}


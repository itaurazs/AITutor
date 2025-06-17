import React, { useState } from 'react';
import { X, Users, Mail, User, Eye, EyeOff, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import authService from '../services/authService';

interface ParentSignupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childEmail?: string;
}

export const ParentSignup: React.FC<ParentSignupProps> = ({
  isOpen,
  onClose,
  onSuccess,
  childEmail
}) => {
  const [formData, setFormData] = useState({
    parentEmail: '',
    parentName: '',
    password: '',
    confirmPassword: '',
    childEmails: childEmail ? [childEmail] : [''],
    relationship: 'parent'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleChildEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.childEmails];
    newEmails[index] = value;
    setFormData(prev => ({ ...prev, childEmails: newEmails }));
  };

  const addChildEmail = () => {
    setFormData(prev => ({
      ...prev,
      childEmails: [...prev.childEmails, '']
    }));
  };

  const removeChildEmail = (index: number) => {
    if (formData.childEmails.length > 1) {
      const newEmails = formData.childEmails.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, childEmails: newEmails }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.parentEmail || !formData.parentEmail.includes('@')) {
      setError('Please enter a valid parent email address');
      return false;
    }

    if (!formData.parentName.trim()) {
      setError('Please enter your name');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const validChildEmails = formData.childEmails.filter(email => 
      email.trim() && email.includes('@')
    );

    if (validChildEmails.length === 0) {
      setError('Please enter at least one valid child email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Create parent account
      await authService.signUp(
        formData.parentEmail,
        formData.password,
        formData.parentName
      );

      // Link children (this would be implemented in the auth service)
      const validChildEmails = formData.childEmails.filter(email => 
        email.trim() && email.includes('@')
      );

      // In a real implementation, this would send invitations to children
      // and create family links in the database
      console.log('Parent account created, linking children:', validChildEmails);

      onSuccess();
    } catch (error: any) {
      setError(error.message || 'Failed to create parent account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Parent Account Setup</h2>
              <p className="text-green-100 mt-1">Monitor your child's learning progress</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          )}

          {/* Benefits */}
          <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Parent Account Benefits:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Weekly progress reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Achievement notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Curriculum coverage tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Learning goal management</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Parent Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="parent@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="teacher">Teacher</option>
                  <option value="tutor">Tutor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Children Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Children's Email Addresses</h3>
                <button
                  type="button"
                  onClick={addChildEmail}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add Another Child</span>
                </button>
              </div>

              {formData.childEmails.map((email, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleChildEmailChange(index, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Child ${index + 1} email address`}
                    />
                  </div>
                  {formData.childEmails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChildEmail(index)}
                      className="px-3 py-3 text-red-600 hover:text-red-700 border border-gray-300 rounded-lg hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}

              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> We'll send an invitation to each child's email to link their account with yours. 
                  They'll need to accept the invitation to enable progress sharing.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  <span>Create Parent Account</span>
                </>
              )}
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By creating a parent account, you agree to receive progress updates and notifications about your child's learning.
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
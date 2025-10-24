import React, { useState, useEffect } from 'react';
import { validateJobForm } from '../../utils/Validators';
import Button from '../ui/Button';

const JobForm = ({ job, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    applicationDate: '',
    status: 'Applied',
    jobLocation: '',
    applicationLink: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      const applicationDate = new Date(job.applicationDate).toISOString().split('T')[0];
      setFormData({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription || '',
        applicationDate,
        status: job.status,
        jobLocation: job.jobLocation || '',
        applicationLink: job.applicationLink || ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { errors: validationErrors, isValid } = validateJobForm(formData);
    setErrors(validationErrors);

    if (isValid) {
      onSubmit(formData);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name *
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200 ${
            errors.companyName 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="Enter company name"
        />
        {errors.companyName && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.companyName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title *
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200 ${
            errors.jobTitle 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="Enter job title"
        />
        {errors.jobTitle && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.jobTitle}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">
          Job Location
        </label>
        <input
          type="text"
          id="jobLocation"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleChange}
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200 hover:border-gray-400"
          placeholder="Enter job location (e.g., Remote, New York, NY, etc.)"
        />
        <p className="mt-1 text-xs text-gray-500">Optional - City, State, Country, or Remote</p>
      </div>

      <div>
        <label htmlFor="applicationLink" className="block text-sm font-medium text-gray-700 mb-1">
          Application Link
        </label>
        <input
          type="url"
          id="applicationLink"
          name="applicationLink"
          value={formData.applicationLink}
          onChange={handleChange}
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200 hover:border-gray-400"
          placeholder="https://company.com/careers/job-id"
        />
        <p className="mt-1 text-xs text-gray-500">Optional - Link to the job posting</p>
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          rows={4}
          value={formData.jobDescription}
          onChange={handleChange}
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm resize-y transition-all duration-200 hover:border-gray-400"
          placeholder="Enter job description (optional)"
        />
      </div>

      <div>
        <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 mb-1">
          Application Date *
        </label>
        <input
          type="date"
          id="applicationDate"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          max={getTodayDate()}
          className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200 ${
            errors.applicationDate 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {errors.applicationDate && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.applicationDate}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status *
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200 hover:border-gray-400"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {job ? 'Update' : 'Create'} Job Application
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
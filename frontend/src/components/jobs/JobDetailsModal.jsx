import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const JobDetailsModal = ({ job, isOpen, onClose, onEdit, onDelete, formatDate, getStatusColor }) => {
  if (!job) return null;

  const formatApplicationLink = (link) => {
    if (!link) return null;
    let displayText = link.replace(/^https?:\/\/(www\.)?/, '');
  
    if (displayText.length > 40) {
      displayText = displayText.substring(0, 40) + '...';
    }
    
    return displayText;
  };

  const handleLinkClick = (link) => {
    if (!link) return;
    let formattedLink = link;
    if (!formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
      formattedLink = 'https://' + formattedLink;
    }
    
    window.open(formattedLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Job Application Details" size="large">
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-500">Application ID</span>
              <p className="text-sm font-mono text-gray-900">{job.applicationId}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Company Name</label>
            <p className="mt-1 text-lg text-gray-900 font-medium">{job.companyName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Job Title</label>
            <p className="mt-1 text-lg text-gray-900 font-medium">{job.jobTitle}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Application Date</label>
            <p className="mt-1 text-gray-900">{formatDate(job.applicationDate)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className="mt-1">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {job.jobLocation && (
            <div>
              <label className="text-sm font-medium text-gray-500">Job Location</label>
              <div className="mt-1 flex items-center text-gray-900">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.jobLocation}
              </div>
            </div>
          )}
          
          {job.applicationLink && (
            <div>
              <label className="text-sm font-medium text-gray-500">Application Link</label>
              <div className="mt-1">
                <button
                  onClick={() => handleLinkClick(job.applicationLink)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
                  title={job.applicationLink}
                >
                  <svg className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="truncate max-w-xs">
                    {formatApplicationLink(job.applicationLink)}
                  </span>
                </button>
                <p className="text-xs text-gray-500 mt-1">Click to open in new tab</p>
              </div>
            </div>
          )}
        </div>

        {job.jobDescription && (
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-2">Job Description</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-line break-words leading-relaxed">
                {job.jobDescription}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="outline" onClick={onEdit}>Edit</Button>
          <Button variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;
import React, { useState } from 'react';
import Button from '../ui/Button';
import JobDetailsModal from './JobDetailsModal';
import DeleteConfirmModal from './DeleteConfirmationModal';

const JobCard = ({ job, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const getStatusColor = (status) => {
    const colors = {
      Applied: 'bg-blue-100 text-blue-800 border border-blue-200',
      Interview: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      Offer: 'bg-green-100 text-green-800 border border-green-200',
      Rejected: 'bg-red-100 text-red-800 border border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const handleDelete = () => {
    onDelete(job._id);
    setShowDeleteConfirm(false);
  };

  const handleEditFromDetails = () => {
    setShowDetails(false);
    onEdit(job);
  };

  const handleDeleteFromDetails = () => {
    setShowDetails(false);
    setShowDeleteConfirm(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ID: {job.applicationId}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {job.jobTitle}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{job.companyName}</p>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Applied on {formatDate(job.applicationDate)}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="small" onClick={() => setShowDetails(true)}>
            View Details
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="small" onClick={() => onEdit(job)}>
              Edit
            </Button>
            <Button variant="danger" size="small" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      <JobDetailsModal
        job={job}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onEdit={handleEditFromDetails}
        onDelete={handleDeleteFromDetails}
        formatDate={formatDate}
        getStatusColor={getStatusColor}
      />

      <DeleteConfirmModal
        job={job}
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default JobCard;

import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const JobDetailsModal = ({ job, isOpen, onClose, onEdit, onDelete, formatDate, getStatusColor }) => {
  if (!job) return null;

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

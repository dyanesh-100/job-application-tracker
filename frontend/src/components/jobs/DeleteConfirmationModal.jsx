import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const DeleteConfirmModal = ({ job, isOpen, onClose, onConfirm }) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Job Application" size="small">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete the job application for <strong>{job.jobTitle}</strong> at <strong>{job.companyName}</strong>? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

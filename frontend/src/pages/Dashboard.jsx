import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useJobs } from '../hooks/useJobs';
import JobForm from '../components/jobs/JobForm';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { 
    jobs, 
    loading, 
    searchQuery,
    createJob, 
    updateJob, 
    deleteJob, 
    handleSearch,
    isInitialLoad,
    searchLoading,
    filterJobsByStatus 
  } = useJobs();

  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const handleCreateJob = async (jobData) => {
    setFormLoading(true);
    try {
      await createJob(jobData);
      setShowJobForm(false);
    } catch (err) {
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateJob = async (jobData) => {
    setFormLoading(true);
    try {
      await updateJob(editingJob._id, jobData);
      setEditingJob(null);
    } catch (err) {
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
    } catch (err) {
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterJobsByStatus(status);
  };

  const handleFormSubmit = (jobData) => {
    if (editingJob) {
      handleUpdateJob(jobData);
    } else {
      handleCreateJob(jobData);
    }
  };

  const handleFormClose = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const showWelcomeMessage = jobs.length === 0 && !loading && !searchLoading && statusFilter === 'All' && !searchQuery && !isInitialLoad;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JobTracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="primary"
                onClick={() => setShowJobForm(true)}
                className="shadow-lg shadow-blue-500/25"
              >
                + Add Job
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {showWelcomeMessage && (
            <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
              <div className="max-w-2xl p-8">
                <svg className="mx-auto h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to JobTracker!</h2>
                <p className="text-gray-600 mb-6">
                  Start tracking your job applications. Add your first job application to get started with managing your job search journey.
                </p>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => setShowJobForm(true)}
                  className="shadow-lg shadow-blue-500/25"
                >
                  Add Your First Job Application
                </Button>
              </div>
            </div>
          )}

          {(jobs.length > 0 || statusFilter !== 'All' || searchQuery) && (
            <>
              <JobFilters
                onStatusFilter={handleStatusFilter}
                onSearch={handleSearch}
                currentFilter={statusFilter}
                searchQuery={searchQuery}
                searchLoading={searchLoading}
              />
              <JobList
                jobs={jobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                loading={loading || searchLoading || isInitialLoad}
                currentFilter={statusFilter}
                searchQuery={searchQuery}
                searchLoading={searchLoading}
              />
            </>
          )}
        </div>
      </main>

      <Modal
        isOpen={showJobForm || !!editingJob}
        onClose={handleFormClose}
        title={editingJob ? 'Edit Job Application' : 'Add New Job Application'}
        size="large"
      >
        <JobForm
          job={editingJob}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;

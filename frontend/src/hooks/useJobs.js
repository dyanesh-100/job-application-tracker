import { useState, useEffect } from 'react';
import { jobsAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobsAPI.getJobs();
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      toast.error('Failed to load job applications');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData) => {
    try {
      const response = await jobsAPI.createJob(jobData);
      setJobs(prev => [response.data, ...prev]);
      toast.success('Job application added successfully!');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create job application';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const response = await jobsAPI.updateJob(id, jobData);
      setJobs(prev => prev.map(job => job._id === id ? response.data : job));
      toast.success('Job application updated successfully!');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update job application';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteJob = async (id) => {
    try {
      await jobsAPI.deleteJob(id);
      setJobs(prev => prev.filter(job => job._id !== id));
      toast.success('Job application deleted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete job application';
      toast.error(errorMessage);
      throw err;
    }
  };

  const filterJobsByStatus = async (status) => {
    if (status === 'All') {
      await fetchJobs();
      return;
    }
    
    setLoading(true);
    try {
      const response = await jobsAPI.getJobsByStatus(status);
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to filter jobs');
      toast.error('Failed to filter job applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    fetchJobs,
    filterJobsByStatus,
  };
};
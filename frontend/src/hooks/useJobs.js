import { useState, useEffect, useCallback, useRef } from 'react';
import { jobsAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const searchTimeoutRef = useRef(null);
  const currentSearchQueryRef = useRef('');

  const fetchJobs = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await jobsAPI.getJobs();
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      toast.error('Failed to load job applications');
    } finally {
      if (showLoading) setLoading(false);
      setIsInitialLoad(false);
    }
  };

  const searchJobs = async (query) => {
    if (!query.trim()) {
      await fetchJobs(false);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await jobsAPI.searchJobs(query);
      if (currentSearchQueryRef.current === query) {
        setJobs(response.data);
        setError('');
      }
    } catch (err) {
      if (currentSearchQueryRef.current === query) {
        setError('Failed to search jobs');
        toast.error('Failed to search job applications');
      }
    } finally {
      if (currentSearchQueryRef.current === query) {
        setSearchLoading(false);
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    currentSearchQueryRef.current = query;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      setSearchLoading(true);
    } else {
      setSearchLoading(true);
      searchJobs('');
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchJobs(query);
    }, 500);
  };

  const clearSearch = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setSearchQuery('');
    currentSearchQueryRef.current = '';
    setSearchLoading(true);
    fetchJobs(false);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
      await fetchJobs(true);
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
    fetchJobs(true);
  }, []);

  return {
    jobs,
    loading: loading || searchLoading,
    searchLoading,
    error,
    searchQuery,
    isInitialLoad,
    createJob,
    updateJob,
    deleteJob,
    fetchJobs,
    filterJobsByStatus,
    handleSearch,
    clearSearch,
  };
};
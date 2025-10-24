import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, onEdit, onDelete, loading, currentFilter, searchQuery, searchLoading }) => {
  // Show loading state when searching or initial loading
  if (loading || searchLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse border border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show no results message for search
  if (searchQuery && jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          No job applications found for "<strong>{searchQuery}</strong>". Try adjusting your search terms or clear the search to see all applications.
        </p>
      </div>
    );
  }

  // Show empty state when no jobs (only when not searching)
  if (jobs.length === 0 && !searchQuery) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {currentFilter === 'All' ? 'No job applications yet' : `No ${currentFilter.toLowerCase()} applications`}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {currentFilter === 'All' 
            ? 'Get started by creating your first job application to track your job search journey.'
            : `You don't have any job applications with "${currentFilter}" status. Try changing the filter or create a new application.`
          }
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Search Results Info - Only show when not loading and has results */}
      {searchQuery && jobs.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            Found <strong>{jobs.length}</strong> job application(s) for "<strong>{searchQuery}</strong>"
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default JobList;
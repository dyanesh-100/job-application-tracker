import React from 'react';

const JobFilters = ({ 
  onStatusFilter, 
  onSearch, 
  currentFilter, 
  searchQuery, 
  searchLoading 
}) => {
  const statusOptions = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by company, job title, or application ID..."
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {/* Loading Indicator */}
            {searchLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {/* Clear Search Button */}
            {searchQuery && !searchLoading && (
              <button
                onClick={() => onSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Search status message - Only show when not loading and has query */}
          {searchQuery && !searchLoading && (
            <p className="text-xs text-gray-500 mt-1">
              Searching for: "{searchQuery}"
            </p>
          )}
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <select
            value={currentFilter}
            onChange={(e) => onStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Status' : status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
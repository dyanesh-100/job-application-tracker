import React from 'react';
import Button from '../ui/Button';

const Header = ({ onAddJob, onLogout, showAddButton = true }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JobTracker
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Hide Add Job button on mobile - will show floating button instead */}
            {showAddButton && (
              <div className="hidden sm:block">
                <Button
                  variant="primary"
                  onClick={onAddJob}
                  className="shadow-lg shadow-blue-500/25"
                >
                  + Add Job
                </Button>
              </div>
            )}
            <Button
              variant="outline"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
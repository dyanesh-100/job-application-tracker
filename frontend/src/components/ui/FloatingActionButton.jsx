import React from 'react';

const FloatingActionButton = ({ onClick, visible = true }) => {
  return (
    <div className={`sm:hidden fixed bottom-6 right-6 z-40 transition-all duration-300 ease-in-out ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
    }`}>
      <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-2xl shadow-blue-500/50 flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 pl-5 pr-6 py-4"
        aria-label="Add Job Application"
      >
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="font-medium text-sm">Add</span>
      </button>
    </div>
  );
};

export default FloatingActionButton;
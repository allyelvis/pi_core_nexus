
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Pi Core Nexus. All rights reserved.</p>
        <p className="text-xs mt-1">This is a demo application for the Pi Network ecosystem.</p>
      </div>
    </footer>
  );
};

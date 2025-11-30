
import React from 'react';

const Icon: React.FC<{ name: string, className?: string }> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'button':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3m0-5H5m14-2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      );
    case 'card':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-2m-2 0h-2" />
        </svg>
      );
    case 'hero':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case 'image':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'flexbox':
         return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      );
    case 'html':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#E34F26" stroke="white" strokeWidth="1">
          <path d="M1.6 21.3l1.8-20.7h17.2l-1.8 20.7-6.8 2.7-6.8-2.7zM12 4.4h5.6l-1.4 16-4.2 1.6-4.2-1.6-0.3-3.3h3.4l0.1 1.8 1 0.4 1-0.4 0.5-5.6h-6.1l-0.2-2.3h6.5l0.3-3.6h-7l-0.2-2.3h10.3z" />
        </svg>
      );
    case 'css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#1572B6" stroke="white" strokeWidth="1">
          <path d="M1.6 21.3l1.8-20.7h17.2l-1.8 20.7-6.8 2.7-6.8-2.7zM12 4.4h5.6l-1.4 16-4.2 1.6-4.2-1.6-0.3-3.3h3.4l0.1 1.8 1 0.4 1-0.4 0.5-5.6h-2.1l-0.2-2.3h2.5l0.2-2.3h-5l-0.2-2.3h7.9z" />
        </svg>
      );
    case 'js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#F7DF1E">
          <path d="M1.6 0h20.8v20.8h-20.8z" stroke="none" />
          <path d="M12.1 14.8c-1.3-0.8-2-1.4-2-2.3 0-0.9 0.7-1.7 1.9-1.7 1.4 0 2.1 0.8 2.1 1.8h2.3c0-2.3-1.6-3.8-4.4-3.8-2.6 0-4.5 1.6-4.5 3.9 0 2.3 1.5 3.5 3.8 4.8 1.4 0.8 1.8 1.3 1.8 2 0 0.9-0.8 1.6-2.1 1.6-1.5 0-2.3-0.7-2.3-1.9h-2.3c0 2.4 1.8 3.9 4.6 3.9 2.9 0 4.6-1.6 4.6-3.8 0-2.5-1.5-3.6-3.9-4.9zM16.8 14.7h2.3v-5.2h-3.4v-1.7h5.7v8.6h-2.3v-1.7z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
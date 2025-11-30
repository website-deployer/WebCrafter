

import React, { useState, useMemo } from 'react';
import DraggableBlock from './DraggableBlock';
import { ALL_DRAGGABLE_BLOCKS } from '../constants';
import { Language } from '../types';

interface SidebarProps {
    activeLang: Language;
    className?: string;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLang, className = '', onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const blocks = ALL_DRAGGABLE_BLOCKS[activeLang] || [];
  
  const filteredBlocks = useMemo(() => {
      if (!searchTerm.trim()) return blocks;
      const term = searchTerm.toLowerCase().trim();
      return blocks.filter(block => 
          block.type.toLowerCase().includes(term) ||
          block.iconName.toLowerCase().includes(term) ||
          block.tags?.some(tag => tag.toLowerCase().includes(term))
      );
  }, [blocks, searchTerm]);
  
  const titleMap: Record<Language, string> = {
      html: 'HTML Components',
      css: 'CSS Styles',
      js: 'JavaScript Code'
  };

  // Separate beginner blocks from others
  const beginnerBlocks = filteredBlocks.filter(block => block.tags?.includes('beginner'));
  const otherBlocks = filteredBlocks.filter(block => !block.tags?.includes('beginner'));

  return (
    <div className={`h-full bg-[var(--sidebar-bg)] flex flex-col shadow-2xl ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] bg-[var(--sidebar-bg)] sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                {titleMap[activeLang]}
                <span className="text-xs bg-[var(--accent-color)] text-white px-2 py-0.5 rounded-full shadow-sm">{filteredBlocks.length}</span>
            </h2>
            {onClose && (
                <button 
                  onClick={onClose} 
                  className="md:hidden p-1.5 rounded-md text-[var(--text-muted)] hover:text-white hover:bg-[var(--component-hover)] transition-colors"
                  aria-label="Close Sidebar"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
        
        {/* Search Input */}
        <div className="relative group">
            <input 
                type="text" 
                placeholder="Search blocks..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--input-bg)] text-[var(--text-main)] text-sm rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] border border-[var(--border-color)] placeholder-[var(--text-muted)] transition-all group-hover:border-[var(--accent-color)]/50"
            />
            <svg className="w-4 h-4 text-[var(--icon-color)] absolute left-3.5 top-3 group-hover:text-[var(--accent-color)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 p-0.5 text-[var(--text-muted)] hover:text-white rounded-full hover:bg-[var(--component-hover)] transition-colors"
                    aria-label="Clear Search"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar" style={{ minHeight: 0 }}>
        {/* Beginner Section */}
        {beginnerBlocks.length > 0 && (
          <>
            <div className="mb-3 mt-2">
              <h3 className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                🌱 Perfect for Beginners
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{beginnerBlocks.length}</span>
              </h3>
            </div>
            {beginnerBlocks.map((block, idx) => (
              <DraggableBlock key={`beginner-${block.type}-${idx}`} block={block} />
            ))}
            
            <div className="border-t border-[var(--border-color)] my-4"></div>
          </>
        )}

        {/* Other Components */}
        {otherBlocks.length > 0 && (
          <>
            {beginnerBlocks.length > 0 && (
              <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                More Components
              </h3>
            )}
            {otherBlocks.map((block, idx) => (
              <DraggableBlock key={`other-${block.type}-${idx}`} block={block} />
            ))}
          </>
        )}

        {/* No results */}
        {filteredBlocks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-70">
                <div className="w-16 h-16 bg-[var(--component-bg)] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-[var(--text-main)] font-medium mb-1">No Results Found</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-[200px]">We couldn't find any blocks matching "{searchTerm}"</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-[var(--accent-color)] text-xs font-bold uppercase tracking-wide hover:underline"
                >
                    Clear Search
                </button>
            </div>
        )}
      </div>
      
      {/* Footer Info */}
      <div className="p-3 border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] text-center">
          <p className="text-[10px] text-[var(--text-muted)]">
            Drag blocks into the editor
          </p>
      </div>
    </div>
  );
};

export default Sidebar;


import React from 'react';
import { DraggableBlockItem } from '../types';
import Icon from './icons';

interface DraggableBlockProps {
  block: DraggableBlockItem;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/x-webcrafter-snippet', JSON.stringify({
        snippet: block.snippet,
        type: block.type,
    }));
    e.dataTransfer.effectAllowed = 'copy';
    e.currentTarget.classList.add('opacity-50', 'scale-95');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-95');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="group relative flex flex-col p-3 mb-3 bg-[var(--component-bg)] rounded-xl cursor-grab hover:bg-[var(--component-hover)] border border-[var(--border-color)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden select-none"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="flex items-start gap-3 relative z-10">
        <div className="flex-shrink-0 p-2 bg-[var(--app-bg)] rounded-lg text-[var(--icon-color)] group-hover:text-[var(--accent-color)] border border-[var(--border-color)] group-hover:border-[var(--accent-color)]/30 transition-colors duration-200 mt-0.5">
           <Icon name={block.iconName} className="w-5 h-5" />
        </div>
        
        <div className="flex flex-col min-w-0 flex-1">
             <span className="text-sm font-semibold text-[var(--text-main)] truncate group-hover:text-white transition-colors">{block.type}</span>
             
             {/* Beginner-friendly description */}
             {block.tags && block.tags.includes('beginner') && (
                <p className="text-xs text-[var(--text-muted)] mt-1 italic">Perfect for beginners!</p>
             )}
             
             {block.tags && block.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {block.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                            tag === 'beginner' 
                                ? 'bg-green-100 text-green-700 border-green-300 group-hover:bg-green-200' 
                                : 'bg-[var(--app-bg)] text-[var(--text-muted)] border-[var(--border-color)] group-hover:border-[var(--accent-color)]/20'
                        }`}>
                            #{tag}
                        </span>
                    ))}
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default DraggableBlock;

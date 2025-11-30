import React, { useState, useEffect } from 'react';
import { generateWebsiteFromPrompt } from '../services/aiFeatures';
import { TEMPLATES } from '../services/templates';
import { CodeBundle } from '../types';

interface IdeaInputPageProps {
  onGenerate: (prompt: string) => void;
  onBack: () => void;
  onSelectTemplate: (code: CodeBundle) => void;
}

const IdeaInputPage: React.FC<IdeaInputPageProps> = ({ onGenerate, onBack, onSelectTemplate }) => {
  const [prompt, setPrompt] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>(document.body.classList.contains('theme-dark') ? 'dark' : 'light');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
      return next;
    });
  };

  useEffect(() => {
    // sync on mount
    if (theme === 'dark') document.body.classList.add('theme-dark');
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const MAX_CHARS = 500;

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      setIsGenerating(true);
      try {
        const generatedCode = await generateWebsiteFromPrompt(prompt);
        onSelectTemplate(generatedCode);
      } catch (error) {
        console.error('Error generating website:', error);
        // Fallback to original behavior if AI fails
        onGenerate(prompt);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  }

  const suggestions = [
    "A modern portfolio for a freelance photographer",
    "A landing page for a new mobile fitness app",
    "An e-commerce site for handmade pottery",
    "A professional blog about minimalist interior design"
  ];
  
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  return (
    <div className="h-full flex flex-col p-4 animate-fade-in relative z-10 bg-[var(--app-bg)] overflow-y-auto">
      <button onClick={onBack} className="absolute top-6 left-6 text-indigo-500 hover:text-indigo-400 transition-colors">
        &larr; Back to Home
      </button>
      <div className="w-full max-w-6xl mx-auto text-center flex-1 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 text-[var(--text-muted)] transition-colors" aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.9 0 008.354-5.646z"/></svg>
          )}
        </button>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          What's Your Vision?
        </h1>
        <p className="text-lg text-[var(--text-muted)] mb-8">
          Describe the website you want to create, or start with one of our professional templates.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative max-w-2xl mx-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, MAX_CHARS))}
              className="w-full h-40 p-4 bg-[var(--component-bg)] border-2 border-[var(--border-color)] rounded-lg text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:scale-[1.02]"
              placeholder="e.g., A sleek and modern landing page for a new SaaS product called 'SynthWave'..."
            />
            <span className="absolute bottom-3 right-3 text-xs text-[var(--text-muted)]">
              {prompt.length} / {MAX_CHARS}
            </span>
          </div>
          <button
            type="submit"
            onClick={createRipple}
            disabled={!prompt.trim() || isGenerating}
            className={`mt-6 w-full max-w-2xl mx-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-300 ripple-btn disabled:bg-gray-600 disabled:cursor-not-allowed ${prompt.trim() && !isGenerating ? 'animate-pulse' : ''}`}
          >
            {isGenerating ? 'Generating...' : 'Generate With AI'}
          </button>
        </form>

        <div className="mt-16 pb-10">
          <h2 className="text-2xl font-bold text-[var(--text-muted)] mb-8">Or start from a template</h2>
          <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8 rounded-full"></div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {TEMPLATES.map((template, i) => (
              <div key={i} className="bg-[var(--component-bg)] p-6 rounded-lg shadow-lg text-left flex flex-col justify-between transform transition-transform hover:scale-105 duration-300 w-full md:w-[350px]">
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">{template.name}</h3>
                  <p className="text-[var(--text-muted)] text-sm">{template.description}</p>
                </div>
                <button 
                  onClick={() => onSelectTemplate(template.code)}
                  className="mt-4 w-full px-4 py-2 bg-[var(--component-hover)] text-[var(--text-main)] font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaInputPage;

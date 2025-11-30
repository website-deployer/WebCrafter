

import React, { useRef, useState, useEffect } from 'react';
import { AUTOSAVE_KEY } from '../constants';

interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ title, description, icon, color }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-1000 w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="glass-panel p-8 rounded-2xl relative transition-transform duration-100 ease-linear preserve-3d group border-t border-l border-white/10 h-full"
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`
        }}
      >
        {/* Inner Glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}33, transparent 70%)`
          }}
        />

        <div className="relative z-10 transform translate-z-10 group-hover:translate-z-12 transition-transform duration-300">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"
            style={{ background: `linear-gradient(135deg, ${color}, #111)` }}
          >
            {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[var(--text-main)]">{title}</h3>
      <p className="text-[var(--text-muted)]">{description}</p>
    </div>
  </div>
</div>
  );
};

interface HomePageProps {
  onStart: () => void;
  onDemo: () => void;
  onResume: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, onDemo, onResume }) => {
  const [hasSavedWork, setHasSavedWork] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

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
    // Sync theme on mount
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [theme]);

  useEffect(() => {
    // Check if there is a saved project in localStorage
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      setHasSavedWork(true);
    }
  }, []);

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const features = document.getElementById('features');
    if (features) {
      features.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Navigation */}
      <nav className="w-full shadow-sm py-4 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/webcrafter-logo.png" alt="WebCrafter" className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-[var(--text-main)]">WebCrafter</span>
          </div>
          {/* spacer to balance flex */}
          <div className="hidden md:flex gap-6"></div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 text-[var(--text-muted)] transition-colors ml-4"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto py-12">
            <img src="/webcrafter-logo.png" alt="WebCrafter" className="w-16 h-16 mx-auto mb-6" />
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
              ✨ Create Beautiful Websites Instantly
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Build. Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Create Magic.
              </span>
            </h1>
            
            <p className="text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Turn your ideas into reality with our intuitive website builder. 
              No coding needed—just your creativity and our powerful tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {hasSavedWork && (
                <button 
                  onClick={onResume}
                  className="px-6 py-3 rounded-lg text-base font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-md"
                >
                  Resume Project
                </button>
              )}
              <button 
                onClick={onStart}
                className="px-6 py-3 rounded-lg text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md"
              >
                Start Building &rarr;
              </button>
              <button 
                onClick={onDemo}
                className="px-6 py-3 rounded-lg text-base font-semibold text-indigo-600 bg-white hover:bg-gray-50 border border-gray-200"
              >
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-main)]">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TiltCard
              title="Intuitive Editor"
              description="Create and customize your website with our easy-to-use drag-and-drop interface."
              color="#6366f1"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            />
            <TiltCard
              title="Live Preview"
              description="See your changes in real-time as you build your website."
              color="#ec4899"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            <TiltCard
              title="Responsive Design"
              description="Your website will look great on all devices, from phones to desktops."
              color="#8b5cf6"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-[var(--text-muted)] text-sm">
            © {new Date().getFullYear()} WebCrafter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


import React, { useState, useCallback, useEffect } from 'react';
import HomePage from './components/HomePage';
import IdeaInputPage from './components/IdeaInputPage';
import PlaygroundPage from './components/PlaygroundPage';
import { CodeBundle } from './types';
import { TEMPLATES } from './services/templates';
import { AUTOSAVE_KEY } from './constants';

type Page = 'home' | 'idea' | 'playground';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [initialCode, setInitialCode] = useState<CodeBundle | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleStartJourney = useCallback(() => {
    setCurrentPage('idea');
  }, []);

  const handleGeneratePage = useCallback((prompt: string) => {
    setUserPrompt(prompt);
    setInitialCode(undefined);
    setCurrentPage('playground');
  }, []);

  const handleSelectTemplate = useCallback((code: CodeBundle) => {
    setUserPrompt('');
    setInitialCode(code);
    setCurrentPage('playground');
  }, []);

  const handleBackToHome = useCallback(() => {
      setCurrentPage('home');
  }, []);
  
  const handleNewProject = useCallback(() => {
      setUserPrompt('');
      setInitialCode(undefined);
      setCurrentPage('idea');
  }, []);

  const handleViewDemo = useCallback(() => {
    // Use the Weather Dashboard as the demo, or fallback to the first one
    const demoTemplate = TEMPLATES.find(t => t.name === 'Weather Dashboard') || TEMPLATES[0];
    setInitialCode(demoTemplate.code);
    setUserPrompt(''); 
    setCurrentPage('playground');
  }, []);

  const handleResumeProject = useCallback(() => {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CodeBundle;
        setInitialCode(parsed);
        setUserPrompt('');
        setCurrentPage('playground');
      } catch (e) {
        console.error("Failed to parse saved project", e);
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStart={handleStartJourney} onDemo={handleViewDemo} onResume={handleResumeProject} />;
      case 'idea':
        return <IdeaInputPage onGenerate={handleGeneratePage} onBack={handleBackToHome} onSelectTemplate={handleSelectTemplate} />;
      case 'playground':
        return <PlaygroundPage initialPrompt={userPrompt} initialCode={initialCode} onNewProject={handleNewProject}/>;
      default:
        return <HomePage onStart={handleStartJourney} onDemo={handleViewDemo} onResume={handleResumeProject} />;
    }
  };

  return (
    <div className="text-gray-900 h-screen overflow-hidden">
      <div key={currentPage} className="page-container h-full">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
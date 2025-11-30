
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './Sidebar';
import Preview from './Preview';
import CodeEditor from './CodeEditor';
import { generateWebsiteFromPrompt } from '../services/aiFeatures';
import { CodeBundle, Language } from '../types';
import { useProjectDownloader } from '../hooks/useProjectDownloader';
import { AUTOSAVE_KEY } from '../constants';
import { generateCodeWithOpenAI, refineCodeWithOpenAI, refineActiveCodeWithOpenAI } from '../utils/openai';
import { TEMPLATES } from '../services/templates';

interface Toast {
  id: number;
  message: string;
}

interface PlaygroundPageProps {
  initialPrompt: string;
  initialCode?: CodeBundle;
  onNewProject: () => void;
}

const loadingMessages = [
    "Analyzing your prompt...",
    "Designing the layout...",
    "Generating components...",
    "Writing the code...",
    "Polishing the final details...",
    "Almost there..."
];

const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ initialPrompt, initialCode, onNewProject }) => {
  const [code, setCode] = useState<CodeBundle>(initialCode || { html: '', css: '', js: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { downloadProject } = useProjectDownloader();
  const [activeLang, setActiveLang] = useState<Language>('html');
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Editor Instance for AI Features
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiModal, setAiModal] = useState<{ type: 'explain' | 'error' | null, content: any }>({ type: null, content: null });
  
  // Modals for New Features
  const [showMagicModal, setShowMagicModal] = useState(false);
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isMagicGenerating, setIsMagicGenerating] = useState(false);
  
  // History Management
  const [history, setHistory] = useState<CodeBundle[]>([initialCode || { html: '', css: '', js: '' }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isTimeTraveling = useRef(false);

  // Loading Animation State
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Responsive & Resize State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileView, setMobileView] = useState<'preview' | 'code'>('preview');
  const [isMobile, setIsMobile] = useState(false);
  const [editorWidth, setEditorWidth] = useState(45); // Percentage of right pane
  const [isResizing, setIsResizing] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const areBundlesEqual = (a: CodeBundle, b: CodeBundle) => {
    if (!a || !b) return a === b;
    return a.html === b.html && a.css === b.css && a.js === b.js;
  };

  // Check viewport size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // Default close on mobile
      } else {
        setIsSidebarOpen(true); // Default open on desktop
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Resize Handler Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing || !mainRef.current) return;
        
        const mainRect = mainRef.current.getBoundingClientRect();
        // Calculate width relative to the container. 
        // e.clientX is relative to the viewport.
        // mainRect.left is the left edge of the main container (right of sidebar).
        const relativeX = e.clientX - mainRect.left;
        
        // Editor is on the right, so editor width = total - cursor position
        const newWidthPx = mainRect.width - relativeX;
        const newWidthPercent = (newWidthPx / mainRect.width) * 100;

        // Constraints: Min 20%, Max 80%
        if (newWidthPercent >= 20 && newWidthPercent <= 80) {
            setEditorWidth(newWidthPercent);
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    if (isResizing) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        // Force cursor and prevent selection during drag
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    } else {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };
  }, [isResizing]);

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
  
  // Ensure body class matches current theme on mount & when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [theme]);

  // Autosave Logic
  useEffect(() => {
    if (!isLoading && (code.html || code.css || code.js)) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(code));
        setLastSaved(new Date());
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [code, isLoading]);

  // History Tracker Effect
  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(() => {
        const currentRecord = history[historyIndex];
        // Only push if code has actually changed from what's in history
        if (!areBundlesEqual(code, currentRecord)) {
             // If we are currently undoing/redoing, don't overwrite history branch
             if (isTimeTraveling.current) {
                 isTimeTraveling.current = false;
                 return;
             }

             const newHistory = history.slice(0, historyIndex + 1);
             newHistory.push(code);
             
             // Limit history size to 50 steps
             if (newHistory.length > 50) {
                 newHistory.shift();
             }

             setHistory(newHistory);
             setHistoryIndex(newHistory.length - 1);
        }
    }, 800); // 800ms debounce to capture pauses in typing

    return () => clearTimeout(timeout);
  }, [code, historyIndex, history, isLoading]);

  const handleUndo = () => {
    if (historyIndex > 0) {
        isTimeTraveling.current = true;
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCode(history[newIndex]);
        addToast('Undone');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
        isTimeTraveling.current = true;
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCode(history[newIndex]);
        addToast('Redone');
    }
  };

  // Loading Simulation Effect
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setLogs(['> Initializing environment...']);
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
           if (prev >= 98) return 98;
           const remaining = 100 - prev;
           // Slow down as we get closer to 100
           return prev + (remaining * 0.05) + (Math.random() * 2); 
        });
      }, 500);

      const logMessages = [
         "Analyzing prompt semantics...",
         "Identifying required components...",
         "Generating HTML structure...",
         "Synthesizing CSS styles...",
         "Compiling JavaScript logic...",
         "Optimizing assets...",
         "Verifying accessibility compliance...",
         "Finalizing code bundle...",
         "Ready to launch..."
      ];
      
      let logIndex = 0;
      const logInterval = setInterval(() => {
         if (logIndex < logMessages.length) {
            setLogs(prev => [...prev.slice(-4), `> ${logMessages[logIndex]}`]);
            logIndex++;
         }
      }, 1200);

      // Cycle main loading message
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[msgIndex]);
      }, 2500);

      return () => {
         clearInterval(progressInterval);
         clearInterval(logInterval);
         clearInterval(msgInterval);
      };
    } else {
       setProgress(100);
    }
  }, [isLoading]);

  const handleGenerate = useCallback(async (prompt: string, existingCode?: CodeBundle) => {
    const loadingSetter = existingCode ? setIsRefining : setIsLoading;
    loadingSetter(true);
    try {
      let generatedCode: CodeBundle;
      if (existingCode) {
          // This path is used by the generic "Refine" button if needed, but the targeted one is separate now
          generatedCode = await refineCodeWithOpenAI(prompt, existingCode);
      } else {
          generatedCode = await generateWebsiteFromPrompt(prompt);
      }
      setCode(generatedCode);
    } catch (error) {
      console.error("Failed to generate/refine website:", error);
      addToast("Failed to process request. Please try again.");
    } finally {
      loadingSetter(false);
    }
  }, []);

  const handleMagicGenerate = async () => {
    if (!magicPrompt.trim()) return;
    setIsMagicGenerating(true);
    setShowMagicModal(false);
    setIsLoading(true);
    setLoadingMessage("Summoning code with AI...");
    
    try {
      const generatedCode = await generateWebsiteFromPrompt(magicPrompt);
      setCode(generatedCode);
      addToast("Generated with Magic!");
    } catch (error) {
      console.error("Magic generation failed:", error);
      addToast("Generation failed. Try a different prompt.");
    } finally {
      setIsMagicGenerating(false);
      setIsLoading(false);
      setMagicPrompt('');
    }
  };

  const handleLoadTemplate = (templateCode: CodeBundle) => {
      setCode(templateCode);
      setShowExamplesModal(false);
      addToast("Template Loaded!");
  };

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setIsLoading(false);
    } else if (initialPrompt) {
      handleGenerate(initialPrompt);
    } else {
      setIsLoading(false); 
    }
  }, [initialPrompt, initialCode, handleGenerate]);

  const handleRefine = async () => {
    if (!refinePrompt.trim()) {
      addToast("Please enter a refinement request.");
      return;
    }
    setIsRefining(true);

    try {
        const updatedContent = await refineActiveCodeWithOpenAI(refinePrompt, activeLang, code);
        
        // Validate the returned content
        if (!updatedContent || updatedContent.trim().length === 0) {
          throw new Error("AI returned empty content");
        }
        
        // Check if content seems reasonable (at least some actual code)
        if (updatedContent.length < 10) {
          throw new Error("AI returned content that is too short");
        }
        
        setCode(prev => ({
            ...prev,
            [activeLang]: updatedContent
        }));
        addToast(`✓ Refined ${activeLang.toUpperCase()} successfully!`);
    } catch (error) {
        console.error("Refine failed", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        addToast(`Refinement failed: ${errorMessage}. Please try a different prompt or try again.`);
    } finally {
        setIsRefining(false);
        setRefinePrompt('');
    }
  };

  // --- AI FEATURES HANDLERS ---

  const getCodeContext = () => {
      // Prioritize selected text, fallback to full active file content
      if (editorInstance) {
          try {
          const selection = editorInstance.getSelection();
              const model = editorInstance.getModel();
              if (model && selection) {
                  const selectedText = model.getValueInRange(selection);
          if (selectedText && selectedText.trim().length > 0) {
              return selectedText;
                  }
              }
          } catch (error) {
              console.warn('Error getting selection:', error);
          }
      }
      return code[activeLang];
  };

  const handleExplainCode = async () => {
      setIsAiProcessing(true);
      const contextCode = getCodeContext();
      // AI explanation feature temporarily disabled
      const explanation = "AI explanation feature is currently disabled. This feature will be available in a future update.";
      setAiModal({ type: 'explain', content: explanation });
      setIsAiProcessing(false);
  };

  const handleDetectErrors = async () => {
      setIsAiProcessing(true);
      // AI error detection feature temporarily disabled  
      const analysis = { errors: ["AI error detection is currently disabled. This feature will be available in a future update."], fixedCode: code[activeLang] };
      setAiModal({ type: 'error', content: analysis });
      setIsAiProcessing(false);
  };

  const applyFix = (fixedCode: string) => {
      setCode(prev => ({ ...prev, [activeLang]: fixedCode }));
      setAiModal({ type: null, content: null });
      addToast("Fixed code applied!");
  };

  const setHtml = useCallback((html: string) => setCode(prev => ({ ...prev, html })), []);
  const setCss = useCallback((css: string) => setCode(prev => ({ ...prev, css })), []);
  const setJs = useCallback((js: string) => setCode(prev => ({ ...prev, js })), []);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };
  
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
    if (ripple) ripple.remove();
    button.appendChild(circle);
  };

  const copyToClipboard = async (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      try {
          await navigator.clipboard.writeText(code[activeLang]);
          addToast(`${activeLang.toUpperCase()} copied to clipboard!`);
      } catch (err) {
          addToast('Failed to copy');
      }
  };

  if (isLoading) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--app-bg)] transition-colors duration-300 ${theme === 'light' ? 'theme-light' : ''}`}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
           {/* Grid Overlay */}
           <div className="absolute inset-0 bg-grid opacity-10"></div>
        </div>

        <div className="relative z-10 w-full max-w-md p-6">
           {/* Logo / Icon Animation */}
           <div className="flex justify-center mb-10">
              <div className="relative">
                 <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 animate-spin flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <div className="w-16 h-16 bg-[var(--app-bg)] rounded-xl flex items-center justify-center">
                       <svg className="w-10 h-10 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                       </svg>
                    </div>
                 </div>
                 <div className="absolute -inset-6 bg-indigo-500/20 rounded-full blur-xl -z-10 animate-pulse"></div>
              </div>
           </div>

           {/* Text */}
           <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2 animate-pulse">{loadingMessage}</h2>
              <p className="text-[var(--text-muted)] text-sm">AI is crafting your website...</p>
           </div>

           {/* Progress Bar */}
           <div className="w-full bg-[var(--component-bg)] h-2.5 rounded-full overflow-hidden border border-[var(--border-color)] mb-3 relative shadow-inner">
              <div 
                 className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative"
                 style={{ width: `${progress}%` }}
              >
                  {/* Shimmer effect overlay */}
                  <div className="absolute inset-0 bg-white/30 w-full animate-pulse"></div>
              </div>
           </div>
           
           <div className="flex justify-between text-xs font-mono text-[var(--text-muted)] mb-8">
              <span>{Math.round(progress)}%</span>
              <span>{progress < 100 ? 'Processing...' : 'Complete'}</span>
           </div>

           {/* Terminal Logs */}
           <div className="bg-[#0f1117] rounded-lg border border-white/10 p-4 font-mono text-xs h-32 flex flex-col justify-end shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
              
              {logs.map((log, i) => (
                 <div key={i} className="text-green-400/80 mb-1 last:text-green-400 last:font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    {log}
                 </div>
              ))}
              <div className="w-2 h-4 bg-green-500 animate-pulse mt-1"></div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--app-bg)] transition-colors duration-300" style={{ minHeight: 0 }}>
      {/* Global overlay for resizing to catch mouse events everywhere */}
      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize select-none" />
      )}

      <div id="toast-container" className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-down pointer-events-auto">
            {toast.message}
          </div>
        ))}
      </div>

      {/* Magic Generator Modal */}
      {showMagicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
             <div className="p-5 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--component-bg)]">
                <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                    ✨ Magic Code Generator
                </h3>
                <button onClick={() => setShowMagicModal(false)} className="text-[var(--text-muted)] hover:text-white">✕</button>
             </div>
             <div className="p-6">
                <p className="text-[var(--text-muted)] mb-4">Describe the app you want to build. Our OpenAI integration will write the code for you instantly.</p>
                <textarea 
                    value={magicPrompt}
                    onChange={(e) => setMagicPrompt(e.target.value)}
                    placeholder="e.g., A pomodoro timer with sound notifications"
                    className="w-full h-32 bg-[var(--input-bg)] text-[var(--text-main)] border border-[var(--border-color)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] resize-none"
                />
                <button 
                    onClick={handleMagicGenerate}
                    disabled={!magicPrompt.trim() || isMagicGenerating}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
                >
                    {isMagicGenerating ? 'Generating...' : 'Generate Code'}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Examples Gallery Modal */}
      {showExamplesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden">
                <div className="p-5 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--component-bg)]">
                    <h3 className="text-lg font-bold text-[var(--text-main)]">📚 Magic Examples Gallery</h3>
                    <button onClick={() => setShowExamplesModal(false)} className="text-[var(--text-muted)] hover:text-white">✕</button>
                </div>
                <div className="p-6 overflow-y-auto flex flex-wrap justify-center gap-6">
                    {TEMPLATES.map((template, idx) => (
                        <div key={idx} className="bg-[var(--component-bg)] border border-[var(--border-color)] rounded-lg p-5 hover:border-[var(--accent-color)] transition-colors cursor-pointer flex flex-col w-full sm:w-64" onClick={() => handleLoadTemplate(template.code)}>
                            <div className="w-12 h-12 rounded-full bg-[var(--app-bg)] flex items-center justify-center mb-4 text-[var(--accent-color)] text-xl font-bold border border-[var(--border-color)]">
                                {idx + 1}
                            </div>
                            <h4 className="text-[var(--text-main)] font-bold text-lg mb-2 truncate" title={template.name}>{template.name}</h4>
                            <p className="text-[var(--text-muted)] text-sm flex-grow line-clamp-3">{template.description}</p>
                            <button className="mt-4 py-2 w-full bg-[var(--app-bg)] text-[var(--text-main)] text-sm font-medium rounded border border-[var(--border-color)] hover:bg-[var(--accent-color)] hover:text-white hover:border-transparent transition-colors">
                                Load Project
                            </button>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      )}

      {/* AI Feature Modals (Explain, Error) */}
      {aiModal.type && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--component-bg)]">
                      <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                          {aiModal.type === 'explain' && '🧠 AI Code Explanation'}
                          {aiModal.type === 'error' && '🕵️ AI Error Detective'}
                      </h3>
                      <button onClick={() => setAiModal({ type: null, content: null })} className="text-[var(--text-muted)] hover:text-white transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto custom-scrollbar text-[var(--text-main)]">
                      {aiModal.type === 'explain' && (
                          <div className="prose prose-invert max-w-none whitespace-pre-wrap text-[var(--text-main)]">
                              {/* Render markdown content safely */}
                              <div style={{ whiteSpace: 'pre-wrap' }}>{String(aiModal.content || '')}</div>
                          </div>
                      )}

                      {aiModal.type === 'error' && (
                          <div className="space-y-4">
                              {aiModal.content.errors && aiModal.content.errors.length > 0 ? (
                                  <>
                                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                          <h4 className="text-red-400 font-bold mb-2">Issues Detected:</h4>
                                          <ul className="list-disc list-inside space-y-1 text-sm text-red-200">
                                              {aiModal.content.errors.map((err: string, i: number) => (
                                                  <li key={i}>{err}</li>
                                              ))}
                                          </ul>
                                      </div>
                                      <div>
                                          <h4 className="text-[var(--text-main)] font-bold mb-2">Suggested Fix:</h4>
                                          <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm font-mono text-green-300">
                                              {aiModal.content.fixedCode}
                                          </pre>
                                          <button 
                                              onClick={() => applyFix(aiModal.content.fixedCode)}
                                              className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors"
                                          >
                                              Apply Fix
                                          </button>
                                      </div>
                                  </>
                              ) : (
                                  <div className="text-center py-8 text-green-400">
                                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                      <p className="text-lg font-bold">No errors detected! Good job.</p>
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between p-2 md:p-3 bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] shadow-md glass-panel flex-shrink-0 z-30">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Sidebar Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-[var(--component-hover)] text-[var(--text-muted)] focus:outline-none transition-colors"
              aria-label="Toggle Sidebar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className="text-lg md:text-xl font-bold text-[var(--accent-color)] hidden sm:block">WebCrafter</h1>
            <h1 className="text-lg font-bold text-[var(--accent-color)] sm:hidden">WebCrafter</h1>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[var(--component-bg)] text-[var(--text-main)] transition-colors" aria-label="Toggle Theme">
              {theme === 'dark' ? (
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {/* Undo/Redo Buttons */}
            <div className="flex items-center gap-1 bg-[var(--component-bg)] rounded-md border border-[var(--border-color)] p-0.5 ml-2">
                <button 
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                    className="p-1.5 rounded hover:bg-[var(--component-hover)] text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Undo"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                </button>
                <button 
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                    className="p-1.5 rounded hover:bg-[var(--component-hover)] text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Redo"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                    </svg>
                </button>
            </div>
          </div>

          {/* Mobile View Toggle */}
          <div className="flex md:hidden bg-[var(--component-bg)] rounded-lg p-1 border border-[var(--border-color)]">
              <button 
                onClick={() => setMobileView('preview')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileView === 'preview' ? 'bg-[var(--accent-color)] text-white shadow-md' : 'text-[var(--text-muted)]'}`}
              >
                Preview
              </button>
              <button 
                onClick={() => setMobileView('code')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileView === 'code' ? 'bg-[var(--accent-color)] text-white shadow-md' : 'text-[var(--text-muted)]'}`}
              >
                Code
              </button>
          </div>

          <div className="flex items-center gap-2">
              {/* Saved Indicator */}
              {lastSaved && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--component-bg)] border border-[var(--border-color)]">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wide">
                        Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
              )}
              
              {/* Magic Buttons */}
              <button 
                onClick={() => setShowMagicModal(true)}
                className="hidden md:flex px-3 py-1.5 text-xs md:text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-md items-center gap-1"
              >
                ✨ Magic Generator
              </button>
              
              <button 
                onClick={() => setShowExamplesModal(true)}
                className="hidden md:flex px-3 py-1.5 text-xs md:text-sm bg-[var(--component-bg)] hover:bg-[var(--component-hover)] text-[var(--text-main)] rounded-md transition-colors border border-[var(--border-color)] items-center gap-1"
              >
                📚 Examples
              </button>

              <button onClick={copyToClipboard} className="hidden md:block px-3 py-1.5 text-xs md:text-sm bg-[var(--component-bg)] rounded-md hover:bg-[var(--component-hover)] transition-colors text-[var(--text-main)] border border-[var(--border-color)]">Copy</button>
              <button onClick={(e) => { createRipple(e); downloadProject(code); }} className="px-3 py-1.5 text-xs md:text-sm bg-green-600 rounded-md hover:bg-green-700 transition-colors text-white shadow-md flex items-center gap-1">
                <span className="hidden sm:inline">Download</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
              <button onClick={(e) => { createRipple(e); onNewProject(); }} className="px-3 py-1.5 text-xs md:text-sm bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors text-white shadow-md">New</button>
          </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative" style={{ minHeight: 0 }}>
          
          {/* Sidebar - Responsive Drawer/Panel */}
          <div 
            className={`
              absolute md:relative inset-y-0 left-0 z-20 
              w-64 transition-all duration-500 ease-out
              ${isMobile ? 'shadow-2xl' : 'border-r border-[var(--border-color)]'}
              flex-shrink-0 bg-[var(--sidebar-bg)]
            `}
            style={{ 
              transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              opacity: isSidebarOpen ? 1 : 0,
              display: isSidebarOpen || isMobile ? 'block' : 'none'
            }}
          >
              <Sidebar activeLang={activeLang} className="h-full w-full" onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && isMobile && (
             <div className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          )}

          {/* Content Area */}
          <main ref={mainRef} className={`flex-1 flex flex-col md:flex-row h-full overflow-hidden w-full relative transition-all duration-500 ease-out`} style={{ minHeight: 0 }}>
              
              {/* Preview Panel */}
              <div 
                className={`
                    h-full overflow-hidden transition-all duration-300 relative
                    ${isMobile && mobileView !== 'preview' ? 'hidden' : 'block'}
                    ${isResizing ? 'pointer-events-none' : ''} 
                `}
                style={{ flex: 1, minHeight: 0 }}
              >
                 <Preview html={code.html} css={code.css} js={code.js} />
              </div>

              {/* Resizer Handle (Desktop Only) */}
              {!isMobile && (
                  <div 
                    className="w-4 h-full bg-transparent hover:bg-[var(--accent-color)]/10 cursor-col-resize flex items-center justify-center z-40 transition-colors flex-shrink-0 -ml-2"
                    onMouseDown={() => setIsResizing(true)}
                  >
                      <div className="w-1 h-8 bg-[var(--text-muted)] rounded-full opacity-50 shadow-sm"></div>
                  </div>
              )}

              {/* Editor Panel */}
              <aside 
                className={`
                    h-full flex-shrink-0 border-l border-[var(--border-color)] bg-[var(--sidebar-bg)]
                    flex flex-col transition-all duration-75
                    ${isMobile && mobileView !== 'code' ? 'hidden' : 'block'}
                    ${isMobile ? 'w-full' : ''}
                `}
                style={{ width: isMobile ? '100%' : `${editorWidth}%`, minHeight: 0 }}
              >
                 {/* Magic Tools Header */}
                 <div className="hidden">
                      <button 
                          onClick={handleExplainCode}
                          disabled={isAiProcessing}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-xs font-medium whitespace-nowrap disabled:opacity-50"
                      >
                          <span className="text-lg">🧠</span> Explain
                      </button>
                      <button 
                          onClick={handleDetectErrors}
                          disabled={isAiProcessing}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs font-medium whitespace-nowrap disabled:opacity-50"
                      >
                          <span className="text-lg">🕵️</span> Detect Errors
                      </button>
                      
                      {isAiProcessing && (
                          <div className="ml-auto flex items-center gap-2 text-xs text-[var(--text-muted)] animate-pulse">
                              <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></div>
                              AI Thinking...
                          </div>
                      )}
                 </div>

                 <div className="flex-grow overflow-hidden">
                    <CodeEditor 
                        html={code.html} css={code.css} js={code.js} 
                        setHtml={setHtml} setCss={setCss} setJs={setJs}
                        activeLang={activeLang} setActiveLang={setActiveLang}
                        theme={theme}
                        onEditorMount={setEditorInstance}
                    />
                 </div>
                 
                               </aside>
          </main>
      </div>
    </div>
  );
};

export default PlaygroundPage;

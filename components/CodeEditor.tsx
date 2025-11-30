
import React, { useRef, useEffect, memo } from 'react';
import Icon from './icons';
import { Language } from '../types';

declare const monaco: any;

interface CodeEditorProps {
  html: string;
  css: string;
  js: string;
  setHtml: (value: string) => void;
  setCss: (value: string) => void;
  setJs: (value: string) => void;
  activeLang: Language;
  setActiveLang: (lang: Language) => void;
  theme: 'dark' | 'light';
  onEditorMount?: (editor: any) => void;
}

// Ensure Monaco is only ever required once.
let monacoLoaderPromise: Promise<void> | null = null;

const CodeEditor: React.FC<CodeEditorProps> = ({
  html, css, js,
  setHtml, setCss, setJs,
  activeLang, setActiveLang,
  theme,
  onEditorMount
}) => {
  const editorRef = useRef<any>(null);
  const modelsRef = useRef<Record<Language, any> | null>(null);
  const monacoEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMonaco = () => {
      if (monacoEl.current && typeof monaco !== 'undefined' && !editorRef.current) {
        
        // Create models only once and store them in a ref
        if (!modelsRef.current) {
          const htmlModel = monaco.editor.createModel(html, 'html');
          const cssModel = monaco.editor.createModel(css, 'css');
          const jsModel = monaco.editor.createModel(js, 'javascript');

          // Attach listeners to update React state when model content changes
          htmlModel.onDidChangeContent(() => setHtml(htmlModel.getValue()));
          cssModel.onDidChangeContent(() => setCss(cssModel.getValue()));
          jsModel.onDidChangeContent(() => setJs(jsModel.getValue()));

          modelsRef.current = { html: htmlModel, css: cssModel, js: jsModel };
        }

        // Create the editor instance
        const editor = monaco.editor.create(monacoEl.current, {
          model: modelsRef.current![activeLang], // Set the initial model based on the active tab
          theme: theme === 'dark' ? 'vs-dark' : 'vs',
          automaticLayout: true,
          minimap: { enabled: true },
          fontFamily: 'Fira Code, Menlo, Monaco, Courier New, monospace',
          wordWrap: 'on',
          padding: { top: 10 },
        });
        editorRef.current = editor;
        
        if (onEditorMount) {
            onEditorMount(editor);
        }

        // Add drag-and-drop support
        monacoEl.current.addEventListener('dragover', (e) => e.preventDefault());
        monacoEl.current.addEventListener('drop', (e) => {
          e.preventDefault();
          const dataString = e.dataTransfer?.getData('application/x-webcrafter-snippet');
          if (!dataString) return;

          const { snippet } = JSON.parse(dataString);
          const target = editor.getTargetAtClientPoint(e.clientX, e.clientY);
          if (target?.position) {
            editor.executeEdits('dnd-insert', [{
              range: new monaco.Range(target.position.lineNumber, target.position.column, target.position.lineNumber, target.position.column),
              text: snippet,
            }]);
            editor.focus();
          }
        });
      }
    };

    if (!monacoLoaderPromise) {
      monacoLoaderPromise = new Promise<void>((resolve) => {
        if (typeof (window as any).monaco !== 'undefined') {
          return resolve();
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js';
        script.onload = () => {
          (window as any).require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
          (window as any).require(['vs/editor/editor.main'], () => {
            resolve();
          });
        };
        document.body.appendChild(script);
      });
    }

    monacoLoaderPromise.then(() => {
        initializeMonaco();
    });

    return () => {
      // Dispose editor first, then models to prevent errors
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
      // Dispose models only if they exist and editor is disposed
      if (modelsRef.current) {
        try {
          modelsRef.current.html?.dispose();
          modelsRef.current.css?.dispose();
          modelsRef.current.js?.dispose();
        } catch (e) {
          console.warn('Error disposing Monaco models:', e);
        }
        modelsRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to switch models when the active language tab changes
  useEffect(() => {
    if (editorRef.current && modelsRef.current) {
      editorRef.current.setModel(modelsRef.current[activeLang]);
    }
  }, [activeLang]);

  // Effect to update theme
  useEffect(() => {
    if (editorRef.current && typeof monaco !== 'undefined') {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
    }
  }, [theme]);

  // Effects to update model content if it changes externally (e.g., from AI generation)
  useEffect(() => {
    if (modelsRef.current?.html) {
      const currentValue = modelsRef.current.html.getValue();
      if (currentValue !== html) {
        modelsRef.current.html.setValue(html);
      }
    }
  }, [html]);

  useEffect(() => {
    if (modelsRef.current?.css) {
      const currentValue = modelsRef.current.css.getValue();
      if (currentValue !== css) {
        modelsRef.current.css.setValue(css);
      }
    }
  }, [css]);

  useEffect(() => {
    if (modelsRef.current?.js) {
      const currentValue = modelsRef.current.js.getValue();
      if (currentValue !== js) {
        modelsRef.current.js.setValue(js);
      }
    }
  }, [js]);

  return (
    <div className="h-full flex flex-col bg-[var(--editor-bg)] rounded-lg overflow-hidden border border-[var(--border-color)]" style={{ minHeight: 0 }}>
      <div className="flex bg-[var(--editor-header)] select-none border-b border-[var(--border-color)] flex-shrink-0">
        <TabButton lang="html" activeLang={activeLang} setActiveLang={setActiveLang} />
        <TabButton lang="css" activeLang={activeLang} setActiveLang={setActiveLang} />
        <TabButton lang="js" activeLang={activeLang} setActiveLang={setActiveLang} />
      </div>
      <div className="flex-grow relative" style={{ minHeight: 0 }}>
        <div ref={monacoEl} className="w-full h-full"></div>
      </div>
      <div className="bg-[#007acc] text-white text-xs px-3 py-0.5 flex items-center justify-between flex-shrink-0">
        <span>{activeLang.toUpperCase()}</span>
        <span>WebCrafter</span>
      </div>
    </div>
  );
};

interface TabButtonProps {
  lang: Language;
  activeLang: Language;
  setActiveLang: (lang: Language) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ lang, activeLang, setActiveLang }) => (
  <button
    onClick={() => setActiveLang(lang)}
    className={`flex items-center px-4 py-2 text-sm transition-colors border-t-2 ${
      activeLang === lang
        ? 'bg-[var(--editor-tab-active)] text-[var(--text-main)] border-indigo-400'
        : 'bg-[var(--editor-tab-inactive)] text-[var(--text-muted)] border-transparent hover:bg-[var(--component-hover)]'
    }`}
  >
    <Icon name={lang} className="w-4 h-4 mr-2" />
    <span>{`index.${lang}`}</span>
  </button>
);

export default memo(CodeEditor);

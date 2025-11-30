
import { useCallback } from 'react';

// Declare JSZip and saveAs to inform TypeScript they are available globally from CDNs
declare const JSZip: any;
declare const saveAs: any;

interface CodeBundle {
  html: string;
  css: string;
  js: string;
}

export const useProjectDownloader = () => {
  const downloadProject = useCallback((code: CodeBundle, projectName = 'webcrafter-project') => {
    if (typeof JSZip === 'undefined' || typeof saveAs === 'undefined') {
      alert('Could not download project. Required libraries are missing.');
      console.error('JSZip or FileSaver is not loaded.');
      return;
    }

    const zip = new JSZip();
    zip.file('index.html', code.html);
    zip.file('index.css', code.css);
    zip.file('index.js', code.js);

    zip.generateAsync({ type: 'blob' })
      .then((content: Blob) => {
        saveAs(content, `${projectName}.zip`);
      })
      .catch((err: any) => {
        console.error('Failed to generate zip file:', err);
        alert('An error occurred while creating the project zip file.');
      });
  }, []);

  return { downloadProject };
};

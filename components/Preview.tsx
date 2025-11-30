
import React, { useMemo } from 'react';

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js }) => {
  const srcDoc = useMemo(() => {
    // Extract head and body content from the full HTML using more robust regex
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

    const headContent = headMatch ? headMatch[1] : '';
    // If no body tag is found, try to extract content between <body> tags or use entire HTML if no body tags exist
    // This helps if the user accidentally deletes the body tags in the editor
    let bodyContent = bodyMatch ? bodyMatch[1] : '';
    if (!bodyContent && !html.includes('<body')) {
      // If no body tags at all, try to use content after head or entire HTML
      const afterHead = html.indexOf('</head>');
      bodyContent = afterHead !== -1 ? html.substring(afterHead + 7) : html;
    }

    // Remove external CSS/JS links that would cause 404 errors
    const cleanHeadContent = headContent
      .replace(/<link[^>]*\.css[^>]*>/gi, '') // Remove external CSS links
      .replace(/<script[^>]*src[^>]*\.js[^>]*><\/script>/gi, '') // Remove external JS scripts
      .replace(/<script[^>]*src=["'][^"']*\.js["'][^>]*>/gi, ''); // Remove external JS script tags

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${cleanHeadContent}
          <style>
            /* Reset and base styles for preview */
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; min-height: 100vh; }
            /* User CSS */
            ${css}
          </style>
        </head>
        <body>
          ${bodyContent}
          <script>
            // Prevent default form submissions in preview to avoid reload
            document.addEventListener('submit', (e) => {
                // Allow if it's handled by user JS (e.defaultPrevented)
                // but we can't easily know that here without interfering.
                // So we just let it be, but warn if needed.
            });

            // Prevent hash links from navigating to parent window
            document.addEventListener('click', (e) => {
              const target = e.target.closest('a');
              if (target && target.href) {
                const href = target.getAttribute('href');
                if (href && href.startsWith('#')) {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle the hash navigation within the iframe
                  const targetElement = document.querySelector(href);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }
            });

            try {
              ${js}
            } catch(e) {
              console.error('Preview JS Error:', e);
            }
          </script>
        </body>
      </html>
    `;
  }, [html, css, js]);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col relative group" style={{ minHeight: 0 }}>
        {/* Browser Header */}
        <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2 space-x-1 flex-shrink-0 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        
        {/* Iframe Container */}
        <iframe
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
            className="flex-grow w-full border-none bg-white"
            style={{ minHeight: 0 }}
        />
    </div>
  );
};

export default Preview;

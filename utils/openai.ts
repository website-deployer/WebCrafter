
import { CodeBundle, Language } from '../types';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'google/gemini-2.0-pro-exp-02-05:free',
  'meta-llama/llama-3.3-70b-instruct:free'
];

// Helper to parse the raw HTML response into a CodeBundle
function parseResponseToCodeBundle(content: string): CodeBundle {
  // Robust Markdown Cleanup
  content = content.replace(/```(html|css|javascript|js)?/gi, '').replace(/```/g, '').trim();

  let html = content;
  let css = '';
  let js = '';

  // Extract CSS from <style> tags
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  const styles = html.match(styleRegex);
  if (styles) {
    styles.forEach(s => {
      // Extract inner content
      css += s.replace(/<style[^>]*>|<\/style>/gi, '').trim() + '\n\n';
    });
    // Remove style tags from HTML
    html = html.replace(styleRegex, '');
  }

  // Extract JS from <script> tags
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  const scripts = html.match(scriptRegex);
  if (scripts) {
    scripts.forEach(s => {
      // Extract inner content
      js += s.replace(/<script[^>]*>|<\/script>/gi, '').trim() + '\n\n';
    });
    // Remove script tags from HTML
    html = html.replace(scriptRegex, '');
  }

  // Clean up extra newlines
  html = html.replace(/\n\s*\n/g, '\n');

  // Inject references for template consistency in the Editor
  if (css && !html.includes('index.css')) {
      const headEnd = html.indexOf('</head>');
      if (headEnd !== -1) {
          html = html.slice(0, headEnd) + '    <link rel="stylesheet" href="index.css">\n' + html.slice(headEnd);
      }
  }
  if (js && !html.includes('index.js')) {
       const bodyEnd = html.indexOf('</body>');
       if (bodyEnd !== -1) {
           html = html.slice(0, bodyEnd) + '    <script src="index.js"></script>\n' + html.slice(bodyEnd);
       }
  }

  return { html, css, js };
}

export function cleanCodeBlock(content: string, language?: 'html' | 'css' | 'js'): string {
    if (!content) return '';
    
    // Remove markdown code blocks (most common format: ```language\ncode\n```)
    let clean = content.replace(/```[a-z]*\n?([\s\S]*?)\n?```/gi, '$1')
                       .replace(/```/g, '')
                       .trim();
    
    // Remove HTML style/script wrappers that AI might add
    // Remove <style> tags and their content wrappers
    clean = clean.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '$1');
    // Remove <script> tags and their content wrappers
    clean = clean.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '$1');
    
    // Remove common prefixes that AI models sometimes add
    const prefixes = [
        /^Here is (the |updated |the updated )?(code|file|content)( for (the file )?.*?)?[:\n]/i,
        /^Here['']s (the |updated )?(code|file|content)[:\n]/i,
        /^Updated (code|file|content)[:\n]/i,
        /^(The |Updated )?(code|file) (is|below|follows)[:\n]/i,
        /^file:.*?[\n]/i,
        /^filename:.*?[\n]/i,
        /^index\.(css|js):[\n]/i,
    ];
    
    for (const prefix of prefixes) {
        clean = clean.replace(prefix, '').trim();
    }
    
    // Language-specific detection and cleaning
    if (language === 'css' || (!language && (clean.includes('{') || clean.includes('@') || clean.includes(':')))) {
        // For CSS: Look for @, :root, or CSS selectors (word followed by {)
        const cssPatterns = [
            /(@[a-z-]+|:root|@media|@keyframes|@import|@charset)/i,
            /^[a-zA-Z#.\[][^{]*\{/m, // CSS selector pattern
        ];
        
        for (const pattern of cssPatterns) {
            const match = clean.match(pattern);
            if (match && match.index !== undefined && match.index < 200) {
                clean = clean.substring(match.index);
                break;
            }
        }
        
        // If still contains HTML tags, remove them (CSS shouldn't have HTML)
        if (clean.includes('<')) {
            clean = clean.replace(/<[^>]*>/g, '').trim();
        }
    } 
    else if (language === 'js' || (!language && (clean.includes('const ') || clean.includes('function ') || clean.includes('let ') || clean.includes('var ')))) {
        // For JS: Look for const, function, let, var, class, export, import
        const jsPattern = /^(const|function|let|var|class|export|import|\/\*|\/\/|\(|\[|document|window|console)/m;
        const match = clean.match(jsPattern);
        if (match && match.index !== undefined && match.index < 200) {
            clean = clean.substring(match.index);
        }
        
        // If still contains HTML tags, remove them (JS shouldn't have HTML)
        if (clean.includes('<')) {
            clean = clean.replace(/<[^>]*>/g, '').trim();
        }
    }
    else {
        // For HTML: Look for <!DOCTYPE or <html or <head or first <
        if (clean.includes('<!DOCTYPE') || clean.includes('<html') || clean.includes('<head')) {
            const htmlStart = Math.max(
                clean.indexOf('<!DOCTYPE') >= 0 ? clean.indexOf('<!DOCTYPE') : -1,
                clean.indexOf('<html') >= 0 ? clean.indexOf('<html') : -1,
                clean.indexOf('<head') >= 0 ? clean.indexOf('<head') : -1,
                clean.indexOf('<') >= 0 ? clean.indexOf('<') : -1
            );
            if (htmlStart > 0 && htmlStart < 200) {
                clean = clean.substring(htmlStart);
            }
        }
    }
    
    return clean.trim();
}

export async function generateCodeWithOpenAI(prompt: string): Promise<CodeBundle> {
  const systemPrompt = `You are an expert full-stack web developer.
  Your task is to generate a complete, working single-page web application based strictly on the user's description.
  
  Requirements:
  1. Return ONLY the raw HTML code, starting with <!DOCTYPE html>.
  2. Embed all CSS styles in a <style> tag within the <head>.
  3. Embed all JavaScript logic in a <script> tag at the end of the <body>.
  4. The code must be modern, responsive, and visually appealing.
  5. Do NOT include any markdown formatting (no \`\`\`html or \`\`\`).
  6. Do NOT include any explanations, text, or comments outside the HTML.
  7. Do NOT use external CSS or JS files. Keep everything in the single HTML response.
  8. PRIORITIZE Accessibility: Use semantic HTML5 elements (main, nav, header, footer, section), proper ARIA labels, alt text for images, and explicit form labels.
  `;

  let lastError: any = null;

  for (const model of MODELS) {
    try {
      // console.log(`Generating code with model: ${model}`);
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://webcrafter.ai',
          'X-Title': 'WebCrafter AI'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Create a functional web page for: ${prompt}` }
          ]
        })
      });

      if (response.status === 429) {
          console.warn(`Model ${model} rate limited (429). Trying next model...`);
          continue;
      }

      if (!response.ok) {
          const errText = await response.text();
          console.warn(`Model ${model} failed generation: ${response.status} - ${errText}`);
          continue;
      }

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const content = data.choices[0].message.content.trim();
        return parseResponseToCodeBundle(content);
      }
    } catch (error) {
      console.error(`Error with model ${model}:`, error);
      lastError = error;
    }
  }

  console.error("All models failed generation", lastError);
  return {
      html: `<!-- Error generating code -->\n<div style="color: #ef4444; padding: 20px; text-align: center; font-family: sans-serif;">\n  <h2>Generation Failed</h2>\n  <p>The AI could not generate your request. Please try again.</p>\n  <p style="font-size: 12px; color: #888;">${lastError instanceof Error ? lastError.message : "Service unavailable"}</p>\n</div>`,
      css: 'body { background: #111; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }',
      js: 'console.error("Generation failed");'
  };
}

export async function refineCodeWithOpenAI(prompt: string, currentCode: CodeBundle): Promise<CodeBundle> {
    const systemPrompt = `You are an expert web developer that refines existing code.
    
    CRITICAL RULES:
    1. You will receive a complete HTML file with embedded CSS and JavaScript
    2. Apply ONLY the specific changes requested by the user
    3. Preserve ALL existing functionality, structure, and logic
    4. Do NOT rewrite the entire application - only modify what's requested
    5. Return the complete HTML file with CSS in <style> tags and JS in <script> tags
    6. Do NOT include markdown code blocks or explanations
    7. Start your response immediately with <!DOCTYPE html> or the HTML content
    
    FILE STRUCTURE:
    - HTML should reference "index.css" and "index.js" in link/script tags if external files are used
    - CSS should be in <style> tags within <head>
    - JavaScript should be in <script> tags before </body>
    `;

    // Reconstruct the file so the AI sees the full context properly
    let fullCode = currentCode.html;

    // Remove existing link/script references to avoid confusion since we are injecting content inline
    fullCode = fullCode.replace(/<link[^>]*href=["']index\.css["'][^>]*>/gi, '');
    fullCode = fullCode.replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, ''); // Also remove old style.css references
    fullCode = fullCode.replace(/<script[^>]*src=["']index\.js["'][^>]*><\/script>/gi, '');
    fullCode = fullCode.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, ''); // Also remove old script.js references

    // Inject CSS into head if possible, or prepend
    if (currentCode.css && currentCode.css.trim()) {
        const styleTag = `<style>\n${currentCode.css}\n</style>`;
        if (fullCode.includes('</head>')) {
            fullCode = fullCode.replace('</head>', `${styleTag}\n</head>`);
        } else {
            fullCode = styleTag + '\n' + fullCode;
        }
    }

    // Inject JS into body end if possible, or append
    if (currentCode.js && currentCode.js.trim()) {
        const scriptTag = `<script>\n${currentCode.js}\n</script>`;
        if (fullCode.includes('</body>')) {
            fullCode = fullCode.replace('</body>', `${scriptTag}\n</body>`);
        } else {
            fullCode = fullCode + '\n' + scriptTag;
        }
    }

    for (const model of MODELS) {
        try {
            // console.log(`Refining code with model: ${model}`);
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://webcrafter.ai',
                    'X-Title': 'WebCrafter AI'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: `
                        Current Code Context:
                        ${fullCode}

                        User Request: ${prompt}
                        
                        Return the updated single HTML file:
                        ` }
                    ]
                })
            });

            if (response.status === 429) {
                 console.warn(`Model ${model} rate limited (429). Trying next model...`);
                 continue;
            }

            if (!response.ok) {
                 const errText = await response.text();
                 console.warn(`Model ${model} failed refinement: ${response.status} - ${errText}`);
                 continue;
            }
            
            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                const content = data.choices[0].message.content.trim();
                return parseResponseToCodeBundle(content);
            }
        } catch (error) {
            console.error(`Refine error with ${model}`, error);
        }
    }
    
    // If all models fail, return original code to prevent app crash
    console.error("All models failed refinement");
    throw new Error("Unable to refine code. AI service may be busy or context is too large.");
}

export async function refineActiveCodeWithOpenAI(prompt: string, activeLang: Language, currentCode: CodeBundle): Promise<string> {
    const isHtml = activeLang === 'html';
    const isCss = activeLang === 'css';
    const isJs = activeLang === 'js';
    const filename = isHtml ? 'index.html' : (isCss ? 'index.css' : 'index.js');

    const systemPrompt = `You are a specialized code editor AI that directly edits source code files.
    
    CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
    1. You are editing ONLY the file: "${filename}"
    2. Return ONLY the complete code for "${filename}" - nothing else
    3. Do NOT include any HTML tags, <style> tags, or <script> tags
    4. Do NOT include markdown code blocks (no \`\`\` markers, no language tags)
    5. Do NOT include explanations, comments, or any text outside the code
    6. Do NOT include file paths, headers, or prefixes like "Here is the code:"
    7. Start your response immediately with the actual code content
    8. Return the ENTIRE file content, not just the changed parts
    9. Preserve all existing functionality while applying the requested changes
    
    ${isCss ? `CSS-SPECIFIC RULES (CRITICAL):
    - Return ONLY pure CSS code - no HTML, no <style> tags, no markdown
    - Start directly with CSS selectors, @rules, or CSS variables
    - Include ALL existing CSS rules from the current file
    - Only modify or add the styles requested by the user
    - Maintain proper CSS syntax and formatting
    - Example start: "body { margin: 0; }" or ":root { --color: red; }" or "@media..."
    - DO NOT start with "<style>" or code block markers or any HTML tags` : ''}
    
    ${isJs ? `JAVASCRIPT-SPECIFIC RULES (CRITICAL):
    - Return ONLY pure JavaScript code - no HTML, no <script> tags, no markdown
    - Start directly with JavaScript code: const, function, let, var, class, export, import, etc.
    - Include ALL existing JavaScript code from the current file
    - Only modify or add the code requested by the user
    - Maintain proper JavaScript syntax and formatting
    - Example start: "const element = document.querySelector('.class');" or "function myFunction() {"
    - DO NOT start with "<script>" or markdown code blocks or any HTML tags` : ''}
    
    ${isHtml ? `HTML-SPECIFIC RULES:
    - Return complete HTML starting with <!DOCTYPE html> or the opening tag
    - Preserve all existing elements and attributes
    - Only modify what the user specifically requested` : ''}
    
    CONTEXT UNDERSTANDING:
    - The "Project Context" shows you the complete current state of all files
    - Use this to understand relationships between HTML classes, CSS selectors, and JS functions
    - When editing one file, ensure it works correctly with the other files
    
    RESPONSE FORMAT:
    Start immediately with the code. Do not preface it with anything. No HTML tags for CSS/JS files.
    `;

    // We pass the full project context so the AI knows about class names, IDs, etc.
    const contextMsg = `
    === PROJECT CONTEXT START ===
    [index.html]:
    ${currentCode.html}

    [index.css]:
    ${currentCode.css}

    [index.js]:
    ${currentCode.js}
    === PROJECT CONTEXT END ===

    === USER REQUEST ===
    You are editing the file "${filename}". Apply the following change to ONLY this file: ${prompt}
    
    ${isCss ? `CRITICAL: You are editing a CSS file. Return ONLY CSS code:
    - NO HTML tags (no <style>, no <html>, no <body>)
    - NO markdown code blocks
    - Start directly with CSS selectors or @rules
    - Return the complete CSS file content` : ''}
    
    ${isJs ? `CRITICAL: You are editing a JavaScript file. Return ONLY JavaScript code:
    - NO HTML tags (no <script>, no <html>, no <body>)
    - NO markdown code blocks
    - Start directly with JavaScript statements
    - Return the complete JavaScript file content` : ''}
    
    ${isHtml ? `You are editing an HTML file. Return complete HTML with all changes.` : ''}
    
    IMPORTANT INSTRUCTIONS:
    1. Return ONLY the complete, updated code for "${filename}" - nothing else
    2. Do NOT include markdown code blocks (no \`\`\` markers)
    3. Do NOT include explanations or comments about what you changed
    4. ${isCss ? 'Return ONLY CSS - no HTML tags, no <style> wrapper' : ''}
    5. ${isJs ? 'Return ONLY JavaScript - no HTML tags, no <script> wrapper' : ''}
    6. Make sure the code is valid and functional
    
    === RESPONSE ===
    (Return ONLY the updated code for ${filename} below, starting immediately with the actual code):
    `;

    let lastError = null;

    for (const model of MODELS) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://webcrafter.ai',
                    'X-Title': 'WebCrafter AI'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: contextMsg }
                    ]
                })
            });

            // Handle Rate Limits specifically to retry faster
            if (response.status === 429) {
                 console.warn(`Model ${model} rate limited (429). Trying next...`);
                 continue;
            }

            if (!response.ok) {
                 const errText = await response.text();
                 console.warn(`Model ${model} failed refinement: ${response.status} - ${errText}`);
                 lastError = `${response.status} - ${errText}`;
                 continue;
            }

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                let content = data.choices[0].message.content.trim();
                
                // Additional cleaning for refine operations with language-specific cleaning
                content = cleanCodeBlock(content, activeLang);
                
                // Validate that we got actual code, not just empty or error messages
                if (!content || content.length < 10) {
                    throw new Error(`AI returned empty or too short content for ${filename}`);
                }
                
                // Language-specific validation
                if (isCss) {
                    // CSS should not contain HTML tags
                    if (content.includes('<style') || content.includes('<html') || content.includes('<!DOCTYPE')) {
                        // Remove HTML wrapper if present
                        content = content.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '$1').trim();
                        if (content.includes('<')) {
                            throw new Error(`AI returned HTML instead of CSS. Please try again.`);
                        }
                    }
                    // CSS should have at least one { or @
                    if (!content.includes('{') && !content.includes('@') && !content.includes(':')) {
                        throw new Error(`AI response doesn't appear to be valid CSS`);
                    }
                } else if (isJs) {
                    // JS should not contain HTML tags
                    if (content.includes('<script') || content.includes('<html') || content.includes('<!DOCTYPE')) {
                        // Remove HTML wrapper if present
                        content = content.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '$1').trim();
                        if (content.includes('<')) {
                            throw new Error(`AI returned HTML instead of JavaScript. Please try again.`);
                        }
                    }
                    // JS should have some JavaScript keywords or patterns
                    if (!content.match(/(const|function|let|var|class|export|import|document|window|console|=>|\(|\[)/)) {
                        throw new Error(`AI response doesn't appear to be valid JavaScript`);
                    }
                } else {
                    // HTML validation
                    if (content.toLowerCase().includes('sorry') || 
                        content.toLowerCase().includes('cannot') ||
                        content.toLowerCase().includes('unable') ||
                        (content.length < 50 && !content.includes('<'))) {
                        throw new Error(`AI response appears to be an error message rather than HTML`);
                    }
                }
                
                return content;
            }
        } catch (error) {
            console.error(`Refine error with ${model}`, error);
            lastError = error;
        }
    }

    throw new Error(`Unable to refine code. All models failed. Last error: ${lastError}`);
}

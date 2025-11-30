
// AI helper utilities for WebCrafter
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Multiple free models ordered by speed for best performance
const FREE_MODELS = [
  'x-ai/grok-4.1-fast:free',           // Fastest - optimized for speed
  'mistralai/mistral-7b-instruct:free',  // Very fast - small model
  'qwen/qwen3-coder:free',               // Fast - specialized for coding
  'nvidia/nemotron-nano-9b-v2:free',     // Fast - NVIDIA optimized
  'z-ai/glm-4.5-air:free',               // Medium speed
  'google/gemma-7b-it:free',              // Medium speed
  'anthropic/claude-3-haiku:free',        // Medium speed
  'qwen/qwen3-235b-a22b:free'            // Slowest - largest model
];

const MODEL = FREE_MODELS[0];

// Debug: Check if API key is loaded
console.log('API Key loaded:', OPENROUTER_API_KEY ? 'YES' : 'NO');

export async function generateWebsiteFromPrompt(prompt: string): Promise<{ html: string; css: string; js: string }> {
  // Check if API key is available
  if (!OPENROUTER_API_KEY) {
    console.error('No API key found. Please check your .env file.');
    return {
      html: '<h1>API Key Missing</h1><p>Please add VITE_OPENROUTER_API_KEY to your .env file and restart the server.</p>',
      css: 'body { font-family: Arial; margin: 20px; text-align: center; color: red; }',
      js: '// API Key Error'
    };
  }

  const aiPrompt = `You are an expert web developer. Generate complete, functional HTML, CSS, and JavaScript code based on the user's prompt.

Requirements:
1. Create a complete, standalone website that works immediately
2. Use modern, semantic HTML5 structure
3. Include responsive CSS with modern design (flexbox/grid, nice colors, typography)
4. Add interactive JavaScript features that make the site functional
5. Ensure all code is production-ready and bug-free
6. Include proper meta tags, accessibility, and best practices

User Request: ${prompt}

You MUST return a strictly valid JSON object with this exact structure:
{
  "html": "Complete HTML code with head, body, and all content. Use only inline styles and scripts, no external file references.",
  "css": "Complete CSS code for styling the page",
  "js": "Complete JavaScript code for interactivity"
}

Make the website impressive and fully functional along with atleast one feature or functionality that matches the user's prompt.

IMPORTANT: Do not include any external CSS or JS file references (like href="index.css" or src="index.js"). All styles and scripts must be inline or embedded directly in the HTML.`;

  try {
    console.log('Making API request with available models:', FREE_MODELS.length);
    
    // Try each model until one works
    for (let i = 0; i < FREE_MODELS.length; i++) {
      const currentModel = FREE_MODELS[i];
      console.log(`Trying model ${i + 1}/${FREE_MODELS.length}: ${currentModel}`);
      
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
            model: currentModel,
            messages: [{ role: 'user', content: aiPrompt }],
            response_format: { type: 'json_object' }
          })
        });

        console.log(`Model ${currentModel} response status:`, response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Success with model: ${currentModel}`);
          const text = data.choices[0]?.message?.content || "{}";
          
          try {
            const result = JSON.parse(text);
            return {
              html: result.html || '<h1>Generated Website</h1>',
              css: result.css || 'body { font-family: Arial; margin: 20px; }',
              js: result.js || '// Generated JavaScript'
            };
          } catch (parseError) {
            console.error(`Failed to parse JSON response from ${currentModel}:`, parseError);
            console.error("Raw response text:", text);
            // Continue to next model
            continue;
          }
        } else {
          const errorText = await response.text();
          console.error(`Model ${currentModel} failed:`, response.status, errorText);
          // Continue to next model
          continue;
        }
      } catch (modelError) {
        console.error(`Error with model ${currentModel}:`, modelError);
        // Continue to next model
        continue;
      }
    }
    
    // All models failed
    console.error('All free models failed or rate-limited');
    return fallbackErrorResponse();
    
  } catch (error) {
    console.error("Error in AI generation process:", error);
    return fallbackErrorResponse();
  }

  function fallbackErrorResponse() {
    return {
      html: '<h1>AI Currently Unavailable</h1><p>All AI models are temporarily busy. Please try again in a minute or use a template instead.</p>',
      css: 'body { font-family: Arial; margin: 20px; text-align: center; color: #666; }',
      js: '// All models busy'
    };
  }
}

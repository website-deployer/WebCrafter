

import { DEFAULT_PAGE_CONFIG } from '../constants';

// Local configuration for the core AI generator
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Prefer fast/free models first, fall back to others if needed
const MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'google/gemini-2.0-pro-exp-02-05:free',
  'meta-llama/llama-3.3-70b-instruct:free'
];
import { PageConfig } from '../types';

// Simplified Schema Description for Prompting
const SCHEMA_PROMPT = `
{
  "theme": {
    "primaryColor": "Hex color code (e.g., #4F46E5)",
    "fontFamily": "Font family string (e.g., Inter, Poppins)"
  },
  "sections": [
    {
      "type": "One of: header, hero, features, about, contact, testimonials, pricing, gallery, faq, cta, footer",
      "content": {
        "title": "Section title",
        "subtitle": "Subtitle text",
        "text": "Paragraph text",
        "buttonText": "Button label",
        "imageUrl": "picsum.photos URL (e.g. https://picsum.photos/800/600?random=1)",
        "items": [
          { "title": "Item title", "description": "Item desc", "imageUrl": "URL" }
        ],
        "navLinks": ["Link 1", "Link 2"],
        "footerText": "Footer copyright text",
        "faqs": [{ "question": "Q", "answer": "A" }]
      }
    }
  ]
}
`;

export async function generateWebsite(prompt: string, existingCode?: { html: string; css: string; js: string }): Promise<PageConfig> {
  const systemPrompt = `You are a world-class UI/UX designer and frontend developer. 
  Create a complete, visually stunning JSON structure for a webpage based on the user's prompt.
  
  Design Guidelines:
  - Use modern design principles: ample whitespace, consistent typography, and nice color palettes.
  - Incorporate modern aesthetics like Glassmorphism, subtle gradients, and rounded corners where appropriate.
  - Select sections that fit the user's request.
  - Use high-quality copywriting.
  - IMPORTANT: Keep text descriptions CONCISE to ensure the JSON fits within the response limit. Do not write long paragraphs.
  - Use specific, relevant picsum.photos URLs (e.g. random=1, random=2) to avoid caching issues.
  - Return STRICTLY valid JSON matching the schema below. 
  - Do NOT include comments, markdown blocks, or trailing commas.
  
  Expected JSON Schema Structure:
  ${SCHEMA_PROMPT}
  `;
  
  const refinePrompt = `You are an expert web developer AI. A user wants to refine their existing website.
  Based on the user's request, you must generate a new JSON object that reflects the requested changes.
  User's request: "${prompt}"
  `;

  const finalPrompt = existingCode ? refinePrompt : `Create a website for: ${prompt}`;
  
  for (const model of MODELS) {
    try {
      console.log(`Trying model via OpenRouter: ${model}`);
      
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
            { role: 'user', content: finalPrompt }
          ],
          // Use json_object response format if the model supports it (like GPT-4/3.5-turbo)
          response_format: model.includes('gpt') ? { type: 'json_object' } : undefined
        })
      });

      if (!response.ok) {
          console.warn(`Model ${model} failed with status ${response.status}`);
          continue;
      }

      const data = await response.json();
      let jsonString = data.choices?.[0]?.message?.content || '';
      jsonString = jsonString.trim();
      
      // Extract JSON from markdown code blocks if present
      const markdownMatch = jsonString.match(/```json\s*([\s\S]*?)\s*```/);
      if (markdownMatch && markdownMatch[1]) {
        jsonString = markdownMatch[1];
      } else {
         const genericMatch = jsonString.match(/```\s*([\s\S]*?)\s*```/);
         if (genericMatch && genericMatch[1]) {
             jsonString = genericMatch[1];
         }
      }

      // Robustly find the JSON bounds
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
          jsonString = jsonString.substring(firstBrace, lastBrace + 1);
      }
      
      try {
        const parsedJson = JSON.parse(jsonString) as PageConfig;
        if (parsedJson && parsedJson.theme && parsedJson.sections) {
            return parsedJson;
        } else {
            console.warn(`Model ${model} returned incomplete JSON structure.`);
        }
      } catch (parseError) {
        console.error(`JSON Parse Error for model ${model}:`, parseError);
        // If it failed to parse, it might be truncated. Continue to next model.
      }

    } catch (error) {
      console.error(`Error with model ${model}:`, error);
      // Continue to try the next model
    }
  }

  console.warn('All models failed. Returning default page configuration.');
  return DEFAULT_PAGE_CONFIG;
}

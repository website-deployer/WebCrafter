# WebCrafter AI - AI-Powered Website Generator

<div align="center">
<img width="1200" height="475" alt="WebCrafter Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

WebCrafter is an AI-powered web development platform that generates complete, functional websites from natural language descriptions. Perfect for beginners and educational use.

## ✨ Features

- 🤖 **AI Website Generation** - Generate complete HTML, CSS, and JavaScript from text prompts
- 🎨 **Live Code Editor** - Monaco-powered editor with syntax highlighting
- 📱 **Responsive Preview** - Real-time preview of generated websites
- 🎯 **Beginner-Friendly** - Designed for students and coding beginners
- 🔄 **Multiple AI Models** - 8 free AI models for high availability
- 🌙 **Dark/Light Theme** - Toggle between themes
- 📦 **Template Library** - Pre-built website templates
- 💾 **Project Export** - Download generated code

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- OpenRouter API key (free)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd webcrafter
npm install
```

2. **Set up environment variables:**
```bash
# Copy the example environment file
cp .env.example .env

# Add your OpenRouter API key (get one free at https://openrouter.ai/)
# Edit .env and add:
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
webcrafter/
├── components/          # React components
│   ├── IdeaInputPage.tsx    # AI prompt input page
│   ├── PlaygroundPage.tsx    # Main editor interface
│   ├── CodeEditor.tsx        # Monaco code editor
│   ├── Preview.tsx           # Website preview iframe
│   └── Sidebar.tsx           # Language selector
├── services/           # API and utility services
│   ├── aiFeatures.ts        # AI generation functions
│   └── templates.ts         # Website templates
├── hooks/              # React hooks
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🎯 AI Features

WebCrafter uses multiple free AI models for maximum availability:

- **Grok 4.1 Fast** (X.AI) - Fastest responses
- **Mistral 7B** (Mistral) - Reliable and quick
- **Qwen 3 Coder** (Alibaba) - Specialized for coding
- **Nemotron Nano** (NVIDIA) - Hardware optimized
- **And 4 more free models** as fallbacks

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### One-Click Deploy
```bash
npm run deploy
```

## 🌐 Deployment Options

### Static Hosting (Recommended)
Deploy to any static hosting service:

1. **Build the project:**
```bash
npm run build
```

2. **Deploy the `dist/` folder to:**
- Vercel
- Netlify  
- GitHub Pages
- Cloudflare Pages
- Any static hosting service

### Environment Variables in Production
Create `.env.production` with your production API key:
```bash
VITE_OPENROUTER_API_KEY=your_production_api_key_here
```

## 🎓 Educational Use

WebCrafter is perfect for:
- **Classroom settings** (26+ students supported)
- **Coding beginners** learning web development
- **AI education** and prompt engineering
- **Web development workshops**

### Classroom Setup
1. Each student gets their own OpenRouter API key (free)
2. The multi-model system ensures high availability
3. Automatic load balancing prevents rate limiting

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Monaco Editor** - Code editing
- **Tailwind CSS** - Styling
- **OpenRouter API** - AI model access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **API Issues**: Check your OpenRouter API key in `.env`
- **Build Issues**: Ensure Node.js 16+ is installed
- **AI Generation**: Try again if rate limited (multiple models available)

---

**Made by Abhinav Mishra**

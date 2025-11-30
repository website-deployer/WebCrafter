
import { PageConfig, Section, CodeBundle } from '../types';

function escapeHtml(unsafe: string | undefined): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateSectionHtml(section: Section): string {
  const { type, content } = section;
  const titleHtml = content.title ? `<h2>${escapeHtml(content.title)}</h2>` : '';
  const subtitleHtml = content.subtitle ? `<p class="subtitle">${escapeHtml(content.subtitle)}</p>` : '';

  switch (type) {
    case 'header':
      return `
        <header>
          <div class="container">
            <a href="#" class="logo">${escapeHtml(content.title || 'Logo')}</a>
            <nav>
              <button class="mobile-menu-btn">☰</button>
              <ul class="nav-menu">
                ${(content.navLinks || []).map(link => `<li><a href="#">${escapeHtml(link)}</a></li>`).join('')}
              </ul>
            </nav>
          </div>
        </header>`;
    case 'hero':
      // Safe style attribute generation
      const bgStyle = content.imageUrl ? `style="background-image: url('${content.imageUrl.replace(/'/g, "\\'")}')"` : '';
      return `
        <section class="hero" ${bgStyle}>
          <div class="hero-overlay"></div>
          <div class="container">
            <div class="hero-content animate-fade-up">
              <h1>${escapeHtml(content.title || 'Your Big Headline')}</h1>
              ${subtitleHtml}
              ${content.buttonText ? `<a href="#" class="button primary-btn">${escapeHtml(content.buttonText)}</a>` : ''}
            </div>
          </div>
        </section>`;
    case 'features':
       return `
        <section class="features">
          <div class="container">
            ${titleHtml}
            <div class="feature-grid">
              ${(content.items || []).map(item => `
                <div class="feature-card">
                  ${item.imageUrl ? `<div class="feature-icon"><img src="${item.imageUrl}" alt="${escapeHtml(item.title)}"></div>` : ''}
                  <div class="card-content">
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.description)}</p>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </section>`;
    case 'about':
      return `
        <section class="about">
          <div class="container">
              ${titleHtml}
              <div class="about-content">
                  ${content.imageUrl ? `<div class="about-image"><img src="${content.imageUrl}" alt="${escapeHtml(content.title || 'About us')}"></div>` : ''}
                  <div class="about-text">
                      <p>${escapeHtml(content.text || 'Information about your company or project.')}</p>
                      <a href="#" class="text-link">Learn More &rarr;</a>
                  </div>
              </div>
          </div>
        </section>`;
    case 'contact':
      return `
        <section class="contact">
          <div class="container">
            ${titleHtml}
            ${subtitleHtml}
            <div class="contact-wrapper">
              <form class="contact-form">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                  <label>Message</label>
                  <textarea rows="5" placeholder="How can we help?" required></textarea>
                </div>
                <button type="submit" class="button primary-btn">${escapeHtml(content.buttonText || 'Send Message')}</button>
              </form>
            </div>
          </div>
        </section>`;
    case 'testimonials':
        return `
        <section class="testimonials">
            <div class="container">
                ${titleHtml}
                <div class="testimonial-grid">
                    ${(content.items || []).map(item => `
                    <div class="testimonial-card">
                        <p>"${escapeHtml(item.description)}"</p>
                        <div class="author">
                            ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${escapeHtml(item.title)}">` : ''}
                            <span>- ${escapeHtml(item.title)}</span>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
        </section>`;
    case 'pricing':
        return `
        <section class="pricing">
            <div class="container">
                ${titleHtml}
                <div class="pricing-grid">
                    ${(content.items || []).map(item => `
                    <div class="pricing-card">
                        <h3>${escapeHtml(item.title)}</h3>
                        <div class="price">${escapeHtml(item.price || '$0')}</div>
                        <p>${escapeHtml(item.description)}</p>
                        <ul>
                            ${(item.features || []).map(f => `<li>✓ ${escapeHtml(f)}</li>`).join('')}
                        </ul>
                        <button class="button primary-btn">Choose Plan</button>
                    </div>`).join('')}
                </div>
            </div>
        </section>`;
    case 'faq':
        return `
        <section class="faq">
            <div class="container">
                ${titleHtml}
                <div class="faq-list">
                    ${(content.faqs || []).map((faq, index) => `
                    <div class="faq-item">
                        <button class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                            ${escapeHtml(faq.question)}
                            <span class="icon">+</span>
                        </button>
                        <div class="faq-answer">
                            <p>${escapeHtml(faq.answer)}</p>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
        </section>`;
    case 'cta':
        return `
        <section class="cta">
            <div class="container">
                <h2>${escapeHtml(content.title || 'Ready to get started?')}</h2>
                <p>${escapeHtml(content.subtitle || 'Join us today and experience the difference.')}</p>
                <a href="#" class="button primary-btn large">${escapeHtml(content.buttonText || 'Get Started Now')}</a>
            </div>
        </section>`;
    case 'gallery':
        return `
        <section class="gallery">
            <div class="container">
                ${titleHtml}
                <div class="gallery-grid">
                    ${(content.items || []).map(item => `
                    <div class="gallery-item">
                        <img src="${item.imageUrl || 'https://picsum.photos/400/300'}" alt="${escapeHtml(item.title || 'Gallery Image')}">
                    </div>`).join('')}
                </div>
            </div>
        </section>`;
    case 'footer':
      return `
        <footer>
          <div class="container">
            <p>${escapeHtml(content.footerText || '© 2024 Your Company Name. All Rights Reserved.')}</p>
            <div class="social-links">
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
            </div>
          </div>
        </footer>`;
    default:
      // Fallback for unknown sections: try to render something useful
      return `
      <section class="generic-section">
        <div class="container">
            ${titleHtml}
            ${subtitleHtml}
            ${content.text ? `<p>${escapeHtml(content.text)}</p>` : ''}
        </div>
      </section>`;
  }
}

export function jsonToCode(config: PageConfig): CodeBundle {
  const { theme, sections } = config;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <link rel="stylesheet" href="index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(/'/g, "").replace(/ /g, "+")}:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <main>
      ${sections.map(generateSectionHtml).join('\n')}
    </main>
    <script src="index.js"></script>
</body>
</html>`;

  const css = `
:root {
  --primary-color: ${theme.primaryColor};
  --font-family: ${theme.fontFamily}, sans-serif;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --bg-color: #ffffff;
  --bg-alt: #f3f4f6;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --container-width: 1200px;
  --radius: 0.5rem;
}

/* --- GLOBAL STYLES --- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 24px;
}

section {
  padding: 100px 0;
}

h1, h2, h3, h4 {
  line-height: 1.2;
  font-weight: 700;
  color: #111827;
}

h1 { font-size: 3.5rem; letter-spacing: -0.02em; }
h2 { font-size: 2.5rem; text-align: center; margin-bottom: 1.5rem; letter-spacing: -0.01em; }
h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }

p { margin-bottom: 1rem; color: var(--text-light); }
a { text-decoration: none; color: inherit; transition: color 0.2s; }
ul { list-style: none; }
img { max-width: 100%; display: block; }

.subtitle {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
  font-size: 1.125rem;
}

.button {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.primary-btn {
  background-color: var(--primary-color);
  color: #fff;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  filter: brightness(110%);
}

.primary-btn.large {
    padding: 16px 48px;
    font-size: 1.2rem;
}

/* --- HEADER --- */
header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}
header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  letter-spacing: -1px;
}
.nav-menu {
  display: flex;
  gap: 40px;
}
.nav-menu a {
  font-weight: 500;
  color: var(--text-color);
}
.nav-menu a:hover {
  color: var(--primary-color);
}
.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

/* --- HERO --- */
.hero {
  color: #fff;
  min-height: 90vh;
  display: flex;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: -80px; /* Offset fixed header */
  padding-top: 80px;
}
.hero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}
.hero h1 {
  color: #fff;
  margin-bottom: 24px;
}
.hero .subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  margin-bottom: 40px;
}

/* --- FEATURES --- */
.features {
  background-color: var(--bg-alt);
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}
.feature-card {
  background: var(--bg-color);
  border-radius: var(--radius);
  padding: 40px;
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--hover-shadow);
}
.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: var(--bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
}
.feature-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- ABOUT --- */
.about-content {
  display: flex;
  align-items: center;
  gap: 60px;
}
.about-image {
  flex: 1;
  position: relative;
}
.about-image img {
  border-radius: var(--radius);
  box-shadow: var(--hover-shadow);
}
.about-text {
  flex: 1;
}
.text-link {
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
}

/* --- TESTIMONIALS --- */
.testimonials {
    background-color: #fff;
}
.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}
.testimonial-card {
    background: var(--bg-alt);
    padding: 30px;
    border-radius: var(--radius);
    position: relative;
}
.testimonial-card p {
    font-style: italic;
    font-size: 1.1rem;
    color: var(--text-color);
}
.testimonial-card .author {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-weight: bold;
}
.testimonial-card .author img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

/* --- PRICING --- */
.pricing {
    background-color: var(--bg-alt);
}
.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}
.pricing-card {
    background: #fff;
    padding: 40px;
    border-radius: var(--radius);
    text-align: center;
    box-shadow: var(--card-shadow);
    transition: transform 0.3s;
}
.pricing-card:hover {
    transform: translateY(-10px);
}
.pricing-card .price {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-color);
    margin: 20px 0;
}
.pricing-card ul {
    text-align: left;
    margin: 20px 0 30px;
}
.pricing-card li {
    margin-bottom: 10px;
    color: var(--text-light);
}

/* --- FAQ --- */
.faq { background: #fff; }
.faq-list { max-width: 800px; margin: 0 auto; }
.faq-item {
    border-bottom: 1px solid var(--bg-alt);
    margin-bottom: 10px;
}
.faq-question {
    width: 100%;
    text-align: left;
    padding: 20px;
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding: 0 20px;
}
.faq-item.active .faq-answer {
    max-height: 200px;
    padding-bottom: 20px;
}
.faq-item.active .icon {
    transform: rotate(45deg);
}

/* --- CTA --- */
.cta {
    background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
    color: #fff;
    text-align: center;
}
.cta h2 { color: #fff; }
.cta p { color: rgba(255,255,255,0.9); font-size: 1.25rem; margin-bottom: 30px; }
.cta .button { background: #fff; color: var(--primary-color); }
.cta .button:hover { background: #f9fafb; color: var(--primary-color); }

/* --- GALLERY --- */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
}
.gallery-item img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: var(--radius);
    transition: transform 0.3s;
}
.gallery-item img:hover {
    transform: scale(1.03);
}

/* --- CONTACT --- */
.contact {
  background-color: #fff;
}
.contact-wrapper {
    max-width: 600px;
    margin: 0 auto;
    background: var(--bg-alt);
    padding: 40px;
    border-radius: var(--radius);
}
.form-group {
    margin-bottom: 20px;
}
.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 0.9rem;
}
.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-family: inherit;
    transition: border-color 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    ring: 2px solid var(--primary-color);
}
.contact-form button {
    width: 100%;
}

/* --- FOOTER --- */
footer {
  background-color: #111827;
  color: #9ca3af;
  padding: 60px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}
footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.social-links {
    display: flex;
    gap: 20px;
}
.social-links a:hover {
    color: #fff;
}

/* --- UTILITIES --- */
.animate-fade-up {
    animation: fadeUp 0.8s ease-out;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  
  .nav-menu { display: none; }
  .mobile-menu-btn { display: block; }
  
  .about-content {
    flex-direction: column;
  }
  
  footer .container {
      flex-direction: column;
      gap: 20px;
      text-align: center;
  }
}
`;

  const js = `// Generated JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('DOM fully loaded and parsed');

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if(mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            const isHidden = window.getComputedStyle(navMenu).display === 'none';
            navMenu.style.display = isHidden ? 'flex' : 'none';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            navMenu.style.zIndex = '1001';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple Form Submission Handler
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sent!';
            btn.style.backgroundColor = '#10B981'; // Green
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    });
});
`;

  return { html, css, js };
}

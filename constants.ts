
import { DraggableBlockItem, PageConfig, Language } from './types';

export const AUTOSAVE_KEY = 'webcrafter_autosave';

export const DEFAULT_PAGE_CONFIG: PageConfig = {
  theme: {
    primaryColor: '#6366f1',
    fontFamily: "'Inter', sans-serif"
  },
  sections: [
    {
      type: 'header',
      content: {
        title: 'WebCrafter',
        navLinks: ['Home', 'Features', 'About', 'Contact']
      }
    },
    {
      type: 'hero',
      content: {
        title: 'Welcome to WebCrafter',
        subtitle: 'Create beautiful web pages with our intuitive editor. Get started by customizing this template to your needs!',
        buttonText: 'Get Started',
        imageUrl: 'https://picsum.photos/1920/1080?grayscale&blur=2'
      }
    },
    {
      type: 'features',
      content: {
        title: 'Our Features',
        items: [
          {
            title: 'Intuitive Editor',
            description: 'Create and customize your website with our easy-to-use drag-and-drop interface.',
            imageUrl: 'https://picsum.photos/400/300?random=1'
          },
          {
            title: 'Live Editing',
            description: 'Fine-tune every aspect of your site with a live preview and an intuitive code editor.',
            imageUrl: 'https://picsum.photos/400/300?random=2'
          },
          {
            title: 'Component Library',
            description: 'Drag and drop pre-built components to quickly build out your pages.',
            imageUrl: 'https://picsum.photos/400/300?random=3'
          }
        ]
      }
    },
    {
      type: 'about',
      content: {
        title: 'About Us',
        text: 'We are dedicated to making web development accessible to everyone. Our platform helps you create stunning websites with an intuitive interface and powerful editing tools, whether you\'re a beginner or an experienced developer.',
        imageUrl: 'https://picsum.photos/600/400?random=4'
      }
    },
    {
      type: 'footer',
      content: {
        footerText: '© 2024 WebCrafter. Built with ❤️'
      }
    }
  ]
};

const DRAGGABLE_BLOCKS_HTML: DraggableBlockItem[] = [
    // -- Getting Started --
    { type: 'Basic Page Structure', iconName: 'html', tags: ['beginner', 'template', 'start'], snippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome!</h1>
  <p>This is my first webpage.</p>
</body>
</html>` },
    { type: 'My First Heading', iconName: 'html', tags: ['beginner', 'text', 'title'], snippet: `<h1>Hello World!</h1>
<p>This is a paragraph below my heading.</p>` },
    { type: 'Simple Button', iconName: 'button', tags: ['beginner', 'click', 'action'], snippet: `<button onclick="alert('You clicked me!')">Click Me!</button>` },
    { type: 'Add an Image', iconName: 'image', tags: ['beginner', 'picture', 'media'], snippet: `<img src="https://picsum.photos/300/200" alt="A beautiful picture">
<p>Caption: A beautiful picture</p>` },
    { type: 'Create a Link', iconName: 'html', tags: ['beginner', 'navigation', 'url'], snippet: `<a href="https://www.google.com">Go to Google</a>
<p>This link opens in a new tab: <a href="https://www.google.com" target="_blank">Google (new tab)</a></p>` },
    { type: 'Text Formatting', iconName: 'html', tags: ['beginner', 'text', 'style'], snippet: `<h1>Big Title</h1>
<h2>Smaller Title</h2>
<p>Regular paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<p>You can also use <mark>highlighted text</mark> and <u>underlined text</u>.</p>` },
    { type: 'Line Breaks & HR', iconName: 'html', tags: ['beginner', 'layout', 'spacing'], snippet: `<p>First line<br>Second line (with line break)</p>
<hr>
<p>Text after horizontal rule</p>
<hr>
<p>More text</p>` },
    { type: 'Simple List', iconName: 'flexbox', tags: ['beginner', 'list', 'items'], snippet: `<h3>My Favorite Things</h3>
<ul>
  <li>Pizza</li>
  <li>Music</li>
  <li>Coding</li>
</ul>
<h3>Steps to Make Tea</h3>
<ol>
  <li>Boil water</li>
  <li>Add tea bag</li>
  <li>Wait 3 minutes</li>
  <li>Enjoy!</li>
</ol>` },
    { type: 'Description List', iconName: 'html', tags: ['beginner', 'list', 'definitions'], snippet: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language - used for web pages</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets - used for styling</dd>
  <dt>JavaScript</dt>
  <dd>Programming language for web interactivity</dd>
</dl>` },
    { type: 'Quote & Citation', iconName: 'html', tags: ['beginner', 'quote', 'text'], snippet: `<blockquote>
  <p>"The only way to learn a new programming language is by writing programs in it."</p>
  <footer>
    <cite>- Dennis Ritchie</cite>
  </footer>
</blockquote>` },
    { type: 'Code Display', iconName: 'html', tags: ['beginner', 'code', 'text'], snippet: `<p>Here's how to declare a variable in JavaScript:</p>
<code>let myVariable = "Hello";</code>

<p>For multiple lines:</p>
<pre>
function greet(name) {
  console.log("Hello, " + name);
}
</pre>` },
    { type: 'Simple Form', iconName: 'button', tags: ['beginner', 'input', 'submit'], snippet: `<form onsubmit="alert('Form submitted!'); return false;">
  <label>Name: <input type="text" placeholder="Enter your name"></label><br><br>
  <label>Email: <input type="email" placeholder="your@email.com"></label><br><br>
  <button type="submit">Send</button>
</form>` },
    { type: 'Text Input', iconName: 'button', tags: ['beginner', 'form', 'field'], snippet: `<label>Enter your name:</label>
<input type="text" placeholder="Type here..." value="Default text">` },
    { type: 'Password Field', iconName: 'button', tags: ['beginner', 'form', 'security'], snippet: `<label>Password:</label>
<input type="password" placeholder="Enter password">
<p>Password will be hidden as you type.</p>` },
    { type: 'Textarea', iconName: 'button', tags: ['beginner', 'form', 'text'], snippet: `<label>Leave a message:</label><br>
<textarea rows="4" cols="50" placeholder="Type your message here..."></textarea>` },
    { type: 'Number Input', iconName: 'button', tags: ['beginner', 'form', 'number'], snippet: `<label>Enter your age:</label>
<input type="number" min="1" max="120" value="25">
<p>Try the arrow keys or type a number!</p>` },
    { type: 'Date Picker', iconName: 'button', tags: ['beginner', 'form', 'date'], snippet: `<label>Select your birthday:</label>
<input type="date" value="2000-01-01">` },
    { type: 'Range Slider', iconName: 'button', tags: ['beginner', 'form', 'slider'], snippet: `<label>Volume: <span id="volumeValue">50</span></label><br>
<input type="range" min="0" max="100" value="50" oninput="document.getElementById('volumeValue').textContent = this.value">` },
    { type: 'Checkbox Example', iconName: 'button', tags: ['beginner', 'form', 'choice'], snippet: `<label><input type="checkbox"> I agree to the terms</label><br>
<label><input type="checkbox" checked> Subscribe to newsletter</label>` },
    { type: 'Radio Buttons', iconName: 'button', tags: ['beginner', 'form', 'choice'], snippet: `<p>Choose your level:</p>
<label><input type="radio" name="level" value="beginner"> Beginner</label><br>
<label><input type="radio" name="level" value="intermediate"> Intermediate</label><br>
<label><input type="radio" name="level" value="expert"> Expert</label>` },
    { type: 'Dropdown Menu', iconName: 'button', tags: ['beginner', 'form', 'select'], snippet: `<label>Choose your city:</label>
<select>
  <option>New York</option>
  <option>Los Angeles</option>
  <option>Chicago</option>
  <option>Other</option>
</select>` },
    { type: 'File Upload', iconName: 'button', tags: ['beginner', 'form', 'file'], snippet: `<label>Upload a picture:</label><br>
<input type="file" accept="image/*">
<p>This lets users select files from their computer.</p>` },
    { type: 'Hidden Field', iconName: 'button', tags: ['beginner', 'form', 'hidden'], snippet: `<input type="hidden" name="userId" value="12345">
<p>Hidden fields store data that users don't see (useful for forms).</p>` },
    { type: 'Fieldset & Legend', iconName: 'button', tags: ['beginner', 'form', 'group'], snippet: `<fieldset>
  <legend>Personal Information</legend>
  <label>First name: <input type="text"></label><br>
  <label>Last name: <input type="text"></label>r>
  <label>Email: <input type="email"></label>
</fieldset>` },
    { type: 'Simple Table', iconName: 'flexbox', tags: ['beginner', 'table', 'data'], snippet: `<h2>My Schedule</h2>
<table border="1">
  <tr>
    <th>Day</th>
    <th>Activity</th>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Coding</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Learning</td>
  </tr>
</table>` },
    { type: 'Div & Span', iconName: 'flexbox', tags: ['beginner', 'container', 'inline'], snippet: `<div style="background-color: lightblue; padding: 10px;">
  <p>This is inside a div (block element).</p>
  <p>This text is <span style="color: red; font-weight: bold;">red and bold</span> using a span (inline element).</p>
</div>` },
    { type: 'Comments', iconName: 'html', tags: ['beginner', 'comment', 'notes'], snippet: `<!-- This is a comment. It won't show on the page! -->
<h1>Visible Content</h1>
<!-- 
  Multi-line comment:
  This section is about contact info
-->
<p>Contact us at info@example.com</p>
<!-- TODO: Add phone number later -->` },
    { type: 'Meta Tags', iconName: 'html', tags: ['beginner', 'head', 'seo'], snippet: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn HTML with this beginner-friendly page">
  <meta name="keywords" content="HTML, beginner, tutorial">
  <meta name="author" content="Your Name">
  <title>My Learning Page</title>
</head>` },
    { type: 'Semantic HTML5', iconName: 'html', tags: ['beginner', 'semantic', 'structure'], snippet: `<header>
  <h1>My Website</h1>
  <nav>
    <a href="#home">Home</a> | 
    <a href="#about">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content goes here...</p>
  </article>
  
  <aside>
    <h3>Related Links</h3>
    <ul>
      <li><a href="#">Link 1</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2024 My Website</p>
</footer>` },

    // -- Interactive Examples --
    { type: 'Click Counter', iconName: 'button', tags: ['beginner', 'interactive', 'counter'], snippet: `<h2>Click Counter</h2>
<p>Clicks: <span id="clickCount">0</span></p>
<button onclick="incrementCounter()">Click Me!</button>
<button onclick="resetCounter()">Reset</button>

<script>
let count = 0;
function incrementCounter() {
  count++;
  document.getElementById('clickCount').textContent = count;
}
function resetCounter() {
  count = 0;
  document.getElementById('clickCount').textContent = count;
}
</script>` },
    { type: 'Color Picker', iconName: 'css', tags: ['beginner', 'interactive', 'color'], snippet: `<h2>Background Color Changer</h2>
<p>Current color: <span id="colorName">white</span></p>
<button onclick="changeColor('red')">Red</button>
<button onclick="changeColor('blue')">Blue</button>
<button onclick="changeColor('green')">Green</button>
<button onclick="changeColor('yellow')">Yellow</button>

<script>
function changeColor(color) {
  document.body.style.backgroundColor = color;
  document.getElementById('colorName').textContent = color;
}
</script>` },
    { type: 'Text Transformer', iconName: 'css', tags: ['beginner', 'interactive', 'text'], snippet: `<h2>Text Transformer</h2>
<input type="text" id="textInput" placeholder="Type something..." oninput="transformText()">
<p>Uppercase: <span id="upperText"></span></p>
<p>Lowercase: <span id="lowerText"></span></p>
<p>Length: <span id="textLength">0</span> characters</p>

<script>
function transformText() {
  const input = document.getElementById('textInput').value;
  document.getElementById('upperText').textContent = input.toUpperCase();
  document.getElementById('lowerText').textContent = input.toLowerCase();
  document.getElementById('textLength').textContent = input.length;
}
</script>` },
    { type: 'Simple Calculator', iconName: 'js', tags: ['beginner', 'interactive', 'math'], snippet: `<h2>Simple Calculator</h2>
<input type="number" id="num1" placeholder="First number">
<input type="number" id="num2" placeholder="Second number">
<br><br>
<button onclick="calculate('add')">+</button>
<button onclick="calculate('subtract')">-</button>
<button onclick="calculate('multiply')">×</button>
<button onclick="calculate('divide')">÷</button>
<p>Result: <span id="result">0</span></p>

<script>
function calculate(operation) {
  const num1 = parseFloat(document.getElementById('num1').value) || 0;
  const num2 = parseFloat(document.getElementById('num2').value) || 0;
  let result;
  
  switch(operation) {
    case 'add': result = num1 + num2; break;
    case 'subtract': result = num1 - num2; break;
    case 'multiply': result = num1 * num2; break;
    case 'divide': result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
  }
  
  document.getElementById('result').textContent = result;
}
</script>` },
    { type: 'Age Calculator', iconName: 'js', tags: ['beginner', 'interactive', 'date'], snippet: `<h2>Age Calculator</h2>
<label>Birth Date: <input type="date" id="birthDate" onchange="calculateAge()"></label>
<p>You are <span id="age">-</span> years old.</p>

<script>
function calculateAge() {
  const birthDate = new Date(document.getElementById('birthDate').value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  document.getElementById('age').textContent = age;
}
</script>` },
    { type: 'Random Quote', iconName: 'js', tags: ['beginner', 'interactive', 'random'], snippet: `<h2>Random Quote Generator</h2>
<button onclick="showRandomQuote()">Get Random Quote</button>
<blockquote id="quoteDisplay">Click the button to see a quote!</blockquote>

<script>
const quotes = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Life is 10% what happens to you and 90% how you react to it.",
  "The future belongs to those who believe in the beauty of their dreams."
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('quoteDisplay').textContent = quotes[randomIndex];
}
</script>` },
    { type: 'Todo List', iconName: 'js', tags: ['beginner', 'interactive', 'list'], snippet: `<h2>Simple Todo List</h2>
<input type="text" id="todoInput" placeholder="Add a task...">
<button onclick="addTodo()">Add</button>
<ul id="todoList"></ul>

<script>
function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.onclick = function() {
      this.style.textDecoration = this.style.textDecoration === 'line-through' ? '' : 'line-through';
    };
    document.getElementById('todoList').appendChild(li);
    input.value = '';
  }
}
</script>` },
    { type: 'Digital Clock', iconName: 'js', tags: ['beginner', 'interactive', 'time'], snippet: `<h2>Digital Clock</h2>
<div id="clock" style="font-size: 2em; font-family: monospace; background: black; color: lime; padding: 10px; display: inline-block;">
  00:00:00
</div>

<script>
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
}

updateClock();
setInterval(updateClock, 1000);
</script>` },

    // -- Structure --
    { type: 'Simple List', iconName: 'flexbox', tags: ['beginner', 'list', 'items'], snippet: `<h3>My Favorite Things</h3>
<ul>
  <li>Pizza</li>
  <li>Music</li>
  <li>Coding</li>
</ul>
<h3>Steps to Make Tea</h3>
<ol>
  <li>Boil water</li>
  <li>Add tea bag</li>
  <li>Wait 3 minutes</li>
  <li>Enjoy!</li>
</ol>` },
    { type: 'HTML5 Boilerplate', iconName: 'html', tags: ['base', 'template', 'start'], snippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>` },
    { type: 'Section', iconName: 'hero', tags: ['layout', 'div', 'container'], snippet: `<section class="section">\n  <div class="container">\n    <h2>Section Title</h2>\n    <p>Content goes here.</p>\n  </div>\n</section>` },
    { type: 'Container', iconName: 'flexbox', tags: ['layout', 'wrapper', 'div'], snippet: `<div class="container">\n  <!-- Content -->\n</div>` },
    { type: 'Div', iconName: 'flexbox', tags: ['block', 'box'], snippet: `<div>\n  \n</div>` },

    // -- Navigation --
    { type: 'Navbar Basic', iconName: 'hero', tags: ['menu', 'header', 'links'], snippet: `<nav class="navbar">\n  <a href="#" class="brand">Logo</a>\n  <ul class="nav-links">\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>` },
    { type: 'Breadcrumbs', iconName: 'flexbox', tags: ['nav', 'path', 'links'], snippet: `<nav aria-label="breadcrumb">\n  <ol class="breadcrumb">\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Library</a></li>\n    <li aria-current="page">Data</li>\n  </ol>\n</nav>` },

    // -- Hero & Headers --
    { type: 'Hero Section', iconName: 'hero', tags: ['banner', 'header', 'intro'], snippet: `<section class="hero">\n  <div class="hero-content">\n    <h1>Welcome to My Website</h1>\n    <p>Your catchy subtitle goes here.</p>\n    <button class="btn-primary">Get Started</button>\n  </div>\n</section>` },
    { type: 'Hero Split', iconName: 'hero', tags: ['banner', 'image', 'split'], snippet: `<section class="hero-split">\n  <div class="hero-text">\n    <h1>Headline</h1>\n    <p>Subtext here.</p>\n    <button>Action</button>\n  </div>\n  <div class="hero-image">\n    <img src="https://picsum.photos/600/400" alt="Hero">\n  </div>\n</section>` },
    
    // -- Features & Grid --
    { type: 'Features 3-Col', iconName: 'hero', tags: ['grid', 'columns', 'services'], snippet: `<section class="features">\n  <h2>Features</h2>\n  <div class="feature-grid">\n    <div class="feature-card"><h3>Fast</h3><p>Desc</p></div>\n    <div class="feature-card"><h3>Secure</h3><p>Desc</p></div>\n    <div class="feature-card"><h3>Reliable</h3><p>Desc</p></div>\n  </div>\n</section>` },
    { type: 'Card', iconName: 'card', tags: ['box', 'container', 'product'], snippet: `<div class="card">\n  <img src="https://picsum.photos/400/200" alt="Card Image">\n  <div class="card-body">\n    <h4>Card Title</h4>\n    <p>Some quick example text to build on the card title.</p>\n    <a href="#" class="btn">Go somewhere</a>\n  </div>\n</div>` },
    
    // -- Features / Plans --
    { type: 'Feature List', iconName: 'card', tags: ['pricing', 'list', 'comparison'], snippet: `<div class="feature-list">\n  <div class="item">\n    <h3>Starter</h3>\n    <ul><li>Feature 1</li><li>Feature 2</li></ul>\n    <button>Select</button>\n  </div>\n  <div class="item featured">\n    <h3>Pro</h3>\n    <ul><li>All features</li><li>Priority support</li></ul>\n    <button>Select</button>\n  </div>\n</div>` },
    { type: 'Testimonials', iconName: 'flexbox', tags: ['reviews', 'social', 'quotes'], snippet: `<div class="testimonials">\n  <div class="testimonial">\n    <p>"Amazing product!"</p>\n    <cite>- User A</cite>\n  </div>\n</div>` },

    // -- Forms --
    { type: 'Simple Form', iconName: 'button', tags: ['beginner', 'input', 'submit'], snippet: `<form onsubmit="alert('Form submitted!'); return false;">
  <label>Name: <input type="text" placeholder="Enter your name"></label><br><br>
  <label>Email: <input type="email" placeholder="your@email.com"></label><br><br>
  <button type="submit">Send</button>
</form>` },
    { type: 'Text Input', iconName: 'button', tags: ['beginner', 'form', 'field'], snippet: `<label>Enter your name:</label>
<input type="text" placeholder="Type here..." value="Default text">` },
    { type: 'Checkbox Example', iconName: 'button', tags: ['beginner', 'form', 'choice'], snippet: `<label><input type="checkbox"> I agree to the terms</label><br>
<label><input type="checkbox" checked> Subscribe to newsletter</label>` },
    { type: 'Radio Buttons', iconName: 'button', tags: ['beginner', 'form', 'choice'], snippet: `<p>Choose your level:</p>
<label><input type="radio" name="level" value="beginner"> Beginner</label><br>
<label><input type="radio" name="level" value="intermediate"> Intermediate</label><br>
<label><input type="radio" name="level" value="expert"> Expert</label>` },
    { type: 'Dropdown Menu', iconName: 'button', tags: ['beginner', 'form', 'select'], snippet: `<label>Choose your city:</label>
<select>
  <option>New York</option>
  <option>Los Angeles</option>
  <option>Chicago</option>
  <option>Other</option>
</select>` },
    { type: 'Contact Form', iconName: 'button', tags: ['input', 'email', 'submit'], snippet: `<form class="contact-form">\n  <div class="form-group">\n    <label>Name</label>\n    <input type="text" required>\n  </div>\n  <div class="form-group">\n    <label>Email</label>\n    <input type="email" required>\n  </div>\n  <button type="submit">Send</button>\n</form>` },
    { type: 'Login Form', iconName: 'button', tags: ['auth', 'signin', 'user'], snippet: `<form class="login-form">\n  <h2>Login</h2>\n  <input type="email" placeholder="Email">\n  <input type="password" placeholder="Password">\n  <button>Login</button>\n</form>` },
    { type: 'Search Bar', iconName: 'button', tags: ['input', 'find', 'query'], snippet: `<div class="search-bar">\n  <input type="text" placeholder="Search...">\n  <button>🔍</button>\n</div>` },
    { type: 'Checkbox', iconName: 'button', tags: ['input', 'select', 'option'], snippet: `<label><input type="checkbox"> Remember me</label>` },
    { type: 'Radio', iconName: 'button', tags: ['input', 'select', 'option'], snippet: `<label><input type="radio" name="opt"> Option 1</label>` },
    { type: 'Select', iconName: 'button', tags: ['dropdown', 'menu', 'option'], snippet: `<select>\n  <option>Option 1</option>\n  <option>Option 2</option>\n</select>` },

    // -- Media --
    { type: 'Image', iconName: 'image', tags: ['picture', 'photo', 'media'], snippet: `<img src="https://picsum.photos/400/300" alt="Placeholder">` },
    { type: 'Figure', iconName: 'image', tags: ['caption', 'picture', 'media'], snippet: `<figure>\n  <img src="https://picsum.photos/400/300" alt="Img">\n  <figcaption>Caption</figcaption>\n</figure>` },
    { type: 'Video Embed', iconName: 'image', tags: ['youtube', 'media', 'player'], snippet: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>` },

    // -- Text --
    { type: 'Heading H1', iconName: 'html', tags: ['title', 'typography', 'large'], snippet: `<h1>Main Heading</h1>` },
    { type: 'Heading H2', iconName: 'html', tags: ['subtitle', 'typography', 'medium'], snippet: `<h2>Sub Heading</h2>` },
    { type: 'Paragraph', iconName: 'html', tags: ['text', 'content', 'body'], snippet: `<p>Lorem ipsum dolor sit amet.</p>` },
    { type: 'Blockquote', iconName: 'html', tags: ['quote', 'text', 'citation'], snippet: `<blockquote><p>Quote text.</p></blockquote>` },
    { type: 'List UL', iconName: 'flexbox', tags: ['bullets', 'items', 'unordered'], snippet: `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>` },
    { type: 'List OL', iconName: 'flexbox', tags: ['numbered', 'items', 'ordered'], snippet: `<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ol>` },

    // -- Components --
    { type: 'Button', iconName: 'button', tags: ['click', 'action', 'link'], snippet: `<button class="btn">Click Me</button>` },
    { type: 'Modal Structure', iconName: 'card', tags: ['popup', 'overlay', 'dialog'], snippet: `<div class="modal">\n  <div class="modal-content">\n    <span class="close">&times;</span>\n    <p>Modal Text</p>\n  </div>\n</div>` },
    { type: 'Alert Success', iconName: 'card', tags: ['notification', 'message', 'banner'], snippet: `<div class="alert success">Success! Operation completed.</div>` },
    { type: 'Footer', iconName: 'hero', tags: ['bottom', 'copyright', 'links'], snippet: `<footer><p>&copy; 2024 Company. All rights reserved.</p></footer>` },
    { type: 'Table', iconName: 'flexbox', tags: ['data', 'rows', 'columns'], snippet: `<table>\n  <thead><tr><th>Header</th></tr></thead>\n  <tbody><tr><td>Data</td></tr></tbody>\n</table>` },
];

const DRAGGABLE_BLOCKS_CSS: DraggableBlockItem[] = [
    // -- Getting Started --
    { type: 'Change Text Color', iconName: 'css', tags: ['beginner', 'color', 'text'], snippet: `/* Make all text blue */
h1, p {
  color: blue;
}

/* Make headings red and bigger */
h1 {
  color: red;
  font-size: 48px;
}` },
    { type: 'Change Background', iconName: 'css', tags: ['beginner', 'background', 'color'], snippet: `/* Light blue background for the page */
body {
  background-color: lightblue;
}

/* White background for content */
.container {
  background-color: white;
  padding: 20px;
}` },
    { type: 'Center Content', iconName: 'css', tags: ['beginner', 'center', 'layout'], snippet: `/* Center text */
.text-center {
  text-align: center;
}

/* Center blocks */
.center {
  margin: 0 auto;
  max-width: 800px;
}` },
    { type: 'Add Spacing', iconName: 'css', tags: ['beginner', 'space', 'padding'], snippet: `/* Space around elements */
.spaced {
  margin: 20px;
  padding: 15px;
}

/* Space inside elements */
.container {
  padding: 30px;
}` },
    { type: 'Style Buttons', iconName: 'button', tags: ['beginner', 'button', 'style'], snippet: `/* Make buttons look nice */
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Button hover effect */
button:hover {
  background-color: #45a049;
}` },
    { type: 'Font Styles', iconName: 'css', tags: ['beginner', 'text', 'fonts'], snippet: `/* Change font family */
body {
  font-family: Arial, sans-serif;
}

/* Make text bigger */
.large-text {
  font-size: 24px;
}

/* Make text bold */
.bold {
  font-weight: bold;
}

/* Make text italic */
.italic {
  font-style: italic;
}` },
    { type: 'Borders & Outlines', iconName: 'css', tags: ['beginner', 'border', 'style'], snippet: `/* Add a simple border */
.box {
  border: 2px solid black;
  padding: 10px;
}

/* Rounded corners */
.rounded {
  border-radius: 10px;
}

/* Different border styles */
.dashed {
  border: 2px dashed red;
}
.dotted {
  border: 2px dotted blue;
}` },
    { type: 'Margins & Padding', iconName: 'css', tags: ['beginner', 'spacing', 'layout'], snippet: `/* Margin (outside space) */
.margin-example {
  margin-top: 20px;
  margin-right: 15px;
  margin-bottom: 20px;
  margin-left: 15px;
  /* Short version: margin: 20px 15px; */
}

/* Padding (inside space) */
.padding-example {
  padding: 10px 20px 30px 40px; /* top right bottom left */
}` },
    { type: 'Width & Height', iconName: 'css', tags: ['beginner', 'size', 'dimensions'], snippet: `/* Fixed size */
.small-box {
  width: 200px;
  height: 150px;
}

/* Percentage size */
.responsive-box {
  width: 50%;
  height: 300px;
}

/* Maximum/minimum size */
.flexible-box {
  max-width: 500px;
  min-height: 100px;
}` },
    { type: 'Text Alignment', iconName: 'css', tags: ['beginner', 'text', 'align'], snippet: `/* Align text */
.align-left { text-align: left; }
.align-center { text-align: center; }
.align-right { text-align: right; }
.align-justify { text-align: justify; }

/* Vertical alignment */
.vertical-middle {
  vertical-align: middle;
}` },
    { type: 'Text Decoration', iconName: 'css', tags: ['beginner', 'text', 'decoration'], snippet: `/* Underline, overline, line-through */
.underline { text-decoration: underline; }
.overline { text-decoration: overline; }
.line-through { text-decoration: line-through; }

/* Remove underline from links */
a {
  text-decoration: none;
}

/* Add underline on hover */
a:hover {
  text-decoration: underline;
}` },
    { type: 'Letter & Word Spacing', iconName: 'css', tags: ['beginner', 'text', 'spacing'], snippet: `/* Space between letters */
.letter-spacing {
  letter-spacing: 2px;
}

/* Space between words */
.word-spacing {
  word-spacing: 5px;
}

/* Line height */
.line-height {
  line-height: 1.5;
}` },
    { type: 'Text Shadow', iconName: 'css', tags: ['beginner', 'text', 'shadow'], snippet: `/* Simple text shadow */
.shadow-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Glowing effect */
.glow-text {
  text-shadow: 0 0 10px yellow;
}

/* Multiple shadows */
.multi-shadow {
  text-shadow: 1px 1px 2px black, 0 0 25px blue;
}` },
    { type: 'Background Images', iconName: 'css', tags: ['beginner', 'background', 'image'], snippet: `/* Simple background image */
.bg-image {
  background-image: url('https://picsum.photos/800/600');
  background-size: cover;
  background-position: center;
}

/* Repeating pattern */
.bg-pattern {
  background-image: url('https://picsum.photos/100/100');
  background-repeat: repeat;
}` },
    { type: 'Gradients', iconName: 'css', tags: ['beginner', 'background', 'gradient'], snippet: `/* Linear gradient */
.linear-gradient {
  background: linear-gradient(to right, red, orange, yellow);
}

/* Diagonal gradient */
.diagonal-gradient {
  background: linear-gradient(45deg, blue, purple);
}

/* Radial gradient */
.radial-gradient {
  background: radial-gradient(circle, green, lightgreen);
}` },
    { type: 'Opacity & Transparency', iconName: 'css', tags: ['beginner', 'opacity', 'transparent'], snippet: `/* Make element semi-transparent */
.semi-transparent {
  opacity: 0.5;
}

/* Transparent background with solid text */
.transparent-bg {
  background-color: rgba(255, 255, 255, 0.3);
  color: black;
}` },
    { type: 'Display Properties', iconName: 'css', tags: ['beginner', 'display', 'layout'], snippet: `/* Hide elements */
.hidden {
  display: none;
}

/* Inline elements */
.inline {
  display: inline;
}

/* Block elements */
.block {
  display: block;
}

/* Inline-block */
.inline-block {
  display: inline-block;
}` },
    { type: 'Position Types', iconName: 'css', tags: ['beginner', 'position', 'layout'], snippet: `/* Relative positioning */
.relative {
  position: relative;
  top: 10px;
  left: 20px;
}

/* Absolute positioning */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

/* Fixed positioning (stays in place when scrolling) */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}` },
    { type: 'Float & Clear', iconName: 'css', tags: ['beginner', 'float', 'layout'], snippet: `/* Float elements */
.float-left {
  float: left;
  width: 50%;
}
.float-right {
  float: right;
  width: 50%;
}

/* Clear floats */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}` },
    { type: 'Simple Flexbox', iconName: 'flexbox', tags: ['beginner', 'flexbox', 'layout'], snippet: `/* Basic flex container */
.flex-container {
  display: flex;
}

/* Arrange items in a row */
.flex-row {
  display: flex;
  flex-direction: row;
}

/* Arrange items in a column */
.flex-column {
  display: flex;
  flex-direction: column;
}

/* Center items */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}` },
    { type: 'Flexbox Alignment', iconName: 'flexbox', tags: ['beginner', 'flexbox', 'align'], snippet: `/* Horizontal alignment */
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

/* Vertical alignment */
.align-start { align-items: flex-start; }
.align-center { align-items: center; }
.align-end { align-items: flex-end; }
.align-stretch { align-items: stretch; }` },
    { type: 'Simple Grid', iconName: 'flexbox', tags: ['beginner', 'grid', 'layout'], snippet: `/* Basic grid */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

/* Two column grid */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Responsive grid */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}` },
    { type: 'Simple Transitions', iconName: 'css', tags: ['beginner', 'transition', 'animation'], snippet: `/* Smooth color change */
.smooth-transition {
  transition: background-color 0.3s ease;
}
.smooth-transition:hover {
  background-color: lightblue;
}

/* Transform on hover */
.hover-scale {
  transition: transform 0.2s;
}
.hover-scale:hover {
  transform: scale(1.1);
}` },
    { type: 'Basic Animations', iconName: 'css', tags: ['beginner', 'animation', 'motion'], snippet: `/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade-in {
  animation: fadeIn 2s;
}

/* Bounce animation */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}
.bounce {
  animation: bounce 2s infinite;
}` },
    { type: 'Simple Media Query', iconName: 'css', tags: ['beginner', 'responsive', 'mobile'], snippet: `/* Styles for mobile devices */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  
  .container {
    padding: 10px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Styles for tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    max-width: 750px;
  }
}` },
    { type: 'Pseudo Classes', iconName: 'css', tags: ['beginner', 'pseudo', 'states'], snippet: `/* Link states */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Form states */
input:focus {
  border-color: blue;
  outline: none;
}
input:required {
  border-color: red;
}
input:disabled {
  background-color: #f0f0f0;
}` },
    { type: 'Custom Properties', iconName: 'css', tags: ['beginner', 'variables', 'css'], snippet: `/* Define CSS variables */
:root {
  --main-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
  --spacing: 10px;
}

/* Use variables */
.button {
  background-color: var(--main-color);
  font-size: var(--font-size);
  padding: var(--spacing);
}

.text {
  color: var(--secondary-color);
}` },

    // -- Layouts --
    { type: 'Flex Center', iconName: 'flexbox', tags: ['align', 'justify', 'middle'], snippet: `.flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` },
    { type: 'Flex Column', iconName: 'flexbox', tags: ['vertical', 'stack'], snippet: `.flex-col {\n  display: flex;\n  flex-direction: column;\n}` },
    { type: 'Grid Basic', iconName: 'flexbox', tags: ['layout', 'columns', 'rows'], snippet: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}` },
    { type: 'Grid Responsive', iconName: 'flexbox', tags: ['mobile', 'layout', 'auto'], snippet: `.grid-responsive {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}` },
    { type: 'Absolute Center', iconName: 'css', tags: ['position', 'middle', 'transform'], snippet: `.absolute-center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}` },
    { type: 'Sticky Header', iconName: 'css', tags: ['position', 'top', 'nav'], snippet: `header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: white;\n}` },
    
    // -- Effects --
    { type: 'Box Shadow', iconName: 'css', tags: ['depth', 'card', 'elevation'], snippet: `.shadow {\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n}` },
    { type: 'Gradient BG', iconName: 'css', tags: ['color', 'background', 'style'], snippet: `.gradient-bg {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n}` },
    { type: 'Glassmorphism', iconName: 'css', tags: ['blur', 'transparent', 'modern'], snippet: `.glass {\n  background: rgba(255, 255, 255, 0.25);\n  backdrop-filter: blur(4px);\n  border: 1px solid rgba(255, 255, 255, 0.18);\n}` },
    { type: 'Text Gradient', iconName: 'css', tags: ['typography', 'color', 'style'], snippet: `.text-gradient {\n  background: linear-gradient(to right, #30CFD0, #330867);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}` },
    
    // -- Components --
    { type: 'Button Style', iconName: 'button', tags: ['ui', 'interactive', 'clickable'], snippet: `.btn {\n  padding: 0.5rem 1rem;\n  background: blue;\n  color: white;\n  border-radius: 4px;\n  border: none;\n  cursor: pointer;\n}` },
    { type: 'Card Style', iconName: 'card', tags: ['container', 'box', 'ui'], snippet: `.card {\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}` },
    { type: 'Input Style', iconName: 'button', tags: ['form', 'field', 'ui'], snippet: `input {\n  padding: 8px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  width: 100%;\n}` },
    { type: 'Modal CSS', iconName: 'css', tags: ['popup', 'overlay', 'ui'], snippet: `.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,0.4);\n}` },
    
    // -- Animations --
    { type: 'Hover Scale', iconName: 'css', tags: ['interaction', 'transform', 'motion'], snippet: `.hover-scale:hover {\n  transform: scale(1.05);\n  transition: transform 0.2s;\n}` },
    { type: 'Fade In', iconName: 'css', tags: ['animation', 'opacity', 'motion'], snippet: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.fade-in { animation: fadeIn 1s; }` },
    { type: 'Spin', iconName: 'css', tags: ['animation', 'rotate', 'loading'], snippet: `@keyframes spin { 100% { transform: rotate(360deg); } }\n.spin { animation: spin 1s linear infinite; }` },
    
    // -- Utils --
    { type: 'Reset CSS', iconName: 'css', tags: ['base', 'normalize', 'start'], snippet: `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}` },
    { type: 'Media Query Mobile', iconName: 'css', tags: ['responsive', 'phone', 'breakpoint'], snippet: `@media (max-width: 768px) {\n  .container { padding: 10px; }\n}` },
    { type: 'Custom Scrollbar', iconName: 'css', tags: ['ui', 'browser', 'style'], snippet: `::-webkit-scrollbar { width: 8px; }\n::-webkit-scrollbar-track { background: #f1f1f1; }\n::-webkit-scrollbar-thumb { background: #888; }` },
];

const DRAGGABLE_BLOCKS_JS: DraggableBlockItem[] = [
    // -- Getting Started --
    { type: 'Show an Alert', iconName: 'js', tags: ['beginner', 'popup', 'message'], snippet: `// Show a simple message
alert('Hello World!');

// Show a message with user input
const name = prompt('What is your name?');
alert('Nice to meet you, ' + name + '!');` },
    { type: 'Console Messages', iconName: 'js', tags: ['beginner', 'debug', 'log'], snippet: `// Print messages for developers
console.log('Page loaded successfully!');
console.log('Current time:', new Date());
console.log('User agent:', navigator.userAgent);

// Check for errors
console.error('Something went wrong!');
console.warn('Warning: Check this!');` },
    { type: 'Basic Math', iconName: 'js', tags: ['beginner', 'math', 'calculate'], snippet: `// Basic calculations
const sum = 5 + 3;
const product = 4 * 7;
const average = (10 + 20 + 30) / 3;

console.log('5 + 3 =', sum);
console.log('4 × 7 =', product);
console.log('Average =', average);

// Random number between 1 and 100
const randomNum = Math.floor(Math.random() * 100) + 1;
console.log('Random number:', randomNum);` },
    { type: 'Handle Clicks', iconName: 'js', tags: ['beginner', 'click', 'event'], snippet: `// Find a button and add click handler
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function() {
  alert('Button was clicked!');
  console.log('Click detected at:', new Date());
});

// Handle multiple buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    console.log('You clicked:', button.textContent);
  });
});` },
    { type: 'Change Content', iconName: 'js', tags: ['beginner', 'dom', 'text'], snippet: `// Change text content
document.getElementById('myText').textContent = 'New text here!';

// Change HTML content
document.getElementById('myDiv').innerHTML = '<strong>Bold text</strong> and <em>italic text</em>';

// Change input value
document.getElementById('myInput').value = 'Default value';

// Change styles
document.getElementById('myElement').style.color = 'red';
document.getElementById('myElement').style.fontSize = '24px';` },
    { type: 'Simple Timer', iconName: 'js', tags: ['beginner', 'time', 'delay'], snippet: `// Wait 2 seconds then show message
setTimeout(() => {
  alert('2 seconds have passed!');
}, 2000);

// Count down from 10
let count = 10;
const countdown = setInterval(() => {
  console.log('Count:', count);
  count--;
  
  if (count <= 0) {
    clearInterval(countdown);
    alert('Countdown finished!');
  }
}, 1000);` },
    { type: 'Variables & Data Types', iconName: 'js', tags: ['beginner', 'variables', 'data'], snippet: `// Different ways to declare variables
let age = 25; // Can change later
const name = "John"; // Cannot change
var city = "New York"; // Old way (avoid using)

// Different data types
let text = "Hello World"; // String
let number = 42; // Number
let isTrue = true; // Boolean
let nothing = null; // Null
let notDefined = undefined; // Undefined
let items = [1, 2, 3]; // Array
let person = { name: "John", age: 25 }; // Object

console.log(text, number, isTrue, nothing, notDefined, items, person);` },
    { type: 'String Operations', iconName: 'js', tags: ['beginner', 'string', 'text'], snippet: `// Working with text
let greeting = "Hello";
let name = "Alice";
let message = greeting + " " + name; // Concatenation

// Template literals (modern way)
let modernMessage = \`\${greeting}, \${name}! Welcome to JavaScript.\`;

// String methods
let longText = "JavaScript is awesome!";
console.log(longText.length); // Get length
console.log(longText.toUpperCase()); // Convert to uppercase
console.log(longText.toLowerCase()); // Convert to lowercase
console.log(longText.includes('awesome')); // Check if text exists
console.log(longText.replace('awesome', 'fantastic')); // Replace text` },
    { type: 'Array Basics', iconName: 'js', tags: ['beginner', 'array', 'list'], snippet: `// Creating arrays
let fruits = ['apple', 'banana', 'orange'];
let numbers = [1, 2, 3, 4, 5];
let mixed = ['text', 42, true, null];

// Access items
console.log(fruits[0]); // First item (apple)
console.log(fruits[fruits.length - 1]); // Last item

// Modify arrays
fruits.push('grape'); // Add to end
fruits.unshift('strawberry'); // Add to beginning
fruits.pop(); // Remove last item
fruits.shift(); // Remove first item

// Check if item exists
console.log(fruits.includes('banana'));` },
    { type: 'Array Methods', iconName: 'js', tags: ['beginner', 'array', 'methods'], snippet: `// Useful array methods
let numbers = [1, 2, 3, 4, 5];

// Double each number
let doubled = numbers.map(num => num * 2);
console.log('Doubled:', doubled);

// Filter even numbers
let evens = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evens);

// Find sum of all numbers
let sum = numbers.reduce((total, num) => total + num, 0);
console.log('Sum:', sum);

// Check if all numbers are positive
let allPositive = numbers.every(num => num > 0);
console.log('All positive:', allPositive);` },
    { type: 'Object Basics', iconName: 'js', tags: ['beginner', 'object', 'data'], snippet: `// Creating objects
let person = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
  isStudent: false,
  hobbies: ['reading', 'coding', 'gaming']
};

// Access properties
console.log(person.name); // Dot notation
console.log(person['age']); // Bracket notation

// Modify properties
person.age = 31;
person['city'] = 'Boston';

// Add new properties
person.email = 'john@example.com';

// Check if property exists
console.log('Has email:', 'email' in person);
console.log('Has phone:', person.hasOwnProperty('phone'));` },
    { type: 'Conditional Logic', iconName: 'js', tags: ['beginner', 'if', 'logic'], snippet: `// If/else statements
let age = 18;

if (age >= 18) {
  console.log('You can vote!');
} else if (age >= 16) {
  console.log('You can drive!');
} else {
  console.log('Too young for these activities');
}

// Ternary operator (short if/else)
let message = age >= 18 ? 'Adult' : 'Minor';
console.log(message);

// Multiple conditions
let score = 85;
if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else if (score >= 70) {
  console.log('Grade: C');
} else {
  console.log('Grade: F');
}` },
    { type: 'Switch Statement', iconName: 'js', tags: ['beginner', 'switch', 'logic'], snippet: `// Switch statement for multiple conditions
let day = 'Monday';

switch (day) {
  case 'Monday':
  case 'Tuesday':
    console.log('Work day');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend!');
    break;
  default:
    console.log('Midweek');
}

// Switch with numbers
let grade = 85;
switch (true) {
  case grade >= 90:
    console.log('Excellent!');
    break;
  case grade >= 80:
    console.log('Good job!');
    break;
  case grade >= 70:
    console.log('Fair');
    break;
  default:
    console.log('Needs improvement');
}` },
    { type: 'For Loops', iconName: 'js', tags: ['beginner', 'loop', 'iteration'], snippet: `// Traditional for loop
for (let i = 0; i < 5; i++) {
  console.log('Count:', i);
}

// Loop through array
let fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
  console.log('Fruit:', fruits[i]);
}

// For...of loop (modern way)
for (const fruit of fruits) {
  console.log('Yummy fruit:', fruit);
}

// For...in loop (for objects)
let person = { name: 'John', age: 30, city: 'NYC' };
for (const key in person) {
  console.log(key + ':', person[key]);
}` },
    { type: 'While Loops', iconName: 'js', tags: ['beginner', 'loop', 'condition'], snippet: `// While loop (runs while condition is true)
let count = 0;
while (count < 3) {
  console.log('While count:', count);
  count++;
}

// Do...while loop (runs at least once)
let num = 5;
do {
  console.log('Do-while number:', num);
  num++;
} while (num < 3); // This will only run once

// Infinite loop example (be careful!)
// let i = 0;
// while (true) {
//   console.log('This will run forever!');
//   i++;
//   if (i > 10) break; // Exit condition
// }` },
    { type: 'Functions', iconName: 'js', tags: ['beginner', 'function', 'reusable'], snippet: `// Function declaration
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function (modern)
const multiply = (a, b) => a * b;

// Functions with default parameters
function introduce(name, age = 25) {
  return \`My name is \${name} and I'm \${age} years old.\`;
}

// Using functions
console.log(greet('Alice'));
console.log(add(5, 3));
console.log(multiply(4, 7));
console.log(introduce('Bob'));
console.log(introduce('Charlie', 30));` },
    { type: 'Event Listeners', iconName: 'js', tags: ['beginner', 'events', 'interaction'], snippet: `// Different types of events
const button = document.getElementById('myButton');
const input = document.getElementById('myInput');
const div = document.getElementById('myDiv');

// Click event
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// Mouse events
div.addEventListener('mouseenter', () => {
  div.style.backgroundColor = 'lightblue';
});

div.addEventListener('mouseleave', () => {
  div.style.backgroundColor = '';
});

// Keyboard events
input.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
});

// Form events
input.addEventListener('change', () => {
  console.log('Input changed to:', input.value);
});` },
    { type: 'Form Handling', iconName: 'js', tags: ['beginner', 'form', 'validation'], snippet: `// Get form elements
const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop form from actually submitting
  
  // Get values
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  
  // Simple validation
  if (name === '') {
    alert('Please enter your name');
    return;
  }
  
  if (!email.includes('@')) {
    alert('Please enter a valid email');
    return;
  }
  
  // Success!
  alert(\`Form submitted! Name: \${name}, Email: \${email}\`);
});` },
    { type: 'Date & Time', iconName: 'js', tags: ['beginner', 'date', 'time'], snippet: `// Working with dates
const now = new Date();
console.log('Current date:', now);
console.log('Year:', now.getFullYear());
console.log('Month:', now.getMonth() + 1); // Months are 0-11
console.log('Day:', now.getDate());
console.log('Hours:', now.getHours());
console.log('Minutes:', now.getMinutes());
console.log('Seconds:', now.getSeconds());

// Creating specific dates
const birthday = new Date('2000-01-01');
console.log('Birthday:', birthday);

// Formatting dates
const options = { year: 'numeric', month: 'long', day: 'numeric' };
console.log('Formatted:', now.toLocaleDateString('en-US', options));

// Calculating difference
const future = new Date('2025-01-01');
const diff = future - now;
const daysUntil = Math.floor(diff / (1000 * 60 * 60 * 24));
console.log('Days until 2025:', daysUntil);` },
    { type: 'JSON Data', iconName: 'js', tags: ['beginner', 'json', 'data'], snippet: `// Working with JSON
const person = {
  name: 'John Doe',
  age: 30,
  hobbies: ['coding', 'reading']
};

// Convert to JSON string
const jsonString = JSON.stringify(person);
console.log('JSON string:', jsonString);

// Parse JSON string
const jsonString2 = '{"name":"Jane","age":25}';
const parsed = JSON.parse(jsonString2);
console.log('Parsed object:', parsed);

// Working with arrays in JSON
const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

const peopleJson = JSON.stringify(people, null, 2); // Pretty print
console.log('People JSON:', peopleJson);` },
    { type: 'Error Handling', iconName: 'js', tags: ['beginner', 'error', 'try'], snippet: `// Try-catch for error handling
try {
  // Code that might cause an error
  const result = 10 / 0;
  console.log('Result:', result); // This works fine
  
  // This will cause an error
  const obj = null;
  obj.someProperty; // TypeError!
} catch (error) {
  console.error('An error occurred:', error.message);
} finally {
  console.log('This always runs, error or not');
}

// Handling specific errors
try {
  JSON.parse('invalid json');
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log('Invalid JSON format');
  } else {
    console.log('Other error:', error.message);
  }
}` },
    { type: 'Local Storage', iconName: 'js', tags: ['beginner', 'storage', 'data'], snippet: `// Save data to local storage
localStorage.setItem('username', 'JohnDoe');
localStorage.setItem('theme', 'dark');

// Save objects/arrays (must convert to JSON)
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Get data from local storage
const username = localStorage.getItem('username');
console.log('Username:', username);

// Get objects/arrays
const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
console.log('Saved user:', savedUser);

// Remove data
localStorage.removeItem('theme');

// Clear all data
// localStorage.clear();

// Check if item exists
if (localStorage.getItem('username')) {
  console.log('User is logged in');
}` },

    // -- DOM --
    { type: 'Select Element', iconName: 'js', tags: ['dom', 'query', 'node'], snippet: `const el = document.querySelector('.class');` },
    { type: 'Add Event Listener', iconName: 'js', tags: ['click', 'interaction', 'event'], snippet: `el.addEventListener('click', () => {\n  console.log('Clicked');\n});` },
    { type: 'Create Element', iconName: 'js', tags: ['dom', 'node', 'dynamic'], snippet: `const div = document.createElement('div');\ndiv.textContent = 'Hello';\ndocument.body.appendChild(div);` },
    { type: 'Toggle Class', iconName: 'js', tags: ['style', 'css', 'dom'], snippet: `element.classList.toggle('active');` },
    
    // -- Logic --
    { type: 'Fetch API', iconName: 'js', tags: ['network', 'ajax', 'async'], snippet: `fetch('url')\n  .then(res => res.json())\n  .then(data => console.log(data));` },
    { type: 'Async/Await', iconName: 'js', tags: ['network', 'promise', 'async'], snippet: `async function getData() {\n  const res = await fetch('url');\n  const data = await res.json();\n}` },
    { type: 'Local Storage Set', iconName: 'js', tags: ['data', 'save', 'persist'], snippet: `localStorage.setItem('key', 'value');` },
    { type: 'Local Storage Get', iconName: 'js', tags: ['data', 'load', 'persist'], snippet: `const val = localStorage.getItem('key');` },
    { type: 'Array Map', iconName: 'js', tags: ['list', 'transform', 'loop'], snippet: `const newArr = arr.map(item => item * 2);` },
    { type: 'Array Filter', iconName: 'js', tags: ['list', 'search', 'loop'], snippet: `const filtered = arr.filter(item => item > 10);` },
    
    // -- Utils --
    { type: 'Random Number', iconName: 'js', tags: ['math', 'calc', 'util'], snippet: `const random = Math.floor(Math.random() * 100);` },
    { type: 'Debounce', iconName: 'js', tags: ['performance', 'timer', 'util'], snippet: `function debounce(func, timeout = 300){\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => { func.apply(this, args); }, timeout);\n  };\n}` },
    { type: 'Copy to Clipboard', iconName: 'js', tags: ['clipboard', 'util', 'text'], snippet: `navigator.clipboard.writeText('text');` },
    { type: 'Scroll to Top', iconName: 'js', tags: ['window', 'scroll', 'ui'], snippet: `window.scrollTo({top: 0, behavior: 'smooth'});` },
    { type: 'Current Date', iconName: 'js', tags: ['time', 'date', 'util'], snippet: `const date = new Date().toLocaleDateString();` },
    
    // -- Components Logic --
    { type: 'Modal Logic', iconName: 'js', tags: ['ui', 'interaction', 'popup'], snippet: `const modal = document.getElementById("myModal");\nconst btn = document.getElementById("myBtn");\nconst span = document.getElementsByClassName("close")[0];\nbtn.onclick = () => modal.style.display = "block";\nspan.onclick = () => modal.style.display = "none";\nwindow.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }` },
    { type: 'Tab Switcher', iconName: 'js', tags: ['ui', 'navigation', 'content'], snippet: `function openTab(evt, tabName) {\n  // Hide all tabcontent\n  // Remove active class from tablinks\n  // Show current tab\n}` },
];

export const ALL_DRAGGABLE_BLOCKS: Record<Language, DraggableBlockItem[]> = {
  html: DRAGGABLE_BLOCKS_HTML,
  css: DRAGGABLE_BLOCKS_CSS,
  js: DRAGGABLE_BLOCKS_JS,
};

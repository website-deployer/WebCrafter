
import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    name: 'Empty Template',
    description: 'A blank canvas with just the absolute basics to start from scratch.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h1>Welcome to My Project</h1>
    <p>Start building something amazing!</p>
    
    <script src="index.js"></script>
</body>
</html>`,
      css: `/* Basic styles to get started */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
}

h1 {
    color: #333;
}

p {
    color: #666;
}`,
      js: `// Your JavaScript code goes here
console.log('Page loaded successfully!');

// Add your interactive features here
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready!');
});`
    }
  },
  {
    name: 'Modern Calculator',
    description: 'A sleek, responsive calculator handling basic arithmetic.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Calculator</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <div id="history"></div>
            <div id="result">0</div>
        </div>
        <div class="buttons">
            <button class="btn fn" onclick="clearDisplay()">AC</button>
            <button class="btn fn" onclick="deleteChar()">DEL</button>
            <button class="btn fn" onclick="appendOperator('%')">%</button>
            <button class="btn op" onclick="appendOperator('/')">÷</button>
            
            <button class="btn" onclick="appendNumber('7')">7</button>
            <button class="btn" onclick="appendNumber('8')">8</button>
            <button class="btn" onclick="appendNumber('9')">9</button>
            <button class="btn op" onclick="appendOperator('*')">×</button>
            
            <button class="btn" onclick="appendNumber('4')">4</button>
            <button class="btn" onclick="appendNumber('5')">5</button>
            <button class="btn" onclick="appendNumber('6')">6</button>
            <button class="btn op" onclick="appendOperator('-')">-</button>
            
            <button class="btn" onclick="appendNumber('1')">1</button>
            <button class="btn" onclick="appendNumber('2')">2</button>
            <button class="btn" onclick="appendNumber('3')">3</button>
            <button class="btn op" onclick="appendOperator('+')">+</button>
            
            <button class="btn zero" onclick="appendNumber('0')">0</button>
            <button class="btn" onclick="appendNumber('.')">.</button>
            <button class="btn eq" onclick="calculate()">=</button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #1e1e1e;
    font-family: 'Poppins', sans-serif;
    margin: 0;
}

.calculator {
    background: #2d2d2d;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    width: 320px;
}

.display {
    background: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: right;
    color: white;
}

#history {
    font-size: 14px;
    color: #888;
    min-height: 20px;
}

#result {
    font-size: 48px;
    font-weight: 600;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.btn {
    padding: 20px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    background: #3d3d3d;
    color: white;
    cursor: pointer;
    transition: 0.2s;
}

.btn:hover { background: #4d4d4d; }
.btn:active { transform: scale(0.95); }

.fn { color: #ff6b6b; }
.op { color: #4ecdc4; }
.eq { background: #4ecdc4; color: #1e1e1e; grid-column: span 1; }
.zero { grid-column: span 1; }
`,
      js: `
let currentInput = '0';
let previousInput = '';
let operator = null;

const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    resultDisplay.innerText = currentInput;
    if (operator) {
        historyDisplay.innerText = \`\${previousInput} \${operator}\`;
    } else {
        historyDisplay.innerText = '';
    }
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function deleteChar() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch(operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        case '%': result = prev % current; break;
        default: return;
    }
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}
`
    }
  },
  {
    name: 'To-Do List',
    description: 'A classic task manager with filters and local storage persistence.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Task Master</title>
    <link rel="stylesheet" href="index.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <header>
            <h1>My Tasks</h1>
            <p id="date-display"></p>
        </header>
        
        <div class="input-group">
            <input type="text" id="todo-input" placeholder="Add a new task...">
            <button id="add-btn"><i class="fas fa-plus"></i></button>
        </div>

        <div class="filters">
            <span class="active" onclick="filterTasks('all')">All</span>
            <span onclick="filterTasks('pending')">Pending</span>
            <span onclick="filterTasks('completed')">Done</span>
        </div>

        <ul id="todo-list"></ul>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

body {
    background: #f0f2f5;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    margin: 0;
}

.app-container {
    background: white;
    width: 400px;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

header h1 { margin: 0; color: #111; }
header p { margin: 5px 0 20px; color: #888; font-size: 14px; }

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

#todo-input {
    flex: 1;
    padding: 12px;
    border: 2px solid #eee;
    border-radius: 8px;
    outline: none;
    transition: 0.3s;
}

#todo-input:focus { border-color: #6366f1; }

#add-btn {
    background: #6366f1;
    color: white;
    border: none;
    width: 45px;
    border-radius: 8px;
    cursor: pointer;
}

.filters {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.filters span {
    font-size: 14px;
    color: #888;
    cursor: pointer;
    font-weight: 600;
}

.filters span.active { color: #6366f1; }

#todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f9f9f9;
}

.task-item.completed span {
    text-decoration: line-through;
    color: #ccc;
}

.actions i {
    cursor: pointer;
    margin-left: 10px;
    color: #ccc;
    transition: 0.2s;
}

.actions i:hover { color: #ef4444; }
.actions .check:hover { color: #22c55e; }
`,
      js: `
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const dateDisplay = document.getElementById('date-display');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

dateDisplay.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

function renderTasks(filter = 'all') {
    todoList.innerHTML = '';
    const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed);
    
    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = \`task-item \${task.completed ? 'completed' : ''}\`;
        li.innerHTML = \`
            <span>\${task.text}</span>
            <div class="actions">
                <i class="fas fa-check check" onclick="toggleTask(\${task.id})"></i>
                <i class="fas fa-trash" onclick="deleteTask(\${task.id})"></i>
            </div>
        \`;
        todoList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    if(todoInput.value.trim() === '') return;
    const newTask = { id: Date.now(), text: todoInput.value, completed: false };
    tasks.push(newTask);
    todoInput.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    renderTasks();
}

window.filterTasks = (filter) => {
    document.querySelectorAll('.filters span').forEach(s => s.classList.remove('active'));
    event.target.classList.add('active');
    renderTasks(filter);
}

addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());

renderTasks();
`
    }
  },
  {
    name: 'Quiz App',
    description: 'Interactive quiz with multiple choice questions and score tracking.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz App</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="quiz-container">
        <div id="quiz-header">
            <h2>Knowledge Check</h2>
            <div id="timer">Time: <span id="time-left">60</span>s</div>
        </div>
        
        <div id="quiz-body">
            <h3 id="question-text">Question goes here...</h3>
            <div id="options-container"></div>
        </div>

        <div id="quiz-footer">
            <span id="question-number">1 of 5</span>
            <button id="next-btn" onclick="nextQuestion()" disabled>Next</button>
        </div>

        <div id="result-screen" class="hidden">
            <h2>Quiz Completed!</h2>
            <p>Your Score: <span id="score">0</span></p>
            <button onclick="restartQuiz()">Restart</button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
    background: #7c3aed;
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.quiz-container {
    background: white;
    width: 500px;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    position: relative;
    overflow: hidden;
}

#quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

#timer {
    background: #f3f4f6;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
}

#question-text {
    font-size: 20px;
    margin-bottom: 20px;
}

.option-btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    text-align: left;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
}

.option-btn:hover {
    background: #f9fafb;
    border-color: #7c3aed;
}

.option-btn.correct { background: #d1fae5; border-color: #10b981; }
.option-btn.wrong { background: #fee2e2; border-color: #ef4444; }

#quiz-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#next-btn {
    background: #7c3aed;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.5;
}

#next-btn:not(:disabled) { opacity: 1; }

.hidden { display: none; }

#result-screen {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
`,
      js: `
const questions = [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], a: 0 },
    { q: "Which property is used to change background color?", options: ["color", "bgcolor", "background-color"], a: 2 },
    { q: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<script>", "<javascript>"], a: 1 },
    { q: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()"], a: 1 },
    { q: "Which HTML attribute specifies an alternate text for an image?", options: ["alt", "title", "src"], a: 0 }
];

let currentQ = 0;
let score = 0;
let timeLeft = 60;
let timerId;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const timeLeftSpan = document.getElementById('time-left');
const resultScreen = document.getElementById('result-screen');
const scoreSpan = document.getElementById('score');

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timeLeftSpan.innerText = timeLeft;
        if(timeLeft <= 0) showResult();
    }, 1000);
}

function loadQuestion() {
    const q = questions[currentQ];
    questionText.innerText = q.q;
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(btn, idx);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('question-number').innerText = \`\${currentQ + 1} of \${questions.length}\`;
    nextBtn.disabled = true;
}

function selectAnswer(btn, idx) {
    clearInterval(timerId); // Pause timer on selection
    const correct = questions[currentQ].a;
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(b => b.disabled = true);
    
    if(idx === correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        buttons[correct].classList.add('correct');
    }
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQ++;
    if(currentQ < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timerId);
    resultScreen.classList.remove('hidden');
    scoreSpan.innerText = \`\${score} / \${questions.length}\`;
}

function restartQuiz() {
    currentQ = 0;
    score = 0;
    timeLeft = 60;
    resultScreen.classList.add('hidden');
    loadQuestion();
    startTimer();
}

loadQuestion();
startTimer();
`
    }
  },
  {
    name: 'Color Picker',
    description: 'Generate, preview, and copy color codes in HEX, RGB, and HSL formats.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Color Studio</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="card">
        <h2>Color Studio</h2>
        <div class="color-preview" id="preview"></div>
        
        <div class="controls">
            <label>Select Color</label>
            <input type="color" id="color-input" value="#ff6b6b">
        </div>

        <div class="values">
            <div class="value-box" onclick="copyToClipboard('hex')">
                <span>HEX</span>
                <p id="hex-value">#FF6B6B</p>
            </div>
            <div class="value-box" onclick="copyToClipboard('rgb')">
                <span>RGB</span>
                <p id="rgb-value">rgb(255, 107, 107)</p>
            </div>
            <div class="value-box" onclick="copyToClipboard('hsl')">
                <span>HSL</span>
                <p id="hsl-value">hsl(0, 100%, 71%)</p>
            </div>
        </div>
        <div id="toast">Copied!</div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

body {
    background: #eef2f3;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    width: 350px;
    text-align: center;
}

.color-preview {
    height: 150px;
    border-radius: 15px;
    margin: 20px 0;
    background: #ff6b6b;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
}

.controls input[type="color"] {
    width: 100%;
    height: 50px;
    border: none;
    cursor: pointer;
    background: none;
}

.values {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.value-box {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    border: 1px solid #eee;
}

.value-box:hover {
    background: #e9ecef;
    transform: translateY(-2px);
}

.value-box span {
    font-size: 12px;
    color: #888;
    display: block;
    margin-bottom: 5px;
}

.value-box p {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    color: #333;
}

#toast {
    background: #333;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: 0.3s;
}

#toast.show {
    opacity: 1;
    bottom: 50px;
}
`,
      js: `
const colorInput = document.getElementById('color-input');
const preview = document.getElementById('preview');
const hexVal = document.getElementById('hex-value');
const rgbVal = document.getElementById('rgb-value');
const hslVal = document.getElementById('hsl-value');
const toast = document.getElementById('toast');

function hexToRgb(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; 
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function updateValues() {
    const hex = colorInput.value;
    preview.style.background = hex;
    hexVal.innerText = hex.toUpperCase();
    
    const { r, g, b } = hexToRgb(hex);
    rgbVal.innerText = \`rgb(\${r}, \${g}, \${b})\`;
    
    const { h, s, l } = rgbToHsl(r, g, b);
    hslVal.innerText = \`hsl(\${h}, \${s}%, \${l}%)\`;
}

function copyToClipboard(type) {
    let text = '';
    if (type === 'hex') text = hexVal.innerText;
    if (type === 'rgb') text = rgbVal.innerText;
    if (type === 'hsl') text = hslVal.innerText;
    
    navigator.clipboard.writeText(text);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

colorInput.addEventListener('input', updateValues);
updateValues();
`
    }
  },
  {
    name: 'Simple Timer',
    description: 'A clean countdown timer with pause and reset functionality.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Focus Timer</title>
    <link rel="stylesheet" href="index.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="timer-container">
        <h1>Focus Timer</h1>
        <div class="time-display">
            <span id="minutes">25</span>:<span id="seconds">00</span>
        </div>
        
        <div class="controls">
            <button id="start" onclick="startTimer()"><i class="fas fa-play"></i></button>
            <button id="pause" onclick="pauseTimer()"><i class="fas fa-pause"></i></button>
            <button id="reset" onclick="resetTimer()"><i class="fas fa-redo"></i></button>
        </div>

        <div class="presets">
            <button onclick="setTime(5)">5m</button>
            <button onclick="setTime(15)">15m</button>
            <button onclick="setTime(25)">25m</button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

body {
    background: #121212;
    color: white;
    font-family: 'JetBrains Mono', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.timer-container {
    text-align: center;
    border: 2px solid #333;
    padding: 50px;
    border-radius: 20px;
    background: #1e1e1e;
    box-shadow: 0 0 50px rgba(0,0,0,0.5);
}

.time-display {
    font-size: 80px;
    margin: 30px 0;
    font-weight: bold;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.controls button {
    background: transparent;
    border: 2px solid #fff;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 20px;
    margin: 0 10px;
    cursor: pointer;
    transition: 0.3s;
}

.controls button:hover {
    background: white;
    color: #121212;
    transform: scale(1.1);
}

.presets {
    margin-top: 30px;
}

.presets button {
    background: #333;
    border: none;
    color: #aaa;
    padding: 8px 15px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
}

.presets button:hover {
    color: white;
    background: #444;
}
`,
      js: `
let timeLeft = 25 * 60;
let timerId = null;

const minEl = document.getElementById('minutes');
const secEl = document.getElementById('seconds');

function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    minEl.innerText = m.toString().padStart(2, '0');
    secEl.innerText = s.toString().padStart(2, '0');
}

function startTimer() {
    if(timerId) return;
    timerId = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            pauseTimer();
            alert("Time's up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    updateDisplay();
}

function setTime(minutes) {
    pauseTimer();
    timeLeft = minutes * 60;
    updateDisplay();
}

updateDisplay();
`
    }
  },
  {
    name: 'Weather Dashboard',
    description: 'A beautiful dashboard showing current weather status and details.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather Dashboard</title>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="card">
        <div class="search">
            <input type="text" class="search-bar" placeholder="Search city..." value="New York">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
        <div class="weather">
            <h2 class="city">New York</h2>
            <div class="temp">21°C</div>
            <div class="description">Cloudy</div>
            <div class="details">
                <div class="col">
                    <i class="fas fa-water"></i>
                    <div>
                        <p class="humidity">64%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <i class="fas fa-wind"></i>
                    <div>
                        <p class="wind">12 km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
    background: #222;
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.card {
    background: linear-gradient(135deg, #00feba, #5b548a);
    width: 90%;
    max-width: 400px;
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    color: white;
}

.search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ebfffc;
    border-radius: 30px;
    padding: 10px 20px;
    margin-bottom: 30px;
}

.search input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    width: 80%;
    color: #555;
}

.search button {
    border: none;
    background: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: #555;
}

.temp {
    font-size: 60px;
    font-weight: 600;
}

.details {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 30px;
}

.col {
    display: flex;
    align-items: center;
    text-align: left;
}

.col i {
    font-size: 30px;
    margin-right: 10px;
}

.col p {
    margin: 0;
    font-size: 14px;
}
`,
      js: `
// Mock Data Simulation
const weatherData = {
    "New York": { temp: 21, humidity: 64, wind: 12, desc: "Cloudy" },
    "London": { temp: 15, humidity: 82, wind: 18, desc: "Rainy" },
    "Tokyo": { temp: 26, humidity: 50, wind: 10, desc: "Sunny" }
};

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");

function updateWeather() {
    const city = searchBar.value;
    const data = weatherData[city] || { temp: "--", humidity: "--", wind: "--", desc: "Not Found" };
    
    document.querySelector(".city").innerText = city;
    document.querySelector(".temp").innerText = data.temp + "°C";
    document.querySelector(".humidity").innerText = data.humidity + "%";
    document.querySelector(".wind").innerText = data.wind + " km/h";
    document.querySelector(".description").innerText = data.desc;
}

searchBtn.addEventListener("click", updateWeather);
searchBar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") updateWeather();
});
`
    }
  },
  {
    name: 'Image Gallery',
    description: 'A responsive masonry-style image gallery with a lightbox view.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Gallery</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h1 class="title">My Portfolio</h1>
    <div class="gallery">
        <div class="item"><img src="https://picsum.photos/400/500?random=1" onclick="openLightbox(this)"></div>
        <div class="item"><img src="https://picsum.photos/400/300?random=2" onclick="openLightbox(this)"></div>
        <div class="item"><img src="https://picsum.photos/400/400?random=3" onclick="openLightbox(this)"></div>
        <div class="item"><img src="https://picsum.photos/400/600?random=4" onclick="openLightbox(this)"></div>
        <div class="item"><img src="https://picsum.photos/400/350?random=5" onclick="openLightbox(this)"></div>
        <div class="item"><img src="https://picsum.photos/400/450?random=6" onclick="openLightbox(this)"></div>
    </div>

    <div id="lightbox" class="lightbox" onclick="this.style.display='none'">
        <span class="close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
body {
    background: #111;
    color: white;
    font-family: sans-serif;
    margin: 0;
    padding: 20px;
    text-align: center;
}

.title { margin-bottom: 30px; }

.gallery {
    column-count: 3;
    column-gap: 15px;
    max-width: 1000px;
    margin: 0 auto;
}

.item { margin-bottom: 15px; break-inside: avoid; }

.item img {
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s;
}

.item img:hover { transform: scale(1.03); opacity: 0.9; }

.lightbox {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    align-items: center;
    justify-content: center;
}

.lightbox-content {
    max-width: 90%;
    max-height: 90%;
    border-radius: 5px;
    box-shadow: 0 0 20px white;
}

.close {
    position: absolute;
    top: 20px; right: 40px;
    color: white;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
}

@media (max-width: 800px) { .gallery { column-count: 2; } }
@media (max-width: 500px) { .gallery { column-count: 1; } }
`,
      js: `
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
}
`
    }
  },
  {
    name: 'Pomodoro Timer',
    description: 'Advanced timer with Work, Short Break, and Long Break modes.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pomodoro</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="container">
        <div class="tabs">
            <button class="active" onclick="setMode('pomodoro')">Pomodoro</button>
            <button onclick="setMode('short')">Short Break</button>
            <button onclick="setMode('long')">Long Break</button>
        </div>
        <div class="timer">25:00</div>
        <button id="main-btn" onclick="toggleTimer()">START</button>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
body {
    background: #ba4949;
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    transition: background 0.5s;
}

.container {
    background: rgba(255, 255, 255, 0.1);
    padding: 30px 50px;
    border-radius: 10px;
    text-align: center;
    color: white;
    width: 400px;
}

.tabs button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    opacity: 0.6;
}

.tabs button.active {
    opacity: 1;
    font-weight: bold;
    border-bottom: 2px solid white;
}

.timer {
    font-size: 100px;
    font-weight: bold;
    margin: 20px 0;
}

#main-btn {
    background: white;
    color: #ba4949;
    border: none;
    padding: 15px 50px;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.1s;
}

#main-btn:active { transform: translateY(4px); }
`,
      js: `
let timeLeft = 1500;
let timerId = null;
let mode = 'pomodoro';

const modes = {
    'pomodoro': { time: 1500, color: '#ba4949' },
    'short': { time: 300, color: '#38858a' },
    'long': { time: 900, color: '#397097' }
};

const timerDisplay = document.querySelector('.timer');
const mainBtn = document.getElementById('main-btn');

function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerDisplay.innerText = \`\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
}

function setMode(newMode) {
    pauseTimer();
    mode = newMode;
    timeLeft = modes[mode].time;
    document.body.style.background = modes[mode].color;
    document.getElementById('main-btn').style.color = modes[mode].color;
    
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    updateDisplay();
}

function toggleTimer() {
    if(timerId) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    mainBtn.innerText = 'PAUSE';
    timerId = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            pauseTimer();
            alert('Time is up!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    mainBtn.innerText = 'START';
}

updateDisplay();
`
    }
  },
  {
    name: 'Recipe Card',
    description: 'An elegant layout for displaying cooking recipes.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Recipe Card</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="recipe-card">
        <div class="header">
            <img src="https://picsum.photos/id/493/800/400" alt="Food">
        </div>
        <div class="content">
            <h1>Strawberry Shortcake</h1>
            <p class="desc">A classic dessert made with sweet biscuits, fresh strawberries, and whipped cream.</p>
            
            <div class="meta">
                <span>🕒 30 mins</span>
                <span>👨‍🍳 Serves 4</span>
                <span>🔥 Easy</span>
            </div>

            <hr>

            <h3>Ingredients</h3>
            <ul class="ingredients">
                <li><input type="checkbox"> 2 cups flour</li>
                <li><input type="checkbox"> 1/4 cup sugar</li>
                <li><input type="checkbox"> 4 tsp baking powder</li>
                <li><input type="checkbox"> 1/2 cup butter</li>
                <li><input type="checkbox"> 1 cup milk</li>
            </ul>

            <button onclick="alert('Added to shopping list!')">Add to List</button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap');

body {
    background: #fdf2e9;
    font-family: 'Lato', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.recipe-card {
    background: white;
    width: 350px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.header img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.content {
    padding: 25px;
}

h1 {
    font-family: 'Playfair Display', serif;
    margin: 0 0 10px 0;
    color: #333;
}

.desc { color: #666; font-size: 14px; line-height: 1.5; }

.meta {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 12px;
    color: #888;
    font-weight: bold;
}

hr { border: 0; border-top: 1px solid #eee; }

h3 { margin-top: 20px; font-size: 16px; }

.ingredients {
    list-style: none;
    padding: 0;
}

.ingredients li {
    margin-bottom: 8px;
    color: #555;
    display: flex;
    align-items: center;
}

.ingredients input { margin-right: 10px; }

button {
    width: 100%;
    padding: 12px;
    background: #e67e22;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
}
`,
      js: `
// Just a simple interaction for now
const checks = document.querySelectorAll('input[type="checkbox"]');
checks.forEach(check => {
    check.addEventListener('change', (e) => {
        if(e.target.checked) {
            e.target.parentElement.style.textDecoration = 'line-through';
            e.target.parentElement.style.color = '#ccc';
        } else {
            e.target.parentElement.style.textDecoration = 'none';
            e.target.parentElement.style.color = '#555';
        }
    });
});
`
    }
  },
  {
    name: 'Music Player',
    description: 'A stylish music player UI with progress bar and controls.',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Music Player</title>
    <link rel="stylesheet" href="index.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="player">
        <div class="cover">
            <img src="https://picsum.photos/id/39/300/300" alt="Album Art">
        </div>
        <div class="info">
            <h2>Midnight Vibes</h2>
            <p>Lo-Fi Chill</p>
        </div>
        
        <div class="progress-area">
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
            <div class="time">
                <span>1:24</span>
                <span>3:45</span>
            </div>
        </div>

        <div class="controls">
            <button><i class="fas fa-backward"></i></button>
            <button class="play" onclick="togglePlay(this)"><i class="fas fa-play"></i></button>
            <button><i class="fas fa-forward"></i></button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>`,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

body {
    background: linear-gradient(to bottom right, #ff9a9e, #fad0c4);
    font-family: 'Nunito', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.player {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    width: 300px;
    text-align: center;
}

.cover img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    margin-bottom: 20px;
    border: 5px solid white;
}

.info h2 { margin: 0; font-size: 22px; color: #333; }
.info p { margin: 5px 0 20px; color: #888; }

.progress-area { margin-bottom: 20px; }

.progress-bar {
    height: 6px;
    width: 100%;
    background: #eee;
    border-radius: 3px;
    cursor: pointer;
}

.progress {
    height: 100%;
    width: 40%;
    background: #ff9a9e;
    border-radius: 3px;
    position: relative;
}

.progress::after {
    content: '';
    position: absolute;
    right: -5px; top: -3px;
    width: 12px; height: 12px;
    background: #ff9a9e;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

.time {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
    margin-top: 5px;
}

.controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.controls button {
    background: none;
    border: none;
    font-size: 20px;
    color: #ccc;
    cursor: pointer;
    transition: 0.2s;
}

.controls button:hover { color: #ff9a9e; }

.controls button.play {
    width: 50px;
    height: 50px;
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
    color: white;
    border-radius: 50%;
    box-shadow: 0 5px 15px rgba(255, 154, 158, 0.4);
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.controls button.play:hover { transform: scale(1.1); color: white; }
`,
      js: `
let isPlaying = false;
const progressBar = document.querySelector('.progress');
let width = 40;

function togglePlay(btn) {
    const icon = btn.querySelector('i');
    const img = document.querySelector('.cover img');
    
    if(isPlaying) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        img.style.animation = 'none';
    } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        img.style.animation = 'spin 10s linear infinite';
    }
    isPlaying = !isPlaying;
}

// Add spinning animation style dynamically
const style = document.createElement('style');
style.innerHTML = \`
@keyframes spin { 
    from { transform: rotate(0deg); } 
    to { transform: rotate(360deg); } 
}
\`;
document.head.appendChild(style);

// Simulate progress
setInterval(() => {
    if(isPlaying) {
        width += 0.5;
        if(width > 100) width = 0;
        progressBar.style.width = width + '%';
    }
}, 500);
`
    }
  }
];

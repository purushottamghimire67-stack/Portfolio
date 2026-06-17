/**
 * DevFolio - Full Stack ePortfolio JavaScript
 * Comprehensive interactive functionality
 */

// ============================================
// GLOBAL STATE
// ============================================
const state = {
    cssBgColor: '#ff471d',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gridColumns: 3,
    gridGap: true,
    domElementsAdded: 0,
    requestFlowRunning: false
};

// ============================================
const bootMessages = [
    'INITIALIZING KERNEL...',
    'LOADING MODULES...',
    'MOUNTING FILESYSTEM...',
    'CONFIGURING NETWORK...',
    'LOADING ASSETS...',
    'COMPILING STYLES...',
    'OPTIMIZING PERFORMANCE...',
    'READY TO LAUNCH...'
];

function runBootSequence() {
    const terminalText = document.getElementById('terminal-text');
    const progressBar = document.getElementById('progressBar');
    const preloader = document.getElementById('preloader');
    
    let messageIndex = 0;
    let progress = 0;
    
    function addMessage() {
        if (messageIndex < bootMessages.length) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.textContent = `[${String(messageIndex + 1).padStart(2, '0')}/${String(bootMessages.length).padStart(2, '0')}] ${bootMessages[messageIndex]}`;
            terminalText.appendChild(line);
            messageIndex++;
            
            // Auto scroll
            terminalText.scrollTop = terminalText.scrollHeight;
        }
    }
    
    const messageInterval = setInterval(addMessage, 300);
    
    const progressInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
            
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initTypewriter();
                }, 500);
            }, 500);
        }
    }, 60);
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Trail follows with delay
    
    // Hide cursor when hovering over iframes
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.addEventListener('mouseenter', () => {
            cursor.style.display = 'none';
            trail.style.display = 'none';
        });
        iframe.addEventListener('mouseleave', () => {
            cursor.style.display = 'block';
            trail.style.display = 'block';
            // Reset position to avoid jumping
            mouseX = event.clientX;
            mouseY = event.clientY;
            trailX = mouseX;
            trailY = mouseY;
        });
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .element-card, .arch-layer, .flow-step, .event-zone');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ============================================
// TYPEWRITER EFFECT (Hero)
// ============================================
function initTypewriter() {
    const element = document.getElementById('typewriter-text');
    const text = 'FULL STACK DEVELOPER';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">_</span>';
            i++;
            setTimeout(type, 100);
        } else {
            element.innerHTML = text + '<span class="typing-cursor">_</span>';
        }
    }
    
    type();
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// HTML LIVE EDITOR
// ============================================
function initHtmlEditor() {
    const editor = document.getElementById('htmlEditor');
    const preview = document.getElementById('htmlPreview');
    
    function updatePreview() {
        const code = editor.value;
        const doc = preview.contentDocument || preview.contentWindow.document;
        
        const injectScript = `
            <script>
                document.addEventListener('click', function(e) {
                    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
                        window.parent.postMessage({action: 'focusEditor'}, '*');
                    }
                });
            </script>
        `;
        
        doc.open();
        doc.write(code + injectScript);
        doc.close();
    }
    
    editor.addEventListener('input', updatePreview);
    
    window.addEventListener('message', function(e) {
        if (e.data && e.data.action === 'focusEditor') {
            editor.focus();
            const searchStr = 'Hello World!';
            const index = editor.value.indexOf(searchStr);
            if (index !== -1) {
                editor.setSelectionRange(index, index + searchStr.length);
            }
        }
    });
    
    // Initial render
    updatePreview();
}

function resetHtmlEditor() {
    const editor = document.getElementById('htmlEditor');
    editor.value = `<!-- Try editing this HTML! -->
<div class="my-card">
  <h3>Hello World!</h3>
  <p>This is a <strong>live</strong> preview.</p>
  <button class="btn">Click Me!</button>
</div>
<style>
  .my-card {
    background: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .my-card h3 { color: #ff471d; }
  .my-card button {
    background: #ff471d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>`;
    editor.dispatchEvent(new Event('input'));
}

// ============================================
// SEMANTIC HTML TOGGLE
// ============================================
function showSemantic(type, btn) {
    // Update buttons
    document.querySelectorAll('.semantic-toggle .btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show/hide views
    document.querySelectorAll('.semantic-view').forEach(v => v.classList.remove('active'));
    document.getElementById(type + 'View').classList.add('active');
}

// ============================================
// FORM DEMO
// ============================================
function updateFormOutput() {
    const text = document.getElementById('formText').value;
    const email = document.getElementById('formEmail').value;
    const select = document.getElementById('formSelect').value;
    const range = document.getElementById('formRange').value;
    const check = document.getElementById('formCheck').checked;
    
    const data = {
        text: text || null,
        email: email || null,
        role: select || null,
        satisfaction: parseInt(range),
        agreed: check
    };
    
    document.getElementById('formDataDisplay').textContent = JSON.stringify(data, null, 2);
}

function handleFormSubmit(e) {
    e.preventDefault();
    updateFormOutput();
    
    const output = document.getElementById('formDataDisplay');
    output.textContent += '\n\n// Form submitted!\n// In a real app, this data would be sent to a server\n// using fetch() or XMLHttpRequest.';
}

// ============================================
// CSS PLAYGROUND
// ============================================
function updateCssPlayground() {
    const radius = document.getElementById('borderRadius').value;
    const rotate = document.getElementById('rotate').value;
    const blur = document.getElementById('blur').value;
    const opacity = document.getElementById('opacity').value;
    const scale = document.getElementById('scale').value;
    
    document.getElementById('radiusVal').textContent = radius;
    document.getElementById('rotateVal').textContent = rotate;
    document.getElementById('blurVal').textContent = blur;
    document.getElementById('opacityVal').textContent = (opacity / 100).toFixed(1);
    document.getElementById('scaleVal').textContent = (scale / 100).toFixed(1);
    
    const box = document.getElementById('cssPreviewBox');
    box.style.borderRadius = radius + 'px';
    box.style.transform = `rotate(${rotate}deg) scale(${scale / 100})`;
    box.style.filter = `blur(${blur}px)`;
    box.style.opacity = opacity / 100;
    box.style.backgroundColor = state.cssBgColor;
    
    document.getElementById('cssCodeOutput').innerHTML = `<code>.box {
  border-radius: ${radius}px;
  transform: rotate(${rotate}deg) scale(${(scale / 100).toFixed(1)});
  filter: blur(${blur}px);
  opacity: ${(opacity / 100).toFixed(1)};
  background-color: ${state.cssBgColor};
}</code>`;
}

function setBgColor(color) {
    state.cssBgColor = color;
    updateCssPlayground();
}

function resetCssPlayground() {
    document.getElementById('borderRadius').value = 0;
    document.getElementById('rotate').value = 0;
    document.getElementById('blur').value = 0;
    document.getElementById('opacity').value = 100;
    document.getElementById('scale').value = 100;
    state.cssBgColor = '#ff471d';
    updateCssPlayground();
}

// ============================================
// FLEXBOX DEMO
// ============================================
function setFlexDirection(direction) {
    state.flexDirection = direction;
    const container = document.getElementById('flexboxContainer');
    container.style.flexDirection = direction;
    updateFlexCode();
}

function setJustify(justify) {
    state.justifyContent = justify;
    const container = document.getElementById('flexboxContainer');
    container.style.justifyContent = justify;
    updateFlexCode();
}

function updateFlexCode() {
    document.getElementById('flexCode').innerHTML = `<code>.container {
  display: flex;
  flex-direction: ${state.flexDirection};
  justify-content: ${state.justifyContent || 'flex-start'};
}</code>`;
}

// ============================================
// GRID DEMO
// ============================================
function setGridCols(cols) {
    state.gridColumns = cols;
    const container = document.getElementById('gridContainer');
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    updateGridCode();
}

function toggleGridGap() {
    state.gridGap = !state.gridGap;
    const container = document.getElementById('gridContainer');
    container.style.gap = state.gridGap ? '10px' : '0px';
    updateGridCode();
}

function updateGridCode() {
    document.getElementById('gridCode').innerHTML = `<code>.container {
  display: grid;
  grid-template-columns: repeat(${state.gridColumns}, 1fr);
  gap: ${state.gridGap ? '10px' : '0px'};
}</code>`;
}

// ============================================
// BOOTSTRAP GRID VISUALIZER
// ============================================
function setBreakpoint(bp, btn) {
    document.querySelectorAll('.breakpoint-controls .btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const visual = document.getElementById('gridVisual');
    const cols = document.querySelectorAll('.grid-col');
    
    const breakpoints = {
        xs: '<576px',
        sm: '\u2265576px',
        md: '\u2265768px',
        lg: '\u2265992px',
        xl: '\u22651200px'
    };
    
    // Simulate different column layouts based on breakpoint
    cols.forEach(col => {
        switch(bp) {
            case 'xs':
                col.style.flex = '0 0 100%';
                break;
            case 'sm':
                col.style.flex = '0 0 calc(50% - 0.25rem)';
                break;
            case 'md':
                col.style.flex = '0 0 calc(33.333% - 0.35rem)';
                break;
            case 'lg':
                col.style.flex = '0 0 calc(25% - 0.375rem)';
                break;
            case 'xl':
                col.style.flex = '0 0 calc(16.666% - 0.4rem)';
                break;
        }
    });
    
    // Update code output
    const codeMap = {
        xs: `<div class="row">
  <div class="col-12">.col-12 (100%)</div>
  <!-- 6 columns stacked -->
</div>`,
        sm: `<div class="row">
  <div class="col-12 col-sm-6">.col-sm-6 (50%)</div>
  <!-- 2 per row -->
</div>`,
        md: `<div class="row">
  <div class="col-sm-6 col-md-4">.col-md-4 (33%)</div>
  <!-- 3 per row -->
</div>`,
        lg: `<div class="row">
  <div class="col-md-4 col-lg-3">.col-lg-3 (25%)</div>
  <!-- 4 per row -->
</div>`,
        xl: `<div class="row">
  <div class="col-lg-3 col-xl-2">.col-xl-2 (16.6%)</div>
  <!-- 6 per row -->
</div>`
    };
    
    document.getElementById('gridCodeOutput').innerHTML = `<code>${codeMap[bp]}</code>`;
}

// ============================================
// REQUEST FLOW DEMO
// ============================================
function runRequestFlow() {
    if (state.requestFlowRunning) return;
    state.requestFlowRunning = true;
    
    const btn = document.getElementById('runFlowBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>RUNNING...';
    
    const consoleBody = document.getElementById('consoleBody');
    const steps = [
        { id: 'step1', conn: 'conn1', msg: '1. User sends HTTP request from browser' },
        { id: 'step2', conn: 'conn2', msg: '2. Request travels through DNS and Internet' },
        { id: 'step3', conn: 'conn3', msg: '3. Web server (Apache/Nginx) receives request' },
        { id: 'step4', conn: 'conn4', msg: '4. Application server processes business logic' },
        { id: 'step5', conn: 'conn5', msg: '5. Database query executed (SQL/NoSQL)' },
        { id: 'step6', conn: null, msg: '6. Response sent back: HTML/JSON data' }
    ];
    
    consoleBody.innerHTML = '';
    
    let i = 0;
    function activateStep() {
        if (i > 0) {
            document.getElementById(steps[i - 1].id).classList.remove('active');
        }
        
        if (i < steps.length) {
            document.getElementById(steps[i].id).classList.add('active');
            if (steps[i].conn) {
                document.getElementById(steps[i].conn).classList.add('active');
            }
            
            const line = document.createElement('div');
            line.innerHTML = `<span class="console-prompt">$</span> ${steps[i].msg}`;
            consoleBody.appendChild(line);
            consoleBody.scrollTop = consoleBody.scrollHeight;
            
            i++;
            setTimeout(activateStep, 1200);
        } else {
            setTimeout(() => {
                const line = document.createElement('div');
                line.innerHTML = `<span class="console-prompt" style="color: #4CAF50;">$</span> <span style="color: #4CAF50;">Request completed successfully! Page rendered in 245ms</span>`;
                consoleBody.appendChild(line);
                consoleBody.scrollTop = consoleBody.scrollHeight;
                
                // Reset
                setTimeout(() => {
                    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active'));
                    document.querySelectorAll('.flow-connector').forEach(c => c.classList.remove('active'));
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-play me-2"></i>RUN REQUEST FLOW';
                    state.requestFlowRunning = false;
                }, 2000);
            }, 500);
        }
    }
    
    activateStep();
}

// ============================================
// JAVASCRIPT CONSOLE
// ============================================
function runJsCode() {
    const editor = document.getElementById('jsEditor');
    const output = document.getElementById('jsConsoleOutput');
    const code = editor.value;
    
    output.innerHTML = '';
    
    // Capture console.log outputs
    const logs = [];
    const originalLog = console.log;
    console.log = function(...args) {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
        originalLog.apply(console, args);
    };
    
    try {
        // Wrap in function to allow return
        const result = eval(code);
        
        // Display logs
        logs.forEach(log => {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.innerHTML = `<span class="log-icon"><i class="fas fa-angle-right"></i></span> ${escapeHtml(log)}`;
            output.appendChild(line);
        });
        
        // Display return value if any
        if (result !== undefined && logs.length === 0) {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.innerHTML = `<span class="log-icon"><i class="fas fa-angle-right"></i></span> ${escapeHtml(String(result))}`;
            output.appendChild(line);
        }
        
        if (logs.length === 0 && result === undefined) {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.innerHTML = `<span class="log-icon"><i class="fas fa-check" style="color: #4CAF50;"></i></span> Code executed successfully (no output)`;
            output.appendChild(line);
        }
    } catch (error) {
        const line = document.createElement('div');
        line.className = 'console-line';
        line.innerHTML = `<span class="log-icon"><i class="fas fa-times" style="color: #ff5f56;"></i></span> <span style="color: #ff5f56;">${escapeHtml(error.message)}</span>`;
        output.appendChild(line);
    }
    
    // Restore console.log
    console.log = originalLog;
}

function clearJsConsole() {
    document.getElementById('jsConsoleOutput').innerHTML = 
        '<div class="console-line"><span class="console-prompt">></span> Console cleared. Click "Run" to execute code...</div>';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// DOM MANIPULATION DEMO
// ============================================
function changeText() {
    const heading = document.getElementById('domHeading');
    const texts = ['Original Heading', 'DOM Updated!', 'Text Changed', 'Hello World', 'Dynamic Content'];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    heading.textContent = randomText;
    heading.style.color = '#ff471d';
    
    updateDomCode('text');
}

function changeStyle() {
    const box = document.getElementById('domBox');
    const colors = ['#ff471d', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;
    box.style.borderRadius = Math.floor(Math.random() * 50) + 'px';
    box.style.transform = `rotate(${Math.floor(Math.random() * 30)}deg)`;
    
    updateDomCode('style');
}

function toggleClass() {
    const box = document.getElementById('domBox');
    box.classList.toggle('highlighted');
    
    updateDomCode('class');
}

function addElement() {
    const target = document.getElementById('domTarget');
    const newEl = document.createElement('div');
    newEl.className = 'dom-dynamic-element';
    newEl.textContent = `Element ${++state.domElementsAdded}`;
    newEl.style.cssText = `
        display: inline-block;
        background: rgba(255, 71, 29, 0.2);
        border: 1px solid var(--bg-accent);
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        border-radius: 0.25rem;
        font-family: var(--font-primary);
        font-size: 0.85rem;
    `;
    target.appendChild(newEl);
    
    updateDomCode('add');
}

function removeElement() {
    const target = document.getElementById('domTarget');
    const dynamicElements = target.querySelectorAll('.dom-dynamic-element');
    if (dynamicElements.length > 0) {
        dynamicElements[dynamicElements.length - 1].remove();
        state.domElementsAdded--;
    }
    
    updateDomCode('remove');
}

function resetDom() {
    const target = document.getElementById('domTarget');
    target.innerHTML = `
        <h5 id="domHeading">Original Heading</h5>
        <p id="domParagraph">This text can be modified with JavaScript.</p>
        <div class="dom-box" id="domBox"></div>
    `;
    state.domElementsAdded = 0;
    
    document.getElementById('domCodeDisplay').innerHTML = `<code>// DOM manipulation examples:
document.getElementById('heading').textContent = 'New Text';
document.getElementById('box').style.backgroundColor = 'blue';
element.classList.add('highlight');
parent.appendChild(newElement);
parent.removeChild(lastChild);</code>`;
}

function updateDomCode(type) {
    const codeMap = {
        text: `// Change text content
document.getElementById('domHeading').textContent = 'New Text';
// Updates the heading text in real-time`,
        style: `// Change CSS styles
document.getElementById('domBox').style.backgroundColor = '#4CAF50';
document.getElementById('domBox').style.borderRadius = '20px';
// Applies new styles dynamically`,
        class: `// Toggle CSS class
document.getElementById('domBox').classList.toggle('highlighted');
// Adds/removes the 'highlighted' class`,
        add: `// Create and append element
const newEl = document.createElement('div');
newEl.textContent = 'New Element';
parent.appendChild(newEl);
// Adds a new element to the DOM`,
        remove: `// Remove last element
const elements = parent.querySelectorAll('.dynamic');
parent.removeChild(elements[elements.length - 1]);
// Removes the last added element`
    };
    
    document.getElementById('domCodeDisplay').innerHTML = `<code>${codeMap[type]}</code>`;
}

// ============================================
// EVENT HANDLING DEMO
// ============================================
function initEventDemo() {
    const zone = document.getElementById('eventZone');
    const logBody = document.getElementById('logBody');
    
    if (!zone) return;
    
    zone.addEventListener('click', () => {
        zone.classList.add('clicked');
        addLogEntry('click', 'Mouse clicked on element');
        setTimeout(() => zone.classList.remove('clicked'), 300);
    });
    
    zone.addEventListener('mouseenter', () => {
        addLogEntry('mouseenter', 'Mouse entered the element');
    });
    
    zone.addEventListener('mouseleave', () => {
        addLogEntry('mouseleave', 'Mouse left the element');
    });
    
    zone.addEventListener('dblclick', () => {
        addLogEntry('dblclick', 'Double click detected!');
    });
    
    zone.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        addLogEntry('contextmenu', 'Right-click (context menu)');
    });
}

function addLogEntry(type, message) {
    const logBody = document.getElementById('logBody');
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.innerHTML = `<span style="color: var(--bg-accent);">[${time}]</span> <strong>${type}:</strong> ${message}`;
    logBody.insertBefore(entry, logBody.firstChild);
    
    // Keep only last 10 entries
    while (logBody.children.length > 10) {
        logBody.removeChild(logBody.lastChild);
    }
}

// ============================================
// ASYNC DEMO
// ============================================
function simulateAsync() {
    const steps = ['async1', 'async2', 'async3'];
    
    steps.forEach((id, index) => {
        setTimeout(() => {
            document.querySelectorAll('.async-step').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            
            if (index === steps.length - 1) {
                setTimeout(() => {
                    document.querySelectorAll('.async-step').forEach(s => s.classList.remove('active'));
                }, 2000);
            }
        }, index * 1500);
    });
}

// ============================================
// ARRAY METHODS DEMO
// ============================================
function runArrayMethod(method) {
    const technologies = ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React'];
    const output = document.getElementById('arrayOutput');
    
    let result;
    let code;
    
    switch(method) {
        case 'map':
            result = technologies.map(t => t.toUpperCase());
            code = `array.map(item => item.toUpperCase())`;
            break;
        case 'filter':
            result = technologies.filter(t => t.length > 3);
            code = `array.filter(item => item.length > 3)`;
            break;
        case 'find':
            result = technologies.find(t => t.startsWith('J'));
            code = `array.find(item => item.startsWith('J'))`;
            break;
        case 'reduce':
            result = technologies.reduce((acc, t) => acc + t.length, 0);
            code = `array.reduce((acc, item) => acc + item.length, 0)`;
            break;
        case 'sort':
            result = [...technologies].sort();
            code = `array.sort()`;
            break;
        case 'forEach':
            const items = [];
            technologies.forEach((t, i) => items.push(`${i}: ${t}`));
            result = items;
            code = `array.forEach((item, index) => console.log(index, item))`;
            break;
    }
    
    output.innerHTML = `<strong>Original:</strong> ["${technologies.join('", "')}"]
<strong>Method:</strong> ${code}
<strong>Result:</strong> ${JSON.stringify(result)}`;
}

// ============================================
// DEVELOPER PROFILE DEMO
// ============================================
function runObjectDemo() {
    const developer = {
        name: 'Web Developer',
        role: 'Full Stack',
        skills: ['HTML', 'CSS', 'JS'],
        experience: 3,
        isActive: true
    };
    
    const output = document.getElementById('objectOutput');
    
    output.innerHTML = `<strong>Object:</strong> ${JSON.stringify(developer, null, 2)}

<strong>developer.name:</strong> "${developer.name}"
<strong>Object.keys():</strong> [${Object.keys(developer).map(k => `"${k}"`).join(', ')}]
<strong>Object.values():</strong> [${Object.values(developer).map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}]
<strong>Object.entries():</strong> ${JSON.stringify(Object.entries(developer))}`;
}

// ============================================
// ASCII GLOBE (Footer)
// ============================================
function initAsciiGlobe() {
    const globeEl = document.getElementById('asciiGlobe');
    if (!globeEl) return;
    
    const globeFrames = [
        `    .-.,
   '(  )'
  .-'  '-.
 /        \\
|  .--.   |
| (    )  |
 \\ '--'  /
  '-.  .-'
     \/`,
        `    .-.,
   ')  ( '
  '-.  .-'
 /  '--' \\
|        |
| .----. |
 |(    ) |
 \\'--'  /
  '-.  .-'
     \/`,
        `    .-.,
   ' '--'
  .-'  '-.
 /  .--.  \\
|  (    ) |
|   '--'  |
 \\       /
  '-.  .-'
     \/`
    ];
    
    let frameIndex = 0;
    
    setInterval(() => {
        globeEl.textContent = globeFrames[frameIndex];
        frameIndex = (frameIndex + 1) % globeFrames.length;
    }, 800);
}

// ============================================
// FOOTER TITLE TYPEWRITER
// ============================================
function initFooterTitle() {
    const title = document.getElementById('footerTitle');
    if (!title) return;
    
    const originalText = 'INITIALIZE CONTACT SEQUENCE';
    const hoverText = 'SEND EMAIL ->';
    
    title.addEventListener('mouseenter', () => {
        typeText(title, hoverText, 50);
    });
    
    title.addEventListener('mouseleave', () => {
        typeText(title, originalText, 50);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all info cards
    document.querySelectorAll('.info-card, .element-card, .animation-card, .arch-layer').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for animate-in
const animateStyles = document.createElement('style');
animateStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animateStyles);

// ============================================
// ARCHITECTURE LAYER INTERACTION
// ============================================
function initArchLayers() {
    const layers = document.querySelectorAll('.arch-layer');
    const cards = {
        client: document.getElementById('frontendCard'),
        server: document.getElementById('backendCard'),
        database: document.getElementById('databaseCard')
    };
    
    layers.forEach(layer => {
        layer.addEventListener('mouseenter', () => {
            const type = layer.dataset.layer;
            if (cards[type]) {
                cards[type].style.borderColor = 'var(--bg-accent)';
                cards[type].style.transform = 'translateY(-5px)';
                cards[type].style.boxShadow = '0 10px 30px rgba(255, 71, 29, 0.1)';
            }
        });
        
        layer.addEventListener('mouseleave', () => {
            const type = layer.dataset.layer;
            if (cards[type]) {
                cards[type].style.borderColor = '';
                cards[type].style.transform = '';
                cards[type].style.boxShadow = '';
            }
        });
    });
}

// ============================================
// ELEMENT CARDS INTERACTION
// ============================================
function initElementCards() {
    const cards = document.querySelectorAll('.element-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Flash effect
            card.style.background = 'var(--bg-accent)';
            card.style.color = '#fff';
            card.querySelector('i').style.color = '#fff';
            
            setTimeout(() => {
                card.style.background = '';
                card.style.color = '';
                card.querySelector('i').style.color = '';
            }, 300);
        });
    });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    
    // Core functionality
    initCustomCursor();
    initNavbar();
    initBackToTop();
    initHtmlEditor();
    initEventDemo();
    initAsciiGlobe();
    initFooterTitle();
    initScrollAnimations();
    initArchLayers();
    initElementCards();
    
    // Boot up the game engine
    new GameEngine();

    
    // Initialize CSS playground with defaults
    updateCssPlayground();
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Log ready message
    console.log('%c DevFolio ', 'background: #ff471d; color: #fff; font-size: 20px; font-weight: bold;');
    console.log('%c Full Stack ePortfolio loaded successfully! ', 'background: #1b1b1b; color: #e5dcd1; font-size: 14px;');
});


// ============================================
// THE RUNNER GAME ENGINE
// ============================================
class GameEngine {
    constructor() {
        this.canvas = document.getElementById('jsGameCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.scoreEl = document.getElementById('gameScore');
        this.highScoreEl = document.getElementById('gameHighScore');
        this.startScreen = document.getElementById('gameStartScreen');
        this.overScreen = document.getElementById('gameOverScreen');
        
        this.width = 800;
        this.height = 250;
        
        // Physics & state
        this.gravity = 0.6;
        this.gameSpeed = 5;
        this.score = 0;
        this.highScore = localStorage.getItem('runnerHighScore') || 0;
        this.highScoreEl.innerText = `HI: ${this.highScore}`;
        
        this.isRunning = false;
        this.animationId = null;
        this.frameCount = 0;
        
        this.player = {
            x: 50,
            y: 200,
            width: 30,
            height: 30,
            vy: 0,
            jumpPower: -12,
            isGrounded: false,
            color: '#ff471d'
        };
        
        this.obstacles = [];
        this.particles = [];
        
        this.initControls();
        
        document.getElementById('btnStartGame').addEventListener('click', () => this.start());
        document.getElementById('btnRestartGame').addEventListener('click', () => this.start());
        
        // Initial draw
        this.clear();
        this.drawPlayer();
        this.drawGround();
    }
    
    initControls() {
        const jumpAction = (e) => {
            if (e.type === 'keydown' && e.code !== 'Space') return;
            if (e.type === 'keydown') e.preventDefault();
            
            if (!this.isRunning && this.startScreen.classList.contains('hidden-overlay') === false) {
                this.start();
                return;
            }
            
            if (this.isRunning && this.player.isGrounded) {
                this.player.vy = this.player.jumpPower;
                this.player.isGrounded = false;
                this.createParticles(this.player.x, this.player.y + this.player.height, 5, '#e5dcd1');
            }
        };
        
        document.addEventListener('keydown', jumpAction);
        this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); jumpAction(e); }, {passive: false});
        this.canvas.addEventListener('mousedown', jumpAction);
    }
    
    start() {
        this.player.y = this.height - 20 - this.player.height;
        this.player.vy = 0;
        this.obstacles = [];
        this.particles = [];
        this.score = 0;
        this.gameSpeed = 5;
        this.frameCount = 0;
        
        this.scoreEl.innerText = `SCORE: 0`;
        this.startScreen.classList.add('hidden-overlay');
        this.overScreen.classList.add('hidden-overlay');
        
        this.isRunning = true;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.loop();
    }
    
    die() {
        this.isRunning = false;
        this.overScreen.classList.remove('hidden-overlay');
        this.createParticles(this.player.x + 15, this.player.y + 15, 30, this.player.color);
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('runnerHighScore', this.highScore);
            this.highScoreEl.innerText = `HI: ${this.highScore}`;
        }
    }
    
    createParticles(x, y, count, color) {
        for(let i=0; i<count; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 1,
                color
            });
        }
    }
    
    updatePhysics() {
        // Player
        this.player.vy += this.gravity;
        this.player.y += this.player.vy;
        
        const groundY = this.height - 20;
        if (this.player.y + this.player.height >= groundY) {
            this.player.y = groundY - this.player.height;
            this.player.vy = 0;
            if (!this.player.isGrounded) {
                this.player.isGrounded = true;
                this.createParticles(this.player.x + 15, groundY, 3, '#e5dcd1');
            }
        }
        
        // Obstacles
        if (this.frameCount % Math.floor(Math.random() * 60 + 60) === 0) {
            const h = Math.random() * 30 + 20;
            this.obstacles.push({
                x: this.width,
                y: groundY - h,
                width: 20,
                height: h,
                passed: false
            });
        }
        
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            let obs = this.obstacles[i];
            obs.x -= this.gameSpeed;
            
            // Collision
            if (
                this.player.x < obs.x + obs.width &&
                this.player.x + this.player.width > obs.x &&
                this.player.y < obs.y + obs.height &&
                this.player.y + this.player.height > obs.y
            ) {
                this.die();
            }
            
            // Score
            if (obs.x + obs.width < this.player.x && !obs.passed) {
                obs.passed = true;
                this.score += 10;
                this.scoreEl.innerText = `SCORE: ${this.score}`;
                if (this.score % 50 === 0) this.gameSpeed += 0.5; // increase difficulty
            }
            
            if (obs.x + obs.width < 0) this.obstacles.splice(i, 1);
        }
        
        // Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }
    
    clear() {
        this.ctx.fillStyle = '#0f0f13';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawGround() {
        this.ctx.strokeStyle = '#e5dcd1';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height - 20);
        this.ctx.lineTo(this.width, this.height - 20);
        this.ctx.stroke();
    }
    
    drawPlayer() {
        this.ctx.fillStyle = this.player.color;
        this.ctx.shadowColor = this.player.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        this.ctx.shadowBlur = 0;
    }
    
    drawObstacles() {
        this.ctx.fillStyle = '#e5dcd1';
        for (let obs of this.obstacles) {
            this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        }
    }
    
    drawParticles() {
        for (let p of this.particles) {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, 4, 4);
        }
        this.ctx.globalAlpha = 1;
    }
    
    loop() {
        if (!this.isRunning) return;
        
        this.frameCount++;
        this.updatePhysics();
        
        this.clear();
        this.drawParticles();
        this.drawGround();
        this.drawPlayer();
        this.drawObstacles();
        
        this.animationId = requestAnimationFrame(() => this.loop());
    }
}



// ==========================================
// CALCULATOR DEMO LOGIC
// ==========================================
let calcCurrentVal = '';
let calcPreviousVal = '';
let calcOperator = null;

function updateCalcDisplay() {
    const display = document.getElementById('calcDisplay');
    if (!display) return;
    if (calcCurrentVal === '') {
        display.innerText = '0';
    } else {
        display.innerText = calcCurrentVal;
    }
}

window.calcInput = function(numStr) {
    if (numStr === '.' && calcCurrentVal.includes('.')) return;
    calcCurrentVal += numStr;
    updateCalcDisplay();
};

window.calcOp = function(opStr) {
    if (calcCurrentVal === '') return;
    if (calcPreviousVal !== '') {
        window.calcCalculate();
    }
    calcOperator = opStr;
    calcPreviousVal = calcCurrentVal;
    calcCurrentVal = '';
};

window.calcClear = function() {
    calcCurrentVal = '';
    calcPreviousVal = '';
    calcOperator = null;
    updateCalcDisplay();
};

window.calcCalculate = function() {
    let computation;
    const prev = parseFloat(calcPreviousVal);
    const current = parseFloat(calcCurrentVal);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (calcOperator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    
    calcCurrentVal = computation.toString();
    calcOperator = null;
    calcPreviousVal = '';
    updateCalcDisplay();
};

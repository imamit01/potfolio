// ============ SECURITY FEATURES ============
// Input Sanitization - prevents XSS attacks
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Secure all external links (noopener, noreferrer)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Disable right-click on images (asset protection)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        console.log('🔒 Image protection enabled');
    }
});

// Disable drag on images
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Console warning for potential hackers
console.log('%c🛡️ SECURITY WARNING', 'color: #ff5f56; font-size: 30px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers.', 'color: #ffbd2e; font-size: 14px;');
console.log('%cIf someone told you to paste something here, it is likely a scam.', 'color: #ffbd2e; font-size: 14px;');
console.log('%cFor any inquiries, contact: byemail007@gmail.com', 'color: #00f3ff; font-size: 12px;');

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============ ANALYTICS TRACKING ============
(function trackVisit() {
    const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{"visits":[],"pages":{},"devices":{"desktop":0,"mobile":0,"tablet":0},"hours":{},"totalVisits":0}');
    const today = new Date().toDateString();
    const hour = new Date().getHours().toString();
    const page = window.location.pathname.split('/').pop() || 'index.html';

    // Track visit
    analytics.visits.push({ date: today, page, time: new Date().toISOString() });
    analytics.totalVisits = (analytics.totalVisits || 0) + 1;

    // Track page
    analytics.pages[page] = (analytics.pages[page] || 0) + 1;

    // Track hour
    analytics.hours[hour] = (analytics.hours[hour] || 0) + 1;

    // Track device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
    if (isTablet) analytics.devices.tablet++;
    else if (isMobile) analytics.devices.mobile++;
    else analytics.devices.desktop++;

    // Keep only last 30 days of visits
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    analytics.visits = analytics.visits.filter(v => new Date(v.time) > thirtyDaysAgo);

    localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
})();

// ============ LOADING SCREEN ============
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loader-progress');
let loadProgress = 0;

function simulateLoading() {
    if (!loader || !loaderProgress) return;
    const interval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress >= 100) {
            loadProgress = 100;
            loaderProgress.style.width = '100%';
            clearInterval(interval);
            setTimeout(() => loader?.classList.add('hidden'), 500);
        } else {
            loaderProgress.style.width = loadProgress + '%';
        }
    }, 100);
}

// ============ SCROLL PROGRESS BAR ============
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

// ============ STARFIELD BACKGROUND ============
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');
let stars = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function initStarfield() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}

function animateStarfield() {
    starCtx.fillStyle = '#050505';
    starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#00f3ff';

    stars.forEach(star => {
        const parallaxX = (mouseX - starCanvas.width / 2) * star.speed * 0.02;
        const parallaxY = (mouseY - starCanvas.height / 2) * star.speed * 0.02;

        starCtx.beginPath();
        starCtx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(0, 243, 255, ${star.opacity})`;
        starCtx.fill();

        star.y += star.speed;
        star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;

        if (star.y > starCanvas.height) {
            star.y = 0;
            star.x = Math.random() * starCanvas.width;
        }
    });

    requestAnimationFrame(animateStarfield);
}

// ============ PARTICLE SYSTEM ============
const particleCanvas = document.getElementById('particles');
const particleCtx = particleCanvas.getContext('2d');
let particles = [];

function initParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function createParticle(x, y) {
    for (let i = 0; i < 5; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            size: Math.random() * 3 + 1
        });
    }
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        particleCtx.fillStyle = `rgba(0, 243, 255, ${p.life})`;
        particleCtx.fill();
    });

    requestAnimationFrame(animateParticles);
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.terminal-modal') && !e.target.closest('button') && !e.target.closest('a')) {
        createParticle(e.clientX, e.clientY);
        if (soundEnabled) playSound('click');
    }
});

// ============ CUSTOM CURSOR ============
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let cursorTrails = [];

function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';

    // Cursor trail
    cursorTrails.push({ x: e.clientX, y: e.clientY, opacity: 1 });
    if (cursorTrails.length > 20) cursorTrails.shift();
}

document.addEventListener('mousemove', updateCursor);

// Hover effects
document.querySelectorAll('a, button, .project-card, .stat-card, .skill-tag, .tilt-card, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
        if (soundEnabled) playSound('hover');
    });
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
});

// ============ MAGNETIC BUTTONS ============
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ============ 3D TILT EFFECT ============
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============ NAVIGATION ============
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ============ SCROLL REVEAL ============
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ============ ANIMATED COUNTERS ============
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 40);
        });
    }
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));

// ============ TYPEWRITER EFFECT ============
const typewriterEl = document.getElementById('typewriter');
const typewriterTexts = ['Frontend Developer', 'ML Researcher', 'Full-Stack Aspirant', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typewriterEl) return;
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        delay = 500;
    }

    setTimeout(typeWriter, delay);
}

// ============ TEXT SCRAMBLE EFFECT ============
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.textContent;
    }

    scramble() {
        let iterations = 0;
        const interval = setInterval(() => {
            this.el.textContent = this.originalText.split('').map((char, i) => {
                if (i < iterations) return this.originalText[i];
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            }).join('');

            iterations += 1 / 3;
            if (iterations >= this.originalText.length) clearInterval(interval);
        }, 30);
    }
}

document.querySelectorAll('.scramble-text').forEach(el => {
    const scrambler = new TextScramble(el);
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            scrambler.scramble();
            observer.disconnect();
        }
    });
    observer.observe(el);
});

// ============ PROJECTS DATA ============
const projects = [
    { title: "Heart Disease Prediction System", description: "Hybrid ML model achieving high accuracy in predicting cardiovascular diseases using ensemble techniques.", tech: ["Python", "ML", "Scikit-learn"], type: "Machine Learning" },
    { title: "Interactive Data Dashboard", description: "Real-time data visualization dashboard with dynamic charts and responsive design.", tech: ["JavaScript", "HTML", "CSS"], type: "Frontend" },
    { title: "Portfolio Website", description: "Futuristic cyberpunk-themed portfolio with glassmorphism, parallax effects, and smooth animations.", tech: ["HTML", "CSS", "JavaScript"], type: "Frontend" },
    { title: "Medical Data Analysis", description: "Statistical analysis and visualization of healthcare datasets for research insights.", tech: ["Python", "Pandas", "Data Science"], type: "Data Science" },
    { title: "Responsive Web Application", description: "Mobile-first web application with modern UI components and accessibility features.", tech: ["HTML", "CSS", "JavaScript"], type: "Frontend" },
    { title: "Database Management System", description: "Optimized SQL database design with efficient queries for large-scale data handling.", tech: ["PostgreSQL", "SQL"], type: "Backend" }
];

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = projects.map((project, i) => `
        <article class="project-card tilt-card reveal" style="animation-delay: ${i * 0.1}s">
            <div class="holographic"></div>
            <span class="project-type">${project.type}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tech">${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        </article>
    `).join('');

    document.querySelectorAll('.project-card').forEach(card => {
        revealObserver.observe(card);
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 15}deg) rotateY(${(centerX - x) / 15}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
}

// ============ SKILLS DATA ============
const skills = ["HTML", "CSS", "JavaScript", "Python", "SQL", "PostgreSQL", "Machine Learning", "Data Science", "Frontend Dev", "Responsive Design", "Git", "Problem Solving"];

function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = skills.map((skill, i) => `<span class="skill-tag" style="animation-delay: ${i * 0.2}s">${skill}</span>`).join('');
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const mailtoLink = `mailto:byemail007@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name}%0AEmail: ${email}`;
    window.location.href = mailtoLink;
    contactForm.reset();
    if (soundEnabled) playSound('success');
});

// ============ BACK TO TOP ============
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (soundEnabled) playSound('click');
});

// ============ LIVE CLOCK ============
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' });
    document.querySelector('.clock-time').textContent = time;
}
setInterval(updateClock, 1000);

// ============ THEME SWITCHER ============
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = 'cyan';

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'cyan' ? 'purple' : 'cyan';
    document.documentElement.setAttribute('data-theme', currentTheme === 'purple' ? 'purple' : '');
    themeToggle.textContent = currentTheme === 'cyan' ? '🎨' : '💜';
    if (soundEnabled) playSound('click');
});

// ============ SOUND EFFECTS ============
let soundEnabled = false;
const soundToggle = document.getElementById('sound-toggle');

const sounds = {
    hover: () => { const osc = audioCtx?.createOscillator(); if (osc) { osc.frequency.value = 800; osc.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.05); } },
    click: () => { const osc = audioCtx?.createOscillator(); if (osc) { osc.frequency.value = 600; osc.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.1); } },
    success: () => { const osc = audioCtx?.createOscillator(); if (osc) { osc.frequency.value = 1000; osc.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.15); } }
};

let audioCtx;

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (soundEnabled) playSound('click');
});

function playSound(type) {
    if (soundEnabled && sounds[type]) sounds[type]();
}

// ============ TERMINAL ============
const terminalToggle = document.getElementById('terminal-toggle');
const terminalModal = document.getElementById('terminal-modal');
const terminalClose = document.getElementById('terminal-close');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    help: '📋 Available commands:\n\n  about       - Learn about me\n  skills      - My technical skills\n  education   - My degrees\n  experience  - Work history\n  contact     - How to reach me\n  publications - Research papers\n  projects    - My projects\n  clear       - Clear terminal\n  exit        - Close terminal',
    about: '👨‍💻 Amit Kumar\n\nM.Tech graduate in Computer Engineering from Chandigarh University.\nPassionate about building modern web interfaces and applying ML to real-world problems.\nCurrently seeking opportunities as a Full-Stack Developer.',
    skills: '🛠️ Technical Skills:\n\n• Frontend: HTML, CSS, JavaScript\n• Backend: Python, SQL, PostgreSQL\n• ML/DS: Machine Learning, Data Science, Scikit-learn\n• Tools: Git, VS Code, Jupyter',
    education: '🎓 Education:\n\n• M.Tech - Computer Engineering\n  Chandigarh University (2022-2024)\n\n• B.Tech - Computer Science\n  Shimla University (2017-2021)',
    experience: '💼 Experience:\n\n• Data Science Intern\n  LetsGrowMore (Feb-Apr 2022)\n\n• Frontend Developer\n  CSDT IT Solution (Feb-Jun 2021)',
    contact: '📧 Contact:\n\n• Email: byemail007@gmail.com\n• LinkedIn: linkedin.com/in/imamit01\n• Location: Chandigarh, India',
    publications: '📚 Publications (3 Scopus-indexed):\n\n1. Hybrid Model for Heart Disease Prediction\n   SCOPES 2024 | DOI: 10.1109/SCOPES64467.2024.10991142\n\n2. Heart Disease Prediction Using ML\n   CRC Press | DOI: 10.1201/9781003596776-30\n\n3. Review on Heart Disease Detection\n   CCICT 2024 | DOI: 10.1109/CCICT62777.2024.00059',
    projects: '🚀 Featured Projects:\n\n• Heart Disease Prediction System (ML)\n• Interactive Data Dashboard (Frontend)\n• Portfolio Website (Frontend)\n• Medical Data Analysis (Data Science)\n• Database Management System (Backend)',
    clear: 'CLEAR',
    exit: 'EXIT'
};

function openTerminal() {
    terminalModal.classList.add('active');
    // Delayed focus to ensure modal is visible first
    setTimeout(() => {
        terminalInput.focus();
        terminalInput.click();
    }, 100);
    if (soundEnabled) playSound('click');
}

function closeTerminal() {
    terminalModal.classList.remove('active');
}

function processCommand(cmd) {
    const cmdLine = document.createElement('p');
    cmdLine.innerHTML = `<span class="cmd">amit@portfolio:~$</span> ${cmd}`;
    terminalOutput.appendChild(cmdLine);

    if (commands[cmd]) {
        if (cmd === 'clear') {
            terminalOutput.innerHTML = '<p class="success">Terminal cleared. Type "help" for commands.</p>';
        } else if (cmd === 'exit') {
            closeTerminal();
        } else {
            const result = document.createElement('p');
            result.className = 'success';
            result.textContent = commands[cmd];
            result.style.whiteSpace = 'pre-line';
            terminalOutput.appendChild(result);
        }
    } else if (cmd) {
        const error = document.createElement('p');
        error.className = 'error';
        error.textContent = `Command not found: "${cmd}"\nType "help" for available commands.`;
        error.style.whiteSpace = 'pre-line';
        terminalOutput.appendChild(error);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    if (soundEnabled) playSound('click');
}

terminalToggle.addEventListener('click', openTerminal);
terminalClose.addEventListener('click', closeTerminal);
terminalModal.addEventListener('click', (e) => { if (e.target === terminalModal) closeTerminal(); });

// Keyboard shortcut: Ctrl + ` to toggle terminal
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        if (terminalModal.classList.contains('active')) {
            closeTerminal();
        } else {
            openTerminal();
        }
    }
    // Escape to close terminal
    if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
        closeTerminal();
    }
});

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = terminalInput.value.toLowerCase().trim();
        terminalInput.value = '';
        processCommand(cmd);
    }
});

// ============ KONAMI CODE EASTER EGG ============
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const notify = document.getElementById('easter-egg-notify');
    notify.classList.add('active');

    // Rainbow mode
    document.body.style.animation = 'rainbow 2s linear infinite';
    const style = document.createElement('style');
    style.textContent = '@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }';
    document.head.appendChild(style);

    // Create explosion particles
    for (let i = 0; i < 100; i++) {
        setTimeout(() => createParticle(Math.random() * window.innerWidth, Math.random() * window.innerHeight), i * 20);
    }

    setTimeout(() => {
        notify.classList.remove('active');
        document.body.style.animation = '';
        style.remove();
    }, 5000);

    if (soundEnabled) playSound('success');
}

// ============ RESUME DOWNLOAD ============
document.getElementById('download-resume').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume download will be available soon! Contact me at byemail007@gmail.com');
    if (soundEnabled) playSound('click');
});

// ============ SCROLL HANDLER ============
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateActiveNav();
            toggleBackToTop();
            ticking = false;
        });
        ticking = true;
    }
});

// ============ RESIZE HANDLER ============
window.addEventListener('resize', () => {
    initStarfield();
    initParticles();
});

// ============ BLOG SYSTEM ============
const defaultBlogPosts = [
    {
        id: 1,
        title: "My Journey into Machine Learning",
        date: "December 15, 2024",
        category: "ml",
        featured: true,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
        gallery: [],
        excerpt: "How I started exploring ML and built my first heart disease prediction model...",
        content: `Machine Learning has always fascinated me since my college days. The idea that computers can learn patterns and make predictions without being explicitly programmed is incredibly powerful.

My journey began during my M.Tech at Chandigarh University, where I started working on healthcare applications of ML. The challenge of predicting heart disease using patient data became my primary research focus.

After months of research, data preprocessing, and model optimization, I developed a hybrid approach that combines multiple ML algorithms to achieve higher accuracy than traditional single-model approaches.

**Key learnings from this journey:**
• Data quality matters more than algorithm complexity
• Feature engineering is crucial for model performance
• Ensemble methods often outperform individual models
• Real-world healthcare data is messy and requires careful handling

I'm excited to continue this journey and apply ML to more real-world problems!`
    },
    {
        id: 2,
        title: "Building This Portfolio Website",
        date: "December 10, 2024",
        category: "frontend",
        featured: false,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
        gallery: [],
        excerpt: "The tech stack and design decisions behind this cyberpunk portfolio...",
        content: `Building a portfolio website is more than just showcasing your work—it's about creating an experience that reflects your personality and skills.

For this portfolio, I wanted something that stands out. Here's what I used:

**Tech Stack:**
• Pure HTML5, CSS3, and Vanilla JavaScript
• No frameworks or external dependencies
• Custom animations and effects

**Design Decisions:**
• Cyberpunk aesthetic with neon colors
• Glassmorphism for depth and modern feel
• Interactive starfield background
• Custom cursor for engagement

**Performance Optimizations:**
• RequestAnimationFrame for smooth animations
• IntersectionObserver for scroll reveals
• Throttled scroll handlers
• CSS transforms for GPU acceleration`
    },
    {
        id: 3,
        title: "Tips for Frontend Development",
        date: "December 5, 2024",
        category: "frontend",
        featured: false,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
        gallery: [],
        excerpt: "Essential tips I've learned for creating modern web interfaces...",
        content: `After working as a Frontend Developer and building multiple projects, here are some tips I've found invaluable:

**1. Master the Fundamentals**
Before jumping into frameworks, truly understand HTML, CSS, and JavaScript.

**2. Write Clean, Semantic Code**
Use proper HTML5 semantic elements for SEO and accessibility.

**3. CSS Custom Properties**
Use CSS variables for theming and maintainability.

**4. Performance First**
Optimize images, minimize reflows, use efficient selectors.

**5. Responsive Design**
Design mobile-first—it's easier to add complexity than remove it.

**6. Accessibility Matters**
Make websites usable by everyone with proper ARIA labels.

**7. Keep Learning**
Stay updated with new CSS features and JavaScript APIs.`
    }
];

// Blog State
let currentFilter = 'all';
let currentSort = 'date';
let searchQuery = '';
let currentBlogId = null;
let adminPassword = 'amit123'; // Simple password for demo

// Get all posts (default + custom)
function getAllPosts() {
    const customPosts = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
    return [...defaultBlogPosts, ...customPosts];
}

// Get blog interaction data
function getBlogData() {
    const stored = localStorage.getItem('blogData');
    if (stored) return JSON.parse(stored);
    const defaultData = {};
    getAllPosts().forEach(post => {
        defaultData[post.id] = { likes: 0, stars: 0, comments: [], userLiked: false, userStarred: false };
    });
    localStorage.setItem('blogData', JSON.stringify(defaultData));
    return defaultData;
}

function saveBlogData(data) { localStorage.setItem('blogData', JSON.stringify(data)); }

// Calculate reading time
function getReadingTime(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
}

// Category labels
const categoryLabels = { ml: '🤖 ML', frontend: '💻 Frontend', personal: '📝 Personal' };

// Filter and sort posts
function getFilteredPosts() {
    let posts = getAllPosts();

    // Filter by category
    if (currentFilter !== 'all') {
        posts = posts.filter(p => p.category === currentFilter);
    }

    // Search filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        posts = posts.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.content.toLowerCase().includes(query) ||
            p.excerpt.toLowerCase().includes(query)
        );
    }

    // Sort
    const blogData = getBlogData();
    switch (currentSort) {
        case 'likes':
            posts.sort((a, b) => (blogData[b.id]?.likes || 0) - (blogData[a.id]?.likes || 0));
            break;
        case 'comments':
            posts.sort((a, b) => (blogData[b.id]?.comments?.length || 0) - (blogData[a.id]?.comments?.length || 0));
            break;
        default: // date - newest first
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Featured posts first
    posts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return posts;
}

// Render blog cards
function renderBlog() {
    const grid = document.getElementById('blog-grid');
    const posts = getFilteredPosts();
    const blogData = getBlogData();

    if (posts.length === 0) {
        grid.innerHTML = '<p style="color: var(--gray); text-align: center; grid-column: 1/-1;">No posts found.</p>';
        return;
    }

    grid.innerHTML = posts.map(post => {
        const data = blogData[post.id] || { likes: 0, stars: 0, comments: [] };
        const readTime = getReadingTime(post.content);
        return `
            <article class="blog-card ${post.featured ? 'featured' : ''} reveal" data-id="${post.id}" style="position: relative;">
                ${post.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
                <img src="${post.image}" alt="${post.title}" class="blog-card-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 400%22><rect fill=%22%23111%22 width=%22600%22 height=%22400%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 fill=%22%2300f3ff%22 font-size=%2240%22>Blog</text></svg>'">
                <div class="blog-card-body">
                    <span class="blog-card-tag">${categoryLabels[post.category] || post.category}</span>
                    <span class="blog-card-reading">• ${readTime}</span>
                    <span class="blog-card-date">${post.date}</span>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-stats">
                        <span>❤️ ${data.likes}</span>
                        <span>⭐ ${data.stars}</span>
                        <span>💬 ${data.comments.length}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.blog-card').forEach(card => {
        revealObserver.observe(card);
        card.addEventListener('click', () => openBlogModal(parseInt(card.dataset.id)));
    });
}

// Open blog modal
function openBlogModal(postId) {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    currentBlogId = postId;
    const blogData = getBlogData();
    const data = blogData[postId] || { likes: 0, stars: 0, comments: [], userLiked: false, userStarred: false };

    document.getElementById('blog-modal-image').src = post.image;
    document.getElementById('blog-modal-date').textContent = post.date;
    document.getElementById('blog-modal-reading').textContent = getReadingTime(post.content);
    document.getElementById('blog-modal-tag').textContent = categoryLabels[post.category] || post.category;
    document.getElementById('blog-modal-title').textContent = post.title;

    // Simple markdown-like formatting
    let formattedContent = post.content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^• /gm, '&bull; ');
    document.getElementById('blog-modal-text').innerHTML = formattedContent;

    document.getElementById('blog-like-count').textContent = data.likes;
    document.getElementById('blog-star-count').textContent = data.stars;
    document.getElementById('blog-like-btn').classList.toggle('active', data.userLiked);
    document.getElementById('blog-star-btn').classList.toggle('active', data.userStarred);

    // Image gallery
    const gallery = document.getElementById('blog-modal-gallery');
    if (post.gallery && post.gallery.length > 0) {
        gallery.innerHTML = post.gallery.map((img, i) =>
            `<img src="${img}" alt="Gallery ${i + 1}" onclick="document.getElementById('blog-modal-image').src='${img}'">`
        ).join('');
        gallery.style.display = 'flex';
    } else {
        gallery.style.display = 'none';
    }

    renderComments(data.comments);
    document.getElementById('blog-modal').classList.add('active');
    if (soundEnabled) playSound('click');
}

function renderComments(comments) {
    const container = document.getElementById('blog-comments');
    if (comments.length === 0) {
        container.innerHTML = '<p style="color: var(--gray); font-size: 0.9rem;">No comments yet. Be the first!</p>';
        return;
    }
    container.innerHTML = comments.map(c => `
        <div class="blog-comment">
            <div class="blog-comment-header">
                <span class="blog-comment-name">${c.name}</span>
                <span class="blog-comment-date">${c.date}</span>
            </div>
            <p class="blog-comment-text">${c.text}</p>
        </div>
    `).join('');
}

// Blog controls event handlers
document.getElementById('blog-search').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderBlog();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderBlog();
        if (soundEnabled) playSound('click');
    });
});

document.getElementById('blog-sort').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderBlog();
    if (soundEnabled) playSound('click');
});

// Blog modal events
document.getElementById('blog-modal-close').addEventListener('click', () => {
    document.getElementById('blog-modal').classList.remove('active');
    currentBlogId = null;
});

document.getElementById('blog-modal').addEventListener('click', (e) => {
    if (e.target.id === 'blog-modal') {
        document.getElementById('blog-modal').classList.remove('active');
        currentBlogId = null;
    }
});

// Like/Star buttons
document.getElementById('blog-like-btn').addEventListener('click', () => {
    if (!currentBlogId) return;
    const blogData = getBlogData();
    if (!blogData[currentBlogId]) blogData[currentBlogId] = { likes: 0, stars: 0, comments: [], userLiked: false, userStarred: false };
    const data = blogData[currentBlogId];
    data.userLiked ? (data.likes--, data.userLiked = false) : (data.likes++, data.userLiked = true);
    saveBlogData(blogData);
    document.getElementById('blog-like-count').textContent = data.likes;
    document.getElementById('blog-like-btn').classList.toggle('active', data.userLiked);
    renderBlog();
    if (soundEnabled) playSound('click');
});

document.getElementById('blog-star-btn').addEventListener('click', () => {
    if (!currentBlogId) return;
    const blogData = getBlogData();
    if (!blogData[currentBlogId]) blogData[currentBlogId] = { likes: 0, stars: 0, comments: [], userLiked: false, userStarred: false };
    const data = blogData[currentBlogId];
    data.userStarred ? (data.stars--, data.userStarred = false) : (data.stars++, data.userStarred = true);
    saveBlogData(blogData);
    document.getElementById('blog-star-count').textContent = data.stars;
    document.getElementById('blog-star-btn').classList.toggle('active', data.userStarred);
    renderBlog();
    if (soundEnabled) playSound('click');
});

// Comment form
document.getElementById('blog-comment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentBlogId) return;
    const name = document.getElementById('comment-name').value.trim();
    const text = document.getElementById('comment-text').value.trim();
    if (!name || !text) return;

    const blogData = getBlogData();
    if (!blogData[currentBlogId]) blogData[currentBlogId] = { likes: 0, stars: 0, comments: [], userLiked: false, userStarred: false };
    blogData[currentBlogId].comments.push({
        name, text,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    saveBlogData(blogData);
    renderComments(blogData[currentBlogId].comments);
    renderBlog();
    document.getElementById('comment-name').value = '';
    document.getElementById('comment-text').value = '';
    if (soundEnabled) playSound('success');
});

// Share buttons
document.getElementById('share-whatsapp').addEventListener('click', () => {
    const post = getAllPosts().find(p => p.id === currentBlogId);
    if (post) window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`, '_blank');
});

document.getElementById('share-twitter').addEventListener('click', () => {
    const post = getAllPosts().find(p => p.id === currentBlogId);
    if (post) window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
});

document.getElementById('share-linkedin').addEventListener('click', () => {
    const post = getAllPosts().find(p => p.id === currentBlogId);
    if (post) window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
});

document.getElementById('share-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    if (soundEnabled) playSound('success');
});

// ============ ADMIN SYSTEM ============
let isAdminMode = false;
let currentTab = 'new';

document.getElementById('admin-btn').addEventListener('click', () => {
    if (!isAdminMode) {
        const password = prompt('Enter admin password:');
        if (password === adminPassword) {
            isAdminMode = true;
            document.getElementById('admin-modal').classList.add('active');
            showAdminTab('new');
        } else {
            alert('Incorrect password!');
        }
    } else {
        document.getElementById('admin-modal').classList.add('active');
        showAdminTab('new');
    }
});

document.getElementById('admin-modal-close').addEventListener('click', () => {
    document.getElementById('admin-modal').classList.remove('active');
});

document.getElementById('admin-modal').addEventListener('click', (e) => {
    if (e.target.id === 'admin-modal') document.getElementById('admin-modal').classList.remove('active');
});

// Admin tabs
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        showAdminTab(tab.dataset.tab);
    });
});

function showAdminTab(tab) {
    currentTab = tab;
    const body = document.getElementById('admin-body');

    if (tab === 'new') {
        body.innerHTML = `
            <form class="admin-form" id="admin-form">
                <input type="hidden" id="edit-post-id">
                <div class="form-group"><label>Title</label><input type="text" class="form-input" id="post-title" required></div>
                <div class="form-group"><label>Category</label><select class="form-input" id="post-category">
                    <option value="ml">🤖 Machine Learning</option>
                    <option value="frontend">💻 Frontend</option>
                    <option value="personal">📝 Personal</option>
                </select></div>
                <div class="form-group"><label>Image URL</label><input type="text" class="form-input" id="post-image" placeholder="https://..."></div>
                <div class="form-group"><label>Content</label><textarea class="form-input" id="post-content" rows="8" required></textarea></div>
                <div class="form-group checkbox"><label><input type="checkbox" id="post-featured"> ⭐ Featured Post</label></div>
                <div class="admin-actions">
                    <button type="button" class="btn btn-secondary" id="save-draft">💾 Save Draft</button>
                    <button type="submit" class="btn btn-primary">🚀 Publish</button>
                </div>
            </form>
        `;
        attachAdminFormHandlers();
    } else if (tab === 'drafts') {
        const drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]');
        body.innerHTML = drafts.length ? `<div class="draft-list">${drafts.map((d, i) => `
            <div class="draft-item">
                <div><h4>${d.title || 'Untitled'}</h4><p>${d.category}</p></div>
                <div class="item-actions">
                    <button onclick="editDraft(${i})">✏️</button>
                    <button class="delete-btn" onclick="deleteDraft(${i})">🗑️</button>
                </div>
            </div>
        `).join('')}</div>` : '<p style="color: var(--gray);">No drafts saved.</p>';
    } else if (tab === 'manage') {
        const customPosts = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
        body.innerHTML = customPosts.length ? `<div class="manage-list">${customPosts.map((p, i) => `
            <div class="manage-item">
                <div><h4>${p.title}</h4><p>${p.date} • ${categoryLabels[p.category]}</p></div>
                <div class="item-actions">
                    <button onclick="editPost(${p.id})">✏️</button>
                    <button class="delete-btn" onclick="deletePost(${p.id})">🗑️</button>
                </div>
            </div>
        `).join('')}</div>` : '<p style="color: var(--gray);">No custom posts yet. Default posts cannot be edited.</p>';
    }
}

function attachAdminFormHandlers() {
    document.getElementById('admin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        publishPost();
    });
    document.getElementById('save-draft').addEventListener('click', saveDraft);
}

function saveDraft() {
    const draft = {
        title: document.getElementById('post-title').value,
        category: document.getElementById('post-category').value,
        image: document.getElementById('post-image').value,
        content: document.getElementById('post-content').value,
        featured: document.getElementById('post-featured').checked
    };
    const drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('blogDrafts', JSON.stringify(drafts));
    alert('Draft saved!');
    showAdminTab('drafts');
    if (soundEnabled) playSound('success');
}

function publishPost() {
    const editId = document.getElementById('edit-post-id')?.value;
    const customPosts = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
    const newPost = {
        id: editId ? parseInt(editId) : Date.now(),
        title: document.getElementById('post-title').value,
        category: document.getElementById('post-category').value,
        image: document.getElementById('post-image').value || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
        content: document.getElementById('post-content').value,
        excerpt: document.getElementById('post-content').value.substring(0, 100) + '...',
        featured: document.getElementById('post-featured').checked,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        gallery: []
    };

    if (editId) {
        const idx = customPosts.findIndex(p => p.id === parseInt(editId));
        if (idx >= 0) customPosts[idx] = newPost;
    } else {
        customPosts.push(newPost);
    }

    localStorage.setItem('customBlogPosts', JSON.stringify(customPosts));
    document.getElementById('admin-modal').classList.remove('active');
    renderBlog();
    alert('Post published!');
    if (soundEnabled) playSound('success');
}

window.editDraft = function (idx) {
    const drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]');
    const draft = drafts[idx];
    showAdminTab('new');
    setTimeout(() => {
        document.getElementById('post-title').value = draft.title;
        document.getElementById('post-category').value = draft.category;
        document.getElementById('post-image').value = draft.image;
        document.getElementById('post-content').value = draft.content;
        document.getElementById('post-featured').checked = draft.featured;
    }, 100);
    drafts.splice(idx, 1);
    localStorage.setItem('blogDrafts', JSON.stringify(drafts));
};

window.deleteDraft = function (idx) {
    if (!confirm('Delete this draft?')) return;
    const drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]');
    drafts.splice(idx, 1);
    localStorage.setItem('blogDrafts', JSON.stringify(drafts));
    showAdminTab('drafts');
};

window.editPost = function (id) {
    const customPosts = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
    const post = customPosts.find(p => p.id === id);
    if (!post) return;
    showAdminTab('new');
    setTimeout(() => {
        document.getElementById('edit-post-id').value = id;
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-category').value = post.category;
        document.getElementById('post-image').value = post.image;
        document.getElementById('post-content').value = post.content;
        document.getElementById('post-featured').checked = post.featured;
    }, 100);
};

window.deletePost = function (id) {
    if (!confirm('Delete this post permanently?')) return;
    let customPosts = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
    customPosts = customPosts.filter(p => p.id !== id);
    localStorage.setItem('customBlogPosts', JSON.stringify(customPosts));
    showAdminTab('manage');
    renderBlog();
    if (soundEnabled) playSound('click');
};

// ============ ANIMATED COUNTERS ============
function animateCounters() {
    document.querySelectorAll('.github-number').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Trigger counters when GitHub section is visible
const githubSection = document.getElementById('github');
if (githubSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterObserver.observe(githubSection);
}

// ============ TESTIMONIALS SLIDER ============
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDotsContainer = document.getElementById('testimonial-dots');
let currentTestimonial = 0;

if (testimonialCards.length > 0) {
    // Create dots
    testimonialCards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showTestimonial(i));
        testimonialDotsContainer.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonialCards.forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.testimonial-dot').forEach(d => d.classList.remove('active'));
        testimonialCards[index].classList.add('active');
        document.querySelectorAll('.testimonial-dot')[index].classList.add('active');
        currentTestimonial = index;
    }

    // Auto-slide
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// ============ LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let lightboxImages = [];
let currentLightboxIndex = 0;

document.querySelectorAll('[data-lightbox="true"]').forEach(el => {
    el.addEventListener('click', () => {
        lightboxImage.src = el.dataset.src;
        lightboxCaption.textContent = el.dataset.caption || '';
        lightbox.classList.add('active');
        if (soundEnabled) playSound('click');
    });
});

document.querySelectorAll('.project-image').forEach((img, i, arr) => {
    lightboxImages = Array.from(arr).map(im => ({ src: im.src, caption: im.alt }));
    img.addEventListener('click', () => {
        currentLightboxIndex = i;
        lightboxImage.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.classList.add('active');
    });
});

document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
document.getElementById('lightbox-prev').addEventListener('click', () => {
    if (lightboxImages.length) {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        lightboxImage.src = lightboxImages[currentLightboxIndex].src;
        lightboxCaption.textContent = lightboxImages[currentLightboxIndex].caption;
    }
});
document.getElementById('lightbox-next').addEventListener('click', () => {
    if (lightboxImages.length) {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        lightboxImage.src = lightboxImages[currentLightboxIndex].src;
        lightboxCaption.textContent = lightboxImages[currentLightboxIndex].caption;
    }
});
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });

// ============ 4 THEME OPTIONS ============
document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('siteTheme', theme);
        document.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
        if (soundEnabled) playSound('click');
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('siteTheme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelector(`.theme-option[data-theme="${savedTheme}"]`)?.classList.add('active');
}

// ============ TYPING GAME ============
const typingTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Machine learning is transforming how we build applications. From predictions to automation, AI is everywhere.",
    "Frontend development requires creativity and technical skills. HTML, CSS, and JavaScript are the foundations.",
];

let gameTimer = 60;
let gameInterval = null;
let gameStarted = false;
let gameText = '';

document.getElementById('open-typing-game')?.addEventListener('click', () => {
    document.getElementById('game-modal').classList.add('active');
    resetGame();
});

document.getElementById('game-close').addEventListener('click', () => {
    document.getElementById('game-modal').classList.remove('active');
    if (gameInterval) clearInterval(gameInterval);
});

document.getElementById('game-start').addEventListener('click', startGame);
document.getElementById('game-restart').addEventListener('click', resetGame);

function resetGame() {
    gameTimer = 60;
    gameStarted = false;
    gameText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
    document.getElementById('game-text').textContent = gameText;
    document.getElementById('game-input').value = '';
    document.getElementById('game-time').textContent = '60';
    document.getElementById('game-wpm').textContent = '0';
    document.getElementById('game-accuracy').textContent = '100';
    if (gameInterval) clearInterval(gameInterval);
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    document.getElementById('game-input').focus();
    gameInterval = setInterval(() => {
        gameTimer--;
        document.getElementById('game-time').textContent = gameTimer;
        if (gameTimer <= 0) {
            clearInterval(gameInterval);
            gameStarted = false;
            calculateResults();
        }
    }, 1000);
}

document.getElementById('game-input').addEventListener('input', (e) => {
    if (!gameStarted) startGame();
    const typed = e.target.value;
    const words = typed.trim().split(/\s+/).filter(w => w).length;
    const timeElapsed = (60 - gameTimer) || 1;
    const wpm = Math.round((words / timeElapsed) * 60);
    document.getElementById('game-wpm').textContent = wpm;

    // Accuracy
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === gameText[i]) correct++;
    }
    const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
    document.getElementById('game-accuracy').textContent = accuracy;

    // Check completion
    if (typed === gameText) {
        clearInterval(gameInterval);
        gameStarted = false;
        showToast(`🎉 Complete! ${wpm} WPM, ${accuracy}% accuracy`);
    }
});

function calculateResults() {
    const typed = document.getElementById('game-input').value;
    const words = typed.trim().split(/\s+/).filter(w => w).length;
    const wpm = words;
    showToast(`Time's up! ${wpm} WPM`);
}

// ============ VOICE COMMANDS ============
const voiceIndicator = document.getElementById('voice-indicator');

document.getElementById('open-voice-nav')?.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        showToast('Voice not supported in this browser');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => voiceIndicator.classList.add('active');
    recognition.onend = () => voiceIndicator.classList.remove('active');
    recognition.onerror = () => {
        voiceIndicator.classList.remove('active');
        showToast('Voice recognition failed');
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        voiceIndicator.classList.remove('active');

        if (command.includes('home') || command.includes('top')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (command.includes('project')) {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('service')) {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('contact')) {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (command.includes('blog')) {
            document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            showToast(`Command: "${command}" not recognized`);
        }
        if (soundEnabled) playSound('click');
    };

    recognition.start();
    showToast('🎤 Say: home, projects, services, blog, or contact');
});

// ============ LANGUAGE TOGGLE ============
const translations = {
    en: { heroTitle: 'Amit Kumar', subtitle: 'Frontend Developer & ML Researcher' },
    hi: { heroTitle: 'अमित कुमार', subtitle: 'फ्रंटएंड डेवलपर और ML शोधकर्ता' }
};
let currentLang = 'en';

document.getElementById('lang-toggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    document.getElementById('lang-toggle').textContent = currentLang === 'en' ? '🌐 EN' : '🌐 हिं';
    // Update visible text
    const titleEl = document.querySelector('.hero-title .glitch');
    if (titleEl) {
        titleEl.textContent = translations[currentLang].heroTitle;
        titleEl.dataset.text = translations[currentLang].heroTitle;
    }
    showToast(currentLang === 'en' ? 'Language: English' : 'भाषा: हिंदी');
    if (soundEnabled) playSound('click');
});

// ============ NEWSLETTER POPUP ============
const newsletterPopup = document.getElementById('newsletter-popup');
const newsletterShown = sessionStorage.getItem('newsletterShown');

if (!newsletterShown) {
    setTimeout(() => {
        newsletterPopup.classList.add('active');
        sessionStorage.setItem('newsletterShown', 'true');
    }, 15000);
}

document.getElementById('newsletter-close').addEventListener('click', () => {
    newsletterPopup.classList.remove('active');
});

document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    // Store locally
    const subs = JSON.parse(localStorage.getItem('newsletterSubs') || '[]');
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem('newsletterSubs', JSON.stringify(subs));
    newsletterPopup.classList.remove('active');
    showToast('✅ Subscribed successfully!');
    if (soundEnabled) playSound('success');
});

// ============ TOAST NOTIFICATION ============
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// ============ PWA INSTALL ============
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('pwa-prompt').classList.add('active');
});

document.getElementById('pwa-install')?.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                showToast('🎉 App installed!');
            }
            deferredPrompt = null;
            document.getElementById('pwa-prompt').classList.remove('active');
        });
    }
});

document.getElementById('pwa-close')?.addEventListener('click', () => {
    document.getElementById('pwa-prompt').classList.remove('active');
});

// ============ ENHANCED SCROLL SPY ============
// Uses existing sections and updateActiveNav from above

// ============ LAZY LOADING ============
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyObserver.unobserve(img);
        }
    });
});
lazyImages.forEach(img => lazyObserver.observe(img));

// ============ PROJECTS ADMIN ============
const projectAdminModal = document.getElementById('project-admin-modal');
const projectAdminBtn = document.getElementById('project-admin-btn');
const projectAdminClose = document.getElementById('project-admin-close');

// Custom projects stored in localStorage
let customProjects = JSON.parse(localStorage.getItem('customProjects') || '[]');

// Open project admin
projectAdminBtn?.addEventListener('click', () => {
    const pwd = prompt('Enter admin password:');
    if (pwd === adminPassword) {
        projectAdminModal.classList.add('active');
        renderProjectAdmin();
    } else if (pwd !== null) {
        showToast('❌ Wrong password!');
    }
});

projectAdminClose?.addEventListener('click', () => {
    projectAdminModal.classList.remove('active');
});

// Project admin tabs
document.querySelectorAll('#project-admin-modal .admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('#project-admin-modal .admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderProjectAdmin(tab.dataset.tab);
    });
});

function renderProjectAdmin(tab = 'add-project') {
    const body = document.getElementById('project-admin-body');
    if (!body) return;

    if (tab === 'add-project') {
        body.innerHTML = `
            <form id="add-project-form" class="admin-form">
                <div class="form-group">
                    <label>Project Title *</label>
                    <input type="text" class="form-input" id="project-title" required>
                </div>
                <div class="form-group">
                    <label>Description *</label>
                    <textarea class="form-input" id="project-desc" rows="3" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Category</label>
                        <select class="form-input" id="project-category">
                            <option value="web">🌐 Web</option>
                            <option value="ml">🤖 ML</option>
                            <option value="game">🎮 Game</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tech Stack</label>
                        <input type="text" class="form-input" id="project-tech" placeholder="HTML, CSS, JS">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Demo URL</label>
                        <input type="url" class="form-input" id="project-demo">
                    </div>
                    <div class="form-group">
                        <label>GitHub URL</label>
                        <input type="url" class="form-input" id="project-github">
                    </div>
                </div>
                <div class="form-group checkbox">
                    <label><input type="checkbox" id="project-featured"> ⭐ Featured</label>
                </div>
                <button type="submit" class="btn btn-primary">💾 Save Project</button>
            </form>
        `;
        document.getElementById('add-project-form').addEventListener('submit', addNewProject);
    } else {
        const allProjects = [...customProjects];
        body.innerHTML = `
            <div class="manage-list">
                <p style="color: var(--gray); margin-bottom: 1rem;">Custom Projects: ${allProjects.length}</p>
                ${allProjects.map((p, i) => `
                    <div class="manage-item">
                        <span>${p.title}</span>
                        <div class="manage-actions">
                            <button class="btn btn-sm" onclick="editProject(${i})">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProject(${i})">🗑️</button>
                        </div>
                    </div>
                `).join('') || '<p style="color: var(--gray);">No custom projects yet.</p>'}
            </div>
        `;
    }
}

function addNewProject(e) {
    e.preventDefault();
    const project = {
        id: Date.now(),
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-desc').value,
        category: document.getElementById('project-category').value,
        tech: document.getElementById('project-tech').value.split(',').map(t => t.trim()),
        demo: document.getElementById('project-demo').value,
        github: document.getElementById('project-github').value,
        featured: document.getElementById('project-featured').checked,
        custom: true
    };
    customProjects.push(project);
    localStorage.setItem('customProjects', JSON.stringify(customProjects));
    showToast('✅ Project added!');
    renderProjects();
    document.getElementById('add-project-form').reset();
}

window.editProject = function (index) {
    const p = customProjects[index];
    const newTitle = prompt('Edit title:', p.title);
    if (newTitle) {
        p.title = newTitle;
        const newDesc = prompt('Edit description:', p.description);
        if (newDesc) p.description = newDesc;
        localStorage.setItem('customProjects', JSON.stringify(customProjects));
        showToast('✅ Project updated!');
        renderProjects();
        renderProjectAdmin('manage-projects');
    }
};

window.deleteProject = function (index) {
    if (confirm('Delete this project?')) {
        customProjects.splice(index, 1);
        localStorage.setItem('customProjects', JSON.stringify(customProjects));
        showToast('🗑️ Project deleted!');
        renderProjects();
        renderProjectAdmin('manage-projects');
    }
};

// ============ TESTIMONIALS ADMIN ============
let customTestimonials = JSON.parse(localStorage.getItem('customTestimonials') || '[]');

window.addTestimonial = function (name, role, text, rating = 5) {
    customTestimonials.push({ id: Date.now(), name, role, text, rating, approved: false });
    localStorage.setItem('customTestimonials', JSON.stringify(customTestimonials));
};

window.approveTestimonial = function (id) {
    const t = customTestimonials.find(x => x.id === id);
    if (t) {
        t.approved = true;
        localStorage.setItem('customTestimonials', JSON.stringify(customTestimonials));
        showToast('✅ Testimonial approved!');
    }
};

window.deleteTestimonial = function (id) {
    customTestimonials = customTestimonials.filter(x => x.id !== id);
    localStorage.setItem('customTestimonials', JSON.stringify(customTestimonials));
    showToast('🗑️ Testimonial deleted!');
};

// ============ NEWSLETTER ADMIN ============
function getNewsletterSubs() {
    return JSON.parse(localStorage.getItem('newsletterSubs') || '[]');
}

window.viewNewsletterSubs = function () {
    const subs = getNewsletterSubs();
    console.log('📧 Newsletter Subscribers:', subs);
    alert(`📧 ${subs.length} Subscribers:\n\n${subs.map(s => s.email).join('\n') || 'None yet'}`);
};

window.exportNewsletterCSV = function () {
    const subs = getNewsletterSubs();
    const csv = 'Email,Date\n' + subs.map(s => `${s.email},${s.date}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter_subscribers.csv';
    a.click();
    showToast('📥 CSV Downloaded!');
};

// ============ ENHANCED RENDERPROJECTS ============
// Update renderProjects to include custom projects
const originalRenderProjects = renderProjects;
window.renderProjects = function () {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Combine default and custom projects
    const allProjects = [...projects, ...customProjects];

    grid.innerHTML = allProjects.map(project => `
        <div class="project-card reveal tilt-card" data-category="${project.category || 'web'}">
            <div class="holographic"></div>
            <div class="project-image-container">
                <img src="${project.image || 'https://via.placeholder.com/400x250/1a1a2e/00f3ff?text=' + encodeURIComponent(project.title)}" 
                     alt="${project.title}" class="project-image" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.featured ? '⭐ ' : ''}${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${(project.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">Demo →</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>` : ''}
                </div>
            </div>
            ${project.custom ? '<span class="custom-badge">Custom</span>' : ''}
        </div>
    `).join('');

    // Re-apply tilt effects
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// ============ BOOKING FORM HANDLER ============
const bookingForm = document.getElementById('booking-form');
bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const booking = {
        id: Date.now().toString(),
        name: document.getElementById('booking-name').value,
        email: document.getElementById('booking-email').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        type: document.getElementById('booking-type').value,
        message: document.getElementById('booking-message').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    showToast('📅 Booking request sent! I\'ll get back to you soon.');
    bookingForm.reset();
});

// Apply saved custom theme on load
(function applyStoredTheme() {
    const saved = JSON.parse(localStorage.getItem('customTheme') || 'null');
    if (saved) {
        document.documentElement.style.setProperty('--primary', saved.primary);
        document.documentElement.style.setProperty('--secondary', saved.secondary);
        document.documentElement.style.setProperty('--dark', saved.bg);
    }
})();

// ============ RESUME BUILDER ============
window.openResumeBuilder = function () {
    document.getElementById('resume-modal')?.classList.add('active');
};

window.closeResumeBuilder = function () {
    document.getElementById('resume-modal')?.classList.remove('active');
};

window.generateResume = function () {
    const name = document.getElementById('resume-name')?.value || 'Your Name';
    const title = document.getElementById('resume-title')?.value || 'Your Title';
    const email = document.getElementById('resume-email')?.value || '';
    const phone = document.getElementById('resume-phone')?.value || '';
    const location = document.getElementById('resume-location')?.value || '';
    const summary = document.getElementById('resume-summary')?.value || '';
    const skills = document.getElementById('resume-skills')?.value || '';

    const resumeHTML = `
        <div class="generated-resume" id="generated-resume">
            <div class="resume-gen-header">
                <h1>${name}</h1>
                <p class="gen-title">${title}</p>
                <div class="gen-contact">
                    ${email ? `<span>📧 ${email}</span>` : ''}
                    ${phone ? `<span>📞 ${phone}</span>` : ''}
                    ${location ? `<span>📍 ${location}</span>` : ''}
                </div>
            </div>
            ${summary ? `
            <div class="resume-gen-section">
                <h3>Professional Summary</h3>
                <p>${summary}</p>
            </div>
            ` : ''}
            ${skills ? `
            <div class="resume-gen-section">
                <h3>Skills</h3>
                <div class="gen-skills">
                    ${skills.split(',').map(s => `<span class="gen-skill">${s.trim()}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            <div class="resume-gen-section">
                <h3>Education</h3>
                <div class="gen-edu">
                    <p><strong>M.Tech in Computer Engineering</strong> - Chandigarh University (2022-2024)</p>
                    <p><strong>BCA - Computer Applications</strong> - Shimla University (2019-2022)</p>
                </div>
            </div>
            <div class="resume-gen-section">
                <h3>Publications</h3>
                <p>3 Scopus-indexed research papers on Heart Disease Prediction using ML</p>
            </div>
        </div>
    `;

    document.getElementById('resume-output').innerHTML = resumeHTML;
    showToast('✅ Resume generated! Click Print to save as PDF.');
};

window.downloadResume = function () {
    openResumeBuilder();
    showToast('📄 Use the Resume Builder to customize and print your resume!');
};

window.printResume = function () {
    const resumeEl = document.getElementById('generated-resume');
    if (!resumeEl) {
        generateResume();
    }
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Resume - Amit Kumar</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
                h1 { font-size: 28px; color: #333; margin-bottom: 5px; }
                h3 { font-size: 16px; color: #0066cc; margin: 20px 0 10px; border-bottom: 2px solid #0066cc; padding-bottom: 5px; }
                .gen-title { color: #666; font-size: 16px; }
                .gen-contact { margin: 10px 0 20px; color: #666; }
                .gen-contact span { margin-right: 20px; }
                .gen-skills { display: flex; flex-wrap: wrap; gap: 8px; }
                .gen-skill { background: #f0f0f0; padding: 4px 12px; border-radius: 15px; font-size: 13px; }
                p { margin: 5px 0; }
            </style>
        </head>
        <body>
            ${document.getElementById('resume-output').innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
};

// ============ ANNOUNCEMENT BANNER ============
window.closeAnnouncement = function () {
    const banner = document.getElementById('announcement-banner');
    if (banner) {
        banner.classList.add('hidden');
        sessionStorage.setItem('announcementClosed', 'true');
    }
};

// Check if announcement was already closed this session
(function initAnnouncement() {
    if (sessionStorage.getItem('announcementClosed') === 'true') {
        document.getElementById('announcement-banner')?.classList.add('hidden');
    }
})();

// ============ ENHANCED CHAT WIDGET ============
let chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

// ============ AI CHATBOT ============
const amitKnowledge = {
    name: "Amit Kumar",
    title: "Frontend Developer & ML Researcher",
    email: "byemail007@gmail.com",
    phone: "+91 8544860872",
    location: "Chandigarh, India",
    website: "immait.tech",
    linkedin: "linkedin.com/in/imamit01",
    github: "github.com/imamit01",
    about: "Amit Kumar is a passionate Frontend Developer and Machine Learning Researcher with a Master's degree in Computer Engineering from Chandigarh University. He has 3+ years of experience in web development and has published 3 Scopus-indexed research papers on heart disease prediction using hybrid ML approaches.",
    skills: { frontend: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"], ml: ["TensorFlow", "Scikit-learn", "Python"], tools: ["Git", "GitHub", "VS Code", "Figma"] },
    services: [{ name: "Frontend Development", price: "₹15,000+" }, { name: "ML Solutions", price: "₹25,000+" }, { name: "Portfolio Websites", price: "₹8,000+" }],
    projects: ["Heart Disease Prediction using ML", "Portfolio Website", "E-commerce Website", "Weather Dashboard", "Blog Platform"],
    publications: "3 Scopus-indexed research papers on Heart Disease Prediction",
    availability: "Currently available for freelance projects"
};

window.toggleChatbot = function () {
    document.getElementById('chatbot-window')?.classList.toggle('active');
};

window.askBot = function (question) {
    const input = document.getElementById('chatbot-input');
    if (input) input.value = question;
    sendToBot();
};

window.sendToBot = function () {
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    if (!input || !input.value.trim() || !messages) return;
    const userMsg = input.value.trim();
    messages.innerHTML += `<div class="chat-message user"><p>${userMsg}</p></div>`;
    input.value = '';
    messages.innerHTML += `<div class="chat-message bot typing" id="typing"><p>Typing...</p></div>`;
    messages.scrollTop = messages.scrollHeight;
    setTimeout(() => {
        document.getElementById('typing')?.remove();
        messages.innerHTML += `<div class="chat-message bot"><p>${getAIResponse(userMsg)}</p></div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800);
};

function getAIResponse(q) {
    q = q.toLowerCase();
    const k = amitKnowledge;
    if (q.match(/^(hi|hello|hey|namaste)/)) return `👋 Hello! I'm Amit's AI assistant. Ask me about skills, projects, or how to contact him!`;
    if (q.includes('about') || q.includes('who')) return `${k.about}<br>📍 ${k.location} | 📧 ${k.email}`;
    if (q.includes('skill') || q.includes('tech')) return `🚀 <strong>Skills:</strong><br>Frontend: ${k.skills.frontend.join(', ')}<br>ML: ${k.skills.ml.join(', ')}<br>Tools: ${k.skills.tools.join(', ')}`;
    if (q.includes('project') || q.includes('work')) return `📦 <strong>Projects:</strong><br>• ${k.projects.join('<br>• ')}<br><a href="projects.html">View all →</a>`;
    if (q.includes('education') || q.includes('degree')) return `🎓 M.Tech Computer Engineering - Chandigarh University (2022-24)<br>BCA - Shimla University (2019-22)`;
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) return `📬 <strong>Contact:</strong><br>📧 ${k.email}<br>📱 ${k.phone}<br>💼 <a href="https://${k.linkedin}" target="_blank">LinkedIn</a><br><a href="contact.html">Contact Page →</a>`;
    if (q.includes('service') || q.includes('price')) return `💼 <strong>Services:</strong><br>${k.services.map(s => `${s.name}: ${s.price}`).join('<br>')}<br><a href="services.html">Details →</a>`;
    if (q.includes('research') || q.includes('paper')) return `📚 ${k.publications}`;
    if (q.includes('available') || q.includes('freelance')) return `✅ ${k.availability}. Email: ${k.email}`;
    if (q.includes('github')) return `🐙 <a href="https://${k.github}" target="_blank">${k.github}</a>`;
    if (q.includes('thank')) return `You're welcome! 😊 Anything else?`;
    if (q.includes('bye')) return `Goodbye! 👋 Check out Amit's projects!`;
    return `Try asking about: <strong>skills</strong>, <strong>projects</strong>, <strong>services</strong>, <strong>contact</strong>, or <strong>education</strong>!`;
}

// ============ INITIALIZATION ============
window.addEventListener('load', () => {
    simulateLoading();
    initStarfield();
    initParticles();
    animateStarfield();
    animateParticles();
    renderProjects();
    renderSkills();
    renderBlog();
    updateClock();
    setTimeout(typeWriter, 2000);
    updateActiveNav();
});


function renderChatMessages() {
    const chatBox = document.getElementById('chat-messages');
    if (!chatBox) return;

    chatBox.innerHTML = chatMessages.length ?
        chatMessages.map(m => `
            <div class="chat-msg ${m.from}">
                <p>${m.text}</p>
                <span class="chat-time">${new Date(m.time).toLocaleTimeString()}</span>
            </div>
        `).join('') :
        `<div class="chat-welcome">
            <p>👋 Hi! How can I help you?</p>
            <div class="quick-replies">
                <button onclick="sendQuickReply('Interested in your services')">Services</button>
                <button onclick="sendQuickReply('Want to hire you')">Hire Me</button>
                <button onclick="sendQuickReply('Have a question')">Question</button>
            </div>
        </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.sendChatMessage = function () {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    chatMessages.push({
        from: 'user',
        text: input.value.trim(),
        time: new Date().toISOString()
    });

    // Auto-reply
    setTimeout(() => {
        chatMessages.push({
            from: 'bot',
            text: getAutoReply(input.value.trim()),
            time: new Date().toISOString()
        });
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        renderChatMessages();
    }, 1000);

    input.value = '';
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    renderChatMessages();
};

window.sendQuickReply = function (text) {
    document.getElementById('chat-input').value = text;
    sendChatMessage();
};

function getAutoReply(msg) {
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes('service') || lowerMsg.includes('price')) {
        return '💼 Check out my services at services.html! I offer web development, ML solutions, and more.';
    } else if (lowerMsg.includes('hire') || lowerMsg.includes('work')) {
        return '🎉 Great! Please email me at byemail007@gmail.com or use the contact form.';
    } else if (lowerMsg.includes('project')) {
        return '📦 View my projects at projects.html to see my work!';
    } else {
        return '👍 Thanks for your message! I\'ll get back to you soon. You can also reach me via WhatsApp or email.';
    }
}

// ============ INITIALIZATION ============
window.addEventListener('load', () => {
    simulateLoading();
    initStarfield();
    initParticles();
    animateStarfield();
    animateParticles();
    renderProjects();
    renderSkills();
    renderBlog();
    updateClock();
    setTimeout(typeWriter, 2000);
    updateActiveNav();
});

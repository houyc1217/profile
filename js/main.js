// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = [
    "I'm Yincheng!",
    'great to see you here!'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        // Deleting characters
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Typing characters
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Initialize site components
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 500);
    initViewCounter();
});

// Site View Counter Logic
async function initViewCounter() {
    const viewCountElement = document.getElementById('view-count');
    const viewCounterContainer = document.querySelector('.view-counter');

    if (!viewCountElement || !viewCounterContainer) return;

    try {
        // Use counterapi.dev - simple and anonymous
        // Namespace: yinchenghou.com, Key: visits
        const response = await fetch('https://api.counterapi.dev/v1/yinchenghou.com/visits/up');
        const data = await response.json();

        if (data && data.count) {
            // Format number with commas for a premium feel
            viewCountElement.textContent = new Intl.NumberFormat().format(data.count);
            // Show the counter with animation
            setTimeout(() => {
                viewCounterContainer.classList.add('visible');
            }, 500);
        }
    } catch (error) {
        console.error('Error fetching view count:', error);
        // Hide container if API fails to keep UI clean
        viewCounterContainer.style.display = 'none';
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

function updateNavbarOnScroll() {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg-nav)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    }
}

window.addEventListener('scroll', updateNavbarOnScroll);

// Initialize navbar state
updateNavbarOnScroll();

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Video Autoplay Logic using Intersection Observer
const videoObserverOptions = {
    threshold: 0.5 // Trigger when 50% of the video is visible
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play().catch(error => {
                // Autoplay might be blocked by browser policy if not muted
                console.log('Autoplay prevented:', error);
            });
        } else {
            video.pause();
        }
    });
}, videoObserverOptions);

document.querySelectorAll('.project-video').forEach(video => {
    videoObserver.observe(video);
});

// Console Easter Egg
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio. Feel free to reach out!', 'font-size: 14px;');
console.log('%c📧 houyc1217@gmail.com', 'font-size: 12px; color: #7cc4f5;');


// ==================== Chatbot Widget ====================
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Knowledge base from the webpage content
const knowledgeBase = {
    name: 'Yincheng Hou',
    title: 'AI Engineer & Solutions Architect',
    email: 'houyc1217@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yincheng-hou',
    github: 'https://github.com/houyc1217',

    education: [
        {
            school: "King's College London",
            degree: 'MSc Robotics (Pass with Distinction)',
            location: 'London, United Kingdom',
            period: 'September 2024 – September 2025',
            modules: 'Intelligence & Autonomy, Sensing & Perception, Advanced Machine Learning',
            awards: "President's Global Leadership Award (PGLA)"
        },
        {
            school: 'Shanghai University',
            degree: 'BE Electronic Information Engineering',
            location: 'Shanghai, China',
            period: 'September 2020 – June 2024',
            modules: 'Data Structure & Algorithm, Analog & Digital Circuits, Signals & Systems, Telecom Theory',
            awards: 'Outstanding Student Leader, Outstanding Student, Innovation & Entrepreneurship Scholarship'
        }
    ],


    skills: ['Python', 'LangChain', 'RAG', 'Claude Code', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'GitHub Actions', 'SQL', 'Tableau', 'Prompt Engineering', 'vLLM', 'MCP', 'Agentic AI']
};

// Toggle chatbot window
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.classList.toggle('open');
        if (chatbotWidget.classList.contains('open')) {
            chatbotInput.focus();
        }
    });
}

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate response after a short delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 800 + Math.random() * 700);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing';
    typingDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = chatbotMessages.querySelector('.typing');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate response based on user input (Simple RAG)
function generateResponse(query) {
    const q = query.toLowerCase();

    // Greetings
    if (q.match(/^(hi|hello|hey|greetings)/)) {
        return `Hello! I'm here to help you learn about Yincheng. You can ask me about his education, skills, or how to contact him.`;
    }

    // Name
    if (q.includes('name') || q.includes('who is') || q.includes('who are')) {
        return `His name is <strong>Yincheng Hou</strong>. He's an AI Engineer & Solutions Architect with expertise in LLM, RAG, and Cloud Architecture.`;
    }

    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('get in touch')) {
        return `You can reach Yincheng via:<br><br><strong>Email:</strong> <a href="mailto:${knowledgeBase.email}">${knowledgeBase.email}</a><br><strong>LinkedIn:</strong> <a href="${knowledgeBase.linkedin}" target="_blank">linkedin.com/in/yincheng-hou</a><br><strong>GitHub:</strong> <a href="${knowledgeBase.github}" target="_blank">github.com/houyc1217</a>`;
    }

    // Education
    if (q.includes('education') || q.includes('study') || q.includes('university') || q.includes('degree') || q.includes('school') || q.includes('college') || q.includes('master') || q.includes('bachelor')) {
        let response = `Yincheng's education background:<br><br>`;
        knowledgeBase.education.forEach(edu => {
            response += `<strong>${edu.degree}</strong><br>${edu.school}, ${edu.location}<br>${edu.period}<br>Awards: ${edu.awards}<br><br>`;
        });
        return response;
    }

    // King's College London specific
    if (q.includes('king') || q.includes('kcl') || q.includes('london')) {
        const kcl = knowledgeBase.education[0];
        return `Yincheng completed his <strong>${kcl.degree}</strong> at ${kcl.school} (${kcl.period}). He studied ${kcl.modules} and received the ${kcl.awards}.`;
    }


    // Skills
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('can do') || q.includes('expertise')) {
        return `Yincheng's technical skills include:<br><br><strong>AI/ML:</strong> LangChain, RAG, vLLM, Claude Code, MCP, Agentic AI, Prompt Engineering<br><br><strong>Cloud & DevOps:</strong> AWS, GCP, Docker, Kubernetes, Terraform, GitHub Actions<br><br><strong>Data:</strong> Python, SQL, Tableau, Databricks`;
    }

    // RAG / LLM specific
    if (q.includes('rag') || q.includes('llm') || q.includes('langchain') || q.includes('ai')) {
        return `Yincheng specializes in AI engineering, particularly:<br>• <strong>RAG (Retrieval-Augmented Generation)</strong> - Built enterprise-grade RAG platforms<br>• <strong>LLM deployment</strong> - Deployed cloud-native LLMs on AWS/GCP<br>• <strong>Agentic AI</strong> - Developed social media AI agents with MCP tools<br>• <strong>vLLM</strong> - Architected multi-modal inference pipelines`;
    }

    // Cloud
    if (q.includes('cloud') || q.includes('aws') || q.includes('gcp') || q.includes('docker') || q.includes('kubernetes')) {
        return `Yincheng has extensive cloud experience:<br>• Deployed LLMs on <strong>AWS</strong> and <strong>GCP</strong> EC2 instances<br>• Containerized services with <strong>Docker</strong><br>• Orchestrated with <strong>Kubernetes</strong><br>• Implemented <strong>Terraform</strong> IaC practices`;
    }

    // Location
    if (q.includes('where') || q.includes('location') || q.includes('based') || q.includes('live')) {
        return `Yincheng is currently based in <strong>London, United Kingdom</strong>, where he completed his MSc at King's College London and has been working in AI engineering roles.`;
    }

    // Thanks
    if (q.includes('thank') || q.includes('thanks')) {
        return `You're welcome! Feel free to ask if you have any other questions about Yincheng.`;
    }

    // Default response
    return `I'm not sure I understand that question. You can try asking about:<br><br>• His <strong>education</strong> background<br>• Technical <strong>skills</strong><br><br>Or feel free to <a href="#contact" onclick="document.getElementById('chatbot-widget').classList.remove('open')">contact Yincheng directly</a> for more specific inquiries.`;
}

// Event listeners for sending messages
if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    if (chatbotWidget && !chatbotWidget.contains(e.target) && chatbotWidget.classList.contains('open')) {
        chatbotWidget.classList.remove('open');
    }
});

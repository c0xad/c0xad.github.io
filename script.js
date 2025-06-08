// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroStats = document.querySelectorAll('.stat-number');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');

// Enhanced Visual Effects Manager
class VisualEffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.initializeParallaxEffect();
        this.initializeGlowEffects();
        this.initializeHoverAnimations();
        this.initializeScrollAnimations();
        this.initializeCursorEffects();
    }

    initializeParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero::before, .about::before, .projects::before');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    initializeGlowEffects() {
        const glowElements = document.querySelectorAll('.btn-primary, .project-card.featured, .social-link');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.filter = 'brightness(1.1) saturate(1.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = 'brightness(1) saturate(1)';
            });
        });
    }

    initializeHoverAnimations() {
        // Enhanced card hover effects
        const cards = document.querySelectorAll('.skill-category, .project-card, .research-area, .contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, card);
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        `;
        
        // Add ripple animation keyframes if not exists
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.hero-text > *, .about-text > *, .section-header');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    initializeCursorEffects() {
        // Create custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Scale cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .btn, .social-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// Enhanced Theme Manager with improved transitions
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
        this.addThemeTransitions();
    }

    addThemeTransitions() {
        // Add smooth transitions for theme switching
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        // Add loading animation
        document.body.style.pointerEvents = 'none';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            localStorage.setItem('theme', theme);
            
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            
            // Re-enable interactions
            document.body.style.pointerEvents = 'auto';
        }, 150);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        // Hamburger menu toggle
        hamburger.addEventListener('click', () => this.toggleMenu());

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
            this.updateNavbarBackground();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active', this.isMenuOpen);
        hamburger.classList.toggle('active', this.isMenuOpen);
    }

    closeMenu() {
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        this.closeMenu();
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateNavbarBackground() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = false;
    }

    start() {
        if (this.isTyping) return;
        this.isTyping = true;
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isTyping = false;
        }
    }
}

// Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.current = 0;
        this.increment = this.target / (duration / 16);
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;
        
        const updateCounter = () => {
            this.current += this.increment;
            if (this.current < this.target) {
                this.element.textContent = Math.floor(this.current);
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
            }
        };
        
        updateCounter();
    }
}

// Skill Progress Animation
class SkillProgressAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        this.skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        // Initialize counter animations
        heroStats.forEach(stat => {
            const target = stat.getAttribute('data-target');
            const counter = new CounterAnimation(stat, target);
            
            this.observe(stat, () => counter.animate(), {
                threshold: 0.7
            });
        });

        // Initialize skill progress animation
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillAnimation = new SkillProgressAnimation();
            this.observe(skillsSection, () => skillAnimation.animate(), {
                threshold: 0.3
            });
        }

        // Initialize fade-in animations
        this.initializeFadeAnimations();
    }

    observe(element, callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(entry.target);
                }
            });
        }, { ...defaultOptions, ...options });

        observer.observe(element);
        this.observers.set(element, observer);
    }

    initializeFadeAnimations() {
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-category, .research-area, .contact-item, .highlight'
        );

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            this.observe(element, () => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Sending message...', 'info');
        
        setTimeout(() => {
            this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    }

    validateForm(data) {
        const required = ['name', 'email', 'subject', 'message'];
        return required.every(field => data[field] && data[field].trim());
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;
        
        // Style the message
        Object.assign(messageElement.style, {
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        });

        // Set color based on type
        const colors = {
            success: { bg: '#10b981', color: 'white' },
            error: { bg: '#ef4444', color: 'white' },
            info: { bg: '#3b82f6', color: 'white' }
        };

        if (colors[type]) {
            messageElement.style.backgroundColor = colors[type].bg;
            messageElement.style.color = colors[type].color;
        }

        // Add to form
        contactForm.appendChild(messageElement);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.opacity = '0';
                setTimeout(() => messageElement.remove(), 300);
            }
        }, 5000);
    }
}

// Particles Background Effect
class ParticlesBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#3b82f6';
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 100})`;
                    this.ctx.stroke();
                }
            }
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Smooth Scroll Enhancement
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Handle scroll to top
        this.createScrollToTop();
    }

    createScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        
        Object.assign(scrollToTopBtn.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            zIndex: '999',
            boxShadow: 'var(--shadow-medium)'
        });

        document.body.appendChild(scrollToTopBtn);

        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.transform = 'translateY(10px)';
            }
        });

        // Click handler
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Hover effects
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-2px)';
            scrollToTopBtn.style.boxShadow = 'var(--shadow-heavy)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.boxShadow = 'var(--shadow-medium)';
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0
        };
        this.init();
    }

    init() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Measure render time
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.metrics.renderTime = performance.now();
                console.log(`Initial render completed in ${this.metrics.renderTime.toFixed(2)}ms`);
            });
        }
    }
}

// Main Application
class App {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Core components
            this.components.set('theme', new ThemeManager());
            this.components.set('navigation', new NavigationManager());
            this.components.set('animations', new AnimationObserver());
            this.components.set('forms', new FormHandler());
            this.components.set('scroll', new SmoothScroll());
            this.components.set('performance', new PerformanceMonitor());

            // Enhanced visual effects
            this.components.set('visualEffects', new VisualEffectsManager());

            // Optional components (only if elements exist)
            if (document.querySelector('.hero-title .typing-text')) {
                const typingElement = document.querySelector('.hero-title .typing-text');
                const typingAnimation = new TypingAnimation(typingElement, 'Eren Gündemir', 150);
                this.components.set('typing', typingAnimation);
                
                // Start typing animation after a delay
                setTimeout(() => typingAnimation.start(), 500);
            }

            // Particles background (optional, can be disabled for performance)
            if (window.innerWidth > 768) {
                this.components.set('particles', new ParticlesBackground());
            }

            console.log('🚀 Application initialized successfully');
            console.log('✨ Enhanced visual effects activated');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    }

    getComponent(name) {
        return this.components.get(name);
    }

    destroy() {
        this.components.forEach((component, name) => {
            if (component.destroy && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        this.components.clear();
    }
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Initialize application
const app = new App();

// Export for debugging
window.app = app; 
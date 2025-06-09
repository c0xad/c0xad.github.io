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
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        // Only initialize motion-heavy effects if user doesn't prefer reduced motion
        if (!this.prefersReducedMotion) {
            this.initializeParallaxEffect();
            this.initializeScrollAnimations();
            this.initializeCursorEffects();
        }
        
        // Always initialize these as they're less problematic
        this.initializeGlowEffects();
        this.initializeHoverAnimations();
    }

    initializeParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        // Skip if no parallax elements found
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }, { passive: true });
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
        
        // Update charts theme if data visualization exists
        const app = window.app;
        if (app) {
            const dataViz = app.getComponent('dataVisualization');
            if (dataViz && dataViz.updateChartsTheme) {
                setTimeout(() => dataViz.updateChartsTheme(), 100);
            }
        }
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
        }, { passive: true });

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

// GitHub API Service
class GitHubService {
    constructor(username = 'c0xad') {
        this.username = username;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    async fetchUserData() {
        const cacheKey = `user_${this.username}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${this.username}`);
            if (!response.ok) throw new Error('GitHub API request failed');
            
            const data = await response.json();
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.warn('Failed to fetch GitHub user data:', error);
            return null;
        }
    }

    async fetchRepositories() {
        const cacheKey = `repos_${this.username}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100&sort=updated`);
            if (!response.ok) throw new Error('GitHub API request failed');
            
            const data = await response.json();
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.warn('Failed to fetch GitHub repositories:', error);
            return null;
        }
    }

    async getStatsData() {
        try {
            const [userData, repos] = await Promise.all([
                this.fetchUserData(),
                this.fetchRepositories()
            ]);

            if (!userData || !repos) {
                // Return fallback values if API fails
                return {
                    programmingLanguages: 6,
                    repositories: 21,
                    totalStars: 24
                };
            }

            // Calculate unique programming languages from repositories
            const languages = new Set();
            let totalStars = 0;

            repos.forEach(repo => {
                if (repo.language) {
                    languages.add(repo.language);
                }
                totalStars += repo.stargazers_count || 0;
            });

            const stats = {
                programmingLanguages: Math.max(languages.size, 6), // Ensure minimum of 6
                repositories: userData.public_repos || repos.length,
                totalStars: Math.max(totalStars, 24) // Ensure minimum stars
            };
            
            console.log('GitHub stats fetched:', stats);
            return stats;
        } catch (error) {
            console.warn('Failed to get GitHub stats:', error);
            // Return fallback values
            return {
                programmingLanguages: 6,
                repositories: 21,
                totalStars: 24
            };
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
        this.githubService = new GitHubService();
        this.init();
    }

    async init() {
        // Fetch GitHub stats and update hero stats before initializing animations
        await this.updateHeroStats();
        
        // Initialize counter animations for hero stats
        heroStats.forEach(stat => {
            const target = stat.getAttribute('data-target');
            const counter = new CounterAnimation(stat, target);
            
            this.observe(stat, () => counter.animate(), {
                threshold: 0.7
            });
        });

        // Initialize counter animations for leadership stats
        const leadershipStats = document.querySelectorAll('.leadership-stats .stat-number');
        leadershipStats.forEach(stat => {
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

    async updateHeroStats() {
        try {
            // Add loading indicators
            const githubIndicators = document.querySelectorAll('.github-indicator');
            githubIndicators.forEach(indicator => {
                indicator.classList.add('loading');
                indicator.style.animation = 'pulse 1.5s ease-in-out infinite';
            });
            
            const statsData = await this.githubService.getStatsData();
            
            // Update hero stats data-target attributes
            const heroStatsElements = document.querySelectorAll('.hero-stats .stat-number');
            
            if (heroStatsElements.length >= 3) {
                heroStatsElements[0].setAttribute('data-target', statsData.programmingLanguages);
                heroStatsElements[1].setAttribute('data-target', statsData.repositories);
                heroStatsElements[2].setAttribute('data-target', statsData.totalStars);
                
                // Update the text content to show loading state
                heroStatsElements.forEach(el => el.textContent = '0');
            }
            
            // Remove loading indicators
            githubIndicators.forEach(indicator => {
                indicator.classList.remove('loading');
                indicator.style.animation = '';
            });
        } catch (error) {
            console.warn('Failed to update hero stats from GitHub:', error);
            
            // Remove loading indicators even on error
            const githubIndicators = document.querySelectorAll('.github-indicator');
            githubIndicators.forEach(indicator => {
                indicator.classList.remove('loading');
                indicator.style.animation = '';
            });
        }
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
            '.project-card, .skill-category, .research-area, .contact-item, .highlight, .leadership-card, .paper-card, .impact-card, .research-dashboard'
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

        // Initialize dashboard metric counters
        const dashboardMetrics = document.querySelectorAll('.metric-value[data-target]');
        dashboardMetrics.forEach(metric => {
            const target = metric.getAttribute('data-target');
            const counter = new CounterAnimation(metric, target);
            
            this.observe(metric, () => counter.animate(), {
                threshold: 0.7
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

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send to Formspree endpoint (replace with your actual endpoint)
            const response = await fetch('https://formspree.io/f/xeojpgoj', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
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
        }, { passive: true });

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

// Research Papers Filter
class PapersFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.paperCards = document.querySelectorAll('.paper-card');
        this.init();
    }

    init() {
        if (this.filterButtons.length === 0) return;
        
        this.bindEvents();
        this.showAllPapers();
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(button);
            });
        });
    }

    handleFilterClick(activeButton) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');

        // Get filter value
        const filter = activeButton.getAttribute('data-filter');
        
        // Filter papers
        this.filterPapers(filter);
    }

    filterPapers(filter) {
        this.paperCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category') || '';
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                // Show with staggered animation
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            } else {
                // Hide immediately
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    showAllPapers() {
        this.paperCards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
}

// Advanced Data Visualization Manager
class DataVisualization {
    constructor() {
        this.charts = new Map();
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded yet, waiting...');
            setTimeout(() => this.init(), 100);
            return;
        }

        // Check if DOM elements exist
        const inflationCtx = document.getElementById('inflationChart');
        const recoveryCtx = document.getElementById('recoveryChart');
        
        if (!inflationCtx || !recoveryCtx) {
            console.warn('Chart canvases not found yet, waiting...');
            setTimeout(() => this.init(), 100);
            return;
        }

        if (!this.isInitialized) {
            this.isInitialized = true;
            this.initializeCharts();
            this.animateProgressBars();
            this.initializeCounterAnimations();
        }
    }

    initializeCharts() {
        try {
            // Show fallback content initially
            this.showFallback('inflationChart');
            this.showFallback('recoveryChart');

            // Initialize inflation rate chart
            const inflationCtx = document.getElementById('inflationChart');
            if (inflationCtx) {
                console.log('Creating inflation chart...');
                this.createInflationChart(inflationCtx);
            } else {
                console.error('Inflation chart canvas not found');
            }

            // Initialize recovery timeline chart
            const recoveryCtx = document.getElementById('recoveryChart');
            if (recoveryCtx) {
                console.log('Creating recovery chart...');
                this.createRecoveryChart(recoveryCtx);
            } else {
                console.error('Recovery chart canvas not found');
            }
        } catch (error) {
            console.error('Error initializing charts:', error);
            this.showFallback('inflationChart');
            this.showFallback('recoveryChart');
        }
    }

    showFallback(chartId) {
        const fallback = document.getElementById(chartId + '-fallback');
        if (fallback) {
            fallback.style.display = 'block';
        }
    }

    hideFallback(chartId) {
        const fallback = document.getElementById(chartId + '-fallback');
        if (fallback) {
            fallback.style.display = 'none';
        }
    }

    createInflationChart(ctx) {
        try {
            const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
            const textColor = isDarkTheme ? '#f8fafc' : '#0f172a';
            const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

            const config = {
                type: 'line',
                data: {
                    labels: ['1945', '1946', '1947', '1948', '1949', '1950', '1951', '1952'],
                    datasets: [{
                        label: 'Inflation Rate (%)',
                        data: [85.2, 42.1, 18.9, -12.3, -5.1, 2.1, 8.4, 3.2],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#3b82f6',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        fill: true
                    }, {
                        label: 'Policy Implementation',
                        data: [null, null, null, -12.3, null, null, null, null],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        borderWidth: 4,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 3,
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: textColor,
                                font: {
                                    size: 12,
                                    weight: '600'
                                },
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: isDarkTheme ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                            titleColor: textColor,
                            bodyColor: textColor,
                            borderColor: '#3b82f6',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: gridColor,
                                drawBorder: false
                            },
                            ticks: {
                                color: textColor,
                                font: {
                                    size: 11,
                                    weight: '500'
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: gridColor,
                                drawBorder: false
                            },
                            ticks: {
                                color: textColor,
                                font: {
                                    size: 11,
                                    weight: '500'
                                },
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            };

            const chart = new Chart(ctx, config);
            this.charts.set('inflation', chart);
            this.hideFallback('inflationChart');
            console.log('Inflation chart created successfully');
        } catch (error) {
            console.error('Error creating inflation chart:', error);
        }
    }

    createRecoveryChart(ctx) {
        try {
            const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
            const textColor = isDarkTheme ? '#f8fafc' : '#0f172a';
            
            const config = {
                type: 'doughnut',
                data: {
                    labels: ['Recovery Phase 1', 'Recovery Phase 2', 'Recovery Phase 3', 'Stabilization'],
                    datasets: [{
                        data: [25.4, 35.2, 28.1, 11.3],
                        backgroundColor: [
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b',
                            '#8b5cf6'
                        ],
                        borderColor: isDarkTheme ? '#1e293b' : '#ffffff',
                        borderWidth: 3,
                        hoverBorderWidth: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: textColor,
                                font: {
                                    size: 11,
                                    weight: '500'
                                },
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: isDarkTheme ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                            titleColor: textColor,
                            bodyColor: textColor,
                            borderColor: '#3b82f6',
                            borderWidth: 1,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            };

            const chart = new Chart(ctx, config);
            this.charts.set('recovery', chart);
            this.hideFallback('recoveryChart');
            console.log('Recovery chart created successfully');
        } catch (error) {
            console.error('Error creating recovery chart:', error);
        }
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 300);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    initializeCounterAnimations() {
        // Enhanced counter animations for dashboard metrics
        const dashboardMetrics = document.querySelectorAll('.research-dashboard .metric-value');
        
        dashboardMetrics.forEach(metric => {
            if (!metric.getAttribute('data-target')) return;
            
            const target = parseFloat(metric.getAttribute('data-target'));
            const counter = new CounterAnimation(metric, target, 2500);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.animate();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.7
            });
            
            observer.observe(metric);
        });
    }

    updateChartsTheme() {
        // Update chart colors when theme changes
        this.charts.forEach(chart => {
            const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
            const textColor = isDarkTheme ? '#f8fafc' : '#0f172a';
            const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            
            chart.options.plugins.legend.labels.color = textColor;
            chart.options.scales.x.ticks.color = textColor;
            chart.options.scales.y.ticks.color = textColor;
            chart.options.scales.x.grid.color = gridColor;
            chart.options.scales.y.grid.color = gridColor;
            
            chart.update('none');
        });
    }

    destroy() {
        this.charts.forEach(chart => {
            chart.destroy();
        });
        this.charts.clear();
    }
}

// Enhanced Skill Visualization
class SkillVisualization {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceSkillBars();
        this.addSkillHoverEffects();
    }

    enhanceSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            const skillItem = bar.closest('.skill-item');
            
            // Add animated number counter
            const percentage = parseInt(width);
            const counter = document.createElement('span');
            counter.className = 'skill-percentage';
            counter.style.cssText = `
                position: absolute;
                right: 0;
                top: 0;
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--primary-color);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const skillName = skillItem.querySelector('.skill-name');
            skillName.style.position = 'relative';
            skillName.appendChild(counter);
            
            // Animate counter when skill bar animates
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            let current = 0;
                            const increment = percentage / 30;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= percentage) {
                                    current = percentage;
                                    clearInterval(timer);
                                }
                                counter.textContent = Math.round(current) + '%';
                                counter.style.opacity = '1';
                            }, 50);
                        }, index * 200 + 500);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(skillItem);
        });
    }

    addSkillHoverEffects() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                const icon = category.querySelector('h3 i');
                if (icon) {
                    icon.style.animation = 'wiggle 0.6s ease-in-out';
                }
            });
            
            category.addEventListener('mouseleave', () => {
                const icon = category.querySelector('h3 i');
                if (icon) {
                    icon.style.animation = 'none';
                }
            });
        });
    }
}

// Comprehensive Experience Section Manager
class ExperienceManager {
    constructor() {
        this.experienceSection = document.querySelector('#experience');
        this.dashboard = null;
        this.hasAnimated = false;
        this.init();
    }

    init() {
        if (!this.experienceSection) return;
        
        // Initialize dashboard if premium dashboard exists
        if (document.querySelector('.premium-dashboard')) {
            this.dashboard = new ExperienceDashboard();
        }
        
        this.initializeBasicAnimations();
        this.initializeCounters();
        this.initializeHoverEffects();
        this.initializeIntersectionObserver();
    }

    initializeBasicAnimations() {
        // Add entrance animations for experience cards
        const experienceCard = document.querySelector('.experience-card');
        if (experienceCard) {
            experienceCard.style.opacity = '0';
            experienceCard.style.transform = 'translateY(50px)';
        }

        // Add staggered animations for achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add animations for learning outcomes
        const outcomeItems = document.querySelectorAll('.outcome-item');
        outcomeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add animations for career goals
        const goalCards = document.querySelectorAll('.goal-card');
        goalCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) rotateY(15deg)';
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    initializeCounters() {
        const counterElements = document.querySelectorAll('.experience .counter, .experience .stat-number');
        
        counterElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target')) || 0;
            const counter = new CounterAnimation(element, target, 2500);
            
            // Store counter instance for later use
            element.counterInstance = counter;
        });
    }

    initializeHoverEffects() {
        // Enhanced hover effects for achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skill badge hover effects
        const skillBadges = document.querySelectorAll('.skill-badge');
        skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-3px) scale(1.05)';
                badge.style.boxShadow = 'var(--shadow-lg)';
            });

            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) scale(1)';
                badge.style.boxShadow = 'var(--shadow-sm)';
            });
        });

        // Timeline marker pulse animation
        const timelineMarker = document.querySelector('.timeline-marker');
        if (timelineMarker) {
            setInterval(() => {
                timelineMarker.style.animation = 'pulse 2s ease-in-out';
                setTimeout(() => {
                    timelineMarker.style.animation = '';
                }, 2000);
            }, 5000);
        }
    }

    initializeIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.triggerAnimations();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        if (this.experienceSection) {
            observer.observe(this.experienceSection);
        }
    }

    triggerAnimations() {
        // Animate main experience card
        const experienceCard = document.querySelector('.experience-card');
        if (experienceCard) {
            experienceCard.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }

        // Animate achievement cards with stagger
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });

        // Animate learning outcomes
        const outcomeItems = document.querySelectorAll('.outcome-item');
        outcomeItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
            }, index * 100);
        });

        // Animate career goals
        const goalCards = document.querySelectorAll('.goal-card');
        goalCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }, index * 200);
        });

        // Animate testimonial with special effect
        const testimonialCard = document.querySelector('.testimonial-card');
        if (testimonialCard) {
            setTimeout(() => {
                testimonialCard.style.animation = 'fadeInUp 0.8s ease-out forwards';
                testimonialCard.style.transform = 'translateY(0)';
            }, 1000);
        }

        // Start skill badge animations
        this.animateSkillBadges();

        // Start counters for basic metric cards
        const basicCounters = document.querySelectorAll('.metric-card .counter');
        basicCounters.forEach(counter => {
            if (counter.counterInstance) {
                setTimeout(() => {
                    counter.counterInstance.animate();
                }, 500);
            }
        });
    }

    animateSkillBadges() {
        const skillBadges = document.querySelectorAll('.skill-badge');
        skillBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.animation = 'slideInFromBottom 0.4s ease-out forwards';
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Method to refresh animations (useful for theme changes)
    refreshAnimations() {
        if (this.hasAnimated) {
            this.hasAnimated = false;
            this.initializeBasicAnimations();
        }
        
        // Also refresh dashboard if it exists
        if (this.dashboard && this.dashboard.updateChartsTheme) {
            this.dashboard.updateChartsTheme();
        }
    }

    // Method to get dashboard instance
    getDashboard() {
        return this.dashboard;
    }

    destroy() {
        if (this.dashboard && this.dashboard.destroy) {
            this.dashboard.destroy();
        }
    }
}

// Advanced Experience Dashboard Manager
class ExperienceDashboard {
    constructor() {
        this.charts = new Map();
        this.currentView = 'overview';
        this.animationTimers = [];
        this.init();
    }

    init() {
        this.initializeDashboardControls();
        this.initializeCharts();
        this.initializeKPIAnimations();
        this.initializeProgressBars();
        this.initializeTimelineInteractions();
    }

    initializeDashboardControls() {
        const buttons = document.querySelectorAll('.dashboard-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');
                this.switchView(view);
                
                // Update active state
                buttons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        
        // Add view switching animation
        const dashboard = document.querySelector('.premium-dashboard');
        if (dashboard) {
            dashboard.style.transform = 'scale(0.98)';
            dashboard.style.opacity = '0.7';
            
            setTimeout(() => {
                dashboard.style.transform = 'scale(1)';
                dashboard.style.opacity = '1';
                this.updateViewContent(view);
            }, 150);
        }
    }

    updateViewContent(view) {
        // This could be expanded to show different content based on view
        console.log(`Switching to ${view} view`);
        
        // Trigger chart updates based on view
        if (view === 'performance') {
            this.animatePerformanceChart();
        } else if (view === 'growth') {
            this.animateGrowthTimeline();
        }
    }

    initializeCharts() {
        // Initialize Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx && typeof Chart !== 'undefined') {
            this.createPerformanceChart(performanceCtx);
        }

        // Initialize Skill Distribution Chart
        const skillCtx = document.getElementById('skillDistributionChart');
        if (skillCtx && typeof Chart !== 'undefined') {
            this.createSkillDistributionChart(skillCtx);
        }
    }

    createPerformanceChart(ctx) {
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: 'Applications Processed',
                    data: [8, 15, 22, 28, 35, 40, 45, 50],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }, {
                    label: 'Risk Assessments',
                    data: [5, 10, 15, 20, 25, 28, 30, 35],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // We have custom legend
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false,
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                }
            }
        });

        this.charts.set('performance', chart);
    }

    createSkillDistributionChart(ctx) {
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Financial Analysis', 'Risk Management', 'Client Relations', 'Data Analysis'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(6, 182, 212, 0.8)'
                    ],
                    borderColor: [
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(6, 182, 212, 1)'
                    ],
                    borderWidth: 3,
                    hoverOffset: 10,
                    spacing: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false // We have custom legend
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutQuart',
                }
            }
        });

        this.charts.set('skillDistribution', chart);
    }

    initializeKPIAnimations() {
        const kpiCards = document.querySelectorAll('.kpi-card');
        
        kpiCards.forEach((card, index) => {
            // Add entrance animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Add hover effects for counters
            const counter = card.querySelector('.counter');
            if (counter) {
                card.addEventListener('mouseenter', () => {
                    this.animateCounter(counter);
                });
            }

            // Add trend indicator animations
            const trend = card.querySelector('.kpi-trend');
            if (trend) {
                trend.addEventListener('mouseenter', () => {
                    trend.style.transform = 'scale(1.1)';
                });
                
                trend.addEventListener('mouseleave', () => {
                    trend.style.transform = 'scale(1)';
                });
            }
        });
    }

    animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'));
        const current = parseInt(counterElement.textContent);
        
        if (current < target) {
            const increment = Math.ceil((target - current) / 10);
            counterElement.textContent = Math.min(current + increment, target);
            
            setTimeout(() => this.animateCounter(counterElement), 50);
        }
    }

    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute('data-percentage');
                    
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                        this.addProgressAnimation(progressBar);
                    }, 500);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    addProgressAnimation(progressBar) {
        // Add a pulse effect when progress completes
        progressBar.addEventListener('transitionend', () => {
            progressBar.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                progressBar.style.animation = '';
            }, 500);
        });
    }

    initializeTimelineInteractions() {
        const milestones = document.querySelectorAll('.milestone');
        
        milestones.forEach((milestone, index) => {
            const marker = milestone.querySelector('.milestone-marker');
            const content = milestone.querySelector('.milestone-content');
            
            milestone.addEventListener('mouseenter', () => {
                marker.style.transform = 'scale(1.3)';
                marker.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.6)';
                content.style.transform = 'translateY(-5px)';
            });
            
            milestone.addEventListener('mouseleave', () => {
                marker.style.transform = 'scale(1)';
                marker.style.boxShadow = 'var(--shadow-lg)';
                content.style.transform = 'translateY(0)';
            });

            // Add click interaction for detailed view
            milestone.addEventListener('click', () => {
                this.showMilestoneDetails(index + 1);
            });
        });
    }

    showMilestoneDetails(week) {
        // Create modal or expanded view for milestone details
        const details = {
            1: {
                title: 'Banking Operations Orientation',
                description: 'Introduction to DenizBank systems, policies, and procedures. Learning fundamental banking operations.',
                achievements: ['System access setup', 'Policy training completion', 'Department orientation']
            },
            2: {
                title: 'Financial Analysis Training',
                description: 'Deep dive into financial analysis methodologies and loan assessment procedures.',
                achievements: ['Credit analysis training', 'Risk evaluation methods', 'Financial modeling basics']
            },
            3: {
                title: 'Risk Assessment Mastery',
                description: 'Advanced training in risk management frameworks and compliance procedures.',
                achievements: ['Risk model application', 'Compliance protocol mastery', 'Stress testing participation']
            },
            4: {
                title: 'Independent Project Leadership',
                description: 'Leading independent analysis projects and client interaction responsibilities.',
                achievements: ['Project leadership', 'Client presentation', 'Team collaboration']
            }
        };

        const detail = details[week];
        if (detail) {
            // For now, just log the details (could be expanded to show modal)
            console.log(`Week ${week}: ${detail.title}`, detail);
        }
    }

    animatePerformanceChart() {
        const chart = this.charts.get('performance');
        if (chart) {
            chart.update('active');
        }
    }

    animateGrowthTimeline() {
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach((milestone, index) => {
            setTimeout(() => {
                milestone.style.animation = 'bounce 0.6s ease-in-out';
                setTimeout(() => {
                    milestone.style.animation = '';
                }, 600);
            }, index * 200);
        });
    }

    // Method to update charts theme
    updateChartsTheme() {
        this.charts.forEach(chart => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            chart.options.scales.y.ticks.color = isDark ? '#cbd5e1' : '#64748b';
            chart.options.scales.x.ticks.color = isDark ? '#cbd5e1' : '#64748b';
            chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            
            chart.update();
        });
    }

    // Enhanced intersection observer for staggered animations
    createStaggeredAnimation(elements, animationClass, delay = 100) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add(animationClass);
                    }, index * delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        elements.forEach(element => observer.observe(element));
    }

    destroy() {
        // Clean up charts and timers
        this.charts.forEach(chart => chart.destroy());
        this.charts.clear();
        
        this.animationTimers.forEach(timer => clearTimeout(timer));
        this.animationTimers = [];
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
            // Initialize accessibility improvements
            this.initializeAccessibility();
            
            // Core components
            this.components.set('theme', new ThemeManager());
            this.components.set('navigation', new NavigationManager());
            this.components.set('animations', new AnimationObserver());
            this.components.set('forms', new FormHandler());
            this.components.set('scroll', new SmoothScroll());
            this.components.set('performance', new PerformanceMonitor());

            // Enhanced visual effects
            this.components.set('visualEffects', new VisualEffectsManager());

            // Papers filter
            this.components.set('papersFilter', new PapersFilter());

            // Optional components (only if elements exist)
            if (document.querySelector('.hero-title .typing-text')) {
                const typingElement = document.querySelector('.hero-title .typing-text');
                const typingAnimation = new TypingAnimation(typingElement, 'Eren Gündemir', 150);
                this.components.set('typing', typingAnimation);
                
                // Start typing animation after a delay
                setTimeout(() => typingAnimation.start(), 500);
            }

            // Particles background (optional, can be disabled for performance and reduced motion)
            if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.components.set('particles', new ParticlesBackground());
            }

            // Enhanced skill visualization (initialize immediately)
            this.components.set('skillVisualization', new SkillVisualization());

            // Advanced data visualization (delay to ensure Chart.js and DOM are ready)
            setTimeout(() => {
                this.components.set('dataVisualization', new DataVisualization());
            }, 500);

            // Advanced experience dashboard (initialize immediately)
            this.components.set('experience', new ExperienceManager());

            console.log('🚀 Application initialized successfully');
            console.log('✨ Enhanced visual effects activated');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    }

    initializeAccessibility() {
        // Add aria-hidden to all decorative icons
        const decorativeIcons = document.querySelectorAll('.fas, .fab');
        decorativeIcons.forEach(icon => {
            // Skip icons that already have aria attributes or are in buttons/links with text
            if (!icon.hasAttribute('aria-hidden') && 
                !icon.hasAttribute('aria-label') && 
                !icon.closest('button, a')?.textContent.trim()) {
                icon.setAttribute('aria-hidden', 'true');
            }
        });

        // Add skip navigation link
        this.addSkipNavigation();
    }

    addSkipNavigation() {
        const skipNav = document.createElement('a');
        skipNav.href = '#main-content';
        skipNav.className = 'skip-nav';
        skipNav.textContent = 'Skip to main content';
        skipNav.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px 12px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipNav.addEventListener('focus', () => {
            skipNav.style.top = '6px';
        });
        
        skipNav.addEventListener('blur', () => {
            skipNav.style.top = '-40px';
        });

        document.body.insertBefore(skipNav, document.body.firstChild);
        
        // Add id to main content area
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.setAttribute('id', 'main-content');
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
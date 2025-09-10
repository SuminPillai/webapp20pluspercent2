// Global variables
let auth, onAuthStateChanged;
let isFirebaseAvailable = false;
let threeJsInitialized = false;

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing 20PlusPercent institutional platform...');
    
    // Initialize Lucide icons first
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    }
    
    // Initialize core components
    initializeNavbar();
    initializeFAQ();
    initializeSmoothScroll();
    initializeMobileMenu();
    
    // Initialize Firebase or demo mode
    initializeFirebaseOrDemo();
    
    // Initialize Three.js background with delay to ensure canvas is ready
    setTimeout(initializeThreeJsBackground, 100);
    
    // Initialize scroll animations
    setTimeout(initializeScrollAnimations, 500);
});

// Firebase initialization
async function initializeFirebaseOrDemo() {
    try {
        const firebase = await import('./firebase-init.js');
        auth = firebase.auth;
        onAuthStateChanged = firebase.onAuthStateChanged;
        isFirebaseAvailable = true;
        console.log('Firebase authentication service initialized');
        initializeAuth();
    } catch (error) {
        console.log('Running in demonstration mode - full platform features available in production');
        isFirebaseAvailable = false;
        initializeDemoMode();
    }
}

// Firebase authentication handler
function initializeAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            renderAuthenticatedUser();
        } else {
            renderUnauthenticatedUser();
        }
    });
}

// Demo mode initialization
function initializeDemoMode() {
    renderUnauthenticatedUser();
}

// Render UI for authenticated users
function renderAuthenticatedUser() {
    const navLinks = document.getElementById('nav-links');
    const heroCtaButtons = document.getElementById('hero-cta');
    const finalCtaButtons = document.getElementById('final-cta-buttons');
    const redirectMessage = document.getElementById('redirect-message');

    if (navLinks) {
        navLinks.innerHTML = `<a href="/portfolio.html" class="btn btn--primary">Access Platform</a>`;
    }
    
    if (heroCtaButtons) {
        heroCtaButtons.innerHTML = `<a href="/portfolio.html" class="btn btn--primary btn--cta">Access Platform</a>`;
    }
    
    if (finalCtaButtons) {
        finalCtaButtons.innerHTML = `<a href="/portfolio.html" class="btn btn--primary btn--cta">Access Platform</a>`;
    }
    
    // Remove the automatic redirect and hide the message element
    if (redirectMessage) {
       redirectMessage.style.display = 'none';
    }
}

// Render UI for unauthenticated users
function renderUnauthenticatedUser() {
    const navLinks = document.getElementById('nav-links');
    const heroCtaButtons = document.getElementById('hero-cta');
    const finalCtaButtons = document.getElementById('final-cta-buttons');

    if (navLinks) {
        navLinks.innerHTML = `
            <a href="/login.html" class="nav-link">Client Login</a>
            <a href="/register.html" class="btn btn--primary">Request Access</a>
        `;
    }
    
    if (heroCtaButtons) {
        heroCtaButtons.innerHTML = `
            <a href="/register.html" class="btn btn--primary btn--cta">Request Platform Access</a>
            <a href="/login.html" class="btn btn--secondary btn--cta-secondary">Client Login</a>
        `;
    }
    
    if (finalCtaButtons) {
        finalCtaButtons.innerHTML = `
            <a href="/register.html" class="btn btn--primary btn--cta">Request Platform Access</a>
            <a href="/login.html" class="btn btn--secondary btn--cta-secondary">Client Login</a>
        `;
    }
}

// Initialize Three.js background with more subtle particles
function initializeThreeJsBackground() {
    if (threeJsInitialized) return;
    
    try {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js library not available - background animation disabled');
            return;
        }

        const canvas = document.getElementById('bg-canvas');
        if (!canvas) {
            console.warn('Background canvas element not found');
            return;
        }

        console.log('Initializing professional background animation...');

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true 
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0); // Transparent background

        // Create very subtle particle system for professional look
        const particleCount = 800; // Reduced count for more subtle effect
        const positions = new Float32Array(particleCount * 3);
        
        // Initialize particle positions
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 600;     // x - wider spread
            positions[i + 1] = (Math.random() - 0.5) * 600; // y  
            positions[i + 2] = (Math.random() - 0.5) * 400; // z
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Professional, subtle particle material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.4, // Very small, professional dots
            color: 0x21808d, // More muted teal color
            transparent: true,
            opacity: 0.3, // Much more subtle
            sizeAttenuation: true
        });
        
        const particles = new THREE.Points(geometry, particlesMaterial);
        scene.add(particles);

        // Position camera
        camera.position.z = 200;

        // Animation variables
        let time = 0;
        
        // Subtle animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            time += 0.003; // Slower animation for professional feel
            
            // Very gentle rotation
            particles.rotation.x = time * 0.02;
            particles.rotation.y = time * 0.03;
            
            // Minimal floating motion
            particles.position.y = Math.sin(time * 0.4) * 1.5;
            particles.position.x = Math.cos(time * 0.2) * 1;
            
            renderer.render(scene, camera);
        }
        
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        
        window.addEventListener('resize', handleResize);

        threeJsInitialized = true;
        console.log('Professional background animation initialized successfully');

    } catch (error) {
        console.error('Background animation initialization failed:', error);
    }
}

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', debounce(handleScroll, 10));
    console.log('Navigation scroll effects initialized');
}

// Professional FAQ functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach((question) => {
        question.addEventListener('click', (e) => {
            e.preventDefault();
            
            const faqId = question.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            const isActive = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach((q) => {
                if (q !== question) {
                    q.classList.remove('active');
                    const otherId = q.getAttribute('data-faq');
                    const otherAnswer = document.getElementById(`faq-${otherId}`);
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                question.classList.remove('active');
                if (answer) answer.classList.remove('active');
            } else {
                question.classList.add('active');
                if (answer) answer.classList.add('active');
            }
        });
    });
    
    console.log(`Professional FAQ system initialized with ${faqQuestions.length} items`);
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('show-mobile');
        });
        console.log('Mobile navigation menu initialized');
    }
}

// Professional scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.card, .feature-card, .testimonial, .pricing-card, .cert-badge');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility: Debounce function
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


// Animation utilities and effects

// Intersection Observer for scroll animations
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

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initScrollToTop();
    initParallaxEffects();
    initCounterAnimations();
    initTypewriterEffects();
    addAnimationCSS();
});

function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .plan-card, .team-card, .service-card, .contact-item, .link-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Special animations for hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .service-hero h1, .service-hero p');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.animation = `fadeInUp 1s ease ${index * 0.2}s forwards`;
    });
}

function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        pulse(scrollTopBtn);
    });
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .service-hero, .page-header');
    
    if (window.innerWidth > 768) { // Only on desktop
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.3;
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16));
    }
}

function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        observer.observe(counter);
        counter.addEventListener('animateIn', () => {
            const target = parseInt(counter.getAttribute('data-counter'));
            animateCounter(counter, target);
        });
    });
}

function initTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach((element, index) => {
        const text = element.getAttribute('data-typewriter');
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        
        setTimeout(() => {
            typeWriter(element, text, speed);
        }, index * 1000);
    });
}

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #6366f1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Fade in animation
function fadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let opacity = 0;
    const increment = 1 / (duration / 16);
    
    const timer = setInterval(() => {
        opacity += increment;
        element.style.opacity = opacity;
        
        if (opacity >= 1) {
            element.style.opacity = '1';
            clearInterval(timer);
        }
    }, 16);
}

// Slide in animation
function slideIn(element, direction = 'left', duration = 500) {
    const directions = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        up: 'translateY(-100%)',
        down: 'translateY(100%)'
    };
    
    element.style.transform = directions[direction];
    element.style.transition = `transform ${duration}ms ease`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.transform = 'translate(0, 0)';
    }, 10);
}

// Pulse animation
function pulse(element, scale = 1.1, duration = 300) {
    const originalTransform = element.style.transform;
    element.style.transition = `transform ${duration}ms ease`;
    element.style.transform = `${originalTransform} scale(${scale})`;
    
    setTimeout(() => {
        element.style.transform = originalTransform;
    }, duration);
}

// Shake animation
function shake(element, intensity = 10, duration = 500) {
    const originalTransform = element.style.transform;
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        if (progress < duration) {
            const x = Math.sin(progress / 50) * intensity * (1 - progress / duration);
            element.style.transform = `${originalTransform} translateX(${x}px)`;
            requestAnimationFrame(animate);
        } else {
            element.style.transform = originalTransform;
        }
    }
    
    requestAnimationFrame(animate);
}

// Loading spinner
function showLoading(element) {
    const spinner = document.createElement('div');
    spinner.className = 'loading';
    spinner.style.margin = '0 auto';
    
    element.innerHTML = '';
    element.appendChild(spinner);
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Stagger animation for multiple elements
function staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Hover effects for interactive elements
function initHoverEffects() {
    const hoverElements = document.querySelectorAll('.btn-primary, .plan-card, .feature-card, .team-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });
}

// Smooth reveal animation for modals/popups
function revealModal(modal) {
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
}

function hideModal(modal) {
    modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Progress bar animation
function animateProgressBar(progressBar, targetWidth, duration = 1000) {
    let width = 0;
    const increment = targetWidth / (duration / 16);
    
    const timer = setInterval(() => {
        width += increment;
        progressBar.style.width = `${width}%`;
        
        if (width >= targetWidth) {
            progressBar.style.width = `${targetWidth}%`;
            clearInterval(timer);
        }
    }, 16);
}

// Text highlight animation
function highlightText(element, color = '#6366f1', duration = 2000) {
    const originalBackground = element.style.backgroundColor;
    element.style.transition = `background-color 0.3s ease`;
    element.style.backgroundColor = color;
    
    setTimeout(() => {
        element.style.backgroundColor = originalBackground;
    }, duration);
}

// Floating animation for elements
function floatingAnimation(element, amplitude = 10, speed = 2000) {
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        const y = Math.sin(progress / speed * Math.PI * 2) * amplitude;
        element.style.transform = `translateY(${y}px)`;
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

// Add CSS animations dynamically
function addAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: rotate(-200deg);
            }
            to {
                opacity: 1;
                transform: rotate(0);
            }
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .fade-in {
            animation: fadeInUp 0.6s ease forwards;
        }

        .slide-in-left {
            animation: fadeInLeft 0.6s ease forwards;
        }

        .slide-in-right {
            animation: fadeInRight 0.6s ease forwards;
        }

        .bounce-in {
            animation: bounceIn 0.8s ease forwards;
        }

        .zoom-in {
            animation: zoomIn 0.5s ease forwards;
        }

        .rotate-in {
            animation: rotateIn 0.6s ease forwards;
        }

        .pulse-animation {
            animation: pulse 2s infinite;
        }

        /* Hover animations */
        .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .hover-glow:hover {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }

        /* Loading states */
        .loading-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }

        /* Responsive animations */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        @media (max-width: 768px) {
            .parallax-element {
                transform: none !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize hover effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initHoverEffects();
});

// Export functions for use in other scripts
window.AnimationUtils = {
    fadeIn,
    slideIn,
    pulse,
    shake,
    showLoading,
    hideLoading,
    staggerAnimation,
    revealModal,
    hideModal,
    animateProgressBar,
    highlightText,
    floatingAnimation,
    typeWriter,
    animateCounter
};

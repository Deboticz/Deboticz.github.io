let hasVisited = localStorage.getItem('hasVisited');

document.addEventListener('DOMContentLoaded', function() {
    logVisitor();

    if (!hasVisited && config.discountCode.enabled) {
        setTimeout(() => {
            showDiscountModal();
        }, 2000);
        localStorage.setItem('hasVisited', 'true');
    }

    setupEventListeners();

    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initForms();
    initModals();
    initAccordions();
    initTabs();
    initCounters();
    initParticles();
    initTheme();
    initLazyLoading();
});

function logVisitor() {
    if (!config.webhook.enabled) return;

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip;

            if (config.logging.excludedIPs.includes(userIP)) {
                return;
            }

            const userId = localStorage.getItem("userId") || "Unknown User";

const visitorData = {
    embeds: [{
        title: "New Website Visitor",
        color: 6366961,
        fields: [
            { name: "User ID", value: userId, inline: true },
            { name: "IP Address", value: userIP, inline: true },
            { name: "User Agent", value: navigator.userAgent.substring(0, 100), inline: false },
            { name: "Timestamp", value: new Date().toISOString(), inline: true },
            { name: "Page", value: window.location.href, inline: true }
        ],
        timestamp: new Date().toISOString()
    }]
};


            fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(visitorData)
            }).catch(error => console.error('Webhook error:', error));
        })
        .catch(error => console.error('IP fetch error:', error));
}

function setupEventListeners() {
    const modal = document.getElementById('fivemModal');
    const discountModal = document.getElementById('discountModal');
    const spans = document.getElementsByClassName('close');

    for (let span of spans) {
        span.onclick = function() {
            modal.style.display = 'none';
            discountModal.style.display = 'none';
        };
    }

    window.onclick = function(event) {
        if (event.target === modal) modal.style.display = 'none';
        if (event.target === discountModal) discountModal.style.display = 'none';
    };

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    stylePrimarySecondaryButtons();
}

function stylePrimarySecondaryButtons() {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');

    primaryButtons.forEach(btn => {
        btn.style.backgroundColor = '#6366f1';
        btn.style.color = '#ffffff';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.borderRadius = '8px';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background-color 0.3s ease';
        btn.onmouseover = () => btn.style.backgroundColor = '#4f46e5';
        btn.onmouseout = () => btn.style.backgroundColor = '#6366f1';
    });

    secondaryButtons.forEach(btn => {
        btn.style.backgroundColor = '#e5e7eb';
        btn.style.color = '#111827';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.borderRadius = '8px';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background-color 0.3s ease';
        btn.onmouseover = () => btn.style.backgroundColor = '#d1d5db';
        btn.onmouseout = () => btn.style.backgroundColor = '#e5e7eb';
    });
}

function showFiveMPlans() {
    document.getElementById('fivemModal').style.display = 'block';
}

function showDiscountModal() {
    document.getElementById('discountModal').style.display = 'block';
}

function closeDiscountModal() {
    document.getElementById('discountModal').style.display = 'none';
}

function copyDiscountCode() {
    const codeInput = document.getElementById('discountCode');
    codeInput.select();
    codeInput.setSelectionRange(0, 99999);
    document.execCommand('copy');

    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#10b981';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#6366f1';
    }, 2000);
}

// --- Remaining site initialization functions ---
// (All functions from the second script are already included from initNavigation to toggleTheme)
// --- Utility Functions ---
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

window.addEventListener('resize', debounce(() => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}, 250));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) closeModal(activeModal);

        const navMenu = document.querySelector('.nav-menu.active');
        if (navMenu) {
            navMenu.classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
            }, 0);
        });
    }
}

measurePerformance();

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

window.WebsiteUtils = {
    showNotification,
    openModal,
    closeModal,
    toggleTheme,
    debounce,
    throttle
};
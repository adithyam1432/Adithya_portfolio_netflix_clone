// ============================================
// LANGUAGE SWITCHING SYSTEM
// ============================================
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    document.body.setAttribute('data-lang', currentLang);
    updateAllText();
    
    // Save preference to localStorage
    localStorage.setItem('preferredLang', currentLang);
}

function updateAllText() {
    const elements = document.querySelectorAll('[data-en][data-hi]');
    
    elements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const hiText = element.getAttribute('data-hi');
        const targetText = currentLang === 'hi' ? hiText : enText;
        
        // Handle different element types
        if (element.tagName === 'INPUT') {
            element.placeholder = targetText;
        } else if (element.tagName === 'BUTTON' && element.type === 'submit') {
            element.textContent = targetText;
        } else {
            element.textContent = targetText;
        }
    });
}

// Initialize language on page load
function initializeLanguage() {
    // Check for saved preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        currentLang = savedLang;
        document.body.setAttribute('data-lang', currentLang);
        updateAllText();
    }
}

// ============================================
// FAQ ACCORDION - NETFLIX STYLE
// ============================================
function initAccordion() {
    const faqInputs = document.querySelectorAll('.accordion input[type="radio"]');
    const faqLabels = document.querySelectorAll('.accordion li label');

    faqLabels.forEach((label, index) => {
        label.addEventListener('click', function(e) {
            const input = this.previousElementSibling;
            const content = this.nextElementSibling;
            
            // If already open, close it (Netflix behavior)
            if (input.checked) {
                e.preventDefault();
                input.checked = false;
                closeContent(content);
            } else {
                // Close all others first
                faqInputs.forEach((inp, i) => {
                    if (i !== index && inp.checked) {
                        inp.checked = false;
                        const otherContent = inp.parentElement.querySelector('.content');
                        closeContent(otherContent);
                    }
                });
                
                // Open clicked one with smooth animation
                setTimeout(() => {
                    openContent(content);
                }, 50);
            }
        });
    });
}

function closeContent(content) {
    content.style.maxHeight = '0';
    content.style.padding = '0 20px';
    content.style.opacity = '0';
}

function openContent(content) {
    content.style.maxHeight = content.scrollHeight + 100 + 'px';
    content.style.padding = '30px 20px';
    content.style.opacity = '1';
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// FORM VALIDATION & ENHANCEMENT
// ============================================
function initFormHandling() {
    const forms = document.querySelectorAll('.email-signup');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && !isValidEmail(emailInput.value)) {
                e.preventDefault();
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return false;
            }
            
            // Show success message before redirect
            showNotification('Opening email client...', 'success');
        });
        
        // Real-time email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    this.style.borderColor = '#e50914';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e50914' : '#4CAF50'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('.img-col img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all rows and sections
    document.querySelectorAll('.row, .section-title, .faq h2').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #e50914;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes open accordion
        if (e.key === 'Escape') {
            const openInput = document.querySelector('.accordion input[type="radio"]:checked');
            if (openInput) {
                openInput.checked = false;
                const content = openInput.parentElement.querySelector('.content');
                closeContent(content);
            }
        }
        
        // Ctrl/Cmd + L toggles language
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system
    initializeLanguage();
    
    // Initialize accordion
    initAccordion();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize keyboard navigation
    initKeyboardNav();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Log performance
    logPerformance();
    
    // Event listener for language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Add CSS animations
    addAnimationStyles();
    
    console.log('✅ Portfolio loaded successfully!');
    console.log('💡 Tip: Press Ctrl+L to toggle language');
});

// ============================================
// ADD CSS ANIMATIONS DYNAMICALLY
// ============================================
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(229, 9, 20, 0.6);
        }
        
        .accordion .content {
            transition: max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.message);
});

// ============================================
// EXPORT FOR TESTING (Optional)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleLanguage,
        isValidEmail,
        showNotification
    };
}

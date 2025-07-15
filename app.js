// ThinkBit Edge Corp - Main JavaScript Application

// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing ThinkBit Edge app...');
    
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    initializeMobileMenu();
    initializeForms();
    initializePageNavigation();
    initializeSmoothScrolling();
    initializeScrollInteractions();
    initializeAccessibility();
    initializeBrowserNavigation();
    
    // Show initial page
    const initialPage = window.location.hash.replace('#', '') || 'home';
    console.log('Initial page:', initialPage);
    navigateToPage(initialPage);
    updateActiveNavByPage(initialPage);
    
    console.log('App initialization complete');
}

// THEME MANAGEMENT
function initializeTheme() {
    console.log('Initializing theme...');
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.warn('Theme toggle not found');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    console.log('Applying theme:', savedTheme);
    applyTheme(savedTheme);
    updateThemeIcon(themeIcon, savedTheme);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Theme toggle clicked');
        
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Switching theme from', currentTheme, 'to', newTheme);
        applyTheme(newTheme);
        updateThemeIcon(themeIcon, newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    console.log('Theme initialized');
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    console.log('Theme applied:', theme);
}

function updateThemeIcon(icon, theme) {
    if (!icon) return;
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// NAVIGATION
function initializeNavigation() {
    console.log('Initializing navigation...');
    const navLinks = document.querySelectorAll('.nav__link');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        const targetPage = link.getAttribute('data-page');
        console.log(`Nav link ${index}: ${targetPage}`);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', targetPage);
            
            if (targetPage) {
                navigateToPage(targetPage);
                updateActiveNav(this);
                closeMobileMenu();
            }
        });
    });
    
    console.log('Navigation initialized');
}

function navigateToPage(pageId) {
    console.log('Navigating to page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL without triggering popstate
        if (window.location.hash !== '#' + pageId) {
            window.history.pushState({}, '', '#' + pageId);
        }
        
        console.log('Successfully navigated to:', pageId);
    } else {
        console.error('Page not found:', pageId);
    }
}

function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateActiveNavByPage(pageId) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        link.classList.toggle('active', linkPage === pageId);
    });
}

// MOBILE MENU
function initializeMobileMenu() {
    console.log('Initializing mobile menu...');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('nav');
    
    if (!mobileToggle || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Mobile menu toggle clicked');
        toggleMobileMenu();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile menu initialized');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('nav');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu && mobileToggle) {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('nav');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
}

// PAGE NAVIGATION (for buttons)
function initializePageNavigation() {
    console.log('Initializing page navigation...');
    
    // Use event delegation for better reliability
    document.body.addEventListener('click', function(e) {
        const target = e.target.closest('[data-page]');
        if (!target) return;
        
        // Skip if it's a nav link (handled separately)
        if (target.classList.contains('nav__link')) return;
        
        e.preventDefault();
        
        const targetPage = target.getAttribute('data-page');
        const anchor = target.getAttribute('data-anchor');
        
        console.log('Page navigation clicked:', targetPage, anchor ? `(anchor: ${anchor})` : '');
        
        if (targetPage) {
            navigateToPage(targetPage);
            updateActiveNavByPage(targetPage);
            
            // Handle anchor scrolling after navigation
            if (anchor) {
                setTimeout(() => {
                    handleAnchorScroll(anchor);
                }, 300);
            }
        }
    });
    
    console.log('Page navigation initialized');
}

function handleAnchorScroll(anchor) {
    console.log('Handling anchor scroll:', anchor);
    
    // For contact form, pre-fill subject based on anchor
    if (anchor && document.getElementById('contact').classList.contains('active')) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            const subjectMap = {
                'volunteer': 'volunteer',
                'donate': 'donate',
                'mentor': 'mentor',
                'workshop': 'workshop'
            };
            
            subjectSelect.value = subjectMap[anchor] || 'general';
            console.log('Pre-filled subject:', subjectSelect.value);
        }
        
        // Scroll to form
        const contactForm = document.querySelector('.contact__form');
        if (contactForm) {
            setTimeout(() => {
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// FORMS
function initializeForms() {
    console.log('Initializing forms...');
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            handleContactFormSubmission(this);
        });
    }
    
    // Partnership form
    const partnershipForm = document.getElementById('partnership-form');
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Partnership form submitted');
            handlePartnershipFormSubmission(this);
        });
    }
    
    console.log('Forms initialized');
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    console.log('Contact form data:', data);
    
    // Validate form
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        alert(`Thank you, ${data.name}! Your message has been sent successfully. We'll get back to you soon at ${data.email}.`);
        form.reset();
    }, 1500);
}

function handlePartnershipFormSubmission(form) {
    const formData = new FormData(form);
    const data = {
        orgName: formData.get('org-name'),
        contactEmail: formData.get('contact-email'),
        partnershipType: formData.get('partnership-type'),
        message: formData.get('partnership-message')
    };
    
    console.log('Partnership form data:', data);
    
    // Validate form
    if (!data.orgName || !data.contactEmail || !data.partnershipType || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.contactEmail)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        alert(`Thank you for your partnership inquiry! We've received your submission from ${data.orgName} and will contact you at ${data.contactEmail} within 2 business days.`);
        form.reset();
    }, 1500);
}

// SMOOTH SCROLLING
function initializeSmoothScrolling() {
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    
    hashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// SCROLL INTERACTIONS
function initializeScrollInteractions() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const handleScroll = debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
}

// ACCESSIBILITY
function initializeAccessibility() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        if (e.key === 'Enter' && e.target.matches('[data-page]')) {
            e.target.click();
        }
    });
}

// BROWSER NAVIGATION
function initializeBrowserNavigation() {
    console.log('Initializing browser navigation...');
    
    window.addEventListener('popstate', function(e) {
        console.log('Popstate event triggered');
        const currentPage = window.location.hash.substring(1) || 'home';
        navigateToPage(currentPage);
        updateActiveNavByPage(currentPage);
    });
}

// UTILITIES
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

// WINDOW RESIZE HANDLING
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// ERROR HANDLING
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// PERFORMANCE MONITORING
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}

// EXPORTS (for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPage,
        updateActiveNav,
        applyTheme,
        handleContactFormSubmission,
        handlePartnershipFormSubmission
    };
}
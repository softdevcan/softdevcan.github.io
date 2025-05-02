// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactive elements
    initSmoothScrolling();
    initNavbarHighlight();
    initTypeWriter();
    initSkillsAnimation();
    initProjectCards();
    addScrollAnimation();
    addDarkModeToggle();
    addBackToTopButton();
    // Add year to copyright in footer
    updateCopyright();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        });
    });
}

// Highlight active section in navigation
function initNavbarHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Typewriter effect for subtitle
function initTypeWriter() {
    const subtitleElement = document.querySelector('.site-subtitle');
    const originalText = subtitleElement.textContent;
    subtitleElement.textContent = "";
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            subtitleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start the typewriter effect with a slight delay
    setTimeout(typeWriter, 500);
}

// Add animation to skill tags
function initSkillsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.classList.add('skill-tag-hover');
        });
        
        tag.addEventListener('mouseleave', function() {
            this.classList.remove('skill-tag-hover');
        });
    });
}

// Add interactivity to project cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('project-card-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('project-card-active');
        });
    });
}

// Add fade-in animation for elements as they scroll into view
function addScrollAnimation() {
    const elements = document.querySelectorAll('.section-title, .experience-item, .education-item, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
        // Add initial hidden class
        element.classList.add('hidden');
    });
}

// Update copyright year
function updateCopyright() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p');
    footerText.textContent = `© ${currentYear} softdevcan. All rights reserved.`;
}

// Optional: Add dark/light mode toggle
function addDarkModeToggle() {
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggleButton);
    
    // Check for saved user preference and apply
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme);
    
    if (currentTheme === 'dark') {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme on click
    toggleButton.addEventListener('click', function() {
        if (document.body.classList.contains('light')) {
            document.body.classList.replace('light', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Back to top button fonksiyonu
function addBackToTopButton() {
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // İlk yüklemede kontrol et
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
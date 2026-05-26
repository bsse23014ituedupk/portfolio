// ============================
// TYPING EFFECT
// ============================

const subtitleElement = document.querySelector('.typing-effect');
const fullText = subtitleElement.textContent;
subtitleElement.textContent = '';

let charIndex = 0;

function typeText() {
    if (charIndex < fullText.length) {
        subtitleElement.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeText);

// ============================
// NAVIGATION STICKY EFFECT
// ============================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(18, 22, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(18, 22, 26, 0.7)';
    }
});

// ============================
// MOBILE MENU TOGGLE
// ============================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
let mobileMenuOpen = false;

// Create mobile menu dynamically
function createMobileMenu() {
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const clone = link.cloneNode(true);
            mobileMenu.appendChild(clone);
        });
        
        navLinks.parentElement.appendChild(mobileMenu);
        
        // Add styles for mobile menu
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu {
                display: none;
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(18, 22, 26, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                gap: 1rem;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 999;
            }
            
            .mobile-menu.active {
                display: flex;
            }
            
            .mobile-menu .nav-link {
                padding: 0.5rem 0;
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(style);
    }
}

createMobileMenu();

menuToggle.addEventListener('click', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
    } else {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu')?.classList.remove('active');
        menuToggle.classList.remove('active');
        mobileMenuOpen = false;
    });
});

// ============================
// 3D CARD TILT EFFECT
// ============================

const skillCards = document.querySelectorAll('.skill-card');
const projectCards = document.querySelectorAll('.project-card');

function add3DTilt(cards) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

add3DTilt(skillCards);
add3DTilt(projectCards);

// ============================
// PROJECT CARD HOVER TEXT
// ============================

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const title = this.querySelector('.project-title');
        if (title) {
            title.style.color = 'var(--primary-accent)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const title = this.querySelector('.project-title');
        if (title) {
            title.style.color = 'var(--text-light)';
        }
    });
});

// ============================
// CONTACT FORM HANDLING
// ============================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate delay
        setTimeout(() => {
            // You can add actual email integration here (e.g., using a service like EmailJS)
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--primary-accent)';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// ============================
// SMOOTH SCROLL NAVIGATION
// ============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================
// PARALLAX EFFECT ON SCROLL
// ============================

window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    const parallaxElements = document.querySelectorAll('.stars');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrollValue * 0.5}px)`;
    });
});

// ============================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }
    });
}, observerOptions);

// Observe skill cards
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe project cards
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Add fadeInUp animation to CSS
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// ============================
// BACKGROUND ANIMATION
// ============================

function createBackgroundAnimation() {
    const floatingElements = [];
    
    // Create floating SVG elements (microchips, waves)
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-bg-element';
        element.style.cssText = `
            position: fixed;
            pointer-events: none;
            opacity: 0.05;
            z-index: 1;
            font-size: 80px;
            animation: float-bg 15s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        const icons = ['<i class="fas fa-microchip"></i>', '<i class="fas fa-heart"></i>', '<i class="fas fa-wave-square"></i>'];
        element.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        return element;
    }
    
    // Add floating element animation
    const bgStyle = document.createElement('style');
    bgStyle.textContent = `
        @keyframes float-bg {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-50px) rotate(10deg);
            }
        }
    `;
    document.head.appendChild(bgStyle);
}

createBackgroundAnimation();

// ============================
// SCROLL PROGRESS INDICATOR
// ============================

function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / scrollHeight;
    
    // You can use this value to update a progress bar if needed
    // For now, we'll just log it
}

window.addEventListener('scroll', updateScrollProgress);

// ============================
// ENHANCE CONTACT CARD INTERACTION
// ============================

const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// ============================
// DYNAMIC YEAR IN FOOTER
// ============================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Khansa Rasheed. All rights reserved.`;
}

// ============================
// LINK INTEGRATION (Replace # with actual links)
// ============================

// Replace these with actual social media and portfolio links
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
        const title = link.getAttribute('title');
        
        // Update href based on the social platform
        if (title === 'LinkedIn') {
            link.href = 'https://linkedin.com/in/khansa-rasheed';
        } else if (title === 'GitHub') {
            link.href = 'https://github.com/khansa-rasheed';
        } else if (title === 'Portfolio') {
            link.href = '#home';
        }
    });
});

// ============================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Add active link styling
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-accent);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// ============================
// PERFORMANCE OPTIMIZATION
// ============================

// Lazy load images if any are added in the future
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('Portfolio script loaded successfully!');

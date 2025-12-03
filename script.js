// 1. Splash Screen Logic
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    
    // Keep splash visible for at least 1.5 seconds for branding effect
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.visibility = 'hidden';
        
        // Remove from DOM after fade out prevents clicking issues
        setTimeout(() => {
            splash.remove();
        }, 500);
    }, 1500);
});

// 2. Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate Hamburger
        hamburger.classList.toggle('toggle');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. Lazy Loading Images
// Using Intersection Observer API for performance
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazy-img");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    img.src = src;
                    img.classList.remove("lazy-img");
                }
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => {
        imageObserver.observe(img);
    });
});

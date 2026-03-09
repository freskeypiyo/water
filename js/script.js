/* =========================================
   FRESKEY PIYO - MAIN SCRIPT
   ========================================= */

// 1. Splash Screen Logic
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    // Ensure it shows for at least 1.5 seconds so users see the logo
    setTimeout(() => {
        if(splash){
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 500);
        }
    }, 1200);
});

// 2. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-btn');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });
}

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

// 3. Highlight Active Menu Link
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-links li a');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.add("active-page");
    }
}

// 4. Lazy Load / Fade In Animation (Simple)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
        }
    });
});
// (You can add class="hidden-anim" to elements you want to animate)

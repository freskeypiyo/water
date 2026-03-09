/* =========================================
   FRESKEY PIYO - MAIN SCRIPT
   ========================================= */

// 1. Splash Screen Logic
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    // Ensure it shows for at least 1.5 seconds so users see the logo
    setTimeout(() => {
        if (splash) {
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

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });
}

if (closeBtn) {
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

// === 3. Tab Filter for Products ===
function filterProd(cat, btnElement) {
    // Remove active style from all buttons
    const buttons = document.querySelectorAll('.p-tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('text-brand-dark');
        btn.classList.add('text-gray-500');
        btn.classList.remove("after:content-['']", "after:absolute", "after:bottom-0", "after:left-1/2", "after:-translate-x-1/2", "after:w-[30px]", "after:h-[3px]", "after:bg-brand-accent");
    });

    // Add active style to clicked button
    if (btnElement) {
        btnElement.classList.remove('text-gray-500');
        btnElement.classList.add('text-brand-dark');
        btnElement.classList.add("after:content-['']", "after:absolute", "after:bottom-0", "after:left-1/2", "after:-translate-x-1/2", "after:w-[30px]", "after:h-[3px]", "after:bg-brand-accent");
    }

    const products = document.querySelectorAll('.product-card');
    products.forEach(p => {
        if (cat === 'all') {
            p.classList.remove('hidden');
            p.classList.add('flex');
        } else {
            if (p.getAttribute('data-cat').includes(cat)) {
                p.classList.remove('hidden');
                p.classList.add('flex');
            } else {
                p.classList.add('hidden');
                p.classList.remove('flex');
            }
        }
    });
}

// Set initial active state logic visually for first button
document.addEventListener('DOMContentLoaded', () => {
    const firstBtn = document.querySelector('.p-tab-btn');
    if (firstBtn) {
        firstBtn.classList.remove('text-gray-500');
        firstBtn.classList.add('text-brand-dark');
    }
});


// === 4. WhatsApp Order Logic ===
let orderDetails = [];

function addToCart(productName) {
    orderDetails.push(productName);
    const badge = document.getElementById("cartCount");
    badge.innerText = orderDetails.length;
    // Use inline style for animation since dynamically-added Tailwind classes aren't in compiled CSS
    badge.style.transform = "scale(1.5)";
    badge.style.transition = "transform 0.15s ease";
    setTimeout(() => { badge.style.transform = "scale(1)"; }, 200);
}

function openCart() {
    if (orderDetails.length === 0) {
        alert("Your cart is empty! Please add some water before ordering.");
    } else {
        const phone = "917060607763";
        const message = `Hello Freskey Team! I would like to order the following items from your website:\n\n` +
            orderDetails.map((item, index) => `${index + 1}. ${item}`).join('\n') +
            `\n\nPlease let me know the total and delivery details.`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Reset Cart after sending them to WhatsApp
        orderDetails = [];
        document.getElementById("cartCount").innerText = "0";
    }
}

// === 5. Hydration Calculator ===
function calculateWater() {
    const w = parseFloat(document.getElementById('calcWeight').value);
    const a = parseFloat(document.getElementById('calcActivity').value);
    const resBox = document.getElementById('hydration-result');

    if (!w) {
        resBox.innerText = "Please enter weight.";
        return;
    }
    const litres = (w * 0.033 * a).toFixed(2);
    resBox.innerHTML = `You need approx <span class="text-3xl text-white">${litres} L</span> water daily.`;
}

// === 6. Modal Details Logic ===
const productData = {
    'mini': {
        title: "Freskey Mini (200ml)",
        table: `
        <table class="w-full border-collapse mt-5">
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Serve Size</td><td class="py-2">200ml</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Magnesium</td><td class="py-2">3 mg/l</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Potassium</td><td class="py-2">1 mg/l</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Bicarbonate</td><td class="py-2">5 mg/l</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">pH</td><td class="py-2">6.8 - 7.5</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Shelf Life</td><td class="py-2">6 Months</td></tr>
        </table>
        `
    },
    'travel': {
        title: "Freskey Travel (500ml)",
        table: `
        <table class="w-full border-collapse mt-5">
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Serve Size</td><td class="py-2">500ml</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Magnesium</td><td class="py-2">3 mg/l</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Potassium</td><td class="py-2">1 mg/l</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Calcium</td><td class="py-2">2 mg/l</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">TDS</td><td class="py-2">~140 ppm</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Plastic Type</td><td class="py-2">BPA Free PET</td></tr>
        </table>
        `
    },
    'home': {
        title: "Freskey Home (1 Litre)",
        table: `
        <table class="w-full border-collapse mt-5">
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Serve Size</td><td class="py-2">1000ml</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Batch Test</td><td class="py-2">PASSED</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Micro-plastics</td><td class="py-2">0%</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Taste Profile</td><td class="py-2">Sweet, Neutral</td></tr>
        </table>
        <p class="mt-4">Designed for fridge storage. Heavy duty PET prevents buckling.</p>
        `
    },
    'bulk': {
        title: "Freskey 20L Jar",
        table: `
        <table class="w-full border-collapse mt-5">
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Type</td><td class="py-2">Returnable Polycarb</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Washing</td><td class="py-2">7-step chemical wash</td></tr>
            <tr class="border-b border-gray-100"><td class="py-2 font-bold text-brand-dark">Sealing</td><td class="py-2">Tamper-proof Shrink Wrap</td></tr>
        </table>
        `
    }
};

function openDetails(pid) {
    const modal = document.getElementById('detailsModal');
    const data = productData[pid];
    document.getElementById('m-title').innerText = data.title;
    document.getElementById('m-content').innerHTML = data.table;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
}

function closeModal() {
    document.getElementById('detailsModal').classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
}

// Removed event listener that causes errors if detailsModal not rendered yet on all pages. Instead moving checking inside function or checking existence.
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});



// === 7. Accordion Toggle ===
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const span = header.querySelector('span');

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        span.innerText = '+';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        span.innerText = '-';
    }
}

// === 8. Contact Form Handler ===
function handleForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const initialText = btn.innerText;
    btn.innerText = "Sending...";

    setTimeout(() => {
        const feedback = document.getElementById('form-feedback');
        if (feedback) feedback.classList.remove('hidden');
        e.target.reset();
        btn.innerText = "Sent!";
        setTimeout(() => { btn.innerText = initialText; }, 2000);
    }, 1000);
}

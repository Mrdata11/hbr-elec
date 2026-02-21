/* ========================================
   HBR Électricité générale — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initActiveNavTracking();
    initFormSubmit();
});

/* ========================================
   NAVBAR
   - Toggle hamburger menu (mobile)
   - Background change on scroll
   - Close menu on link click / Escape / outside click
   ======================================== */
function initNavbar() {
    const header = document.getElementById('header');
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    const menuLinks = menu.querySelectorAll('a');
    const body = document.body;

    // Create overlay element for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    body.appendChild(overlay);

    function openMenu() {
        toggle.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Fermer le menu');
    }

    function closeMenu() {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
    }

    // Toggle button click
    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on menu link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on overlay click
    overlay.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
            toggle.focus();
        }
    });

    // Navbar scroll state — transparent at top, solid on scroll
    let lastScrollY = 0;
    let ticking = false;

    function updateNavbarOnScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbarOnScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial check (in case page loads scrolled)
    updateNavbarOnScroll();
}

/* ========================================
   SCROLL ANIMATIONS
   - Intersection Observer on [data-animate] elements
   - Respects prefers-reduced-motion
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    // Respect user preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animatedElements.forEach(el => el.classList.add('animate'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for elements in the same section
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   ACTIVE NAV TRACKING
   - Highlights current section in navbar
   ======================================== */
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__menu a:not(.btn)');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 80}px 0px -40% 0px`
    });

    sections.forEach(section => observer.observe(section));
}

/* ========================================
   FORM SUBMISSION
   - AJAX submission to Formspree
   - Client-side validation
   - Success/error feedback
   ======================================== */
function initFormSubmit() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Clear previous errors
    clearFormErrors(form);

    // Validate
    if (!validateForm(form)) return;

    // Get button elements
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn__text');
    const btnLoading = submitBtn.querySelector('.btn__loading');

    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            showFormMessage(
                'Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
                'success'
            );
        } else {
            showFormMessage(
                'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter par téléphone.',
                'error'
            );
        }
    } catch (error) {
        showFormMessage(
            'Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.',
            'error'
        );
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
    }
}

function validateForm(form) {
    let isValid = true;

    // Name
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        showFieldError(name, 'Veuillez entrer votre nom.');
        isValid = false;
    }

    // Email
    const email = form.querySelector('#email');
    if (!email.value.trim()) {
        showFieldError(email, 'Veuillez entrer votre email.');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Veuillez entrer une adresse email valide.');
        isValid = false;
    }

    // Message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
        showFieldError(message, 'Veuillez entrer votre message.');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorSpan = field.parentElement.querySelector('.form-error');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function clearFormErrors(form) {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    // Hide any previous form message
    const msgEl = document.querySelector('.form-message');
    if (msgEl) {
        msgEl.style.display = 'none';
        msgEl.className = 'form-message';
    }
}

function showFormMessage(message, type) {
    const msgEl = document.querySelector('.form-message');
    if (!msgEl) return;

    msgEl.textContent = message;
    msgEl.className = `form-message form-message--${type}`;
    msgEl.style.display = 'block';

    // Scroll to message
    msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide success message after 8 seconds
    if (type === 'success') {
        setTimeout(() => {
            msgEl.style.display = 'none';
        }, 8000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // ============ 1. NAVBAR SCROLL EFFECT ============
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleNavbarScroll);
    // Initial check in case page starts scrolled
    handleNavbarScroll();


    // ============ 2. MOBILE MENU TOGGLE ============
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });


    // ============ 3. COUNTDOWN TIMER ============
    // Oferta vàlida fins al 05/08/2026.
    const targetDate = new Date('2026-08-05T23:59:59').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            // Timer expired, show zeroes
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';
            clearInterval(countdownInterval);
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Format to double digits
        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    };
    
    // Run countdown once immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);


    // ============ 4. SCROLL REVEAL ANIMATIONS ============
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const fadeElements = document.querySelectorAll('.fade-in-up');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(el => observer.observe(el));
    } else {
        // If reduced motion is preferred, immediately make everything visible
        document.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
    }


    // ============ 5. IFRAME LOAD SPINNER ============
    const iframe = document.getElementById('googleFormIframe');
    const spinner = document.getElementById('form-spinner');
    
    if (iframe && spinner) {
        iframe.addEventListener('load', () => {
            // Hide spinner with a smooth fade
            spinner.style.opacity = '0';
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 400); // matches the CSS transition delay
        });
    }


    // ============ 6. MOBILE FLOATING CTA VIEWPORT CONTROLLER ============
    const floatingCTA = document.getElementById('floatingCTA');
    const heroSection = document.querySelector('.hero');
    const formSection = document.getElementById('formulari');
    
    if (floatingCTA && heroSection && formSection) {
        const handleFloatingCTAVisibility = () => {
            if (window.innerWidth <= 768) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                const formRect = formSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Show floating CTA once user scrolls past hero section,
                // but hide it when the registration form itself is visible in the viewport to avoid dual CTAs
                const isFormVisible = (formRect.top < windowHeight && formRect.bottom > 0);
                
                if (heroBottom < 0 && !isFormVisible) {
                    floatingCTA.classList.add('visible');
                } else {
                    floatingCTA.classList.remove('visible');
                }
            } else {
                floatingCTA.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', handleFloatingCTAVisibility);
        window.addEventListener('resize', handleFloatingCTAVisibility);
        handleFloatingCTAVisibility();
    }


    // ============ 7. FAQ ACCORDION HELPER ============
    // Ensure only one accordion is open at a time (standard toggle behavior)
    const faqDetails = document.querySelectorAll('.faq-accordion details');
    
    faqDetails.forEach(detail => {
        detail.addEventListener('click', (e) => {
            // If opening a detail, close all others
            if (!detail.hasAttribute('open')) {
                faqDetails.forEach(otherDetail => {
                    if (otherDetail !== detail) {
                        otherDetail.removeAttribute('open');
                    }
                });
            }
        });
    });

});

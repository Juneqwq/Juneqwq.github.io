// Portfolio homepage script

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // Page Transition Animation on Load
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const pageWrapper = document.getElementById('page-wrapper');

    if (from === 'index' && pageWrapper) {
        // Coming from index.html, start slid left and slide in
        pageWrapper.classList.add('slide-left');
        setTimeout(() => {
            pageWrapper.classList.remove('slide-left');
        }, 10); // Small delay to allow the class to be applied first
    } else if (from === 'foto' && pageWrapper) {
        // Coming from foto.html, start slid right and slide in, then scroll to projects
        pageWrapper.classList.add('slide-right');
        setTimeout(() => {
            pageWrapper.classList.remove('slide-right');
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 10);
    } else if (from === 'video' && pageWrapper) {
        // Coming from video.html, start slid right and slide in, then scroll to projects
        pageWrapper.classList.add('slide-right');
        setTimeout(() => {
            pageWrapper.classList.remove('slide-right');
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 10);
    } else if (from === 'grafika' && pageWrapper) {
        // Coming from projects.html, start slid right and slide in
        pageWrapper.classList.add('slide-right');
        setTimeout(() => {
            pageWrapper.classList.remove('slide-right');
        }, 10);
    }

    // ==========================================
    // Branding SVG Stroke Animation Setup
    // ==========================================
    // Calculate and set proper stroke-dasharray for the outline animation
    const brandingStroke = document.querySelector('.branding-stroke');
    if (brandingStroke && typeof brandingStroke.getTotalLength === 'function') {
        // Calculate the total length of the text stroke
        const strokeLength = brandingStroke.getTotalLength();
        const dashLength = Math.ceil(strokeLength * 1.1); // Slightly longer for safety
        
        // Set the dash array to match the actual text path length
        // This ensures the stroke draws smoothly from start to finish
        brandingStroke.style.setProperty('--stroke-length', dashLength);
        brandingStroke.setAttribute('stroke-dasharray', dashLength);
        brandingStroke.setAttribute('stroke-dashoffset', dashLength);
    }

    // ==========================================
    // Scroll Arrow Navigation
    // ==========================================
    // Handle smooth scrolling to next section when arrow is clicked
    const scrollArrows = document.querySelectorAll('.scroll-arrow');
    scrollArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const targetSelector = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetSelector);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // Projects Section Reveal Animation
    // ==========================================
    // Intersection Observer for reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements (projects, footer, etc.)
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => observer.observe(element));

    // ==========================================
    // Hero Scroll Opacity Effect
    // ==========================================
    // Subtle hero fade on scroll
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const opacity = Math.max(0, 1 - (scrollY / vh));
            hero.style.opacity = opacity;
        }, { passive: true });
    }

    // ==========================================
    // Foto Panel Slide Animation
    // ==========================================
    const fotoCard = document.querySelector('a[data-category="foto"]');
    if (fotoCard) {
        fotoCard.addEventListener('click', function(e) {
            e.preventDefault();
            const pageWrapper = document.getElementById('page-wrapper');
            pageWrapper.classList.add('slide-left');
            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href + '?from=index';
            }, 500); // Match the transition duration
        });
    }

    // ==========================================
    // Video Panel Slide Animation
    // ==========================================
    const videoCard = document.querySelector('a[data-category="video"]');
    if (videoCard) {
        videoCard.addEventListener('click', function(e) {
            e.preventDefault();
            const pageWrapper = document.getElementById('page-wrapper');
            pageWrapper.classList.add('slide-left');
            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href + '?from=index';
            }, 500); // Match the transition duration
        });
    }

    // ==========================================
    // Grafika Panel Slide Animation
    // ==========================================
    const grafikaCard = document.querySelector('a[data-category="grafika"]');
    if (grafikaCard) {
        grafikaCard.addEventListener('click', function(e) {
            e.preventDefault();
            const pageWrapper = document.getElementById('page-wrapper');
            pageWrapper.classList.add('slide-left');
            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href + '?from=index';
            }, 500); // Match the transition duration
        });
    }

    // ==========================================
    // Home Button Slide Animation (on foto.html)
    // ==========================================
    const homeButton = document.querySelector('.home-button a');
    if (homeButton) {
        homeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const pageWrapper = document.getElementById('page-wrapper');
            pageWrapper.classList.add('slide-right');
            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href;
            }, 500); // Match the transition duration
        });
    }
});
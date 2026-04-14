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

    // ==========================================
    // Navbar Scroll Reveal
    // ==========================================
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroLogoText = document.querySelector('.hero-logo-text');
    const heroLogoWrap = document.querySelector('.hero-logo-wrap');
    const heroTitle = document.querySelector('.hero-title');
    
    if (navbar) {
        // Store initial positions
        let heroLogoRect = null;
        let navbarLogoRect = null;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            
            // Show navbar when user scrolls past the scroll indicator
            if (scrollY > vh * 0.8) {
                if (!navbar.classList.contains('active')) {
                    navbar.classList.add('active');
                }
            } else {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
            }

            // Animate hero logo and title toward navbar as user scrolls
            // Start animation at 30% of viewport, complete by 80%
            const animationStart = vh * 0.3;
            const animationEnd = vh * 0.8;
            
            if (scrollY > animationStart && scrollY < animationEnd) {
                // Calculate progress (0 to 1) with easing
                const rawProgress = (scrollY - animationStart) / (animationEnd - animationStart);
                // Apply easeInOutCubic easing for smoother animation
                const progress = rawProgress < 0.5 
                    ? 4 * rawProgress * rawProgress * rawProgress 
                    : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
                
                // Get fresh positions each time for accuracy
                if (!heroLogoRect) {
                    heroLogoRect = heroLogoText.getBoundingClientRect();
                }
                
                const navbarLogoWrap = document.querySelector('.navbar-logo-wrap');
                
                if (navbarLogoWrap && heroLogoRect) {
                    navbarLogoRect = navbarLogoWrap.getBoundingClientRect();
                    
                    // Calculate the translation needed (more dramatic)
                    const translateX = (navbarLogoRect.left - heroLogoRect.left) * progress;
                    const translateY = (navbarLogoRect.top - heroLogoRect.top) * progress;
                    
                    // Scale down dramatically (from 1 to 0.15 for more prominent effect)
                    const scale = 1 - (progress * 0.85);
                    
                    // Fade out smoothly
                    const heroOpacity = Math.max(0, 1 - progress);
                    
                    if (heroLogoText) {
                        heroLogoText.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                        heroLogoText.style.opacity = heroOpacity;
                        heroLogoText.style.pointerEvents = 'none';
                    }
                }
            } else if (scrollY <= animationStart) {
                // Reset to original state
                if (heroLogoText) {
                    heroLogoText.style.transform = 'translate(0, 0) scale(1)';
                    heroLogoText.style.opacity = '1';
                    heroLogoText.style.pointerEvents = 'auto';
                    heroLogoRect = null;
                }
            }
        }, { passive: true });
    }

    // ==========================================
    // Gallery Lightbox
    // ==========================================
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentLightboxIndex = 0;

    const updateLightbox = (index) => {
        if (index < 0) index = galleryItems.length - 1;
        if (index >= galleryItems.length) index = 0;
        currentLightboxIndex = index;

        const item = galleryItems[currentLightboxIndex];
        const image = item.querySelector('.gallery-image');
        const title = item.querySelector('.gallery-title')?.textContent || '';
        const description = item.querySelector('.gallery-description')?.textContent || '';

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
    };

    const openLightbox = (index) => {
        updateLightbox(index);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    const showPrevious = () => openLightbox(currentLightboxIndex - 1);
    const showNext = () => openLightbox(currentLightboxIndex + 1);

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', (event) => {
        event.stopPropagation();
        showPrevious();
    });
    lightboxNext?.addEventListener('click', (event) => {
        event.stopPropagation();
        showNext();
    });

    lightbox?.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (!lightbox?.classList.contains('open')) return;
        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            showPrevious();
        } else if (event.key === 'ArrowRight') {
            showNext();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Scroll animations for fade-in elements
    function setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => observer.observe(el));
    }

    // Header scroll effect - hide on scroll down, show on scroll up
    function setupHeaderScroll() {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('hidden');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
                header.classList.add('hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    // Back to top button
    function setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Update active nav link on scroll
    function setupActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Particles.js initialization
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false
                    },
                    "size": {
                        "value": 3,
                        "random": true
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "out_mode": "out"
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        }
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "push": {
                            "particles_nb": 4
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }

    // Initialize all effects
    setupScrollAnimations();
    setupHeaderScroll();
    setupSmoothScrolling();
    setupBackToTop();
    setupActiveNavLink();
    
    // Initialize particles after page load
    window.addEventListener('load', () => {
        initParticles();
    });

    // Add floating class to elements that should float
    const floatingElements = document.querySelectorAll('.logo, .feature-icon');
    floatingElements.forEach(el => el.classList.add('floating'));
    
    // Add glow effect to buttons and cards
    const glowElements = document.querySelectorAll('.btn, .post-card, .feature-card, .team-card');
    glowElements.forEach(el => el.classList.add('glow'));
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Screenshots slider
    const slider = document.querySelector('.screenshots-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const items = document.querySelectorAll('.screenshot-item');
    
    if (slider && prevBtn && nextBtn && items.length > 0) {
        const slideWidth = document.querySelector('.screenshot-item').offsetWidth + 24; // item width + gap
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Initially highlight the first screenshot item
        if(items.length > 0) {
            items[0].classList.add('active');
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateSliderPosition();
            }, 3000); // Change slide every 3 seconds
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Start auto sliding
        startAutoSlide();
        
        // Pause auto slide on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        prevBtn.addEventListener('click', function() {
            stopAutoSlide(); // Stop auto sliding when user interacts
            currentIndex = Math.max(0, currentIndex - 1);
            updateSliderPosition();
            startAutoSlide(); // Restart auto sliding after user interaction
        });
        
        nextBtn.addEventListener('click', function() {
            stopAutoSlide(); // Stop auto sliding when user interacts
            currentIndex = Math.min(items.length - 1, currentIndex + 1);
            updateSliderPosition();
            startAutoSlide(); // Restart auto sliding after user interaction
        });
        
        function updateSliderPosition() {
            slider.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            });
            
            // Update active state
            items.forEach((item, index) => {
                if(index === currentIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
        
        // Touch swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', e => {
            stopAutoSlide(); // Stop auto sliding when user interacts
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide(); // Restart auto sliding after user interaction
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if(touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                if(currentIndex < items.length - 1) {
                    currentIndex++;
                    updateSliderPosition();
                }
            } else if(touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                if(currentIndex > 0) {
                    currentIndex--;
                    updateSliderPosition();
                }
            }
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-element');
    
    const fadeInOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Apply parallax to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollY * 0.1}px`;
        }
        
        // Apply parallax to features section
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            const featuresTop = featuresSection.offsetTop;
            const featuresBg = featuresSection.querySelector('.features::before');
            if (featuresBg) {
                featuresBg.style.transform = `translateY(${(scrollY - featuresTop) * 0.05}px)`;
            }
        }
    });
    
    // Add floating animations to phone mockups with delay
    const phoneMockups = document.querySelectorAll('.phone-mockup');
    phoneMockups.forEach((mockup, index) => {
        setTimeout(() => {
            mockup.classList.add('floating');
        }, index * 300); // Staggered animation
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-btn, .app-store-btn');
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
    });
    
    // Add interactive hover effect to screenshots
    const phoneScreenshots = document.querySelectorAll('.screenshot-item .phone-mockup');
    phoneScreenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        screenshot.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    // Add tilt effect to phone mockups
    const mockups = document.querySelectorAll('.phone-mockup');
    
    mockups.forEach(mockup => {
        mockup.addEventListener('mousemove', function(e) {
            const mockupRect = this.getBoundingClientRect();
            const mouseX = e.clientX - mockupRect.left;
            const mouseY = e.clientY - mockupRect.top;
            
            const centerX = mockupRect.width / 2;
            const centerY = mockupRect.height / 2;
            
            const tiltX = (mouseY - centerY) / 20;
            const tiltY = (centerX - mouseX) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        });
        
        mockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}); 
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize the first item as open
    const firstItem = faqItems[0];
    if (firstItem) {
        firstItem.setAttribute('data-expanded', 'true');
        const firstAnswer = firstItem.querySelector('.answer-wrapper');
        if (firstAnswer) {
            firstAnswer.classList.add('open');
        }
    }
    
    // Add click event listeners to all FAQ buttons
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const answerWrapper = item.querySelector('.answer-wrapper');
        
        if (button && answerWrapper) {
            button.addEventListener('click', function() {
                const isExpanded = item.getAttribute('data-expanded') === 'true';
                
                if (isExpanded) {
                    // Close the item
                    item.setAttribute('data-expanded', 'false');
                    button.setAttribute('aria-expanded', 'false');
                    answerWrapper.classList.remove('open');
                } else {
                    // Open the item
                    item.setAttribute('data-expanded', 'true');
                    button.setAttribute('aria-expanded', 'true');
                    answerWrapper.classList.add('open');
                }
            });
        }
    });
    
    // Add keyboard navigation support
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        
        if (button) {
            button.addEventListener('keydown', function(e) {
                // Handle Enter and Space keys
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
                
                // Handle Arrow key navigation
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    
                    const currentIndex = Array.from(faqItems).indexOf(item);
                    let nextIndex;
                    
                    if (e.key === 'ArrowDown') {
                        nextIndex = currentIndex + 1;
                        if (nextIndex >= faqItems.length) {
                            nextIndex = 0; // Loop to first item
                        }
                    } else {
                        nextIndex = currentIndex - 1;
                        if (nextIndex < 0) {
                            nextIndex = faqItems.length - 1; // Loop to last item
                        }
                    }
                    
                    const nextButton = faqItems[nextIndex].querySelector('.faq-button');
                    if (nextButton) {
                        nextButton.focus();
                    }
                }
            });
        }
    });
    
    // Add contact button functionality
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            // You can customize this action
            alert('Contact support functionality would be implemented here!');
            // Example: window.location.href = 'mailto:support@example.com';
            // Example: window.open('https://support.example.com', '_blank');
        });
    }
    
    // Add smooth scrolling for better UX
    function smoothScrollToElement(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
    
    // Optional: Auto-scroll to opened FAQ item on mobile
    if (window.innerWidth <= 768) {
        faqItems.forEach(item => {
            const button = item.querySelector('.faq-button');
            
            if (button) {
                button.addEventListener('click', function() {
                    setTimeout(() => {
                        const isExpanded = item.getAttribute('data-expanded') === 'true';
                        if (isExpanded) {
                            smoothScrollToElement(item);
                        }
                    }, 300); // Wait for animation to start
                });
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const slidesContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dots = document.querySelectorAll('.dot');
    
    // Slider state
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    // Initialize slider
    function initSlider() {
        updateSlider();
        updateDots();
        updateButtons();
        startAutoPlay();
    }
    
    // Update slider position
    function updateSlider() {
        const translateX = -currentSlide * (100 / totalSlides);
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Update dots indicator
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Update navigation buttons
    function updateButtons() {
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlides - 1;
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateSlider();
            updateDots();
            updateButtons();
        }
    }
    
    // Go to next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to first slide
        }
        updateSlider();
        updateDots();
        updateButtons();
    }
    
    // Go to previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1; // Loop to last slide
        }
        updateSlider();
        updateDots();
        updateButtons();
    }
    
    // Start auto-play
    function startAutoPlay() {
        if (isAutoPlaying) {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000); // Change slide every 4 seconds
        }
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Restart auto-play after user interaction
    function restartAutoPlay() {
        stopAutoPlay();
        setTimeout(() => {
            startAutoPlay();
        }, 5000); // Restart after 5 seconds of inactivity
    }
    
    // Event listeners for navigation buttons
    nextButton.addEventListener('click', function() {
        nextSlide();
        restartAutoPlay();
    });
    
    prevButton.addEventListener('click', function() {
        prevSlide();
        restartAutoPlay();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            restartAutoPlay();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            restartAutoPlay();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            restartAutoPlay();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    slidesContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
        stopAutoPlay();
    }, { passive: true });
    
    slidesContainer.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slidesContainer.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        isSwiping = false;
        
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
        
        restartAutoPlay();
    }, { passive: true });
    
    // Pause auto-play when user hovers over the slider
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('mouseenter', function() {
        stopAutoPlay();
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        startAutoPlay();
    });
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Intersection Observer for performance (pause when not visible)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(document.querySelector('.sponsors-section'));
    }
    
    // Add smooth scroll behavior for better UX
    function smoothScrollToSlider() {
        document.querySelector('.sponsors-section').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // Initialize the slider
    initSlider();
    
    // Add loading animation
    setTimeout(() => {
        document.querySelector('.sponsors-section').classList.add('loaded');
    }, 100);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider();
        }, 250);
    });
    
    // Add focus management for accessibility
    slides.forEach((slide, index) => {
        const sponsorCards = slide.querySelectorAll('.sponsor-card');
        sponsorCards.forEach(card => {
            card.setAttribute('tabindex', index === currentSlide ? '0' : '-1');
        });
    });
    
    // Update focus when slide changes
    function updateFocus() {
        slides.forEach((slide, index) => {
            const sponsorCards = slide.querySelectorAll('.sponsor-card');
            sponsorCards.forEach(card => {
                card.setAttribute('tabindex', index === currentSlide ? '0' : '-1');
            });
        });
    }
    
    // Override updateSlider to include focus management
    const originalUpdateSlider = updateSlider;
    updateSlider = function() {
        originalUpdateSlider();
        updateFocus();
    };
});
/**
 * BPLC Website JavaScript
 * Handles FAQ functionality, form submissions, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // FAQ FUNCTIONALITY
    // ====================================
    
    initializeFAQ();
    
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Add click event listeners to all FAQ buttons
        faqItems.forEach(item => {
            const button = item.querySelector('.faq-button');
            const answer = item.querySelector('.faq-answer');
            
            if (button && answer) {
                button.addEventListener('click', function() {
                    toggleFAQItem(item, button, answer);
                });
                
                // Add keyboard navigation support
                button.addEventListener('keydown', function(e) {
                    handleFAQKeyboard(e, item, faqItems);
                });
            }
        });
    }
    
    function toggleFAQItem(item, button, answer) {
        const isExpanded = item.getAttribute('data-expanded') === 'true';
        
        if (isExpanded) {
            // Close the item
            item.setAttribute('data-expanded', 'false');
            button.setAttribute('aria-expanded', 'false');
        } else {
            // Close all other items first (accordion behavior)
            closeAllFAQItems();
            
            // Open the clicked item
            item.setAttribute('data-expanded', 'true');
            button.setAttribute('aria-expanded', 'true');
            
            // Smooth scroll to item on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        }
    }
    
    function closeAllFAQItems() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const button = item.querySelector('.faq-button');
            item.setAttribute('data-expanded', 'false');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    function handleFAQKeyboard(e, currentItem, allItems) {
        // Handle Enter and Space keys
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const button = currentItem.querySelector('.faq-button');
            if (button) button.click();
        }
        
        // Handle Arrow key navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const currentIndex = Array.from(allItems).indexOf(currentItem);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex + 1;
                if (nextIndex >= allItems.length) {
                    nextIndex = 0; // Loop to first item
                }
            } else {
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) {
                    nextIndex = allItems.length - 1; // Loop to last item
                }
            }
            
            const nextButton = allItems[nextIndex].querySelector('.faq-button');
            if (nextButton) {
                nextButton.focus();
            }
        }
    }
    
    // ====================================
    // FORM HANDLING
    // ====================================
    
    initializeForms();
    
    function initializeForms() {
        // Email subscription form
        const emailForm = document.querySelector('.email-form');
        if (emailForm) {
            emailForm.addEventListener('submit', handleEmailSubmission);
        }
        
        // Contact support button
        const contactButton = document.querySelector('.contact-button');
        if (contactButton) {
            contactButton.addEventListener('click', handleContactSupport);
        }
    }
    
    function handleEmailSubmission(e) {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('.email-input');
        const submitBtn = e.target.querySelector('.submit-btn');
        
        if (!emailInput || !emailInput.value.trim()) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        console.log('Email subscription:', emailInput.value);
    }
    
    function handleContactSupport() {
        // You can customize this action
        showNotification('Redirecting to support...', 'info');
        
        // Example implementations:
        // window.location.href = 'mailto:support@bplc.com';
        // window.open('https://support.bplc.com', '_blank');
        
        console.log('Contact support clicked');
    }
    
    // ====================================
    // PARTNER CARDS INTERACTION
    // ====================================
    
    initializePartnerCards();
    
    function initializePartnerCards() {
        const partnerCards = document.querySelectorAll('.partner-card');
        
        partnerCards.forEach(card => {
            // card.addEventListener('click', function() {
            //     const logo = this.querySelector('.partner-logo, .view-more-text, .nasa-text');
            //     if (logo) {
            //         const partnerName = logo.textContent.trim();
            //         console.log('Partner clicked:', partnerName);
                    
            //         // Show notification for demo
            //         if (partnerName === 'View more') {
            //             showNotification('Loading more partners...', 'info');
            //         } else {
            //             showNotification(`Learn more about ${partnerName}`, 'info');
            //         }
            //     }
            // });
            
            // Add hover sound effect or animation
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // ====================================
    // NAVIGATION FUNCTIONALITY
    // ====================================
    
    initializeNavigation();
    
    function initializeNavigation() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                this.classList.toggle('active');
            });
        }
        
        // Smooth scrolling for navigation links
        const navLinksElements = document.querySelectorAll('.nav-links a, .connect-link');
        navLinksElements.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links (starting with #)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // ====================================
    // COUNTDOWN TIMER (Optional Enhancement)
    // ====================================
    
    initializeCountdown();
    
    function initializeCountdown() {
        // Set target date (example: 6 months from now)
        const targetDate = new Date(2025, 7, 9, 10, 0, 0);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement && hoursElement && minutesElement && secondsElement) {
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance < 0) {
                // Countdown finished
                daysElement.textContent = '0';
                hoursElement.textContent = '0';
                minutesElement.textContent = '0';
                secondsElement.textContent = '0';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // ====================================
    // UTILITY FUNCTIONS
    // ====================================
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '1.4rem',
            fontWeight: '600',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(-2rem)',
            transition: 'all 0.3s ease'
        });
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-2rem)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // ====================================
    // PERFORMANCE OPTIMIZATIONS
    // ====================================
    
    // Lazy loading for images (if needed)
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Throttle function for scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Handle window resize events
    const handleResize = throttle(() => {
        // Re-initialize components that need resize handling
        console.log('Window resized');
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    console.log('BPLC Website initialized successfully');
});
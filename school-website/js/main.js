// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// CTA Button - Scroll to contact section
const ctaButtons = document.querySelectorAll('.cta-btn');
ctaButtons.forEach(button => {
    if (button.textContent.includes('Learn More')) {
        button.addEventListener('click', () => {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    } else if (button.textContent.includes('Apply Now')) {
        button.addEventListener('click', () => {
            window.location.href = 'admissions.html';
        });
    }
});

// Form Submission Handler
const admissionForm = document.getElementById('admissionForm');
const contactForm = document.getElementById('contactForm');

if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(admissionForm, 'admission');
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(contactForm, 'contact');
    });
}

function handleFormSubmit(form, type) {
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateForm(data)) {
        return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate server request
    setTimeout(() => {
        // Show success message
        showNotification(`${type === 'admission' ? 'Application' : 'Message'} submitted successfully!`, 'success');

        // Reset form
        form.reset();

        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Log the data (in real app, send to server)
        console.log(`${type} Form Data:`, data);
    }, 1500);
}

function validateForm(data) {
    // Basic validation
    for (let [key, value] of Object.entries(data)) {
        if (key !== 'message' && key !== 'subscribe' && !value) {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    return true;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active link highlighting on scroll
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Highlight current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll(`nav a[href*="${currentPage}"]`).forEach(link => {
        link.classList.add('active');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to cards and elements
document.querySelectorAll('.feature-card, .news-card, .value-card, .program-card, .team-member, .method-box, .requirement-box, .contact-info-box, .dept-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopBtn.addEventListener('hover', () => {
    scrollTopBtn.style.backgroundColor = '#2980b9';
    scrollTopBtn.style.transform = 'scale(1.1)';
});

// Smooth fade in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// FAQ toggle functionality (if needed in future)
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const title = item.querySelector('h3');
        const content = item.querySelector('p');

        if (title) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', () => {
                const isOpen = content.style.maxHeight;
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('p');
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.overflow = 'hidden';
                    content.style.transition = 'max-height 0.3s ease';
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initFAQ);

console.log('School Website Loaded Successfully!');

// ===========================
// NAVIGATION & MOBILE MENU
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===========================
// LOGIN/SIGNUP MODAL
// ===========================

const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');

if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// ===========================
// CALCULATOR FUNCTIONS
// ===========================

function calculateProfit() {
    const volume = parseFloat(document.querySelector('#profitCalc input[type="number"]').value);
    const entryPrice = parseFloat(document.querySelectorAll('#profitCalc input[type="number"]')[1].value);
    const exitPrice = parseFloat(document.querySelectorAll('#profitCalc input[type="number"]')[2].value);

    const pips = (exitPrice - entryPrice) * 10000;
    const profit = pips * volume * 10;

    const resultBox = document.getElementById('profitResult');
    document.getElementById('profitValue').textContent = '$' + profit.toFixed(2);
    document.getElementById('pipsValue').textContent = pips.toFixed(0);
    resultBox.style.display = 'block';
}

function calculatePip() {
    const lotSize = parseFloat(document.querySelector('#pipCalc input[type="number"]').value);
    const pipValue = lotSize * 10;

    const resultBox = document.getElementById('pipResult');
    document.getElementById('pipValueResult').textContent = '$' + pipValue.toFixed(2);
    resultBox.style.display = 'block';
}

function calculateRisk() {
    const balance = parseFloat(document.querySelector('#riskCalc input[type="number"]').value);
    const riskPercent = parseFloat(document.querySelectorAll('#riskCalc input[type="number"]')[1].value);
    const entryPrice = parseFloat(document.querySelectorAll('#riskCalc input[type="number"]')[2].value);
    const stopLoss = parseFloat(document.querySelectorAll('#riskCalc input[type="number"]')[3].value);

    const riskAmount = (balance * riskPercent) / 100;
    const pips = Math.abs((entryPrice - stopLoss) * 10000);
    const positionSize = riskAmount / (pips * 10);

    const resultBox = document.getElementById('riskResult');
    document.getElementById('riskAmount').textContent = '$' + riskAmount.toFixed(2);
    document.getElementById('positionSize').textContent = positionSize.toFixed(2) + ' lots';
    resultBox.style.display = 'block';
}

function calculateMargin() {
    const lotSize = parseFloat(document.querySelector('#marginCalc input[type="number"]').value);
    const price = parseFloat(document.querySelectorAll('#marginCalc input[type="number"]')[1].value);
    const leverage = parseInt(document.querySelectorAll('#marginCalc select')[1].value.split(':')[1]);

    const marginRequired = (lotSize * 100000 * price) / leverage;

    const resultBox = document.getElementById('marginResult');
    document.getElementById('marginValue').textContent = '$' + marginRequired.toFixed(2);
    document.getElementById('freeMargin').textContent = '$' + marginRequired.toFixed(2);
    resultBox.style.display = 'block';
}

// ===========================
// FORM HANDLING
// ===========================

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateForm(data)) {
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateForm(data) {
    for (let [key, value] of Object.entries(data)) {
        if (key !== 'message' && value === '') {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }
    }
    return true;
}

const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterForm2 = document.getElementById('newsletterForm2');
const loginForm = document.getElementById('loginForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(contactForm);
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Subscribed successfully to our newsletter!', 'success');
        newsletterForm.reset();
    });
}

if (newsletterForm2) {
    newsletterForm2.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Subscribed successfully to our newsletter!', 'success');
        newsletterForm2.reset();
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Login attempt submitted. In a real app, this would authenticate.', 'success');
        setTimeout(() => {
            loginModal.style.display = 'none';
        }, 1500);
    });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const bgColor = {
        success: '#51cf66',
        error: '#ff6b6b',
        info: '#00d4ff'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${bgColor[type] || bgColor.info};
        color: white;
        border-radius: 6px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===========================
// ANIMATIONS
// ===========================

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

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// SMOOTH SCROLL
// ===========================

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

// ===========================
// ACTIVE PAGE HIGHLIGHT
// ===========================

window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===========================
// LIVE PRICE UPDATES (SIMULATED)
// ===========================

function updatePrices() {
    const pairs = {
        'eurusd': { min: 1.0800, max: 1.0900 },
        'gbpusd': { min: 1.2700, max: 1.2800 },
        'usdjpy': { min: 148.00, max: 149.00 },
        'audusd': { min: 0.6500, max: 0.6600 },
        'nzdusd': { min: 0.5950, max: 0.6050 },
        'usdcad': { min: 1.3500, max: 1.3700 }
    };

    Object.entries(pairs).forEach(([pair, range]) => {
        const priceElement = document.getElementById(`${pair}-price`);
        const changeElement = document.getElementById(`${pair}-change`);

        if (priceElement && changeElement) {
            const newPrice = (Math.random() * (range.max - range.min) + range.min).toFixed(4);
            const oldPrice = parseFloat(priceElement.textContent);
            const change = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);

            priceElement.textContent = newPrice;

            const changeClass = change >= 0 ? 'positive' : 'negative';
            const sign = change >= 0 ? '+' : '';
            changeElement.textContent = `${sign}${change}%`;
            changeElement.className = `pair-change ${changeClass}`;
        }
    });
}

// Update prices every 5 seconds
if (document.querySelector('.market-overview')) {
    setInterval(updatePrices, 5000);
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #00d4ff, #00b4d8);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
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

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to cards
document.querySelectorAll('.rate-card, .feature-card, .account-card, .strategy-card, .course-card, .tool-card, .webinar-card, .contact-box, .dept-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// FILTER FUNCTIONALITY
// ===========================

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('table tbody tr').forEach(row => {
            if (filter === 'all' || row.classList.contains(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// ===========================
// TRADE BUTTONS
// ===========================

document.querySelectorAll('.trade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const pair = btn.closest('tr').querySelector('td').textContent;
        showNotification(`Opening trade for ${pair}...`, 'info');
    });
});

// ===========================
// ACTION BUTTONS
// ===========================

document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        showNotification(`${action} feature coming soon!`, 'info');
    });
});

// ===========================
// CTA BUTTONS
// ===========================

document.querySelectorAll('.cta-btn, .btn-primary, .btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Start Trading') || btn.textContent.includes('Demo Account') ||
        btn.textContent.includes('Apply Now') || btn.textContent.includes('Open Account') ||
        btn.textContent.includes('Trade')) {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('Demo')) {
                showNotification('Demo account creation started...', 'success');
            } else {
                loginModal.style.display = 'block';
            }
        });
    }
});

// ===========================
// FADING ELEMENTS ON LOAD
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// FAQ TOGGLE
// ===========================

document.querySelectorAll('.faq-item').forEach(item => {
    const title = item.querySelector('h3');
    if (title) {
        title.style.cursor = 'pointer';
        const content = item.querySelector('p');
        
        title.addEventListener('click', () => {
            const isOpen = content.style.display === 'none';
            
            document.querySelectorAll('.faq-item p').forEach(p => {
                p.style.display = 'none';
            });
            
            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    }
});

console.log('ForexPro Website Loaded Successfully! 💱');

// ============================================
// CASE FORM HANDLING
// ============================================

const caseForm = document.getElementById('caseForm');
// currently connected wallet address (if any)
let connectedWalletAddress = '';

if (caseForm) {
    caseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        // gather cryptocurrency selection (support multiple)
        const cryptoEl = document.getElementById('cryptocurrency');
        let cryptocurrencyValue = '';
        if (cryptoEl) {
            if (cryptoEl.multiple) {
                cryptocurrencyValue = Array.from(cryptoEl.selectedOptions).map(o => o.value).join(', ');
            } else {
                cryptocurrencyValue = cryptoEl.value;
            }
        }

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            country: document.getElementById('country').value,
            companyName: document.getElementById('companyName').value,
            scamType: document.getElementById('scamType').value,
            amountLost: document.getElementById('amountLost').value,
            cryptocurrency: cryptocurrencyValue,
            dateOfScam: document.getElementById('dateOfScam').value,
            scamDescription: document.getElementById('scamDescription').value,
            walletAddress: document.getElementById('walletAddress').value,
            lawEnforcement: document.querySelector('input[name="lawEnforcement"]:checked').value,
            reportDetails: document.getElementById('reportDetails').value,
            timestamp: new Date().toISOString()
        };
        // Include explicit connected wallet address if available
        formData.connectedWallet = connectedWalletAddress || document.getElementById('walletAddress').value || '';
        
        // Generate case number
        const caseNumber = 'CR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        formData.caseNumber = caseNumber;
        
        // Save to localStorage (in a real app, this would go to a backend)
        const cases = JSON.parse(localStorage.getItem('cryptoCases')) || [];
        cases.push(formData);
        localStorage.setItem('cryptoCases', JSON.stringify(cases));
        // Update company datalist so new companies appear
        if (typeof populateCompanyDatalist === 'function') populateCompanyDatalist();
        // Update scammer table (dynamic list)
        if (typeof renderScammerTable === 'function') renderScammerTable();

        // Also open an email draft to the support inbox so backend (email) receives the complaint
        try {
            const emailSubject = `New Complaint Received - ${caseNumber}`;
            const emailBody = `Case Number: ${caseNumber}\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.companyName}\nAmount Lost: $${formData.amountLost}\nDate: ${formData.dateOfScam}\n\nDescription:\n${formData.scamDescription}`;
            const mailto = `mailto:support@cyberintelligencedesk.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            window.open(mailto);
        } catch (err) {
            console.warn('Could not open email client automatically.', err);
        }
        
        // Show success message
        caseForm.style.display = 'none';
        const successMessage = document.getElementById('successMessage');
        document.getElementById('caseNumber').textContent = caseNumber;
        successMessage.style.display = 'block';
        
        // Log to console for verification
        console.log('Case submitted:', formData);
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contactData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Show success message
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
        
        console.log('Contact message received:', contactData);
    });
}

// ============================================
// DASHBOARD CALCULATIONS
// ============================================

function updateDashboardStats() {
    // Get all cases from localStorage
    const cases = JSON.parse(localStorage.getItem('cryptoCases')) || [];
    
    if (cases.length > 0) {
        // Calculate total loss from all cases
        const totalLoss = cases.reduce((sum, caseData) => {
            return sum + parseFloat(caseData.amountLost || 0);
        }, 0);
        
        // Simulate recovery rate and recovered amount
        const recoveryRate = 0.586; // 58.6%
        const totalRecovered = totalLoss * recoveryRate;
        
        // Update dashboard if elements exist
        const totalRecoveredElement = document.getElementById('totalRecovered');
        const totalLostElement = document.getElementById('totalLost');
        const recoveryRateElement = document.getElementById('recoveryRate');
        const casesResolvedElement = document.getElementById('casesResolved');
        
        if (totalRecoveredElement) {
            // Add to base amount shown on page
            const baseTotalRecovered = 50240500;
            const newTotal = baseTotalRecovered + totalRecovered;
            totalRecoveredElement.textContent = '$' + formatNumber(newTotal);
        }
        
        if (totalLostElement) {
            const baseTotalLost = 85600300;
            const newTotal = baseTotalLost + totalLoss;
            totalLostElement.textContent = '$' + formatNumber(newTotal);
        }
        
        if (casesResolvedElement) {
            const baseResolved = 1247;
            casesResolvedElement.textContent = (baseResolved + cases.length);
        }
        
        if (recoveryRateElement) {
            const rate = ((baseTotalRecovered + totalRecovered) / (baseTotalLost + totalLoss) * 100).toFixed(1);
            recoveryRateElement.textContent = rate + '%';
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize dashboard on page load
if (document.body.contains(document.getElementById('totalRecovered'))) {
    updateDashboardStats();
}

// Populate company datalist with unique company names from stored cases
function populateCompanyDatalist() {
    const list = document.getElementById('companiesList');
    if (!list) return;
    const cases = JSON.parse(localStorage.getItem('cryptoCases')) || [];
    const names = Array.from(new Set(cases.map(c => (c.companyName || '').trim()).filter(Boolean)));
    // Clear existing options
    list.innerHTML = '';
    // Add default examples first
    const defaults = ['BitVault Pro','CryptoEdge Trading','FastCoin Exchange','Elite Crypto Fund','Nexus Digital Assets'];
    defaults.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        list.appendChild(opt);
    });
    // Add unique names from stored cases
    names.forEach(name => {
        if (!defaults.includes(name)) {
            const opt = document.createElement('option');
            opt.value = name;
            list.appendChild(opt);
        }
    });
}

// Call populateCompanyDatalist on load
document.addEventListener('DOMContentLoaded', populateCompanyDatalist);

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active navigation on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ============================================
// SMOOTH SCROLLING
// ============================================

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

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// ============================================
// CASE TRACKER
// ============================================

function getCaseDetails(caseNumber) {
    const cases = JSON.parse(localStorage.getItem('cryptoCases')) || [];
    return cases.find(c => c.caseNumber === caseNumber);
}

function getAllCases() {
    return JSON.parse(localStorage.getItem('cryptoCases')) || [];
}

// ============================================
// BROKER REPORTS & RENDERING
// ============================================

function sendEmailToSupport(subject, body) {
    try {
        const mailto = `mailto:support@cyberintelligencedesk.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailto);
    } catch (err) {
        console.warn('Unable to open mail client:', err);
    }
}

function renderScammerTable() {
    const tbody = document.getElementById('scammersTableBody');
    if (!tbody) return;

    const cases = JSON.parse(localStorage.getItem('cryptoCases')) || [];
    const reports = JSON.parse(localStorage.getItem('brokerReports')) || [];

    // Build a map of company => {reportsCount, totalLost}
    const map = {};

    cases.forEach(c => {
        const name = (c.companyName || 'Unknown').trim();
        if (!map[name]) map[name] = { reports: 0, totalLost: 0 };
        map[name].reports += 1;
        map[name].totalLost += parseFloat(c.amountLost || 0) || 0;
    });

    reports.forEach(r => {
        const name = (r.brokerName || 'Unknown').trim();
        if (!map[name]) map[name] = { reports: 0, totalLost: 0 };
        map[name].reports += 1; // count report-only entries
    });

    // Convert map to array and sort by reports desc
    const rows = Object.keys(map).map(name => {
        const item = map[name];
        const avg = item.reports > 0 ? (item.totalLost / item.reports) : 0;
        return { name, reports: item.reports, totalLost: item.totalLost, avg };
    }).sort((a, b) => b.reports - a.reports);

    // Render top entries (or all)
    tbody.innerHTML = '';
    rows.forEach(r => {
        const tr = document.createElement('tr');
        const totalLostText = r.totalLost ? '$' + formatNumber(Math.round(r.totalLost)) : '$0';
        const avgText = r.avg ? '$' + formatNumber(Math.round(r.avg)) : '$0';
        const status = r.reports > 50 ? 'Legal Action' : (r.reports > 10 ? 'Investigating' : 'Under Review');

        tr.innerHTML = `
            <td>${r.name}</td>
            <td>${r.reports}</td>
            <td>${totalLostText}</td>
            <td>${avgText}</td>
            <td><span class="status-badge">${status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Handle report broker form submissions
const reportBrokerForm = document.getElementById('reportBrokerForm');
if (reportBrokerForm) {
    reportBrokerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const brokerName = document.getElementById('brokerName').value.trim();
        const brokerWebsite = document.getElementById('brokerWebsite').value.trim();
        const brokerDescription = document.getElementById('brokerDescription').value.trim();
        const reporterEmail = document.getElementById('reporterEmail').value.trim();

        const report = {
            brokerName,
            brokerWebsite,
            brokerDescription,
            reporterEmail,
            timestamp: new Date().toISOString()
        };

        const reports = JSON.parse(localStorage.getItem('brokerReports')) || [];
        reports.push(report);
        localStorage.setItem('brokerReports', JSON.stringify(reports));

        // Refresh datalist and scammer table
        if (typeof populateCompanyDatalist === 'function') populateCompanyDatalist();
        if (typeof renderScammerTable === 'function') renderScammerTable();

        // Open email draft to support so backend (which processes emails) receives the report
        const subject = `Broker Report: ${brokerName}`;
        const body = `Broker: ${brokerName}\nWebsite: ${brokerWebsite}\nReporter: ${reporterEmail}\n\nDescription:\n${brokerDescription}`;
        sendEmailToSupport(subject, body);

        // Provide feedback
        alert('Thank you — your broker report was recorded and an email draft was opened to send to our team.');
        reportBrokerForm.reset();
    });
}

// Render scammer table on load
document.addEventListener('DOMContentLoaded', function () {
    if (typeof renderScammerTable === 'function') renderScammerTable();
});

// ============================================
// WALLET CONNECT (for filing complaints)
// ============================================

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts && accounts[0];
            if (address) setConnectedAddress(address);
        } catch (err) {
            console.warn('User rejected wallet connection', err);
            alert('Wallet connection was cancelled.');
        }
    } else {
        alert('No Web3 wallet detected. Please install MetaMask or another wallet extension.');
    }
}

function setConnectedAddress(address) {
    const addrEl = document.getElementById('connectedAddress');
    const disconnectBtn = document.getElementById('disconnectWalletBtn');
    const connectBtn = document.getElementById('connectWalletBtn');
    if (addrEl) addrEl.textContent = address;
    if (disconnectBtn) disconnectBtn.style.display = 'inline-block';
    if (connectBtn) connectBtn.style.display = 'none';

    // Append address to walletAddress textarea if not already present
    const wa = document.getElementById('walletAddress');
    if (wa) {
        const current = wa.value || '';
        if (!current.split(/\s|,|;|\n/).includes(address)) {
            wa.value = address + (current ? '\n' + current : '');
        }
    }
}

function disconnectWallet() {
    const addrEl = document.getElementById('connectedAddress');
    const disconnectBtn = document.getElementById('disconnectWalletBtn');
    const connectBtn = document.getElementById('connectWalletBtn');
    if (addrEl) addrEl.textContent = '';
    if (disconnectBtn) disconnectBtn.style.display = 'none';
    if (connectBtn) connectBtn.style.display = 'inline-block';
}

// Wire buttons after DOM ready
document.addEventListener('DOMContentLoaded', function () {
    const connectBtn = document.getElementById('connectWalletBtn');
    const disconnectBtn = document.getElementById('disconnectWalletBtn');
    if (connectBtn) connectBtn.addEventListener('click', connectWallet);
    if (disconnectBtn) disconnectBtn.addEventListener('click', disconnectWallet);

    // If the wallet changes accounts, update the displayed address
    if (window.ethereum && window.ethereum.on) {
        window.ethereum.on('accountsChanged', function (accounts) {
            if (accounts && accounts.length > 0) setConnectedAddress(accounts[0]);
            else disconnectWallet();
        });
    }
});

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll('.step, .feature, .stat-box, .testimonial, .faq-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// DASHBOARD CHART (Simple Visualization)
// ============================================

function drawTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Sample data for last 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const recoveredData = [2.1, 2.3, 2.5, 2.8, 3.2, 3.5, 3.8, 4.2, 4.5, 4.8, 5.0, 5.2]; // in millions
    const lossData = [3.2, 3.4, 3.8, 4.2, 4.8, 5.2, 5.8, 6.2, 6.8, 7.2, 7.5, 7.8]; // in millions
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const maxValue = Math.max(...recoveredData, ...lossData);
    const scale = chartHeight / maxValue;
    
    // Draw axes
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // Draw recovered line (blue)
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < recoveredData.length; i++) {
        const x = padding + (i / (recoveredData.length - 1)) * chartWidth;
        const y = height - padding - (recoveredData[i] * scale);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Draw loss line (red)
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < lossData.length; i++) {
        const x = padding + (i / (lossData.length - 1)) * chartWidth;
        const y = height - padding - (lossData[i] * scale);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Add legend
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(width - 180, 10, 15, 15);
    ctx.fillStyle = '#333';
    ctx.font = '14px sans-serif';
    ctx.fillText('Recovered', width - 155, 22);
    
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(width - 180, 35, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText('Total Loss', width - 155, 47);
}

// Draw chart on page load
if (document.getElementById('trendChart')) {
    drawTrendChart();
}

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================

// Initialize sample data if empty
window.addEventListener('load', function() {
    if (!localStorage.getItem('cryptoCases')) {
        localStorage.setItem('cryptoCases', JSON.stringify([]));
    }
    if (!localStorage.getItem('contactMessages')) {
        localStorage.setItem('contactMessages', JSON.stringify([]));
    }
});

// Console info for debugging
console.log('Cyber Intelligence Desk website loaded');
console.log('Cases stored:', getAllCases().length);

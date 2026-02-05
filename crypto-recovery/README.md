# Cyber Intelligence Desk Website

A comprehensive web platform for cryptocurrency fraud victims to report their losses and track recovery efforts.

## Overview

This website provides a professional interface for victims of cryptocurrency scams to file complaints and monitor the recovery process. It includes:

- **Landing Page**: Information about the recovery process and statistics
- **Dashboard**: Real-time statistics showing total recovered amounts, losses, and case statuses
- **Case Filing**: Detailed complaint form where users can report being scammed
- **About Page**: Information about the team and expertise
- **Contact Page**: Support channels and FAQ

## Features

### 1. Dashboard (`dashboard.html`)
Displays comprehensive statistics:
- **Total Recovered Amount**: Cumulative funds recovered for victims
- **Total Loss Reported**: Total amount reported as lost
- **Recovery Rate**: Percentage of losses successfully recovered
- **Cases Resolved**: Number of completed recovery cases
- **Recovery Trend Chart**: Visual representation of recovery trends over 12 months
- **Top Scam Methods**: Breakdown of common scam types
- **Case Status Distribution**: Active cases by investigation status
- **Most Reported Scammers**: Table of top fraud companies

### 2. Case Filing Form (`file-case.html`)
Comprehensive form with sections for:

#### Personal Information
- Full name
- Email address
- Phone number
- Country

#### Scam Details
- Scam company/platform name
- Type of scam (dropdown options)
- Amount lost (USD)
- Cryptocurrency type
- Date of scam

#### Detailed Description
- How the scam happened (text area)
- Evidence upload (documents, screenshots)
- Cryptocurrency wallet addresses

#### Actions Taken
- Law enforcement reporting status
- Report details (police report number, etc.)
- Terms agreement

**Features:**
- Form validation for email and phone
- Real-time field validation
- Case number generation (CR-[timestamp]-[random])
- LocalStorage data persistence
- Success message with case number
- Helpful information cards

### 3. Navigation System
All pages include:
- Sticky navigation bar with active page highlighting
- Quick links to all major sections
- Mobile-responsive design

### 4. Footer
- Copyright information
- Links to Privacy Policy, Terms of Service, FAQ

## File Structure

```
crypto-recovery/
├── index.html              # Landing/Home page
├── dashboard.html          # Statistics and analytics dashboard
├── file-case.html          # Case complaint form
├── about.html              # About the company
├── contact.html            # Contact information and support
├── css/
│   └── styles.css          # All styling
├── js/
│   └── main.js             # All JavaScript functionality
└── data/                   # Placeholder for data files
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Responsive design with Grid and Flexbox
- **Vanilla JavaScript**: Form handling, validation, data management
- **LocalStorage**: Client-side data persistence

## Key Functionality

### Form Submission
When users submit the case form:
1. Data is collected from all form fields
2. A unique case number is generated
3. Data is stored in browser's LocalStorage
4. Success message is displayed with case number
5. Data persists across browser sessions

### Data Storage
- Cases are stored in `cryptoCases` key in LocalStorage
- Contact messages stored in `contactMessages` key
- Each entry includes timestamp for tracking

### Dashboard Updates
- Dashboard statistics update based on stored cases
- Calculations:
  - Total loss from all reported cases
  - Recovery rate applied to calculate recovered amount
  - Case count updated based on stored data

### Form Validation
- Email format validation
- Phone number format validation
- Required field validation
- Real-time field validation feedback

## Styling Features

- **Color Scheme**:
  - Primary Blue: #0066cc
  - Secondary Orange: #f39c12
  - Success Green: #27ae60
  - Danger Red: #e74c3c

- **Responsive Design**:
  - Desktop-first approach
  - Mobile breakpoints at 768px and 480px
  - Flexible grid layouts

- **Interactive Elements**:
  - Smooth hover effects
  - Animated transitions
  - Scroll animations (fade-in-up)
  - Progress bars with smooth transitions

## Data Structure

### Case Object
```javascript
{
    fullName: string,
    email: string,
    phone: string,
    country: string,
    companyName: string,
    scamType: string,
    amountLost: number,
    cryptocurrency: string,
    dateOfScam: string (YYYY-MM-DD),
    scamDescription: string,
    walletAddress: string,
    lawEnforcement: string (yes/no),
    reportDetails: string,
    caseNumber: string (CR-[timestamp]-[random]),
    timestamp: string (ISO format)
}
```

### Contact Message Object
```javascript
{
    name: string,
    email: string,
    subject: string,
    message: string,
    timestamp: string (ISO format)
}
```

## How to Use

1. **Landing Page**: Users first visit the home page to understand the service
2. **File a Case**: Users click "File Your Case" to submit their complaint
3. **Dashboard**: Users can track statistics and case statuses
4. **Contact**: Users can reach out with questions

## Browser Storage

All data is stored in the browser's LocalStorage. To view stored data:

```javascript
// View all stored cases
JSON.parse(localStorage.getItem('cryptoCases'))

// View all contact messages
JSON.parse(localStorage.getItem('contactMessages'))

// Clear all data
localStorage.clear()
```

## Future Enhancements

- Backend integration for data persistence
- User authentication and accounts
- Real-time case tracking with updates
- Document upload with file storage
- Email notifications
- Payment processing for services
- Integration with law enforcement APIs
- Blockchain transaction analysis tools

## Security Considerations

**Current (Development):**
- Data stored locally in browser only
- No backend encryption

**Production Requirements:**
- HTTPS/TLS encryption
- Database encryption
- User authentication
- Data validation and sanitization
- GDPR compliance
- Regular security audits
- Legal privilege documentation

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #f39c12;
    /* ... other colors ... */
}
```

### Form Fields
Edit form inputs in `file-case.html` to add/remove fields
Update form submission in `js/main.js` to handle new fields

### Dashboard Statistics
Edit base values in `dashboard.html` and calculation logic in `js/main.js`

## Support

For questions or issues:
- Email: support@cyberintelligencedesk.com
- Phone: +1 (800) 555-0123
- Hours: 24/7 support available

## License

All rights reserved © 2026 Cyber Intelligence Desk

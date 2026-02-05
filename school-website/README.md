# Solomon Academy School Website

A modern, fully responsive school website built with HTML5, CSS3, and Vanilla JavaScript. This project showcases a professional school website with multiple pages and interactive features.

## 📁 Project Structure

```
school-website/
├── index.html              # Home page
├── about.html              # About us page
├── academics.html          # Academic programs page
├── admissions.html         # Admissions & application page
├── contact.html            # Contact information & forms
├── css/
│   └── styles.css          # Complete stylesheet
├── js/
│   └── main.js             # JavaScript functionality
└── images/                 # Image assets folder
```

## 🎨 Features

### Pages Included
1. **Home Page** - Hero section, features, statistics, and news
2. **About Page** - School history, mission, vision, values, and leadership team
3. **Academics Page** - Program descriptions, teaching methodology, and achievements
4. **Admissions Page** - Admission process, requirements, fee structure, and application form
5. **Contact Page** - Contact information, contact form, department contacts, FAQ, and embedded map

### Interactive Features
- ✅ Mobile-responsive navigation with hamburger menu
- ✅ Smooth scrolling and page transitions
- ✅ Form validation for admission and contact forms
- ✅ Interactive form submissions with success notifications
- ✅ Scroll-to-top button
- ✅ Intersection observer animations
- ✅ Active page highlighting in navigation
- ✅ FAQ toggle functionality
- ✅ Hover effects and transitions throughout

### Design Features
- 🎯 Professional color scheme (Primary: #2c3e50, Secondary: #3498db)
- 📱 Fully responsive mobile-first design
- 🎭 Smooth animations and transitions
- 🔤 Clean, readable typography
- 📊 Grid-based layouts
- 🎨 Consistent styling across all pages

## 🚀 Quick Start

### Running Locally

1. **Navigate to the project folder:**
   ```bash
   cd school-website
   ```

2. **Open with a simple HTTP server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if http-server is installed)
   http-server
   
   # Using Live Server VSCode extension
   # Install "Live Server" extension and click "Go Live"
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:8000`
   - Or simply open `index.html` in your browser

## 📋 Customization Guide

### Changing School Information

**Logo/School Name:**
- Edit the `.logo` class in `css/styles.css` or change the text in the navbar across all HTML files

**Contact Information:**
- Update contact details in footer and contact page
- Replace placeholder email and phone numbers

**Colors:**
Edit the CSS variables in `css/styles.css` (lines 8-18):
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... other colors ... */
}
```

**Content Updates:**
- Edit text content directly in HTML files
- Update sections, descriptions, and information

### Adding Images

1. Create images in the `images/` folder
2. Update references in HTML files:
   ```html
   <img src="images/your-image.jpg" alt="Description">
   ```

### Form Submission

Currently, the forms show a success message in the browser. To integrate with a backend:

1. Update the form submission handler in `js/main.js` (around line 40)
2. Send data to your server endpoint using fetch or AJAX
3. Handle the server response accordingly

Example with fetch:
```javascript
fetch('/api/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

## 🎓 Features in Detail

### Responsive Design
- Mobile: Stacked single column layout
- Tablet: Flexible 2-column layouts
- Desktop: Full multi-column grids
- Hamburger menu on mobile devices

### JavaScript Functionality
- Dynamic form handling with validation
- Mobile navigation toggle
- Smooth scroll animations
- Notification system
- Intersection Observer for animations
- Active navigation highlighting
- Scroll-to-top button

### Accessibility Considerations
- Semantic HTML structure
- Proper heading hierarchy
- Form labels and validation
- Readable color contrasts
- Keyboard navigation support

## 📱 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- IE 11+ (with graceful degradation)

## 🔧 Customization Tips

1. **Colors:** Modify CSS variables in `:root`
2. **Fonts:** Add Google Fonts link to HTML head
3. **Images:** Replace emoji icons with actual image assets
4. **Content:** Update all section content to match your school
5. **Layout:** Modify grid/flex properties for different layouts

## 📝 Form Configuration

To handle form submissions, you can:

1. **Google Forms Integration:**
   - Create a Google Form and embed it
   - Use form submission to Google Sheets

2. **Backend Integration:**
   - Send data to your server
   - Process and store in database

3. **Third-party Services:**
   - Formspree
   - Basin
   - Getform

## 🎯 Future Enhancements

Potential features to add:
- Student login portal
- Parent dashboard
- Online fee payment
- Attendance tracking
- Noticeboard/announcements
- Events calendar
- Virtual tours
- Blog/News section
- Multi-language support
- Testimonials/Reviews

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Support

For questions or improvements, feel free to modify and extend the code as needed.

---

**Created:** January 2026  
**Last Updated:** January 28, 2026  
**Version:** 1.0

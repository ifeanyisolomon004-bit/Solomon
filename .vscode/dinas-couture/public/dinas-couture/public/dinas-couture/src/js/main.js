// This file contains the main JavaScript functionality for the website, handling user interactions and dynamic content updates. 

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dinas Couture website is ready!');

    // Example: Add event listeners for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = link.getAttribute('href');
            loadPage(targetPage);
        });
    });

    // Function to load pages dynamically
    function loadPage(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                document.querySelector('#content').innerHTML = html;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
});
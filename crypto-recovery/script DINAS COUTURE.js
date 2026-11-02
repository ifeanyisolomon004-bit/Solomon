// Dinas Couture - behaviour

// 1. Set this to your real email address. Booking requests open in the
//    visitor's email app, addressed to you.
var BOOKING_EMAIL = 'YOUR-EMAIL@example.com';

// 2. Mobile menu
var toggle = document.querySelector('.nav-toggle');
var nav = document.getElementById('site-nav');

toggle.addEventListener('click', function () {
  var open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// 3. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 4. Booking form
var form = document.getElementById('booking-form');
var statusEl = document.getElementById('form-status');

function setError(input, message) {
  var errorEl = document.getElementById(input.id + '-error');
  errorEl.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  statusEl.textContent = '';

  var name = form.elements.name;
  var email = form.elements.email;
  var valid = true;

  if (!name.value.trim()) {
    setError(name, 'Please enter your name.');
    valid = false;
  } else {
    setError(name, '');
  }

  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!emailOk) {
    setError(email, 'Please enter a valid email address.');
    valid = false;
  } else {
    setError(email, '');
  }

  if (!valid) return;

  var subject = 'Fitting request: ' + form.elements.interest.value;
  var body =
    'Name: ' + name.value.trim() + '\n' +
    'Email: ' + email.value.trim() + '\n' +
    'Interested in: ' + form.elements.interest.value + '\n\n' +
    form.elements.message.value.trim();

  window.location.href =
    'mailto:' + BOOKING_EMAIL +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  statusEl.textContent = 'Thank you, ' + name.value.trim() + '. Your email app should open so you can send the request.';
  form.reset();
});

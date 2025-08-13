const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('contactMsg').textContent = 'Thank you for contacting us! We will get back to you soon.';
        contactForm.reset();
    });
}

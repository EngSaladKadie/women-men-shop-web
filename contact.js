document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to your server
            console.log('Contact form submitted:', { name, email, subject, message });
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = '0 20px';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '20px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
            
            // Close other open answers
            faqQuestions.forEach(q => {
                if (q !== question) {
                    const otherAnswer = q.nextElementSibling;
                    const otherIcon = q.querySelector('i');
                    otherAnswer.style.maxHeight = null;
                    otherAnswer.style.padding = '0 20px';
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
        });
    });
    
    // Initialize map interaction
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            // You could add additional map interaction code here
            console.log('Map loaded');
        });
    }
});
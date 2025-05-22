document.addEventListener('DOMContentLoaded', function() {
    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.social-links').style.opacity = '1';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('.social-links').style.opacity = '0';
        });
    });

    // Animate values cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    
    function checkScroll() {
        valueCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Set initial state
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on load in case cards are already visible
});
// Reveal sections on scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);

// Initial call to reveal elements already in view
document.addEventListener('DOMContentLoaded', reveal);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        header.style.padding = '1.5rem 0';
        header.style.boxShadow = 'none';
    }
});

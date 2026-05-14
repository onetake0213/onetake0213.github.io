// ============================================
// HEADER: Transparent → Solid on scroll
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// REVEAL on scroll (Intersection Observer)
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger children within the same parent
            entry.target.style.transitionDelay = `${index * 0.05}s`;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => observer.observe(el));

// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillFills = document.querySelectorAll('.skill-bar-fill');
const skillWidths = [];

skillFills.forEach(fill => {
    const targetWidth = fill.style.width;
    skillWidths.push(targetWidth);
    fill.style.width = '0%';
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill');
            fills.forEach((fill, i) => {
                setTimeout(() => {
                    fill.style.width = skillWidths[
                        Array.from(skillFills).indexOf(fill)
                    ];
                }, i * 150);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-group').forEach(group => {
    skillObserver.observe(group);
});

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// NAV ACTIVE STATE on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#7C3AED';
        }
    });
});

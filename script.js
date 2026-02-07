document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const textElement = document.getElementById('typing-text');
    const texts = ['Web Developer', 'IT Enthusiast', 'Creative Coder'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        if (textElement) {
            textElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            setTimeout(deleteText, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    function deleteText() {
        if (index > 0) {
            letter = currentText.slice(0, --index);
            if (textElement) {
                textElement.textContent = letter;
            }
            setTimeout(deleteText, 50);
        } else {
            count++;
            setTimeout(type, 200);
        }
    }

    type();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const menuBtnIcon = document.querySelector('.menu-btn i');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtnIcon.classList.remove('fa-times');
                    menuBtnIcon.classList.add('fa-bars');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuBtnIcon = document.querySelector('.menu-btn i');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle Icon
            if (navLinks.classList.contains('active')) {
                menuBtnIcon.classList.remove('fa-bars');
                menuBtnIcon.classList.add('fa-times');
            } else {
                menuBtnIcon.classList.remove('fa-times');
                menuBtnIcon.classList.add('fa-bars');
            }
        });
    }

    // === SCROLL FOCUS EFFECT ===
    // This function calculates the distance of an element from the center of the viewport
    // and adjusts its opacity and scale to create a "highlight/focus" effect.

    const focusElements = document.querySelectorAll('.hero-content, .about-section, .project-card, .contact-container, .section-title');

    function updateFocus() {
        const viewportCenter = window.innerHeight / 2;
        const focusRange = window.innerHeight * 0.4; // 40% of viewport height is the "focus zone"

        focusElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + (rect.height / 2);

            // Calculate distance from center
            const distanceFromCenter = Math.abs(viewportCenter - elementCenter);

            // Calculate opacity based on distance
            // If distance is 0 (centered), opacity is 1. If distance is large, opacity decreases.
            let opacity = 1 - (distanceFromCenter / (focusRange * 1.5));

            // Allow minimum opacity to still be somewhat visible (0.4) so it's not totally black unless far
            if (opacity < 0.2) opacity = 0.2;
            if (opacity > 1) opacity = 1;

            // Apply styles
            element.style.opacity = opacity;
            element.style.transform = `scale(${0.95 + (opacity * 0.05)})`; // Gentle scale effect
            element.style.transition = 'opacity 0.1s ease-out, transform 0.1s ease-out';

            // Optional: Blur effect for things far away
            // const blur = (1 - opacity) * 5;
            // element.style.filter = `blur(${blur}px)`;
        });
    }

    // Run on scroll and resize
    window.addEventListener('scroll', updateFocus);
    window.addEventListener('resize', updateFocus);

    // Initial run
    updateFocus();
});

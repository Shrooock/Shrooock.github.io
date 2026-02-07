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

    // === SCROLL FADE-IN ANIMATION ===
    // Smooth fade-in and slide-up effect when sections enter viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.about-section, .projects-section, .contact-section, .project-card');
    sections.forEach(section => {
        section.classList.add('fade-in-hidden');
        observer.observe(section);
    });
});

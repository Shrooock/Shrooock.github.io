document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const textElement = document.getElementById('typing-text');
    const texts = ['Web Developer', 'IT Enthusiast', 'Creative Coder'];
    let count = 0; // Index of current word
    let index = 0; // Index of current character
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
            setTimeout(deleteText, 2000); // Wait before deleting
        } else {
            setTimeout(type, 100);
        }
    }

    function deleteText() {
        if (index > 0) {
            // Check if currentText is still valid just in case
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

    // Start the typing loop
    type();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Animations on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.about-section, .hero-content');
    // Target specific animation containers or add class to sections you want animated
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('hidden-section');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Life Story scroll animations
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const sectionNumber = parseInt(sectionId.replace('story', ''));
                
                // Update background layers
                document.querySelectorAll('.background-layer').forEach((layer, index) => {
                    layer.style.opacity = index === (sectionNumber - 1) ? '1' : '0';
                });

                // Update active class and progress dots
                document.querySelectorAll('.story-section').forEach(section => {
                    section.classList.toggle('active', section.id === sectionId);
                });
                
                document.querySelectorAll('.progress-dot').forEach(dot => {
                    dot.classList.toggle('active', dot.dataset.section === sectionId);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all story sections
    document.querySelectorAll('.story-section').forEach(section => {
        storyObserver.observe(section);
    });

    // Progress dot click handlers
    document.querySelectorAll('.progress-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = document.getElementById(dot.dataset.section);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Initialize EmailJS
    (function() {
        // Replace with your EmailJS public key
        emailjs.init("WUjW3B84TRjApCOeT");
    })();

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = 'Sending...';
        
        const templateParams = {
            from_name: this.user_name.value,
            message: this.message.value,
            reply_to: this.user_email.value
        };
        
        emailjs.send('service_t7lzcz1', 'template_uaqhesd', templateParams)
            .then(function() {
                statusDiv.textContent = 'Message sent successfully!';
                statusDiv.style.color = 'green';
                event.target.reset();
            }, function(error) {
                statusDiv.textContent = 'Failed to send message. Please try again.';
                statusDiv.style.color = 'red';
                console.error('EmailJS error:', error);
            });
    });

    // Typing effect for taglines
    const taglines = [
        "Full-Stack Developer & Systems Engineer",
        "Innovator in Web Development & Cloud Solutions",
        "Building Scalable Solutions with Modern Tech"
    ];

    function setupTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        let currentTagline = 0;

        function typeTagline() {
            let text = taglines[currentTagline];
            let charIndex = 0;
            typingText.textContent = '';

            function type() {
                if (charIndex < text.length) {
                    typingText.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, 50); // Typing speed
                } else {
                    setTimeout(eraseTagline, 2000); // Wait before erasing
                }
            }

            type();
        }

        function eraseTagline() {
            let text = typingText.textContent;
            
            function erase() {
                if (text.length > 0) {
                    text = text.slice(0, -1);
                    typingText.textContent = text;
                    setTimeout(erase, 30); // Erasing speed
                } else {
                    currentTagline = (currentTagline + 1) % taglines.length;
                    setTimeout(typeTagline, 500); // Wait before typing next
                }
            }

            erase();
        }

        typeTagline(); // Start the effect
    }

    setupTypingEffect(); // Initialize typing effect when the page loads
});

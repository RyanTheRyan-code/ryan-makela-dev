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
    const phrases = [
        "Full-Stack Developer",
        "Systems Engineer",
        "Problem Solver",
        "Tech Innovator"
    ];

    function typeText() {
        const element = document.querySelector('.typing-text');
        if (!element) return;

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next phrase
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    typeText();

    // Clean URL Navigation
    function setupNavigation() {
        const navLinks = document.querySelectorAll('nav a, .mobile-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Close mobile menu if open (for all links)
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                // If it's a different page (doesn't start with #), let it navigate normally
                if (!href.startsWith('#')) {
                    return;
                }
                
                e.preventDefault();
                const section = href.split('#')[1];
                const targetSection = document.getElementById(section);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update URL without the hash
                    const baseUrl = window.location.href.split('#')[0];
                    window.history.pushState({}, '', baseUrl);
                }
            });
        });
    }

    setupNavigation();
});

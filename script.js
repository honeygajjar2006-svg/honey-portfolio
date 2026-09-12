document.addEventListener("DOMContentLoaded", () => {
    // ================================
    // Theme Toggle
    // ================================

    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme");

            const newTheme =
                currentTheme === "light" ? "dark" : "light";

            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }


    // ================================
    // Mobile Navigation
    // ================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    // ================================
    // Active Navigation Section
    // ================================

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const updateActiveSection = () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(link => {
            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();


    // ================================
    // Navbar Scroll Effect
    // ================================

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }


    // ================================
    // Smooth Scrolling
    // ================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ================================
    // Scroll Reveal Animation
    // ================================

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-card, .timeline-item, .cert-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // ================================
    // Project Card Stagger Animation
    // ================================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });


    // ================================
    // Skill Card Stagger Animation
    // ================================

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 70}ms`;
    });


    // ================================
    // Contact Form
    // ================================

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput
                ? nameInput.value.trim()
                : "";

            const email = emailInput
                ? emailInput.value.trim()
                : "";

            const message = messageInput
                ? messageInput.value.trim()
                : "";

            if (!name || !email || !message) {
                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );
                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );
                return;
            }

            showFormMessage(
                "Thanks for reaching out! I'll get back to you soon.",
                "success"
            );

            contactForm.reset();
        });
    }


    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;

        setTimeout(() => {
            formMessage.textContent = "";
            formMessage.className = "form-message";
        }, 5000);
    }


    // ================================
    // Current Year
    // ================================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ================================
    // Back To Top
    // ================================

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ================================
    // Resume Download
    // ================================

    const resumeButtons = document.querySelectorAll(
        'a[href$="resume.pdf"]'
    );

    resumeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 500);
        });
    });


    // ================================
    // External Links
    // ================================

    document
        .querySelectorAll('a[target="_blank"]')
        .forEach(link => {
            link.setAttribute("rel", "noopener noreferrer");
        });


    // ================================
    // Prevent Broken Image Layout
    // ================================

    document
        .querySelectorAll("img")
        .forEach(image => {
            image.addEventListener("error", () => {
                image.style.display = "none";
            });
        });


    // ================================
    // Console Message
    // ================================

    console.log(
        "%cHoney Gajjar Portfolio",
        "font-size: 18px; font-weight: bold;"
    );

    console.log(
        "Computer Engineering Student | Aspiring Data Scientist"
    );
});
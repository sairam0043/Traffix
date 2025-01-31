document.addEventListener("DOMContentLoaded", () => {
    // 🌟 Handle Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("toggle");
    });

    // 🌟 Close menu when clicking a link (for mobile)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("toggle");
        });
    });

    // 🌟 Smooth Scroll Effect
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            // Check if the link starts with "#" (for smooth scroll), otherwise allow normal navigation
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    

    // 🌟 Scroll Animation for Elements
    const fadeInElements = document.querySelectorAll(".animate-fade-in, .animate-fade-in-delay");
    
    function checkFadeIn() {
        const triggerBottom = window.innerHeight * 0.85; // Adjust trigger point

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkFadeIn);
    checkFadeIn(); // Run once on load

    // 🌟 Auto-update stats counters (Animated counting effect)
    const statCards = document.querySelectorAll(".stat-card h3");
    
    function animateNumbers() {
        statCards.forEach(stat => {
            let target = parseInt(stat.innerText.replace("+", "").replace("%", ""));
            let count = 0;
            let increment = Math.ceil(target / 50); // Speed of counting

            let interval = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }
                stat.innerText = count + (stat.innerText.includes("%") ? "%" : "+");
            }, 20);
        });
    }

    setTimeout(animateNumbers, 500); // Run after delay
});

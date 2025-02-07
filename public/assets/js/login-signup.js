document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const signupPage = document.getElementById("signup-page");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const rememberMeCheckbox = document.getElementById("remember-me");

    // 🌟 Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("toggle");
        });
    }

    // 🌟 Create Custom Notification Element
    const notification = document.createElement("div");
    notification.classList.add("custom-alert");
    notification.style.display = "none"; // Hide initially
    document.body.appendChild(notification);

    // 🌟 Function to Show Custom Notification
    function showNotification(message, type = "success") {
        notification.textContent = message;
        notification.className = `custom-alert ${type}`;
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
    }

    // 🌟 Switch to Signup Page
    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginPage.classList.add("hidden");
        signupPage.classList.remove("hidden");
    });

    // 🌟 Switch to Login Page
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupPage.classList.add("hidden");
        loginPage.classList.remove("hidden");
    });

    // 🌟 Handle "Remember Me" Functionality
    function saveLogin(email) {
        localStorage.setItem("rememberedUser", email);
    }

    function getSavedLogin() {
        return localStorage.getItem("rememberedUser");
    }

    function removeSavedLogin() {
        localStorage.removeItem("rememberedUser");
    }

    // 🌟 Autofill Saved Login if "Remember Me" was checked
    window.onload = () => {
        const savedEmail = getSavedLogin();
        if (savedEmail) {
            document.getElementById("username").value = savedEmail;
            rememberMeCheckbox.checked = true;
        }
    };

    // 🌟 Login Form Submission
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userEmail", email); // Save user email
                localStorage.setItem("userRole", data.role);
    
                showNotification("Login successful!", "success");
                setTimeout(() => {
                    window.location.href = data.role === "admin" ? "admindashboard.html" : "userdashboard.html";
                }, 500);
            } else {
                showNotification(data.error, "error");
            }
        } catch (error) {
            showNotification("Login failed. Please try again.", "error");
        }
    });
    
    // 🌟 Signup Form Submission
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const full_name = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("signup-password").value;

        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, phone, password })
        });

        const data = await response.json();

        if (response.ok) {
            showNotification("Signup successful! Redirecting to login...", "success");
            setTimeout(() => {
                signupPage.classList.add("hidden");
                loginPage.classList.remove("hidden");
            }, 1000);
        } else {
            showNotification(data.error, "error");
        }
    });

    // 🌟 Smooth Scrolling for Navigation Links
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth",
                    });
                }
            }
        });
    });
});

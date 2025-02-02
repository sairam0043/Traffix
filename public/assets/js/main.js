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

    // 🌟 Custom Notification System for Login / Signup / Report Violation
    let notification = document.createElement("div");
    notification.classList.add("custom-alert");
    notification.style.display = "none"; // Hide by default
    document.body.appendChild(notification);

    // Function to show custom notification
    function showNotification(message, type = "info") {
        notification.textContent = message;
        notification.className = `custom-alert ${type}`; // Apply success or error class
        notification.style.display = "block"; // Show the notification

        // Fade out after 1 second
        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                notification.style.display = "none";
            }, 500);
        }, 1000); // 1-second delay before fade-out
    }

    // 🌟 When "Report Violation" button is clicked
    const reportViolationBtn = document.querySelector(".btn-primary");
    if (reportViolationBtn) {
        reportViolationBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Check if the user is logged in (if you have a way to track this, like sessionStorage or localStorage)
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Replace with your actual check logic

            if (!isLoggedIn) {
                showNotification("Please login to report", "info");
                // Optionally redirect to login page after showing the message
                setTimeout(() => {
                    window.location.href = "login-signup.html"; // Redirect to login page
                }, 1500); // Redirect after 1.5 seconds
            } else {
                window.location.href = "report.html"; // Redirect to report page if logged in
            }
        });
    }

    // 🌟 Login Form Submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    // Store login status in localStorage
                    localStorage.setItem('isLoggedIn', 'true');

                    showNotification("Login successful!", "success");
                    setTimeout(() => {
                        if (data.role === "user") {
                            window.location.href = "userdashboard.html"; // Redirect to User Dashboard
                        } else if (data.role === "admin") {
                            window.location.href = "admindashboard.html"; // Redirect to Admin Dashboard
                        }
                    }, 1000); // Wait for notification to fade out before redirect
                } else {
                    showNotification(data.error, "error");
                }
            } catch (error) {
                showNotification("Login failed. Please try again.", "error");
            }
        });
    }

    // 🌟 Signup Form Submission
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const full_name = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const password = document.getElementById("signup-password").value;

            try {
                const response = await fetch("http://localhost:5000/signup", {
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
            } catch (error) {
                showNotification("Signup failed. Please try again.", "error");
            }
        });
    }
});

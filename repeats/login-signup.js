document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const signupPage = document.getElementById("signup-page");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const forgotPasswordLink = document.getElementById("forgot-password");

    // Create a custom notification element
    const notification = document.createElement("div");
    notification.classList.add("custom-alert");
    notification.style.display = "none"; // Hide the notification by default
    document.body.appendChild(notification);

    // Function to show custom notification
    function showNotification(message, type = "success") {
        notification.textContent = message;
        notification.className = `custom-alert ${type}`; // Add success or error class
        notification.style.display = "block"; // Show the notification
        setTimeout(() => {
            notification.style.display = "none"; // Hide the notification after 2 seconds
        }, 2000);
    }

    // Switch to Signup Page
    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginPage.classList.add("hidden");
        signupPage.classList.remove("hidden");
    });

    // Switch to Login Page
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupPage.classList.add("hidden");
        loginPage.classList.remove("hidden");
    });

    // Handle Forgot Password Link
    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "forgot-password.html";
    });

    // Login Form Submission
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            showNotification("Login successful!", "success");
            setTimeout(() => {
                if (data.role === "user") {
                    window.location.href = "userdashboard.html"; // Redirect to User Dashboard
                } else if (data.role === "admin") {
                    window.location.href = "admindashboard.html"; // Redirect to Admin Dashboard
                }
            }, 500); // Redirect after 2 seconds

        } else {
            showNotification(data.error, "error");
        }
    });

    // Signup Form Submission
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const full_name = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("signup-password").value;

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

            }, 1000); // Redirect after 2 seconds

        } else {
            showNotification(data.error, "error");
        }
    });
});
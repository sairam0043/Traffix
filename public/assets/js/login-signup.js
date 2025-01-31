document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const signupPage = document.getElementById("signup-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const logoutBtn = document.getElementById("logout-btn");

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
        showMessage(data.message, response.ok ? 'success' : 'error');

        if (response.ok) {
            signupPage.classList.add("hidden");
            loginPage.classList.remove("hidden");
        }
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
        showMessage(data.message, response.ok ? 'success' : 'error');

        if (response.ok) {
            loginPage.classList.add("hidden");
            dashboardPage.classList.remove("hidden");
        } else {
            // Handle error (this is already shown with the custom message)
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            dashboardPage.classList.add("hidden");
            loginPage.classList.remove("hidden");
        });
    }

    // Show custom message (success or error)
    function showMessage(message, type) {
        const alertBox = document.createElement("div");
        alertBox.classList.add("custom-alert", type);
        alertBox.innerText = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000); // Remove message after 3 seconds
    }
});

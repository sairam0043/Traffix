document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const signupPage = document.getElementById("signup-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const adminDashboardPage = document.getElementById("admin-dashboard-page");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");

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
            alert(data.message);
            if (data.role === "user") {
                window.location.href = "userdashboard.html"; // Redirect to User Dashboard
            } else if (data.role === "admin") {
                window.location.href = "admindashboard.html"; // Redirect to Admin Dashboard
            }
        } else {
            alert(data.error);
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
        alert(data.message);

        if (response.ok) {
            signupPage.classList.add("hidden");
            loginPage.classList.remove("hidden");
        }
    });
});

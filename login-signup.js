document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginPage = document.getElementById("login-page");
  const signupPage = document.getElementById("signup-page");
  const dashboardPage = document.getElementById("dashboard-page");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");

  // Show Sign Up Page
  signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginPage.classList.add("hidden");
      signupPage.classList.remove("hidden");
  });

  // Show Login Page
  loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      signupPage.classList.add("hidden");
      loginPage.classList.remove("hidden");
  });

  // Login Form Submission
  loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simulate successful login
      loginPage.classList.add("hidden");
      dashboardPage.classList.remove("hidden");
  });

  // Sign Up Form Submission
  signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Sign up successful! Please login.");
      signupPage.classList.add("hidden");
      loginPage.classList.remove("hidden");
  });

  // Logout (Check if logoutBtn exists before adding event)
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          dashboardPage.classList.add("hidden");
          loginPage.classList.remove("hidden");
      });
  }
});

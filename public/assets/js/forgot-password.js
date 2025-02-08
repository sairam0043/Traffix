document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("forgot-password-form");
    const step1 = document.querySelector(".step-1");
    const step2 = document.querySelector(".step-2");
    const step3 = document.querySelector(".step-3");
    const sendCodeBtn = document.getElementById("send-code-btn");
    const verifyCodeBtn = document.getElementById("verify-code-btn");
    const resetPasswordBtn = document.getElementById("reset-password-btn");

    let userEmail = "";

    // 📌 **Step 1: Send Verification Code**
    sendCodeBtn.addEventListener("click", async () => {
        userEmail = document.getElementById("reset-email").value.trim();

        if (!userEmail) {
            alert("Please enter your email address.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/password-reset/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                step1.classList.add("hidden");
                step2.classList.remove("hidden");
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Error sending verification code. Please try again.");
        }
    });

    // 📌 **Step 2: Verify Code**
    verifyCodeBtn.addEventListener("click", async () => {
        const enteredCode = document.getElementById("verification-code").value.trim();

        if (!enteredCode) {
            alert("Please enter the verification code.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/password-reset/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, code: enteredCode })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                step2.classList.add("hidden");
                step3.classList.remove("hidden");
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Error verifying code.");
        }
    });

    // 📌 **Step 3: Reset Password**
    resetPasswordBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById("new-password").value.trim();
        const confirmNewPassword = document.getElementById("confirm-new-password").value.trim();

        if (!newPassword || !confirmNewPassword) {
            alert("Please fill in both password fields.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/password-reset/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = "login-signup.html"; // Redirect to login
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Error resetting password.");
        }
    });
});

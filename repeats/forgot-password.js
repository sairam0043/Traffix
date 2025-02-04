document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgot-password-form');
    const step1 = document.querySelector('.step-1');
    const step2 = document.querySelector('.step-2');
    const step3 = document.querySelector('.step-3');
    const sendCodeBtn = document.getElementById('send-code-btn');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const resetPasswordBtn = document.getElementById('reset-password-btn');

    // Send verification code
    sendCodeBtn.addEventListener('click', async () => {
        const email = document.getElementById('reset-email').value;
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        try {
            // Here you would make an API call to send the verification code
            // For now, we'll just simulate it
            alert('Verification code sent to your email!');
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        } catch (error) {
            alert('Error sending verification code. Please try again.');
        }
    });

    // Verify code
    verifyCodeBtn.addEventListener('click', async () => {
        const code = document.getElementById('verification-code').value;
        if (!code) {
            alert('Please enter the verification code');
            return;
        }

        try {
            // Here you would make an API call to verify the code
            // For now, we'll just simulate it
            step2.classList.add('hidden');
            step3.classList.remove('hidden');
        } catch (error) {
            alert('Invalid verification code. Please try again.');
        }
    });

    // Reset password
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Here you would make an API call to reset the password
            // For now, we'll just simulate it
            alert('Password reset successful! You can now login with your new password.');
            window.location.href = '/public/login-signup.html';
        } catch (error) {
            alert('Error resetting password. Please try again.');
        }
    });
});

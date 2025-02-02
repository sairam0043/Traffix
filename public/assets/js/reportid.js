document.addEventListener("DOMContentLoaded", () => {
    const statusMessage = document.getElementById("statusMessage");
    const reportIdInput = document.getElementById("reportId");

    // Prefill the last submitted Report ID from Local Storage
    const lastReportId = localStorage.getItem("lastReportId");
    if (lastReportId) {
        reportIdInput.value = lastReportId;
    }
});

// Function to check report status
async function checkReportStatus() {
    let reportId = document.getElementById("reportId").value;
    let statusMessage = document.getElementById("statusMessage");

    if (reportId.trim() === "") {
        statusMessage.innerHTML = "Please enter a valid Report ID.";
        statusMessage.style.color = "red";
        return;
    }

    try {
        // Use actual backend API instead of a dummy link
        let apiUrl = `http://localhost:5000/check-status/${reportId}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (response.ok) {
            statusMessage.innerHTML = `Report ID: ${reportId} <br> Status: <strong>${data.status}</strong>`;
            statusMessage.style.color = "green";
        } else {
            statusMessage.innerHTML = "Invalid Report ID. Please check again.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        statusMessage.innerHTML = "Error fetching report status. Please try again later.";
        statusMessage.style.color = "red";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reportIdInput = document.getElementById("reportId");
    const statusMessage = document.getElementById("statusMessage");

    // ✅ Prefill the last submitted Report ID from Local Storage
    const lastReportId = localStorage.getItem("lastReportId");
    if (lastReportId) {
        reportIdInput.value = lastReportId;
    }

    // ✅ Attach event listener to the button
    document.querySelector("button").addEventListener("click", checkReportStatus);
});

// ✅ Function to check report status
async function checkReportStatus() {
    let reportId = document.getElementById("reportId").value;
    let statusMessage = document.getElementById("statusMessage");

    if (reportId.trim() === "") {
        statusMessage.innerHTML = "⚠️ Please enter a valid Report ID.";
        statusMessage.style.color = "red";
        return;
    }

    try {
        // ✅ Fetch report status from backend
        let apiUrl = `http://localhost:5000/api/reports/check-status/${reportId}`;
        let response = await fetch(apiUrl);

        if (!response.ok) {
            statusMessage.innerHTML = "❌ Invalid Report ID. Please check again.";
            statusMessage.style.color = "red";
            return;
        }

        let data = await response.json();

        // ✅ Display report details dynamically
        statusMessage.innerHTML = `
            <strong>Report ID:</strong> ${data.reportId} <br>
            <strong>Email:</strong> ${data.email} <br>
            <strong>Description:</strong> ${data.description} <br>
            <strong>Location:</strong> ${data.location} <br>
            <strong>Place:</strong> ${data.place} <br>
            <strong>Date:</strong> ${data.date} <br>
            <strong>Status:</strong> <span style="color: ${data.status === "Resolved" ? "green" : "orange"};">${data.status}</span>
        `;

        statusMessage.style.color = "black";
        statusMessage.style.padding = "10px";
        statusMessage.style.backgroundColor = "#f9f9f9"; // Light background
        statusMessage.style.border = "1px solid #ccc";
        statusMessage.style.borderRadius = "5px";

    } catch (error) {
        console.error("Error fetching report status:", error);
        statusMessage.innerHTML = "❌ Error fetching report status. Please try again later.";
        statusMessage.style.color = "red";
    }
}

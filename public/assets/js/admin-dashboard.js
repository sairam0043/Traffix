document.addEventListener("DOMContentLoaded", () => {
    const adminDashboardPage = document.getElementById("admin-dashboard-page");
    const reportList = document.getElementById("report-list");
    const logoutBtn = document.getElementById("admin-logout");
    const notification = document.createElement("div");
    notification.classList.add("notification");
    document.body.appendChild(notification);

    // Fetch Reports for Admin
    async function fetchReports() {
        const reports = [
            { id: 1, description: "Running red light", location: "Main Street", date: "2024-02-01", status: "Pending" },
            { id: 2, description: "Over speeding", location: "Highway 23", date: "2024-02-02", status: "Pending" }
        ];

        reportList.innerHTML = ""; // Clear existing rows

        reports.forEach(report => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${report.id}</td>
                <td>${report.description}</td>
                <td>${report.location}</td>
                <td>${report.date}</td>
                <td>
                    <select data-id="${report.id}" class="status-dropdown">
                        <option value="Pending" ${report.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Verified" ${report.status === "Verified" ? "selected" : ""}>Verified</option>
                        <option value="Resolved" ${report.status === "Resolved" ? "selected" : ""}>Resolved</option>
                    </select>
                </td>
                <td>
                    <button class="delete-btn" data-id="${report.id}">🗑 Delete</button>
                </td>
            `;
            reportList.appendChild(row);
        });

        // Event listeners for status change and deletion
        document.querySelectorAll(".status-dropdown").forEach(select => {
            select.addEventListener("change", updateReportStatus);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", deleteReport);
        });
    }

    // Update Report Status
    async function updateReportStatus(event) {
        const reportId = event.target.dataset.id;
        const newStatus = event.target.value;
        console.log(`Updated status for report ${reportId} to ${newStatus}`);
        showNotification("Report status updated!");
    }

    // Delete Report
    async function deleteReport(event) {
        const reportId = event.target.dataset.id;
        const confirmDelete = confirm("Are you sure you want to delete this report?");
        if (confirmDelete) {
            console.log(`Report ${reportId} deleted`);
            showNotification("Report deleted!");
            fetchReports(); // Refresh the list
        }
    }

    // Logout Admin
    logoutBtn.addEventListener("click", () => {
        adminDashboardPage.classList.add("hidden");
        document.getElementById("login-page").classList.remove("hidden");
    });

    // Show Notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000);
    }

    fetchReports(); // Load reports initially
});
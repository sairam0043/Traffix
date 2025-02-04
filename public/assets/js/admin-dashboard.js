document.addEventListener("DOMContentLoaded", () => {
    const adminDashboardPage = document.getElementById("admin-dashboard-page");
    const reportList = document.getElementById("report-list");
    const logoutBtn = document.getElementById("admin-logout");
    const logoutModal = document.getElementById("logout-modal");
    const confirmLogoutBtn = document.getElementById("confirm-logout");
    const cancelLogoutBtn = document.getElementById("cancel-logout");

    const notification = document.createElement("div");
    notification.classList.add("notification");
    document.body.appendChild(notification);

    // Fetch Reports for Admin
    async function fetchReports() {
        const res = await fetch("http://localhost:5000/api/reports/admin/reports")
        .then(response => response.json())  
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log("Error:", error));
        const reports = res.json();
        console.log(reports)
        reportList.innerHTML = ""; // Clear existing rows

        reports.forEach(report => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${report.id}</td>
                <td>${report.email}</td>
                <td>${report.description}</td>
                <td>${report.location}</td>
                <td>${report.place}</td>
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

      // Custom Logout Modal
      logoutBtn.addEventListener("click", () => {
        logoutModal.style.display = "block";
    });

    confirmLogoutBtn.addEventListener("click", () => {
        window.location.href = 'index.html';
    });

    cancelLogoutBtn.addEventListener("click", () => {
        logoutModal.style.display = "none";
    });

    fetchReports(); // Load reports initially
});
document.addEventListener("DOMContentLoaded", async () => {
    const reportList = document.getElementById("report-list");
    const logoutBtn = document.getElementById("admin-logout");
    const logoutModal = document.getElementById("logout-modal");
    const confirmLogoutBtn = document.getElementById("confirm-logout");
    const cancelLogoutBtn = document.getElementById("cancel-logout");

    // ✅ Ensure Only Admin Can Access
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || userRole !== "admin") {
        alert("Unauthorized Access! Redirecting to Login...");
        window.location.href = "login-signup.html"; // Redirect non-admins to login
        return;
    }

    // ✅ Custom Notification System
    function showNotification(message) {
        alert(message);
    }

    // ✅ Fetch Reports for Admin
    async function fetchReports() {
        try {
            const response = await fetch("http://localhost:5000/api/reports/admin/reports");
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const reports = await response.json();
    
            if (!Array.isArray(reports)) {
                throw new Error("Invalid data format received from server");
            }
    
            reportList.innerHTML = ""; // Clear existing rows
    
            reports.forEach(report => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${report.reportId}</td>
                    <td>${report.email}</td>
                    <td>${report.description}</td>
                    <td>${report.location}</td>
                    <td>${report.place}</td>
                    <td>${report.date}</td>
                    <td>
                        <select data-id="${report.reportId}" class="status-dropdown">
                            <option value="Pending" ${report.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Verified" ${report.status === "Verified" ? "selected" : ""}>Verified</option>
                            <option value="Resolved" ${report.status === "Resolved" ? "selected" : ""}>Resolved</option>
                        </select>
                    </td>
                    <td>
                        <button class="delete-btn" data-id="${report.reportId}">🗑 Delete</button>
                    </td>
                `;
                reportList.appendChild(row);
            });

            // Attach event listeners after populating the table
            document.querySelectorAll(".status-dropdown").forEach(select => {
                select.addEventListener("change", updateReportStatus);
            });

            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", deleteReport);
            });
    
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }
    
    // ✅ Update Report Status
    async function updateReportStatus(event) {
        const reportId = event.target.dataset.id;
        const newStatus = event.target.value;

        try {
            const response = await fetch(`http://localhost:5000/api/reports/admin/reports/${reportId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                showNotification("Report status updated successfully!");
            } else {
                showNotification("Error updating report.");
            }
        } catch (error) {
            console.error("Error updating report:", error);
        }
    }

    // ✅ Delete Report
    async function deleteReport(event) {
        const reportId = event.target.dataset.id;
        if (!confirm("Are you sure you want to delete this report?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/reports/admin/reports/${reportId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                showNotification("Report deleted!");
                fetchReports(); // Refresh the list
            } else {
                showNotification("Failed to delete report.");
            }
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    }

    // ✅ Logout Functionality
    logoutBtn.addEventListener("click", () => {
        logoutModal.style.display = "block";
    });

    confirmLogoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        window.location.href = "index.html"; // Redirect to homepage after logout
    });

    cancelLogoutBtn.addEventListener("click", () => {
        logoutModal.style.display = "none";
    });

    // ✅ Fetch Reports on Page Load
    fetchReports();
});

document.addEventListener("DOMContentLoaded", () => {
    const reportList = document.getElementById("report-list");
    const logoutBtn = document.getElementById("admin-logout");
    const logoutModal = document.getElementById("logout-modal");
    const confirmLogoutBtn = document.getElementById("confirm-logout");
    const cancelLogoutBtn = document.getElementById("cancel-logout");

    // Fetch Reports for Admin
    async function fetchReports() {
        const reports = [
            { id: 1, email: "user1@example.com", description: "Running red light", location: "Main Street", place: "37.7749, -122.4194", date: "2024-02-01", status: "Pending" },
            { id: 2, email: "user2@example.com", description: "Over speeding", location: "Highway 23", place: "34.0522, -118.2437", date: "2024-02-02", status: "Pending" }
        ];

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

    fetchReports();
});

document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.querySelector("form");
    const reportIdDisplay = document.getElementById("report-id-display"); // The element to display the Report ID

    // ✅ Ensure the user is logged in before allowing them to submit a report
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        alert("You must be logged in to report a violation.");
        window.location.href = "login-signup.html";
        return;
    }

    // ✅ Open the map page in a new window when the user clicks the map icon
    function openMapPage() {
        window.open("select.html", "_blank", "width=800, height=600");
    }

    // Attach event listener to the map icon
    document.getElementById("map-icon").addEventListener("click", openMapPage);

    // ✅ Handle Report Submission
    reportForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData();
        formData.append("description", document.getElementById("description").value);
        formData.append("place", document.getElementById("place").value);
        formData.append("location", document.getElementById("location").value);
        formData.append("date", document.getElementById("date").value);
        formData.append("email", userEmail); // ✅ Include user's email automatically

        // Get uploaded files
        const proofFiles = document.getElementById("proof").files;
        for (let file of proofFiles) {
            formData.append("proof", file);
        }

        try {
            // ✅ Send data to backend
            const response = await fetch("http://localhost:5000/api/reports/submit-report", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // ✅ Display the Report ID in a **styled format**
                reportIdDisplay.innerHTML = `Report submitted successfully! <br> Your Report ID is: <strong>${result.reportId}</strong>`;
                reportIdDisplay.style.color = "green";
                reportIdDisplay.style.fontSize = "20px";
                reportIdDisplay.style.fontWeight = "bold";
                reportIdDisplay.style.padding = "10px";
                reportIdDisplay.style.backgroundColor = "#e6f7ff"; // Light blue background for styling
                reportIdDisplay.style.border = "2px solid #007bff";
                reportIdDisplay.style.borderRadius = "5px";
                reportIdDisplay.style.marginTop = "15px";

                // ✅ Save Report ID to Local Storage for future reference
                localStorage.setItem("lastReportId", result.reportId);

                reportForm.reset(); // ✅ Clear form after submission
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            alert("Something went wrong. Try again later.");
            console.error("Error:", error);
        }
    });
    document.addEventListener("DOMContentLoaded", () => {
        const reportForm = document.querySelector("form");
        const reportIdDisplay = document.getElementById("report-id-display");
    
        reportForm.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            // Get user email from localStorage (Assuming it is stored after login)
            const userEmail = localStorage.getItem("userEmail");
    
            if (!userEmail) {
                alert("User not logged in. Please log in to submit a report.");
                return;
            }
    
            // Collect form data
            const formData = new FormData();
            formData.append("email", userEmail);  // ✅ Include user email
            formData.append("description", document.getElementById("description").value);
            formData.append("place", document.getElementById("place").value);
            formData.append("location", document.getElementById("location").value);
            formData.append("date", document.getElementById("date").value);
    
            const proofFiles = document.getElementById("proof").files;
            for (let file of proofFiles) {
                formData.append("proof", file);
            }
    
            try {
                const response = await fetch("http://localhost:5000/api/reports/submit-report", {
                    method: "POST",
                    body: formData,
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    reportIdDisplay.innerHTML = `Report submitted successfully! <br> Your Report ID: <strong>${result.reportId}</strong>`;
                    reportIdDisplay.style.color = "green";
                    reportForm.reset();
                } else {
                    alert("Error: " + result.error);
                }
            } catch (error) {
                alert("Something went wrong. Try again later.");
                console.error("Error:", error);
            }
        });
    });
    
});

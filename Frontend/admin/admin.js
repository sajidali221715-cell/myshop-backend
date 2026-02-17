// ===============================
// ADMIN LOGIN
// ===============================
async function adminLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    msg.innerText = "";

    if (!email || !password) {
        msg.innerText = "All fields are required";
        return;
    }

    try {
        const res = await fetch("http://localhost:5003/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            msg.innerText = data.message || "Admin login failed";
            return;
        }

        // ✅ Save admin token separately
        localStorage.setItem("adminToken", data.token);

        msg.style.color = "green";
        msg.innerText = "Login successful";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (error) {
        msg.innerText = "Server error";
        console.error(error);
    }
}

// ===============================
// ADMIN PAGE PROTECTION
// ===============================
function checkAdminAuth() {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        window.location.href = "login.html";
    }
}

// ===============================
// ADMIN LOGOUT
// ===============================
function adminLogout() {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
}

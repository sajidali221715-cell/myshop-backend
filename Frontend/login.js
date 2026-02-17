async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  msg.style.color = "red";
  msg.innerText = "";

  // ===== VALIDATION =====
  if (!email || !password) {
    msg.innerText = "All fields required";
    return;
  }

  try {
    const res = await fetch("http://localhost:5003/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // ===== LOGIN FAILED =====
    if (!res.ok) {
      msg.innerText = data.message || "Invalid email or password";
      return;
    }

    // ===== LOGIN SUCCESS =====
    msg.style.color = "green";
    msg.innerText = "Login successful ✅";

    // SAVE USER (optional)
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // REDIRECT
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (error) {
    msg.innerText = "Server error";
    console.error("Login error:", error);
  }
}

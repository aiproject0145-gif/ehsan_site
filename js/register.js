document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Account created successfully!");
  window.location.href = "login.html";
});

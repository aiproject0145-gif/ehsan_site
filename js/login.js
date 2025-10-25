document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Login successful!");
  window.location.href = "index.html";
});

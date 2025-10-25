document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Order confirmed! Thank you for shopping with MobileHub.");
  window.location.href = "index.html";
});

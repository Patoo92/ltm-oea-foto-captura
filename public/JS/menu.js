document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector(".logout-btn");

  logoutBtn.addEventListener("click", function () {
    // Redireccionar al usuario a la pantalla de inicio de sesión
    window.location.href = "/public/login.html";
  });
});

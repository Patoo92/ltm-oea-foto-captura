document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector(".logout-btn");

  logoutBtn.addEventListener("click", function () {
    // Redireccionar al usuario a la pantalla de inicio de sesión
    window.location.href = "/public/login.html";
  });
});
// menu.js
document.querySelector('.toggle-btn').addEventListener('click', function() {
  let sidebar = document.querySelector('.sidebar');
  let content = document.querySelector('.content');
  let toggleBtn = document.querySelector('.toggle-btn');
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
    content.style.marginLeft = '0';
    toggleBtn.style.display = 'block';
  } else {
    sidebar.style.left = '0';
    content.style.marginLeft = '250px';
    toggleBtn.style.display = 'none';
  }
});

document.addEventListener('click', function(event) {
  let sidebar = document.querySelector('.sidebar');
  let toggleBtn = document.querySelector('.toggle-btn');
  if (sidebar.style.left === '0px' && !sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
    sidebar.style.left = '-250px';
    document.querySelector('.content').style.marginLeft = '0';
    toggleBtn.style.display = 'block';
  }
});

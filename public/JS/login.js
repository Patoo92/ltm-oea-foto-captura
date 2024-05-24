document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario para manejar la redirección manualmente

    // Eliminar mensajes de error anteriores
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.remove());

    // Validación de longitud del usuario y la contraseña
    if (usernameInput.value.length < 6 || usernameInput.value.length > 20) {
      showError(usernameInput, "El usuario debe tener entre 6 y 20 caracteres.");
      return;
    }

    if (passwordInput.value.length < 8 || passwordInput.value.length > 20) {
      showError(passwordInput, "La contraseña debe tener entre 8 y 20 caracteres.");
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usernameInput.value)) {
      // Validación de caracteres permitidos para el nombre de usuario
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(usernameInput.value)) {
        showError(usernameInput, "El usuario solo puede contener letras, números y guiones bajos, o debe ser un correo electrónico válido.");
        return;
      }
    }

    // Validación de contraseña fuerte
    const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordStrengthRegex.test(passwordInput.value)) {
      showError(passwordInput, "La contraseña debe contener al menos un número, una letra mayúscula, una letra minúscula y un carácter especial.");
      return;
    }

    // Si todas las validaciones son exitosas, redirigir a la página de menú
    window.location.href = "menu.html";
  });

  function showError(input, message) {
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.style.color = "red";
    errorSpan.textContent = message;
    input.parentNode.insertBefore(errorSpan, input.nextSibling);

    setTimeout(() => {
      errorSpan.remove();
    }, 3000);
  }
});

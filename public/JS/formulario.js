document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("imageForm");
  const captureImageBtn = document.getElementById("captureImage");
  const uploadImageInput = document.getElementById("photos");
  const previewContainer = document.getElementById("previewContainer");
  const maxImages = 5;
  let imageCount = 0;

  form.addEventListener("submit", function (e) {
    const fields = ["field1", "field2", "field3", "field4"];
    let valid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field);
      const value = input.value.trim();
      if (value === "") {
        alert(`El campo ${field} es requerido`);
        valid = false;
      } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) { // Permitir espacios
        alert(`El campo ${field} solo puede contener letras, números y espacios`);
        valid = false;
      }
    });

    if (imageCount === 0) {
      alert("Debe subir al menos una imagen");
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function updateImagePreview(files) {
    previewContainer.innerHTML = "";
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgWrapper = document.createElement("div");
        imgWrapper.style.display = "inline-block";
        imgWrapper.style.position = "relative";
        imgWrapper.style.margin = "5px";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100px";
        img.style.height = "100px";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.style.position = "absolute";
        deleteButton.style.top = "0";
        deleteButton.style.right = "0";
        deleteButton.style.background = "red";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.cursor = "pointer";

        deleteButton.addEventListener("click", function () {
          removeImage(index);
        });

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(deleteButton);
        previewContainer.appendChild(imgWrapper);
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index) {
    const dataTransfer = new DataTransfer();
    const files = Array.from(uploadImageInput.files);

    files.splice(index, 1);

    files.forEach((file) => dataTransfer.items.add(file));
    uploadImageInput.files = dataTransfer.files;
    imageCount = uploadImageInput.files.length;

    updateImagePreview(uploadImageInput.files);
  }

  uploadImageInput.addEventListener("change", function () {
    const files = uploadImageInput.files;
    if (files.length > maxImages) {
      alert(`Solo puedes subir hasta ${maxImages} imágenes`);
      uploadImageInput.value = "";
      imageCount = 0;
      previewContainer.innerHTML = "";
    } else {
      imageCount = files.length;
      updateImagePreview(files);
    }
  });

  captureImageBtn.addEventListener("click", function () {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const captureButton = document.createElement("button");
    captureButton.textContent = "Capturar Imagen";

    const stopVideoStream = (stream) => {
      stream.getTracks().forEach((track) => track.stop());
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        document.body.appendChild(video);
        document.body.appendChild(captureButton);

        captureButton.addEventListener("click", function () {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            const file = new File([blob], `captured_image_${Date.now()}.png`, {
              type: "image/png",
            });
            const dataTransfer = new DataTransfer();

            for (let i = 0; i < uploadImageInput.files.length; i++) {
              dataTransfer.items.add(uploadImageInput.files[i]);
            }

            if (dataTransfer.items.length < maxImages) {
              dataTransfer.items.add(file);
              uploadImageInput.files = dataTransfer.files;
              imageCount = uploadImageInput.files.length;

              video.pause();
              stopVideoStream(stream);
              video.remove();
              captureButton.remove();

              updateImagePreview(uploadImageInput.files);
            } else {
              alert(`Solo puedes subir hasta ${maxImages} imágenes`);
              video.pause();
              stopVideoStream(stream);
              video.remove();
              captureButton.remove();
            }
          });
        });
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara: ", err);
      });
  });
});

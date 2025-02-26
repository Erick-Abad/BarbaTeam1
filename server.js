const express = require("express");
const cors = require("cors");
const path = require("path");
const sendEmailRoute = require("./api/send-email");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Servir archivos estáticos correctamente desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api", sendEmailRoute);

// Ruta para manejar todas las solicitudes no API y servir el index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

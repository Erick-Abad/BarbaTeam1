const express = require("express");
const cors = require("cors");
const sendEmailRoute = require("./api/send-email");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", sendEmailRoute);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

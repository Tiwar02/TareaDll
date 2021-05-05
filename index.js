/**
 * ARCHIVO PRINCIPAL
 */

const express = require("express");
const router = require("./app/routers/index");
const app = express();

app.use(express.json());


app.use('/', router);


const PORT = 3001;
app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto: http://localhost:3001 ');
})
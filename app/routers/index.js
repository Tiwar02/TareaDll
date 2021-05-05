const express = require("express");

const router = express.Router();

const _personasController = require('../controllers/personas/personas.controller');

//CRUD DE PERSONAS
router
    .get("/personas", _personasController.getPersonas)
    .get("/personas/:id", _personasController.getPersona)
    .post("/personas", _personasController.createPersona)
    .put("/personas/:id", _personasController.updatePersona)
    .delete("/personas/:id", _personasController.deletePersona);


module.exports = router;
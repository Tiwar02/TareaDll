const express = require("express");

const router = express.Router();

const _personasController = require('../controllers/personas/personas.controller');

//CRUD DE PERSONAS
router
    .get("/personas", _personasController.getPersonas)
    .post("/personas", _personasController.createPersona)
    .put("/personas/:id", _personasController.updatePersona)
    .delete("/personas/:id", _personasController.deletePersona)
    .get("/report",_personasController.report);


module.exports = router;
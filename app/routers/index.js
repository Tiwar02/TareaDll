const express = require("express");

const router = express.Router();

const _personasController = require('../controllers/personas/personas.controller');


router
    .get("/personas", _personasController.getPersonas)
    .get("/personas/:id", _personasController.getPersonas)
    .post("/personas", _personasController.createPersona)
    .put("/personas/:id", _personasController.updatePersona)
    .delete("/personas/:id", _personasController.deletePersona);


module.exports = router;
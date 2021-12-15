const express = require("express");
const ruta = express.Router();

const {
  crearAutor,
  getAutor,
  getAutorById,
  updateAutor,
  deleteAutor,
} = require("../controllers/autor");
const {seguridad} = require("../middleware/seguridad");

ruta.route("/").post(seguridad, crearAutor).get(seguridad, getAutor);

ruta.route("/:id").get(seguridad, getAutorById).put(seguridad, updateAutor).delete(seguridad, deleteAutor);

module.exports = ruta;

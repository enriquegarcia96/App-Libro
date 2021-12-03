const express = require("express");
const ruta = express.Router();

const {
  getLibroById,
  crearLibro,
  updateLibro,
  deleteLibro,
  getLibros,
} = require("../controllers/libro");

ruta
    .route("/")
    .get(getLibros)
    .post(crearLibro);

ruta
    .route('/:id')
    .get(getLibroById)
    .put(updateLibro)
    .delete(deleteLibro)


module.exports = ruta;

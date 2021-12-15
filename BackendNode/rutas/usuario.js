const express = require('express');
const ruta = express.Router();


const { getUsuario, login, registrarUsuario } = require('../controllers/usuario');
const {seguridad} = require("../middleware/seguridad");



ruta.get('/', seguridad, getUsuario );
ruta.post('/registrar', registrarUsuario);
ruta.post('/login', login);


module.exports = ruta;

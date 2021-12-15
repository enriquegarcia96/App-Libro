const Usuario = require("../models/Usuario");
const ErrorResponse = require("../helper/errorResponse");
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, username, email, password } = req.body;
    const usrDB = await Usuario.create({
      nombre,
      apellido,
      userName: username,
      email,
      password,
    });

    const token = usrDB.crearJsonWebToken();

    res.status(200).json({
      status: 200,
      id: usrDB._id,
      nombre,
      apellido,
      username,
      email,
      token,
    });
  } catch (error) {
    next(new ErrorResponse("Error registrando usuario" + error + 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Ingrese un email y un password", 400));
    }

    const usuarioDB = await Usuario.findOne({ email }).select("+password");

    if (!usuarioDB) {
      return next(
        new ErrorResponse("El usuario no existe en la base de datos", 400)
      );
    }

    const valorBool = await usuarioDB.validarPassword(password);
    if (!valorBool) {
      return next(new ErrorResponse("Las credenciales son incorrectas", 400));
    }

    // genero el token
    const token = usuarioDB.crearJsonWebToken();

    res.status(200).json({
      status: 200,
      id: usuarioDB._id,
      nombre: usuarioDB.nombre,
      apellido: usuarioDB.apellido,
      username: usuarioDB.userName,
      email: usuarioDB.email,
      token,
    });
  } catch (error) {
    next(new ErrorResponse("Error en el login" + error + 400));
  }
};

exports.getUsuario = async (req, res, next) => {
  try {
    const usuarioToken = req.usuario;
    
    

    const token = await usuarioToken.crearJsonWebToken();

    // const token = await jwt.sign({usuarioToken}, process.env.JWT_SECRET_WORD,{
    //   expiresIn: process.env.JWT_EXPIRE
    // })

    res.status(200).json({
      status: 200,
      id: usuarioToken._id,
      nombre: usuarioToken.nombre,
      apellido: usuarioToken.apellido,
      username: usuarioToken.userName,
      email: usuarioToken.email,
      token,
    });
  } catch (err) {
    next(
      new ErrorResponse("Error obteniendo la sesion del usuario " + err, 400)
    );
  }
};

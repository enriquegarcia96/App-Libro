const ErrorResponse = require("../helper/errorResponse");
const Libro = require("../models/Libro");

exports.getLibros = async (req, res, next) => {
  try {
    const libroLista = await Libro.find();

    res.status(200).json(libroLista);
  } catch (error) {
    next(
      new ErrorResponse("No se pudo procesar el request" + error.message, 400)
    );
  }
};

exports.getLibroById = async (req, res, next) => {
  try {
    const libroUnique = await Libro.findById(req.params.id);

    if (!libroUnique) {
      next(new ErrorResponse("No se pudo encontrar el libro", 400));
    }

    res.status(200).json(libroUnique);
  } catch (error) {
    next(
      new ErrorResponse("No se pudo procesar el request" + error.message, 400)
    );
  }
};

exports.crearLibro = async (req, res, next) => {
  try {
    const libro = await Libro.create(req.body);
    res.status(200).json({
      status: 200,
      data: libro,
    });
  } catch (error) {
    new ErrorResponse("No se pudo procesar el request" + error.message, 400);
  }
};

exports.updateLibro = async (req, res, next) => {
  try {
    const libroUnique = await Libro.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      data: libroUnique,
    });
  } catch (error) {
    new ErrorResponse("No se pudo procesar el request" + error.message, 400);
  }
};

exports.deleteLibro = async (req, res, next) => {
  try {
    const libroUnique = await Libro.findByIdAndDelete(req.params.id);

    if (!libroUnique) {
      return new ErrorResponse("El libro no existe", 400);
    }

    res.status(200).json({
      status: 200,
      data: libroUnique,
    });
  } catch (error) {
    new ErrorResponse("No se pudo procesar el request" + error.message, 400);
  }
};

const errorHandler = (err, req, res, next) => {

    console.log('errores', err);
    res.status(500).json({
        status:500,
        mensaje: err.message
    })

}


module.exports = errorHandler
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const connectDatabase = require("./config/db");
const errorHandler = require('./middleware/error');

dotenv.config({ path: "./config/config.env" });
connectDatabase();


//.- importaciones de las rutas .-//
const libro = require("./rutas/libro");
const autor = require('./rutas/autor');
const usuario = require('./rutas/usuario');

const app = express();
app.use(express.json());
app.use(cors())


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


//.- api de Rutas .-//
app.use('/api/LibreriaAutor', autor);
app.use("/api/LibroGet", libro);
app.use("/usuarioLogin", usuario);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV)
);


//.- detiene las operaciones de la base de datos al momento que hay un error .-//
process.on('unhandledRejection', (err, promise) =>{
    console.log("Errores",err.message);
    server.close(() => process.exit(1));
});

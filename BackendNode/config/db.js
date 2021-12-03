const mongoose = require('mongoose');

const connectDatabase = async () => {
    const conexion = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB servidor Atlas conectado', conexion.connection.host);
}

module.exports = connectDatabase;


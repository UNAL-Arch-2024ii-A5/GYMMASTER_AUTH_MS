const mongoose = require("mongoose");

/*Conexion de la app con mongo Db Atlas*/
const dbConnect = async () => {
    try {
        console.log("URI de conexión:", process.env.mongoUrl); // Agregar esta línea para verificar el valor de mongoUrl
        await mongoose.connect(process.env.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar a la DB:", error.message);
    }
};
module.exports = dbConnect;


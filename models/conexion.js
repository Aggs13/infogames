const mysql = require("mysql2/promise")

let conexion;

async function getConexion() {
if(!conexion){
    try {
        conexion = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "gamezfullbd",
        })
        console.log("Conexión exitosa");
    } catch (error) {
        console.error("Error al conectar:", error);
        throw error;
    }
}
return conexion
}

module.exports = getConexion


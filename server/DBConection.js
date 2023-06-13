module.exports = {
    con:  function () {

        var mysql = require('mysql2'); // se incluye la libreria de sql 


        // se almacenan credenciales de acceso a DB
        const cedentialsBD = {
            host: "localhost", 
            user: "root",
            password: "MNDvud",
            database: "mojarra"

          }

        // se devuelve coneccion inicializada
        return (mysql.createConnection(cedentialsBD))
    }
  };
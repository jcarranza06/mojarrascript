module.exports = {
    con:  function () {
        var mysql = require('mysql'); // se incluye la libreria de sql 

        // se almacenan credenciales de acceso a DB
        const cedentialsBD = {
            host: "localhost", 
            user: "root",
            password: "root",
            database: "tabla"
          }

        // se devuelve coneccion inicializada
        return (mysql.createConnection(cedentialsBD))
    }
  };
const express = require("express");
const app = express();
const cors = require("cors");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const bodyParser = require('body-parser');

/*const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};*/

// Middleware
//app.use(auth(config));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
// allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests only from this origin
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});


app.listen(5000, () => {
  console.log("Servidor iniciado en el puerto 5000");
});

/*
porfa verifique que funciona correctamente 
*/
app.get('/', (req, res) => {
  /*if (req.oidc.isAuthenticated()) {
    // Acceder a los datos del usuario autenticado
    const user = req.oidc.user;

    // Extraer información específica del usuario
    const userId = user.sub; // ID del usuario
    const userName = user.name; // Nombre del usuario
    const userEmail = user.email; // Email del usuario
    const userPicture = user.picture; // URL de la imagen del usuario

    var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
    var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

    con.connect(function (err) {// se abre la coneccion con la BD
      if (err) throw err; // validacion de apertura
      con.query("INSERT INTO USUARIO (NOMBREUSUARIO,EMAILUSUARIO,FECHAREGISTRO,ULTIMACONEXION,IDAUTH0) VALUES (?,?,NOW(),NOW(),?) ON duplicate KEY UPDATE ULTIMACONEXION=current_timestamp();", [userName, userEmail, userId], function (err, result, fields) { // se envía la petición a DB
        if (err) throw err; // valida peticion enviada corrrectamente
      });
    });


    // Redirigir al usuario a localhost:3000 con los datos del usuario como parámetros de consulta
    res.redirect(`http://localhost:3000/?userId=${userId}&userName=${userName}&userEmail=${userEmail}&userPicture=${userPicture}`);
  } else {
    res.send('Log in');
  }*/
  res.send('tamo activo');
});

/*app.get('/userId', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // Acceder a los datos del usuario autenticado
    const user = req.oidc.user;

    // Extraer información específica del usuario
    const userId = user.sub; // ID del usuario
    const userName = user.name; // Nombre del usuario
    //const userEmail = user.email; // Email del usuario
    //const userPicture = user.picture; // URL de la imagen del usuario
    var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
    var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
    con.connect(function (err) {// se abre la coneccion con la BD
      if (err) throw err; // validacion de apertura
      con.query("SELECT IDUSUARIO FROM tabla.USUARIO WHERE IDAUTH0=?;", [userId], function (err, result, fields) { // se envía la petición a DB
        if (err) throw err; // valida peticion enviada corrrectamente
        res.send(JSON.stringify({userId: result[0].IDUSUARIO, userName: userName})); // se imprime en pantalla el resultado de la consulta
      });
    });
  } else {
    res.send({status:'not auth'})
  }
});*/

// Estpo es un API, sirve porque la BD normalmente y por seguridad está configurada para recibir solicitudes
// desde la misma red por lo cual la API permite ser un puente entre elementos que están en una red no local  
// y los procesos locales como lo es la BD, en este ejemplo la API se accede desde la url http://localhost:5000/getProductosEnOferta
// y devuelve un string en formato json para que el cliente lolea y más adelante lo convierta en algún objeto de JavaScript

// A continuacion un ejemplo de como debería ser una api qie necesita leer algun parametro de cliente 
// para poner en la consulta : 

// app.get('/getProductosEnOferta', (req, res) => { //req va a guardar las variables

//   var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
//   var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

//   let variableRecibidaPorGET = req.query.nombreVariable;
//   let variable1RecibidaPorGET = req.query.nombreVariable1;

//   con.connect(function(err) {// se abre la coneccion con la BD
//     if (err) throw err; // validacion de apertura
//     // a continuacion un ejemplo de creacion de consulta SQL, cuando se van a pasar variables se pasa ? en vez 
//     // de la variable para evitar inyecciones de SQL, 
//     // en este caso se quiere pasar algo equivalente a  
//     // SELECT * FROM customers WHERE name = nombreVariable OR address = nombreVariable1, pero abajo se muestra que se pasan los signos ?
//     // pero las variables se pasan entre llaves como segundo parametro de con.query, !!LAS VARIABLES RECIBIDAS DE USUARIO NO SE PONEN EN LA SENTENCIA SQL DIRECTAMENTE!!
//     con.query("SELECT * FROM customers WHERE name = ? OR address = ?", [variableRecibidaPorGET, variableRecibidaPorGET1] , function (err, result, fields) { // se envía la petición a DB
//       if (err) throw err; // valida peticion enviada corrrectamente
//       res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
//     });
//   });
// });

//se agrega o se modifica ultima hora de coneccion de usuario
app.get('/getUser', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con();
  let idAuth = req.query.idAuth;
  let name = req.query.name;
  let email = req.query.email;
  con.query("SELECT IDUSUARIO FROM USUARIO WHERE IDAUTH0 = ?;", [idAuth], function (err, result, fields) { // se envía la petición a DB
    if (err) throw err; // valida peticion enviada corrrectamente

    // en caso de que el producto no este en la BD, se va a subir
    if (result.length < 1) {
      //console.log('agre')
      con.query("INSERT INTO USUARIO (NOMBREUSUARIO,EMAILUSUARIO,FECHAREGISTRO,ULTIMACONEXION,IDAUTH0) VALUES (?,?,NOW(),NOW(),?)", [name, email, idAuth], function (err, result1, fields) {
        res.send(JSON.stringify({ id: result1.insertId, response: result1 })); // se imprime en pantalla el resultado de la consulta
      })
    } else { //en caso que el producto ya este en la bd se va a actualizar el precio de la primera aparicion de este en la BD
      //console.log("updateing: ", result[0].IDUSUARIO)
      con.query("UPDATE USUARIO SET ULTIMACONEXION = NOW() WHERE (IDUSUARIO = ?);", [result[0].IDUSUARIO], function (err, result1, fields) {
        res.send(JSON.stringify({ id: result[0].IDUSUARIO, response: result1 })); // se imprime en pantalla el resultado de la consulta
      })
    }
  });
});

// Ruta para recibir los comentarios del frontend y guardarlos en la base de datos
app.get('/comentarios', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con();
  const userId = req.query.userId, productId= req.query.productId, comentario = req.query.comentario ;
  console.log(userId,productId,comentario)
  const sql = `INSERT INTO COMENTARIO (IDUSUARIO, IDPRODUCTO, COMENTARIO) VALUES (?, ?, ?)`;
  const values = [userId, productId, comentario];
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar el comentario:', err);
        res.status(500).send(JSON.stringify('Error al insertar el comentario'));
      } else {
        console.log('Comentario insertado correctamente');
        res.status(200).send(JSON.stringify('Comentario insertado correctamente'));
      }
    });
  });
});


// app.get('/getComentarios', (req, res) => {
//   var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
//   var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

//   con.connect(function (err) {// se abre la coneccion con la BD
//     if (err) throw err; // validacion de apertura
//     // Ruta para obtener todos los comentarios

//     const sql = 'SELECT COMENTARIO, IDUSUARIO, IDPRODUCTO FROM COMENTARIO';

//     con.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error al obtener los comentarios:', err);
//         res.status(500).send('Error al obtener los comentarios');
//       } else {
//         console.log('Comentarios obtenidos correctamente');
//         res.status(200).json(results);
//       }
//     });
//   });
// });


app.get('/getProductosEnOferta', (req, res) => {

  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT P.NOMBREPRODUCTO as 'nombre', P.IDPRODUCTO as 'id', P.IMAGENPRODUCTO as 'imagen', M.NOMBRESUPERMERCADO as 'supermercado', (P.PRECIOPRODUCTO * (1-CP.VALORCARACTERISTICA)) as 'precio' FROM PRODUCTO P JOIN CPERTENECEP CP ON P.IDPRODUCTO = CP.IDPRODUCTO JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO JOIN CARACTERISTICASPRODUCTO C ON CP.IDCARACTERISTICA = C.IDCARACTERISTICA WHERE C.NOMBRECARACTERISTICA = 'Oferta' ;", function (err, result, fields) { // se envía la petición a DB

      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta

    });
  });
});

app.get('/getProductosMasVendidos', (req, res) => {

  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT IDPRODUCTO as id, NOMBREPRODUCTO as nombre,SUPERMERCADO.NOMBRESUPERMERCADO as supermercado, PRECIOPRODUCTO as precio, DESCRIPCIONPRODUCTO as descricion, IMAGENPRODUCTO as imagen FROM `PRODUCTO` JOIN SUPERMERCADO WHERE SUPERMERCADO.IDSUPERMERCADO = PRODUCTO.IDSUPERMERCADO order by CANTIDADVENDIDA desc limit 5;", function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

app.get('/getProductoById', (req, res) => {

  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let id = req.query.idProducto;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT P.IDPRODUCTO AS id, P.NOMBREPRODUCTO AS nombre, P.PRECIOPRODUCTO AS precio, (P.PRECIOPRODUCTO*(1- CP.VALORCARACTERISTICA)) AS descuento,P.DESCRIPCIONPRODUCTO AS descripcion ,P.IMAGENPRODUCTO AS img  FROM PRODUCTO P LEFT JOIN (SELECT * FROM CPERTENECEP WHERE IDCARACTERISTICA = 1) CP ON P.IDPRODUCTO = CP.IDPRODUCTO WHERE P.IDPRODUCTO=? LIMIT 1;", [id], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

app.get('/searchProduct', (req, res) => {

  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let filtrar = Number(req.query.filtrar);
  let search = '%' + req.query.search + '%';
  if (!filtrar) {
    con.connect(function (err) {// se abre la coneccion con la BD
      if (err) throw err; // validacion de apertura
      con.query("SELECT P.NOMBREPRODUCTO as 'name', P.IDPRODUCTO, P.IMAGENPRODUCTO as 'img', M.NOMBRESUPERMERCADO, P.PRECIOPRODUCTO as 'precio' FROM PRODUCTO P JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO WHERE LOWER(P.NOMBREPRODUCTO)  LIKE ?;", [search], function (err, result, fields) { // se envía la petición a DB
        if (err) throw err; // valida peticion enviada corrrectamente
        res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
      });
    });
  } else {
    let rangoPrecio = { min: req.query.min, max: req.query.max }
    let order = Number(req.query.order);
    let querySql;
    if (order == 0) {
      querySql = "SELECT P.NOMBREPRODUCTO as 'name', P.IDPRODUCTO, P.IMAGENPRODUCTO as 'img', M.NOMBRESUPERMERCADO, P.PRECIOPRODUCTO as 'precio' FROM PRODUCTO P JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO WHERE (LOWER(P.NOMBREPRODUCTO)  LIKE ? AND P.PRECIOPRODUCTO>=? AND P.PRECIOPRODUCTO <=?);";
    } else {
      let o = order == 1 ? 'DESC' : 'ASC';
      querySql = "SELECT P.NOMBREPRODUCTO as 'name', P.IDPRODUCTO, P.IMAGENPRODUCTO as 'img', M.NOMBRESUPERMERCADO, P.PRECIOPRODUCTO as 'precio' FROM PRODUCTO P JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO WHERE (LOWER(P.NOMBREPRODUCTO)  LIKE ? AND P.PRECIOPRODUCTO>=? AND P.PRECIOPRODUCTO <=?) ORDER BY P.PRECIOPRODUCTO " + o + ";";
    }

    con.connect(function (err) {// se abre la coneccion con la BD
      if (err) throw err; // validacion de apertura
      con.query(querySql, [search, rangoPrecio.min, rangoPrecio.max], function (err, result, fields) { // se envía la petición a DB
        if (err) throw err; // valida peticion enviada corrrectamente
        res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
      });
    });
  }

});

app.get('/getComentarios/:productId', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  const productId = req.params.productId;
  const sql = `SELECT COMENTARIO, IDUSUARIO, FECHACOMENTARIO FROM comentario WHERE IDPRODUCTO = ?;`;
  const values = [productId];
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, values, (err, result) => {
      if (err) {
        //console.error('Error al obtener los comentarios:', err);
        res.status(500).send('Error al obtener los comentarios');
      } else {
        //console.log('Comentarios obtenidos correctamente');
        res.status(200).json(result);
      }

    });
  });
});


//Ruta para crear una lista de compra
app.post('/crearLista', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

  const userId = req.body.userId;
  const nombreCarrito = req.body.nombreCarrito;
  const sql = `INSERT INTO CARRITO (IDUSUARIO, NOMBRECARRITO, FECHACREACION) VALUES (?, ?, NOW())`;
  const values = [userId, nombreCarrito];
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al crear la lista:', err);
        res.status(500).send('Error al crear la lista');
      } else {
        console.log('Lista creada correctamente');
        res.status(200).send('Lista creada correctamente');
      }
    });
  });
});


// // Ruta para eliminar una lista
// app.delete('/eliminarLista/:carritoId', (req, res) => {
//   var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
//   var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

//   const carritoId = req.params.carritoId;

//   const sql = `DELETE FROM CARRITO WHERE IDCARRITO = ?`;
//   const values = [carritoId];
//   con.connect(function(err) {
//     if (err) throw err;
//   con.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error al eliminar la lista:', err);
//       res.status(500).send('Error al eliminar la lista');
//     } else {
//       console.log('Lista eliminado correctamente');
//       res.status(200).send('Lista eliminado correctamente');
//     }
//   });
// });
// });

app.get('/getUserListas', (req, res) => {
  var conn = require('./DBConection.js'); 
  var con = conn.con(); 
  let idUsuario = Number(req.query.idUsuario);
  con.connect(function (err) {
    if (err) throw err; 
    con.query("SELECT IDCARRITO, NOMBRECARRITO  FROM CARRITO where IDUSUARIO=?;", [idUsuario], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err;
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});
app.get('/getProductosLista', (req, res) => {
  var conn = require('./DBConection.js'); 
  var con = conn.con(); 
  let idCarrito = req.query.carritoId;
  con.connect(function (err) {
    if (err) throw err; // validacion de apertura
    con.query("SELECT P.NOMBREPRODUCTO, P.IDPRODUCTO, P.IDSUPERMERCADO, P.PRECIOPRODUCTO, S.LOGOSUPERMERCADO FROM CLLEVAP AS L JOIN PRODUCTO AS P ON L.IDPRODUCTO = P.IDPRODUCTO JOIN SUPERMERCADO AS S ON P.IDSUPERMERCADO = S.IDSUPERMERCADO WHERE L.IDCARRITO = ?;", [idCarrito], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

// Ruta para eliminar un carrito y mover productos al historial

app.delete('/eliminarLista/:carritoId', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  const carritoId = req.params.carritoId;

  // Consulta para eliminar la lista
  const sqlDeleteCarrito = `DELETE FROM CARRITO WHERE IDCARRITO = ?`;
  const deleteCarritoValues = [carritoId];

  con.query(sqlDeleteCarrito, deleteCarritoValues, (err, result) => {
    if (err) {
      console.error('Error al eliminar la lista:', err);
      res.status(500).send('Error al eliminar el carrito');
    } else {
      console.log('Lista eliminado correctamente');

      // Consulta para obtener los productos del carrito antes de eliminarlo
      const sqlSelectProductos = `SELECT IDPRODUCTO, IDUSUARIO FROM CLLEVAP WHERE IDCARRITO = ?`;
      const selectProductosValues = [carritoId];

      con.query(sqlSelectProductos, selectProductosValues, (err, results) => {
        if (err) {
          console.error('Error al obtener los productos de la lista:', err);
          res.status(500).send('Error al obtener los productos de la lista');
        } else {
          const productos = results.map((row) => [row.IDPRODUCTO, row.IDUSUARIO]);

          // Consulta para mover los productos al historial
          const sqlInsertHistorial = `INSERT INTO HISTORIAL (IDPRODUCTO, IDUSUARIO, FECHABUSQUEDA) VALUES ?`;
          const insertHistorialValues = productos.map((producto) => [...producto, new Date()]);

          con.query(sqlInsertHistorial, [insertHistorialValues], (err, result) => {
            if (err) {
              console.error('Error al mover los productos al historial:', err);
              res.status(500).send('Error al mover los productos al historial');
            } else {
              console.log('Productos movidos al historial correctamente');
              res.status(200).send('Lista eliminada y productos movidos al historial correctamente');
            }
          });
        }
      });
    }
  });
});


// Ruta para insertar un producto en un carrito
app.post('/insertarProducto', (req, res) => {
  const carritoId = req.body.carritoId;
  const productoId = req.body.productoId;

  const sql = `INSERT INTO CLLEVAP (IDCARRITO, IDPRODUCTO) VALUES (?, ?)`;
  const values = [carritoId, productoId];
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar el producto en la lista:', err);
        res.status(500).send('Error al insertar el producto en la lista');
      } else {
        console.log('Producto insertado correctamente en la lista');
        res.status(200).send('Producto insertado correctamente en la lista');
      }
    });
  });
});

// Ruta para eliminar un producto de un carrito
app.delete('/eliminarProducto/:carritoId/:productoId', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

  const carritoId = req.params.carritoId;
  const productoId = req.params.productoId;

  const sql = `DELETE FROM CLLEVAP WHERE IDCARRITO = ? AND IDPRODUCTO = ?`;
  const values = [carritoId, productoId];
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al eliminar el producto del carrito:', err);
        res.status(500).send('Error al eliminar el producto del carrito');
      } else {
        console.log('Producto eliminado correctamente del carrito');
        res.status(200).send('Producto eliminado correctamente del carrito');
      }
    });
  });
});

/*
Funciones para historial de prods 
*/


//addToHistory: agrega producto al historial de un usuario, es necesario pasarle idUsuario: int y idProducto: int 
// ejemplo de llamada:  http://localhost:5000/addToHistory?idUsuario=2&idProducto=4
//devuelve: {"fieldCount":0,"affectedRows":1,"insertId":3,"info":"","serverStatus":2,"warningStatus":0}
app.get('/addToHistory', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let idProducto = req.query.idProducto;
  let idUsuario = req.query.idUsuario;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("INSERT INTO HISTORIAL (IDBUSQUEDA, IDUSUARIO, IDPRODUCTO, FECHABUSQUEDA, TERMINOBUSQUEDA) VALUES (null, ?, ?, NOW(),'sumadre');", [idUsuario, idProducto], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

//getUserHistory: obtiene todos los productos del historial de un cliente, es necesario pasarle idUsuario: int  
// ejemplo de llamada:  http://localhost:5000/getUserHistory?idUsuario=2
//devuelve: [{"IDBUSQUEDA":1,"IDUSUARIO":2,"IDPRODUCTO":1,"FECHABUSQUEDA":"2023-06-06T05:00:00.000Z"},{"IDBUSQUEDA":2,"IDUSUARIO":2,"IDPRODUCTO":2,"FECHABUSQUEDA":"2023-06-06T14:41:11.000Z"}]
app.get('/getUserHistory', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let idUsuario = req.query.idUsuario;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT IDBUSQUEDA, IDUSUARIO, IDPRODUCTO, FECHABUSQUEDA FROM tabla.HISTORIAL where IDUSUARIO=?;", [idUsuario], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

app.get('/getNombreProductosMasVendidos', (req, res) => {// devuelve los 5 productos mas vendidos
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let idUsuario = req.query.idUsuario;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT `NOMBREPRODUCTO`,`CANTIDADVENDIDA` FROM `producto` ORDER BY CANTIDADVENDIDA DESC LIMIT 5;", function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

app.get('/getSupermercadosFavoritos', (req, res) => {// devuelve los 5 supermercados que mas venden
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT sum(CANTIDADVENDIDA),supermercado.NOMBRESUPERMERCADO FROM producto JOIN supermercado ON producto.IDSUPERMERCADO = supermercado.IDSUPERMERCADO GROUP BY producto.IDSUPERMERCADO;ORDER BY producto.CANTIDADVENDIDA DESC LIMIT 5", function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});


app.get('/getProductosMasBuscadosByUser', (req, res) => { // Busca los productos mas buscados por un usuario especifico
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let idUsuario = req.query.idUsuario;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT producto.NOMBREPRODUCTO,historial.FECHABUSQUEDA FROM historial LEFT JOIN producto ON historial.IDPRODUCTO = producto.IDPRODUCTO WHERE usuario.IDUSUARIO = ?;",idUsuario, function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});


app.get('/getProductosMasBuscados', (req, res) => { // Busca los productos mas buscados por los usuarios
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let idUsuario = req.query.idUsuario;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT producto.NOMBREPRODUCTO,COUNT(historial.IDPRODUCTO) as cantidad FROM historial JOIN producto ON producto.IDPRODUCTO = historial.IDPRODUCTO GROUP BY historial.IDPRODUCTO ORDER BY COUNT(historial.IDPRODUCTO) DESC limit 5;", function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});


//deleteFromUserHistory: obtiene todos los productos del historial de un cliente, es necesario pasarle idUsuario: int  
//ejemplo de llamada:  http://localhost:5000/deleteFromUserHistory?idBusqueda=2
//devuelve: {"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0}
app.get('/deleteFromUserHistory', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  let idBusqueda = req.query.idBusqueda;
  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("DELETE FROM HISTORIAL WHERE IDBUSQUEDA=?;", [idBusqueda], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});

//funcion que retorna hash para contraseña
function generateMD5Hash(password) {
  let hash = '';
  try {
    const crypto = require('crypto');
    const md5sum = crypto.createHash('md5');
    md5sum.update(password);
    hash = md5sum.digest('hex');
  } catch (error) {
    console.error('Error:', error);
  }
  return hash;
}


//getUserHistory: obtiene todos los productos del historial de un cliente, es necesario pasarle idUsuario: int  
//ejemplo de llamada:  http://localhost:5000/getUserHistory?idUsuario=2
//devuelve: [{"IDBUSQUEDA":1,"IDUSUARIO":2,"IDPRODUCTO":1,"FECHABUSQUEDA":"2023-06-06T05:00:00.000Z"},{"IDBUSQUEDA":2,"IDUSUARIO":2,"IDPRODUCTO":2,"FECHABUSQUEDA":"2023-06-06T14:41:11.000Z"}]
app.post('/uploadProducts', (req, res) => {
  // se va a comparar el hash de la contraseña del usuario con este
  const password = '2f641e3139402a66caa449ba98cc9f01';//generateMD5Hash('U6hfsS2ZT4G9Ux8x')
  console.log(password)
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  //let productsJson = req.body.data;
  let products = req.body.data;
  let Userpassword = req.body.pass;
  products = JSON.parse(products)

  if (password != generateMD5Hash(Userpassword)) {
    res.send(JSON.stringify({ message: 'wrong password' })); // se imprime en pantalla el resultado de la consulta
  } else {
    //console.log('mostrandoProds')
    //console.log(products)
    //products = JSON.parse(productsJson)
    //console.log(products, products.length)

    // al enviarse una cierta cantidad de consultas a la bd, es necesario saber si todas finalizaron, por eso se verifica con
    // validate end que hayan finalizado la misma cantidad de consultas que se crearon 
    i = 0;
    function validateEnd() {
      i++
      //console.log("i: ", i, " l: ", products.length)
      if (i == products.length) {
        res.send(JSON.stringify({ message: 'success' })); // se imprime en pantalla el resultado de la consulta
      }
    }
    con.connect(function (err) {// se abre la coneccion con la BD
      marketCodes = {
        'Carulla': 1,
        'D1': 2,
        'Ara': 3,
        'Jumbo': 4,
        'Exito': 5
      }
      if (err) throw err; // validacion de apertura
      products.forEach(element => {
        console.log(element)
        urlImage = decodeURIComponent(element['image'])
        con.query("SELECT IDPRODUCTO FROM tabla.PRODUCTO WHERE NOMBREPRODUCTO = ? AND IMAGENPRODUCTO = ? AND IDSUPERMERCADO = ?;", [element['name'], urlImage, marketCodes[element['market']]], function (err, result, fields) { // se envía la petición a DB
          if (err) throw err; // valida peticion enviada corrrectamente
          console.log('res: ', result)
          // en caso de que el producto no este en la BD, se va a subir
          if (result.length < 1) {
            con.query("INSERT INTO `tabla`.`PRODUCTO` (`IDSUPERMERCADO`, `NOMBREPRODUCTO`, `IMAGENPRODUCTO`, `PRECIOPRODUCTO`) VALUES (?, ?, ?, ?);", [marketCodes[element['market']], element['name'], urlImage, element['price']], function (err, result, fields) {
              //console.log(result)
              validateEnd()
            })
          } else { //en caso que el producto ya este en la bd se va a actualizar el precio de la primera aparicion de este en la BD
            console.log("updateing: ", result[0].IDPRODUCTO)
            con.query("UPDATE `tabla`.`PRODUCTO` SET `PRECIOPRODUCTO` = ? WHERE (`IDPRODUCTO` = ?);", [element['price'], result[0].IDPRODUCTO], function (err, result, fields) {
              //console.log(result)
              validateEnd()
            })
          }
        });
      });
    });
  }
});

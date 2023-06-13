const express = require("express");
const app = express();
const cors = require("cors");
const { auth } = require("express-openid-connect");
require("dotenv").config();


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

// Middleware
app.use(auth(config));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
  if (req.oidc.isAuthenticated()) {
    // Acceder a los datos del usuario autenticado
    const user = req.oidc.user;

    // Extraer información específica del usuario
    const userId = user.sub; // ID del usuario
    const userName = user.name; // Nombre del usuario
    const userEmail = user.email; // Email del usuario
    const userPicture = user.picture; // URL de la imagen del usuario

    var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
    var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

    /*con.connect(function (err) {// se abre la coneccion con la BD
      if (err) throw err; // validacion de apertura
      con.query("INSERT INTO usuario (IDUSUARIO,NOMBREUSUARIO,EMAILUSUARIO) VALUES (?,?,?) ON duplicate KEY UPDATE ULTIMACONEXION=current_timestamp();",[userId,userName,userEmail], function (err, result, fields) { // se envía la petición a DB
        if (err) throw err; // valida peticion enviada corrrectamente
      });
    });*/


    // Redirigir al usuario a localhost:3000 con los datos del usuario como parámetros de consulta
    res.redirect(`http://localhost:3000/?userId=${userId}&userName=${userName}&userEmail=${userEmail}&userPicture=${userPicture}`);
  } else {
    res.send('Log in');
  }
});



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

// Ruta para recibir los comentarios del frontend y guardarlos en la base de datos
app.get('/comentarios', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con();
  const { comentId, userId, productId, comentario } = req.body;

  const sql = `INSERT INTO COMENTARIO (IDCOMENTARIO, IDUSUARIO, IDPRODUCTO, COMENTARIO) VALUES (?, ?, ?, ?)`;
  const values = [comentId, userId, productId, comentario];
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar el comentario:', err);
        res.status(500).send('Error al insertar el comentario');
      } else {
        console.log('Comentario insertado correctamente');
        res.status(200).send('Comentario insertado correctamente');
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
    con.query("SELECT IDPRODUCTO as id, NOMBREPRODUCTO as nombre,supermercado.NOMBRESUPERMERCADO as supermercado, PRECIOPRODUCTO as precio, DESCRIPCIONPRODUCTO as descricion, IMAGENPRODUCTO as imagen FROM `producto` JOIN supermercado WHERE supermercado.IDSUPERMERCADO = producto.IDSUPERMERCADO order by CANTIDADVENDIDA desc limit 5;", function (err, result, fields) { // se envía la petición a DB
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
    con.query("SELECT P.IDPRODUCTO AS id, P.NOMBREPRODUCTO AS nombre, P.PRECIOPRODUCTO AS precio, (P.PRECIOPRODUCTO*(1- CP.VALORCARACTERISTICA)) AS descuento,P.DESCRIPCIONPRODUCTO AS descripcion ,P.IMAGENPRODUCTO AS img  FROM producto P LEFT JOIN (SELECT * FROM CPERTENECEP WHERE IDCARACTERISTICA = 1) CP ON P.IDPRODUCTO = CP.IDPRODUCTO WHERE P.IDPRODUCTO=? LIMIT 1;", [id], function (err, result, fields) { // se envía la petición a DB
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
  }else{
    let rangoPrecio = {min: req.query.min, max: req.query.max}
    let order = Number(req.query.order);
    let querySql;
    if (order == 0){
      querySql= "SELECT P.NOMBREPRODUCTO as 'name', P.IDPRODUCTO, P.IMAGENPRODUCTO as 'img', M.NOMBRESUPERMERCADO, P.PRECIOPRODUCTO as 'precio' FROM PRODUCTO P JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO WHERE (LOWER(P.NOMBREPRODUCTO)  LIKE ? AND P.PRECIOPRODUCTO>=? AND P.PRECIOPRODUCTO <=?);";
    }else{
      let o = order == 1 ? 'DESC':'ASC';
      querySql= "SELECT P.NOMBREPRODUCTO as 'name', P.IDPRODUCTO, P.IMAGENPRODUCTO as 'img', M.NOMBRESUPERMERCADO, P.PRECIOPRODUCTO as 'precio' FROM PRODUCTO P JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO WHERE (LOWER(P.NOMBREPRODUCTO)  LIKE ? AND P.PRECIOPRODUCTO>=? AND P.PRECIOPRODUCTO <=?) ORDER BY P.PRECIOPRODUCTO "+o+";";
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
  const sql = `SELECT COMENTARIO, IDUSUARIO FROM comentarios WHERE productId = ?`;
  const values = [productId];
  con.connect(function(err) {
    if (err) throw err;
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al obtener los comentarios:', err);
      res.status(500).send('Error al obtener los comentarios');
    } else {
      console.log('Comentarios obtenidos correctamente');
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
  const sql = `INSERT INTO CARRITO (IDUSUARIO, FECHACREACION) VALUES (?, NOW())`;
  const values = [userId];
  con.connect(function(err) {
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
  con.connect(function(err) {
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
  con.connect(function(err) {
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

// Ruta para obtener el ahorro de un producto
app.get('/getAhorro/:productoId', (req, res) => {
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas
  const productoId = req.params.productoId;

  // Consulta para obtener el producto específico
  const sqlSelectProducto = `SELECT PRECIOPRODUCTO, NOMBREPRODUCTO FROM PRODUCTO WHERE IDPRODUCTO = ?`;
  const selectProductoValues = [productoId];
  con.connect(function(err) {
    if (err) throw err;
  con.query(sqlSelectProducto, selectProductoValues, (err, resultProducto) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      res.status(500).send('Error al obtener el producto');
    } else {
      const producto = resultProducto[0];

      // Consulta para obtener el producto más caro con el mismo nombre
      const sqlSelectMaxPrecio = `SELECT MAX(PRECIOPRODUCTO) AS MAXPRECIO FROM PRODUCTO WHERE NOMBREPRODUCTO LIKE = ?`;
      //const selectMaxPrecioValues = [producto.NOMBREPRODUCTO];
      const selectMaxPrecioValues = [`%${producto.NOMBREPRODUCTO}%`];
      con.query(sqlSelectMaxPrecio, selectMaxPrecioValues, (err, resultMaxPrecio) => {
        if (err) {
          console.error('Error al obtener el producto más caro:', err);
          res.status(500).send('Error al obtener el producto más caro');
        } else {
          const maxPrecio = resultMaxPrecio[0].MAXPRECIO;
          const ahorro = maxPrecio - producto.PRECIOPRODUCTO;
          const respuesta = {
            productoId,
            nombreProducto: producto.NOMBREPRODUCTO,
            precioProducto: producto.PRECIOPRODUCTO,
            ahorro,
          };

          res.status(200).json(respuesta);
        }
      });
    }
  });
});
});
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

    con.connect(function (err) {// se abre la coneccion con la BD
      if (err) throw err; // validacion de apertura
      con.query("INSERT INTO usuario (IDUSUARIO,NOMBREUSUARIO,EMAILUSUARIO) VALUES (?,?,?) ON duplicate KEY UPDATE ULTIMACONEXION=current_timestamp();",[userId,userName,userEmail], function (err, result, fields) { // se envía la petición a DB
        if (err) throw err; // valida peticion enviada corrrectamente
      });
    });


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
  con.connect(function(err) {
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
    
 
app.get('/getComentarios', (req, res) => {
var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

con.connect(function(err) {// se abre la coneccion con la BD
  if (err) throw err; // validacion de apertura
// Ruta para obtener todos los comentarios

  const sql = 'SELECT COMENTARIO, IDUSUARIO, IDPRODUCTO FROM COMENTARIO';

  con.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los comentarios:', err);
      res.status(500).send('Error al obtener los comentarios');
    } else {
      console.log('Comentarios obtenidos correctamente');
      res.status(200).json(results);
    }
  });
});
});


app.get('/getProductosEnOferta', (req, res) => {

  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

  con.connect(function (err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT P.NOMBREPRODUCTO as 'name', P.IDPRODUCTO, P.IMAGENPRODUCTO as 'img', M.NOMBRESUPERMERCADO, (P.PRECIOPRODUCTO * (1-CP.VALORCARACTERISTICA)) as 'precio' FROM PRODUCTO P JOIN CPERTENECEP CP ON P.IDPRODUCTO = CP.IDPRODUCTO JOIN SUPERMERCADO M ON P.IDSUPERMERCADO = M.IDSUPERMERCADO JOIN CARACTERISTICASPRODUCTO C ON CP.IDCARACTERISTICA = C.IDCARACTERISTICA WHERE C.NOMBRECARACTERISTICA = 'Oferta' ;", function (err, result, fields) { // se envía la petición a DB

    if (err) throw err; // valida peticion enviada corrrectamente
    res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
      
  });
});
});

app.get('/getProductosMasVendidos', (req, res) => {
  
  var conn = require('./DBConection.js'); // !!INCLUIR SIEMPRE!!  se incluye archivo DBConection.js
  var con = conn.con(); // se llama la funcion createConection(), se almacena en con, esta es una variable para realizar la conección, no es la coneccion ni realiza consultas

  con.connect(function(err) {// se abre la coneccion con la BD
    if (err) throw err; // validacion de apertura
    con.query("SELECT IDPRODUCTO as id, NOMBREPRODUCTO as nombre,supermercado.NOMBRESUPERMERCADO as supermercado, PRECIOPRODUCTO as precio, DESCRIPCIONPRODUCTO as descricion, IMAGENPRODUCTO as imagen FROM `producto` JOIN supermercado WHERE supermercado.IDSUPERMERCADO = producto.IDSUPERMERCADO order by CANTIDADVENDIDA desc limit 5;", function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});


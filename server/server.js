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

app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // Acceder a los datos del usuario autenticado
    const user = req.oidc.user;

    // Extraer información específica del usuario
    const userId = user.sub; // ID del usuario
    const userName = user.name; // Nombre del usuario
    const userEmail = user.email; // Email del usuario
    const userPicture = user.picture; // URL de la imagen del usuario


    // Redirigir al usuario a localhost:3000 con los datos del usuario como parámetros de consulta
    res.redirect(`http://localhost:3000/?userId=${userId}&userName=${userName}&userEmail=${userEmail}&userPicture=${userPicture}`);
  } else {
    res.send('Log in');
  }
});


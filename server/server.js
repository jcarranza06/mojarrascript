const express = require('express')
const app = express()

app.get('/api', (req, res) => {

})

app.listen(5000, ()=> {
    console.log('Servidor iniciado en el puerto 5000');
})
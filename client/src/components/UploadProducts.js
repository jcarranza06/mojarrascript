import React, { useState } from "react";

function UploadProducts() {
    const [busqueda, setBusqueda] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const handleChange = event => {
        setBusqueda(event.target.value)
    }
    const handleChangeP = event => {
        setPassword(event.target.value)
    }

    const sendReq = event => {
        const data = {
            data:busqueda,
            pass:password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        console.log(busqueda)
        // Petición HTTP, consulta api y devuelve el body 
        //let url = new URL("http://localhost:5000/uploadProducts?productsJson=" + busqueda);
        let url = new URL("http://localhost:5000/uploadProducts");
        console.log(url);
        setResponse("Enviando ...")
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
                const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
                setResponse(json.message)
                console.log(json.message);
            });
    }
    return (
        <>
            <div id="response">{response}</div>
            <input type="password" className='uploadInputPassowrd' onChange={handleChangeP} />
            <input type="text" className='uploadInput' onChange={handleChange} />
            <button
                onClick={() => (sendReq())}
            ></button>
        </>
    );
}

export default UploadProducts;
//IMPORTAR DEPENDENCIES
const{connection}= require("./database/connection");
const express= require("express");
const cors= require("cors");

//mensaje de bienvenidad
console.log("API NODE para Rubik arrancada!!");

//conexion a bbddd
connection();

//crear sevidor
const app= express();
const puerto=3550;

// configurar cors
app.use(cors());

//convertir los datos del body o objetos js

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cargar conf rutas
const UserRuter= require("./routes/products");



app.use("/api/producto",UserRuter);


//pone servidor a escuchar peticiones http
app.listen(puerto, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${puerto}`);  //mostrará en consola el puerto en el que está escuchando el server.  //esto es para que sepa que el server está funcionando correctamente.  //en caso de que el puerto esté ocupado, el server se reiniciará automaticamente.  //en caso de que la ruta sea incorrecta, el server responderá con un status 404 (Not Found).  //en caso de que la ruta sea correcta y el status sea 200 (OK), el server responderá con el JSON que se le pasó en la respuesta.  //en caso de que la ruta sea correcta y el status sea 201 (Created), el server responderá con el JSON que se le pasó en la respuesta y un status 20
})
const express = require('express')
require('dotenv').config();
const {create} = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
const viewsRoutes = require("./routes/views.routes.js")
const skatersRoutes = require("./routes/skaters.routes.js")

const app = express()
const hbs = create({partialsDir: [__dirname + "/views/partials"]})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use( expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
    })
    );

// Configuracion de Handlebars
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine)
app.set("views", __dirname + "/views")


//Carpeta publica
app.use("/public", express.static(__dirname + "/public")) 

//Endpoints
app.use("/api/v1/skaters", skatersRoutes)

//Vistas
app.use("/", viewsRoutes)

module.exports = app
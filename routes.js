const express = require('express')
const { Pool } = require('pg');
require('dotenv').config();
const {create} = require("express-handlebars");
const jwt = require('jsonwebtoken')
const expressFileUpload = require('express-fileupload');
const fileUpload = require("express-fileupload");


const app = express()
const hbs = create({partialsDir: ["views/partials/"]})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(__dirname + "/public"))

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine)
app.set("views", __dirname + "/views")

let config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}
const pool = new Pool(config)

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000")
})

const generarToken = (skater) =>{
    return jwt.sign(
        {
        exp: Math.floor(Date.now() / 1000) + 120,
        data: skater,
        },
        process.env.SECRET_KEY
        )
}

app.post("/login", async(req, res)=>{
    try {
        res.json("login exitoso")
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

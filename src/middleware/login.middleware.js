const jwt = require('jsonwebtoken')
const Skaters = require("../models/Skaters.js")
require('dotenv').config();

const emitirToken = async(req, res, next)=>{
    try {
        let {email, password} = req.body
        let skaters = await Skaters.findOne({
            raw: true,
            where:{
                email, 
                password
            }
        })
        console.log(req.body)
        if(!skaters){
            res.status(400).send({
                code: 400, 
                message: "Correo o contraseña incorrecta"
            })
        }else{
            let token = jwt.sign(
                {
                exp: Math.floor(Date.now() / 1000) + 120,
                data: skaters,
                },
                process.env.SECRET_KEY
                )
                req.token = token
                req.skaters = skaters
               next()
        }
       
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const verificarToken = async(req, res, next) =>{
    try {
        const token = req.query.token;
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if (err) {
                    res.status(401).send("Acceso no autorizado");
                } else {
                    req.usuario = data
                    next();
                }
            });
        }else{
            res.status(401).send("Acceso no autorizado");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = {
    emitirToken: emitirToken,
    verificarToken: verificarToken
};
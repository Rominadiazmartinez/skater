const Skaters = require("../models/Skaters.js")
const path = require("path")


const ruta = path.resolve(__dirname, "..", "public", "img");

const registrarSkaters = async(req, res) =>{
    try {
        let {email, nombre, password, experiencia, especialidad} = req.body
        console.log(req.files)
        let {foto} = req.files
        foto.mv(`${ruta}/${nombre}.jpg`)

        let nuevoUsuario = await Skaters.create({
            email: email,
            nombre: nombre,
            password: password,
            anos_experiencia: experiencia,
            especialidad: especialidad,
            foto:`${nombre}.jpg`,
            estado: false
        })
        res.status(201).send({
            code: 201, 
            data: nuevoUsuario,
            message: "Usuario creado con éxito"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const modificarSkaters = async(req, res) =>{
    try {
        let {email, nombre, password, experiencia, especialidad} = req.body
        let datosSkater = {
            nombre: nombre,
            password: password,
            anos_experiencia: experiencia,
            especialidad: especialidad,
        }
        let skaterModificado = await Skaters.update(datosSkater,
            {
                where: { 
                    email
                }
            }
        )
        res.status(201).send({
            code: 201, 
            data: skaterModificado,
            message: "El usuario ha sido modificado con éxito"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const eliminarSkater = async(req, res) =>{
    try {
        let {id} = req.params
        await Skaters.destroy({
            where: {
                id
            }
        })
        res.status(200).send({
            code: 200, 
            message: "El usuario ha sido eliminado con éxito"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const skaterLogin = async(req, res) =>{
    try {
        res.status(200).send({
            code: 200, 
            message: "Login exitoso",
            skater: req.skaters,
            token: req.token
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const buscarSkater = async(req, res) =>{
    try {
        let {id} = req.params
        let skater = await Skaters.findOne({
            raw: true,
            where: {
                id
            }
        })

        res.status(200).send({
            data: skater,
            code: 200, 
            message: "El usuario ha sido encontrado con éxito"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const modificarEstado = async(req, res) =>{
    try {
        let {estado} = req.body
        let {id} = req.params

        console.log(estado)
        
        let skaterModificado = await Skaters.findOne({
            where:{
                id
            }
        })
        if(skaterModificado){

            skaterModificado.estado = estado
            await skaterModificado.save()
            res.status(201).send({
                code: 201, 
                data: skaterModificado,
                message: "El usuario ha sido modificado con éxito"
            })
        }else{
            res.status(400).send({
                code: 400, 
                message: "El Stakaker No existe en la base de datos"
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = {
    registrarSkaters: registrarSkaters,
    modificarSkaters: modificarSkaters,
    eliminarSkater: eliminarSkater,
    skaterLogin: skaterLogin,
    buscarSkater: buscarSkater,
    modificarEstado: modificarEstado
};
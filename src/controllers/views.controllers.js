const Skaters = require("../models/Skaters.js")

const viewHome = async (req, res) =>{
    try {
        let allSkaters = await Skaters.findAll({
            raw: true
        })
        res.render("home", {
            allSkaters,
            layout: "main"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const viewLogin = async(req, res) =>{
    try {
        res.render("login")
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const viewRegister = async(req, res) =>{
    try {
        res.render("register")
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const viewAdmin = async(req, res) =>{
    try {
        let allSkaters = await Skaters.findAll({
            raw: true
        })
        res.render("admin", {
            allSkaters
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const viewCuenta = async(req, res) =>{
    try {
        res.render("cuenta")
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = {
    viewHome: viewHome,
    viewLogin: viewLogin,
    viewRegister: viewRegister,
    viewAdmin: viewAdmin,
    viewCuenta: viewCuenta
};
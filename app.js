const app = require("./src/index.js")
const db = require("./src/database/config.js")
const Skaters = require("./src/models/Skaters.js")

const PORT = 3000
const main = async () =>{
    try {
        await db.authenticate()
        await db.sync({
            force: false, 
            alter: false
        })
    app.listen(PORT, () =>{
        console.log("Servidor escuchando en el puerto 3000")
    })
    } catch (error) {
        console.log(error)
    }
}

main()
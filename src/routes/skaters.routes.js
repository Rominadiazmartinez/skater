const {Router} = require("express")
const {registrarSkaters, modificarSkaters, eliminarSkater, skaterLogin, buscarSkater, modificarEstado} = require("../controllers/skaters.controllers.js")
const router = Router()
const {emitirToken} = require("../middleware/login.middleware.js")

router.post("/", registrarSkaters)
router.put("/update", modificarSkaters)
router.delete("/delete/:id", eliminarSkater)
router.post("/login", emitirToken, skaterLogin)
router.post("/register", registrarSkaters)
router.get("/buscar/:id", buscarSkater)
router.put("/updateEstado/:id", modificarEstado)

module.exports = router
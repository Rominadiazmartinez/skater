const {Router} = require("express")
const {viewHome, viewLogin, viewRegister, viewAdmin, viewCuenta} = require("../controllers/views.controllers.js")
const {verificarToken} = require("../middleware/login.middleware.js")
const router = Router()

router.get(["/"], viewHome)
router.get("/login",viewLogin)
router.get("/register",viewRegister)
router.get("/admin", viewAdmin)
router.get("/cuenta/:id", verificarToken, viewCuenta)

module.exports = router
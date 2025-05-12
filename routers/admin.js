const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("admin")
})

module.exports = router

// continuar con las partes de administrador (cargar img)
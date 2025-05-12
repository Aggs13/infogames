const express = require("express")
const router = express.Router()
const crud = require("../models/crudIndex")

router.get("/",crud.getJuegos,)
router.get("/cerrarSesion/:idUsuario",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})
module.exports = router
    const express = require("express")
    const router = express.Router()
    const crud = require("../models/crudAcceder")

    router.get("/",(req,res)=>{
        res.render("acceder")
    })

    router.post("/iniciar",crud.iniciarSesion)
    router.post("/registro",crud.postUsuario)


    module.exports = router
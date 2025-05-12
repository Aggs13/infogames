const express = require("express")
const crud = require("../models/crudJuegos")
module.exports = (upload) => {
    const router = express.Router()

    router.get("/",crud.getJuego,(req,res)=>{
        res.render("juegosAdmin")
    })



    router.post("/",upload.single("portadaImg"),crud.postJuego,(req,res)=>{
        if(!req.file){
            console.log("no se pudo subir la img")
        }else{
            res.redirect("/")
        }
    })


    router.get("/editar/:idJuego",crud.getEditJuego)
    router.post("/editar/:idJuego",crud.editJuegoAccion)
    router.get("/eliminar/:idJuego",crud.deleteJuego)

    router.get("/captura/:idJuego",crud.getCaptura)
    router.post("/captura/:idJuego",upload.single("capturaImg"),crud.postCaptura,(req,res)=>{
        if(!req.file){
            console.log("no se pudo subir la img")
        }else{
            res.redirect("/")
        }
    })

    router.get("/captura/eliminar/:idCaptura",crud.deleteCaptura)
    return router
}

const express = require("express")
const router = express.Router()

module.exports = (upload)=>{

    // Admin
    const adminRouter = require("./admin")
    router.use("/admin",verficarRol("admin"),adminRouter)
    //juegos Admin
    const agregarJuegoRouter = require("./juegosAdmin")(upload)
    router.use("/juegosAdmin",verficarRol("admin"),agregarJuegoRouter)
    //anuncios Admin
    const agregarAnuncioRouter = require("./anunciosAdmin")(upload)
    router.use("/anunciosAdmin",verficarRol("admin"),agregarAnuncioRouter)
    // Juego
    const juegoRouter = require("./juego")
    router.use("/juego",juegoRouter)
    // Acceder
    const accederRouter = require("./acceder")
    router.use("/acceder",accederRouter)
    // categorias 
    const categoriasRouter = require("./categorias")
    router.use("/categoria",categoriasRouter)
    // Ver juego por requisitos
    const mediosRouter = require("./juegoRequisitos")
    router.use("/Requisitos",mediosRouter)
    // Todos los juegos
    const todosLosJuegosRouter = require("./todosLosJuegos")
    router.use("/todos_los_juegos",todosLosJuegosRouter)
    // INDEX
    const indexRouter = require("./index")
    router.use("/",indexRouter)

function verficarRol(rolUsuario){
    return function(req,res,next){
        if(req.session.rol == rolUsuario){
            next()
        }else{
            res.send("no es posible ingresar")
        }
    }
}

function verficarSesion() {
    if(!req.session.rol){
        res.send("no es posible ingresar")
    }
}

return router
}

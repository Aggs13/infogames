    const juegosAdmin = require("../routers/juegosAdmin")
    const getCrud = require("./conexion")
    const fs = require("fs")


    exports.postJuego = async(req,res)=>{

        let urlGamePlay = req.body.urlGamePlay
        const parteUno = urlGamePlay.split("v=")
        const parteDos = parteUno[1].split("&")
        const idVideo = parteDos[0]
        urlGamePlay = "https://www.youtube.com/embed/"+idVideo
        const titulo = req.body.titulo

        const datosJuego = {

            titulo_juego:req.body.titulo,
            descripcion_juego : req.body.descripcion,
            nota_juego : req.body.nota,
            portadaPath_juego : req.file.path,
            categoria_juego : req.body.categoria,
            requisitos_juego : req.body.requisitos,
            salida_juego : req.body.salida,
            url_juego : titulo.replace(/ /g,"_"),
            url_gameplay_juego:urlGamePlay
            
        }

        try {
            const crud = await getCrud()
            await crud.execute("INSERT INTO juegos (titulo_juego , descripcion_juego , nota_juego , portadaPath_juego , categoria_juego , requisitos_juego , salida_juego , url_juego , url_gameplay_juego) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",[
                req.body.titulo,
                req.body.descripcion,
                req.body.nota,
                req.file.path,
                req.body.categoria,
                req.body.requisitos,
                req.body.salida,
                titulo.replace(/ /g,"_"),
                urlGamePlay
            ])
        } catch (error) {
            res.send("Error")
            console.log(error)
        }

    }

    exports.getJuego = async(req,res)=>{
        try {
            const crud = await getCrud()
            const [juegos] = await crud.execute("SELECT * FROM juegos ORDER BY id_juego DESC")
            res.render("juegosAdmin",{juegos:juegos})

        } catch (error) {
            res.send("Error")
            console.log(error)
        }

    }

    exports.deleteJuego = async(req,res)=>{
        idJuego = parseInt(req.params.idJuego,10)

        try {
            const crud = await getCrud()
            const [resultJuego] = await crud.execute("SELECT * FROM juegos WHERE id_juego = ?",[idJuego])
            const portadaPath = resultJuego[0].portadaPath_juego

            await crud.execute("DELETE FROM juegos WHERE id_juego = ?",[idJuego])

            fs.unlink(portadaPath,(fsError)=>{
                if(fsError){
                    console.log(fsError)
                }else{
                    console.log("se elimino de uploads")
                }
            })



        } catch (error) {
            res.send("Error")
            console.log(error)
        }
    }

    exports.getEditJuego = async(req,res)=>{

        try {        
            const idJuego = parseInt(req.params.idJuego,10)
            
            const crud = await getCrud()
            const [juegoSeleccionado] = await crud.execute("SELECT * FROM juegos WHERE id_juego = ?",[idJuego])

            const titulo = juegoSeleccionado[0].titulo_juego
            const descripcion = juegoSeleccionado[0].descripcion_juego
            const nota = juegoSeleccionado[0].nota_juego
            const categoria = juegoSeleccionado[0].categoria_juego
            const requisitos = juegoSeleccionado[0].requisitos_juego
            const urlJuego = juegoSeleccionado[0].url_juego
            const urlGamePlay = juegoSeleccionado[0].url_gameplay_juego
            const salida = juegoSeleccionado[0].salida_juego

            res.render("editarJuego",{titulo:titulo,descripcion:descripcion,nota:nota,categoria:categoria,requisitos:requisitos,idJuego:idJuego,urlJuego:urlJuego,urlGamePlay:urlGamePlay,salida:salida})

        } catch (error) {
            res.send("Error")
            console.log(error)
        }
    }

    exports.editJuegoAccion = async(req,res)=>{
        const idJuego = parseInt(req.params.idJuego,10)
        let urlGamePlay = req.body.urlGamePlay

        if(urlGamePlay.includes("v=") &&  urlGamePlay.includes("&")){
            const parteUno = urlGamePlay.split("v=")
            const parteDos = parteUno[1].split("&")
            const idVideo = parteDos[0]
            urlGamePlay = "https://www.youtube.com/embed/"+idVideo
        }

        const salida = req.body.salida
        const titulo =  req.body.titulo
        const urlJuego = titulo.replace(/ /g,"_")

        const datoEditados = {

            titulo_juego : req.body.titulo,
            descripcion_juego : req.body.descripcion,
            nota_juego : req.body.nota,
            categoria_juego : req.body.categoria,
            requisitos_juego : req.body.requisitos,
            url_juego : urlJuego,
            url_gameplay_juego : urlGamePlay,
            salida_juego : salida
        }

        try{
            const crud = await getCrud()
            await crud.query("UPDATE juegos SET ? WHERE id_juego = ?",[datoEditados,idJuego])
            res.redirect("/juegosAdmin")
        }catch(error){
            res.send("Error")
            console.log(error)
        }

    }

    exports.getCaptura = async(req,res)=>{
        try {
            const idJuego = parseInt(req.params.idJuego,10)
            const crud = await getCrud()
            const [results] = await crud.execute("SELECT * FROM capturas WHERE id_juego_captura = ?",[idJuego])
            res.render("capturas",{capturas:results,idJuego})
        } catch (error) {
            res.send("Error")
            console.log(error)
        }
    }

    exports.postCaptura = async(req,res)=>{
        path = req.file.path
        const idJuego = parseInt(req.params.idJuego,10)

        const captura = {
            path_captura: path,
            id_juego_captura: idJuego
        }

        try {
            const crud = await getCrud()
            await crud.execute("INSERT INTO capturas ( path_captura , id_juego_captura) VALUES ( ? , ? )",[path, idJuego])
            res.redirect("/juegosAdmin/captura/"+ idJuego)
            console.log("Se agrego la captura!!") 
        } catch (error) {
            res.send("Error")
            console.log(error)
        }
    }

    exports.deleteCaptura = async(req,res)=>{
        const idCaptura = parseInt(req.params.idCaptura,10)
        const crud = await getCrud()
        try {
            const [results] = await crud.execute("SELECT * FROM capturas WHERE id_captura = ?",[idCaptura])
            const pathCaptura = results[0].path_captura 
            const idJuego = results[0].id_juego_captura
            await crud.execute("DELETE FROM capturas WHERE id_captura = ?",[idCaptura])

            fs.unlink(pathCaptura,(fsError)=>{
                if(!fsError){
                    console.log("se elimino la captura")
                }else{
                    console.log(fsError)
                }
                console.log(idJuego)
                res.redirect("/juegosAdmin/captura/"+idJuego)
            })

        } catch (error) {
            console.log(error)
            res.send("error")
        }

    }
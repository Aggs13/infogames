const getCrud = require("./conexion")


exports.getJuego = async(req,res)=>{
    const idJuego = req.params.idJuego

    try {
            
        const crud = await getCrud()
        const [juego] = await crud.execute("SELECT * FROM juegos WHERE id_juego = ?",[idJuego])
        const [capturas] = await crud.execute("SELECT * FROM capturas WHERE id_juego_captura = ?",[idJuego])
        
        datosJuego = {
            titulo: juego[0].titulo_juego,
            descripcion: juego[0].descripcion_juego,
            portada: juego[0].portadaPath_juego,
            nota: juego[0].nota_juego,
            categoria: juego[0].categoria_juego,
            requisitos: juego[0].requisitos_juego,
            urlGamePlay: juego[0].url_gameplay_juego
        }

        res.render("juego",{juego:datosJuego,captura:capturas})
    } catch (error) {
        console.log(error)
    }


}
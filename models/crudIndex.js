const getCrud = require("./conexion")

exports.getJuegos = async(req,res)=>{
    const nombreUsuario = req.session.usuario
    const idUsuario =  req.session.idUsuario
    const sesion = req.session.logeo

    try {
    
        const crud = await getCrud()
        const [juego] = await crud.execute("SELECT * FROM juegos ORDER BY id_juego DESC") 
        const [anuncio] = await crud.execute("SELECT * FROM anuncio ORDER BY id_anuncio DESC")

        res.render("index",{juegos:juego,nombreUsuario,idUsuario,sesion,anuncios:anuncio})
    } catch (error) {
        console.error(error);
    }

}


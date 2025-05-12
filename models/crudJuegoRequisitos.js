const getCrud = require("./conexion")

exports.getJuegosMed = async(req,res)=>{
    const medRequisitos = "medios"
    try {
        const crud = await getCrud()
        const [results] = await crud.execute("SELECT * FROM juegos WHERE requisitos_juego = ? ORDER BY id_juego DESC",[medRequisitos])
        res.render("mediosRequisitos",{juegosMed:results})

    } catch (error) {
        res.send("Error")
        console.log(error)
    }

}

exports.getJuegosBajos = async(req,res)=>{

    try {
        const bajosRequisitos = "bajos"
        const crud = await getCrud()
        const [results] = await crud.execute("SELECT * FROM juegos WHERE requisitos_juego = ? ORDER BY id_juego DESC",[bajosRequisitos])
        res.render("bajosRequisitos",{juegosBajos:results})

    } catch (error) {
        res.send("Error")
        console.log(error)
    }
}
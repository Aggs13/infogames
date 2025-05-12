const getCrud = require("./conexion")

exports.getJuegos = async(req,res)=>{

    try {
        const crud = await getCrud()
        const [results] = await crud.execute("SELECT * FROM juegos ORDER BY id_juego DESC")
        res.render("todosLosJuegos",{juegos:results})

    } catch (error) {
        res.send("Error")
        console.log(error)
    }
}
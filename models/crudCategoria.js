const getCrud = require("../models/conexion")

exports.getCategoria = async(req,res)=>{
    const categoria = req.params.categoria.toLowerCase().trim()
    const crud = await getCrud()
    const [results] = await crud.execute("SELECT * FROM juegos WHERE categoria_juego = ?",[categoria])
    res.render("categorias", {results:results})
}
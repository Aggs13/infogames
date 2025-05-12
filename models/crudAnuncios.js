const getCrud = require("./conexion")
const fs = require("fs")


exports.postAnuncio = async(req,res)=>{

    try {

        const crud = await getCrud()
        await crud.execute("INSERT INTO anuncio (imgpath_anuncio,titulo_anuncio,texto_anuncio) VALUES(?,?,?)",[ req.file.path,req.body.titulo,req.body.texto])
        res.redirect("/AnunciosAdmin")
    } catch (error) {
        res.send("error")
        console.log(error)
    }

}


exports.getAnuncio = async(req,res)=>{
    const crud = await getCrud()
    const [results] = await crud.execute("SELECT * FROM anuncio")
    res.render("anunciosAdmin",{anuncios:results})
}


exports.deleteAnuncio = async(req,res)=>{
    const idAnuncio = req.params.idAnuncio
    const crud = await getCrud()
    const [results] = await crud.execute("SELECT * FROM anuncio")
    await crud.execute("DELETE FROM anuncio WHERE id_anuncio = ?", [idAnuncio])
    const pathAnuncio = results[0].imgpath_anuncio
    res.redirect("/AnunciosAdmin")

    fs.unlink(pathAnuncio,(fsError)=>{
        if(fsError){
            console.log(fsError)
        }else{
            console.log("se elimino de uploads")
        }
    })
}
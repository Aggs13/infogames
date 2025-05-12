const express = require("express")
const router = express.Router()
const crud = require("../models/crudAnuncios")
module.exports = (upload) => {

    router.get("/",crud.getAnuncio)
    router.post("/",upload.single("imgAnuncio"),crud.postAnuncio)
    router.get("/eliminar/:idAnuncio",crud.deleteAnuncio)

    return router
}



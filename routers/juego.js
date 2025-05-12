const express = require("express")
const router = express.Router()
const crud = require("../models/crudJuego")

router.get("/:urlJuego/:idJuego",crud.getJuego)

module.exports = router
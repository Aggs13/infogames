const express = require("express")
const router = express.Router()
const crud = require("../models/crudJuegoRequisitos")

router.get("/Medios",crud.getJuegosMed)
router.get("/bajos",crud.getJuegosBajos)
module.exports = router
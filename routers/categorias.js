const express = require("express")
const router = express.Router()
const crud = require("../models/crudCategoria")
router.get("/:categoria",crud.getCategoria)

module.exports = router
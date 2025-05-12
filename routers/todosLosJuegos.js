const express = require("express")
const router = express.Router()
const crud = require("../models/crudTodosLosJuegos")

router.get("/",crud.getJuegos)

module.exports = router
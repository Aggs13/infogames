const getCrud = require("./conexion")
const bcripjs = require("bcryptjs")

exports.postUsuario = async(req,res)=>{    
    try {

        const usuario = req.body.nombreRegis
        const gmail = req.body.emailRegis
        const pass = req.body.passRegis
        const rol = "normal"
        const passHash = await bcripjs.hash(pass,8)

        const crud = await getCrud()
        await crud.execute("INSERT INTO usuarios (nombre_user,gmail_user,pass_user,rol_user) VALUES (?,?,?,?)",[usuario,gmail,passHash,rol])
        res.redirect("/")

    } catch (error) {
        console.log(error)
    }
}

exports.iniciarSesion = async(req,res)=>{
    

    try {
        const usuario = req.body.nombreIniciar
        let pass = req.body.passIniciar
        const crud = await getCrud()
        if(usuario && pass){
            const [results] = await crud.execute("SELECT * FROM usuarios WHERE nombre_user = ?",[usuario])

                if (results.length > 0) {

                    req.session.logeo = true
                    req.session.idUsuario = results[0].id_user
                    req.session.usuario = results[0].nombre_user
                    req.session.gmail = results[0].gmail_user
                    req.session.rol = results[0].rol_user

                    pass = await bcripjs.compare(pass,results[0].pass_user)

                    res.redirect("/")
                } else {

                }
            }
    }catch (error) {
        console.log(error)
    } 
}

const {Componente, Fabricante, Producto} = require('../mongoSchema')
const middleware = {}

const validarComponenteId = (req,res,next)=>{
    const id = req.params.id
    const componente = Componente.findByPk(id)
    const fabricante = Fabricante.findByPk(id)
    const producto = Producto.findByPk(id)
    if(!componente && !fabricante && !producto){
        res.status(404).json({message:`el ${id} no existe`})
    }
    next()
}

middleware.validarComponenteId = validarComponenteId

module.exports = middleware
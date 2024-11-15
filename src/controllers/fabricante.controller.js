const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const controller = {}

const getAllFabricantes = async(req,res)=>{
    const fabricantes = await Fabricante.find({})
    res.status(200).json(fabricantes)
}

controller.getAllFabricantes = getAllFabricantes


const getFabricanteById = async(req,res)=>{
    const id = req.params.id
    const fabricante = await Fabricante.findById({_id:id}).populate("productos")
    res.status(200).json(fabricante)
}

controller.getFabricanteById = getFabricanteById

const postFabricante = async(req,res)=>{
    const {nombre, direccion, numeroContacto, pathImgPerfil} = req.body
    const fabricanteNuevo = await Fabricante.create({
        nombre,
        direccion,
        numeroContacto,
        pathImgPerfil
    }) 
    res.status(201).json(fabricanteNuevo)
}
controller.postFabricante = postFabricante

const deleteFabricanteById = async(req,res)=>{
    const idFabricante = req.params.id
    const r = await Fabricante.findByIdAndDelete({_id: idFabricante })
    res.status(204).json({ mensaje: `filas afectados ${r}` })
}

controller.deleteFabricanteById = deleteFabricanteById

const updateFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    const id = req.params.id
    const fabricante = await Fabricante.findByIdAndUpdate({_id:id},
        {$set : {nombre, direccion, numeroContacto, pathImgPerfil}}, {new:true}
    )
    res.status(200).json(fabricante)
}
controller.updateFabricante = updateFabricante


//HACE LO MISMO QUE GET BY ID
const getFabricanteAndProductosById = async (req, res) => {
    const id = req.params.id
    const fabricante = await Fabricante.findById(id).populate("productos")
    res.status(200).json(fabricante)
}

controller.getFabricanteAndProductosById = getFabricanteAndProductosById

module.exports = controller
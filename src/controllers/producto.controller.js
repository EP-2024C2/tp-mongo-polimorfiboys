const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const mongoose = require('mongoose')
const { $_match } = require('../schemas/producto.schema')
const controller = {}


const getAllProductos = async (req, res) => {
    const productos = await Producto.find({})
    res.status(200).json(productos)
}

controller.getAllProductos = getAllProductos


const getProductoById = async (req, res) => {
    const idProducto = req.params.id
    const idProd = idProducto.toString()
    const producto = await Producto.find({ _id: idProd })
    res.status(200).json(producto)
}

controller.getProductoById = getProductoById

//REVISAR COMO HACER CORREGIR
const getProductoAndFabricantesById = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.aggregate[{
        $_match: {_id:id}
    },
    {
        $lookup: {
            from: "Fabricante",
            localfield: "id",
            foreignField: "productos",
            as: "fabricante" 
        }
    },
    {
        $proyect: {
            _id: 0,
            nombre:1,
            direccion:1,
            numeroContacto:1,
            pathImgPerfil:0,
            "producto.nombre":1,
            "producto.descripcion":0,
            "producto.precio":1,
            "producto.pathImg":0
        }
    }]
    console.log(producto)
    res.status(200).json(producto)
}

controller.getProductoAndFabricantesById = getProductoAndFabricantesById



const postProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body
    const productoNuevo = await Producto.create({
        nombre,
        descripcion,
        precio,
        pathImg
    })
    res.status(201).json(productoNuevo)
}
controller.postProducto = postProducto


const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body
    const id = req.params.id
    const producto = await Producto.findByIdAndUpdate({ _id: id }, {
        $set: { nombre, descripcion, precio, pathImg }
    }, { new: true })

    res.status(200).json(producto)
}
controller.updateProducto = updateProducto

const deleteProductoById = async (req, res) => {
    const idProducto = req.params.id
    const r = await Producto.findByIdAndDelete({ _id: idProducto })
    res.status(204).json({ mensaje: `filas afectados ${r}` })
}

controller.deleteProductoById = deleteProductoById

//REVISAR COMO HACER CORREGIR
const addFabricanteToProducto = async (req, res) => {
    const idProducto = req.params.id
    const nuevoFabricante = { ...req.body, productos: new mongoose.Types.ObjectId(idProducto) }
    const fabricante = await Fabricante.create(nuevoFabricante)
    res.status(201).json(fabricante)
}

controller.addFabricanteToProducto = addFabricanteToProducto


const addComponenteToProducto = async (req, res) => {
    const idProducto = req.params.id
    const producto = await Producto.findByIdAndUpdate(
        idProducto,
        { $push: { componente: req.body } },
        { new: true }
    )
    res.status(201).json({ mesagge: "Componente agregado al producto" })
}

controller.addComponenteToProducto = addComponenteToProducto


module.exports = controller
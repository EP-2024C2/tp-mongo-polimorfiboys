const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
//const mongoose = require('mongoose')
const mongoose = require("../db/mongo.db").mongoose;
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
    const id = new mongoose.Types.ObjectId(req.params.id)
    const producto = await Producto.aggregate([{
        $match: { _id: id }
    },
    {
        $lookup: {
            from: "fabricantes",
            localField: "_id",
            foreignField: "productos",
            as: "fabricante"
        }
    },
    {
        $project: {
            _id: 1,
            nombre: 1,
            descripcion: 1,
            precio: 1,
            "fabricante._id":1,
            "fabricante.nombre": 1,
            "fabricante.direccion": 1,
            "fabricante.numeroContacto": 1,
        }
    }])
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
    await Fabricante.updateMany(
        {productos: idProducto},
        { $pull : {productos: idProducto}}
    )
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
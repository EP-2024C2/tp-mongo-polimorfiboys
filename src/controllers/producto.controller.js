const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const controller = {}


const getAllProductos = async (req, res) => {
    const productos = await Producto.find({})
    res.status(200).json(productos)
}

controller.getAllProductos = getAllProductos


const getProductoById = async (req, res) => {
    const idProducto = req.params.id
    const idProd = idProducto.toString()
    const producto = await Producto.find({_id:idProd})
    res.status(200).json(producto)
}

controller.getProductoById = getProductoById

//REVISAR COMO HACER CORREGIR
const getProductoAndFabricantesById = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.findOne({
        where: {id},
        include:{
            model:Fabricante,
            through:{
                attributes: []
            }
        }
    })

    res.status(200).json(producto)
}

controller.getProductoAndFabricantesById = getProductoAndFabricantesById

//REVISAR COMO HACER CORREGIR
const getProductoAndComponentesById = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.findOne({
        where: {id},
        include:{
            model:Componente,
            through:{
                attributes: []
            }
        }
    })
    res.status(200).json(producto)
}

controller.getProductoAndComponentesById = getProductoAndComponentesById




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
    const producto = await Producto.findByIdAndUpdate({_id:id},{
        $set: {nombre, descripcion, precio, pathImg}
    }, { new: true })
    
    res.status(200).json(producto)
}
controller.updateProducto = updateProducto

const deleteProductoById = async (req, res) => {
    const idProducto = req.params.id
    const r = await Producto.findByIdAndDelete({ _id:idProducto })
    res.status(204).json({ mensaje: `filas afectados ${r}` })
}

controller.deleteProductoById = deleteProductoById

//REVISAR COMO HACER CORREGIR
const addFabricanteToProducto = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    const idProducto = req.params.id
    const producto = await Producto.findByPk(idProducto)
    const fabricante = await Fabricante.create({ nombre, direccion, numeroContacto, pathImgPerfil })
    producto.addFabricante([fabricante])
    res.status(201).json({ mesagge: "Fabricante agregado al producto" })
}

controller.addFabricanteToProducto = addFabricanteToProducto

//REVISAR COMO HACER CORREGIR
const addComponenteToProducto = async (req, res) => {
    const { nombre, descripcion } = req.body
    const idProducto = req.params.id
    const producto = await Producto.findByIdAndUpdate(
        idProducto,
        {$push: { componente: req.body }},
        {new: true}
    )
    res.status(201).json({ mesagge: "Componente agregado al producto" })
}

controller.addComponenteToProducto = addComponenteToProducto


module.exports = controller
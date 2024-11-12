const mongoose = require("../db/mongo.db").mongoose;
const { Schema } = require("mongoose");
const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlenght: 255
    },
    direccion: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlenght: 255
    },
    numeroContacto: {
        type: Schema.Types.Number,
        required: true,
        minlenght: 7,
        maxlenght: 20
    },
    pathImgPerfil: {
        type: Schema.Types.String,
        required: true,
        minlength: 1,
        maxlenght: 255
    },
    productoId: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
    }
}
/*{
    collection:"fabricantes",
}*/)

const Fabricante = mongoose.model("Fabricante", fabricanteSchema)
module.exports = Fabricante
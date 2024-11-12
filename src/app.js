const express = require("express")
const dbCon = require("./db/mongo.db").connectToDatabase
const mongoose = require("./db/mongo.db").mongoose
const app = express()
const PORT = process.env.PORT ?? 3001
const productoRutas = require('./routes/producto.route')
const fabricanteRutas = require('./routes/fabricante.route')
const componenteRutas = require('./routes/componente.route')

app.use(express.json())
app.use(productoRutas)
app.use(fabricanteRutas)
app.use(componenteRutas)

app.listen(PORT, async()=>{
    await dbCon()
    console.log(`Aplicacion levantada en el puerto ${PORT}`)
})
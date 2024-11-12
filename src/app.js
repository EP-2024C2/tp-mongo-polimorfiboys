const express = require("express")
const dbCon = require("./db/mongo.db").connectToDatabase
const mongoose = require("./db/mongo.db").mongoose
const app = express()
const PORT = process.env.PORT ?? 3001


app.use(express.json())

app.listen(PORT, async()=>{
    await dbCon()
    console.log(`Aplicacion levantada en el puerto ${PORT}`)
})
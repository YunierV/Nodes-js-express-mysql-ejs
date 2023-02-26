const express = require('express')
const app = express()

const host = "localhost"
const port = 3000 

const{join}=require('path')

app.use(express.static('./modelo'))
app.use(express.static('./vistas'))
app.use(express.static('./controlador'))

app.set('views',join(__dirname,'./vistas'))
app.set('view engine','ejs')

app.use(express.urlencoded())
app.use(express.json())

app.use('/',require('./router'))

app.use((req,res)=>{
    res.status(404).send("ERROR 404")
})

app.listen(port,host,()=>{ //el orden primero port y luego host
    console.log(`app iniciada en http://${host}:${port}`)
})
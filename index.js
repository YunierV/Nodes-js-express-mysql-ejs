
//crea, junta una salida adecuada deacuerdo al sistema operativo
//const fileJoin = path.join('consumible','/propiedades','etc.js');
//console.log(fileJoin);
const{join}=require('path') //necesario ara que funciones e ingrese alos directorios y archivos de manera correcta

//vamos a utilizar el entorno de trabajo express para la pag
const express = require('express')
const app = express()
//import express from "express" //este funciona al poner en el package.json type module - ya en el package.json esta el comentario
//const app = express() //la parte del app es muy similar

//extracion o  importacion del modulo de la conexion a la base de datos
//let conexion = require("./modelo/dbConectar.js") //ya no es necesario al hacer las consultas en otro archivo controlador/crudClientes
//import {conexion} from "./modelo/dbConectar.js" //este funciona al poner en el package.json type module - ya en el package.json esta el comentario

//importacion de controler
let crudCliente = require("./controlador/crudClientes")

//directorios estaticos
app.use(express.static('./modelo'))
app.use(express.static('./vistas'))
app.use(express.static('./controlador'))

//para las vistas hay que indicarle a node cual va a ser el motor de vistas que vamos a utilizar y donde van a estar
//le vamos a indicar que va a haber una carpeta especifica donde se encuentra las vistas
//app.set('views','./vistas')//si los nombres de las carpetas estubiesen en ingles no habria necesidad de especificar esto por ya el node lo reconoceria
app.set('views',join(__dirname,'./vistas')) //necesario el path join para que funciones e ingrese alos directorios y archivos de manera correcta
//especificamos cual es el motor de vistas que vamos a utilizar
app.set('view engine','ejs')

const host = "localhost"
const port = 3000 

app.use(express.urlencoded()) //para que me lea lo ingresado por formularios
app.use(express.json())

app.get('/',crudCliente.mostrar)

//app.get('/',(req,res)=>{ //req-lo que se pide al cliente //res-lo que se le muestra o manda al cliente
    //res.send('hola putos, como estan')

    //funcion para ejecutar consulta en el get
    // conexion.query('select * from cliente',(error,result)=>{
    //     if(error){
    //         throw error
    //     }else{                          //en esta parte se declaro una variable resultado y se le dio los valores de la variable de la funcion result, para nuestra vista utilizamos resultado
    //         res.render('clientes/index',{resultado:result})
    //     }
    // })

    //no vamos a envar algo si no que lo vamos a renderizar
    //res.render('clientes/index')
//})

//guardar
app.get('/agregar',crudCliente.agregar)
app.post('/guardar',crudCliente.guardar)

//editar
app.get('/editar/:id',crudCliente.selecionId)
app.post('/editar',crudCliente.editar)

//eliminar
app.get('/borrar/:id',crudCliente.borrar)

app.use((req,res)=>{
    res.status(404).send("ERROR 404")
})

app.listen(port,host,()=>{ //el orden primero por y luego host
    console.log(`app iniciada en http://${host}:${port}`)
})

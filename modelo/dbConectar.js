const mysql = require('mysql')

//parece ser que estas conexones funcionan con el mysql del xampp como en PHP
let conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'acpagweb'
})

//metodo connet-sirve para indicar si hay una conexion
conexion.connect((err)=>{
    if(err){
        console.log('error en la conexion'+err.stack)
        return
    }

    console.log('conexion exitosa-id '+conexion.threadId)
})

//export{conectar} //este funciona al poner en el package.json type module - ya en el package.json esta el comentario
//exports.module(conexion) nose que es esto que hace pero parece funcionar
module.exports=(conexion)
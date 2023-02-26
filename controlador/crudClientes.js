const express = require('express')
const { query } = require('../modelo/dbConectar.js')


let conexion = require("../modelo/dbConectar.js")

let crudCliente = ({

    mostrar:(req,res)=>{
        conexion.query('select * from cliente',(error,result)=>{
                    if(error){
                        throw error
                    }else{                          //en esta parte se declaro una variable resultado y se le dio los valores de la variable de la funcion result, para nuestra vista utilizamos resultado
                        res.render('clientes/index',{resultado:result})
                    }
                })
    },

    agregar:(req,res)=>{
        res.render('clientes/agregar')
    },

    guardar:(req,res)=>{
        
        const nombre = req.body.txtnom
        const apellido = req.body.txtape
        const numDocumento = req.body.txtdoc

        conexion.query('insert into cliente set ?',{nombreCli:nombre, apellidoCli:apellido, numeroDoc:numDocumento},(error,result)=>{
            if(error){
                throw error
            }else{             
                res.redirect('/')
            }
        })
        
    },

    selecionId:(req,res)=>{ //es mas como un selecionar por id

        const id = req.params.id

        conexion.query('select * from cliente where id=?',[id],(error,result)=>{
            if(error){
                throw error
            }else{             
                res.render('clientes/editar',{cliente:result[0]})
            }
        })
    },

    editar:(req,res)=>{

        const id = req.body.txtid
        const nombre = req.body.txtnom
        const apellido = req.body.txtape
        const numDocumento = req.body.txtdoc

        conexion.query('update cliente set ? where id = ?',[{nombreCli:nombre, apellidoCli:apellido, numeroDoc:numDocumento}, id],(error,result)=>{ //[{nombreCli:nombre, apellidoCli:apellido, numeroDoc:numDocumento, id:id}] esto es consecutivo el orden en el que lo ponemos es como lo va a tomar, como primero ponemos el set nos coje los valore s nuevos y despues el where id 
            if(error){
                throw error
            }else{             
                res.redirect('../')
            }
        })
    },

    borrar:(req,res)=>{
        const id = req.params.id
        conexion.query('delete from cliente where id = ?',[id],(error,result)=>{
            if(error){
                throw error
            }else{             
                res.redirect('../')
            }
        })
    }

})

//funcion para ejecutar consulta en un archivo aparte
// crudCliente.mostrar = (req,res) =>{
//     conexion.query('select * from cliente',(error,result)=>{
//         if(error){
//             throw error
//         }else{                          //en esta parte se declaro una variable resultado y se le dio los valores de la variable de la funcion result, para nuestra vista utilizamos resultado
//             res.render('clientes/index',{resultado:result})
//         }
//     })
// }

module.exports=(crudCliente)
const express = require('express')
const router = express.Router()

let crudCliente = require("./controlador/crudClientes")



//mostrar
router.get('/',crudCliente.mostrar)

//guardar
router.get('/agregar',crudCliente.agregar)
router.post('/guardar',crudCliente.guardar)

//editar
router.get('/editar/:id',crudCliente.selecionId)
router.post('/editar',crudCliente.editar)

//eliminar
router.get('/borrar/:id',crudCliente.borrar)

module.exports = router

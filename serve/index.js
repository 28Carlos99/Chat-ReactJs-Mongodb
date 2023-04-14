import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import {PORT} from './config.js'
import mongoose from 'mongoose'
import router from './routes/message.js'
import bodyParser from 'body-parser'

//Mongoose configuration **********************************************************
var url = 'mongodb+srv://Admin:28Carlos99@cluster0.jwv0x.mongodb.net/?retryWrites=true&w=majority'
//Configuración para evitar fallos en la conexión con mongoDB
mongoose.Promise = global.Promise

const app = express()
const PORT = 4000

//Se crea el servidor con el modulo http
const Server = http.createServer(app)
const io = new SocketServer(Server, {
    core:{
        origin: '*'
    }
})

//Middlweres
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


//Conexion a la BD escuchando atraves de puerto 4000
mongoose.connect(url,{useNewUrlParser: true}).then(()=>{
    console.log('Conexion a la BD Exitosa')
    Server.listen(PORT,() => {
        console.log('Servidor ejecutandose en http://localhost:', PORT)
    })
})
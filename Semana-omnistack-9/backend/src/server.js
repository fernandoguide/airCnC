const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const socketio = require('socket.io');
const http = require ('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};



mongoose.connect(
    'mongodb+srv://fernando:omnistack@cluster0-15xlf.mongodb.net/semana09?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


    io.on('connection', socket =>{
        // console.log('Usuario conectado' , socket.id);
        // console.log(socket.handshake.query);
    
    // toda vez que o usuario se conectar na app vou buscar o id de dentro de socket.handshake.query 
        const { user_id } = socket.handshake.query;
        // salva uma nova info dentro do objeto 'connectedUsers'
        // utilizo os '[]' para pegar diretamente o id do usuario
        // e depois relaciono o id de conexao com o id de usuario
        connectedUsers[user_id] = socket.id;
        
    
        // envia os dados pelo backend para o frontend (socket.emit('parametro para enviar'))
        // setTimeout(()=>{
        //     socket.emit('hello', 'World');
        // },4000);
        
    
        // ouve a comunicacao entre o front com o Back , (socket.on('parametro para ouvir'))
        // recebe esses dados no parametro 'data' que sao passados pelo frontend e retorna no console do backend
        // socket.on('omni', data =>{
        //     console.log(data);
        // })
    
    });

    app.use((req,res,next) =>{
        req.io = io;
        req.connectedUsers = connectedUsers;
        return next()  ;
    })
    
    // definindo quem pode acessar a api
    // app.use(cors({ origin: 'http://localhost:3000'})); 
    app.use(cors());   
    app.use(express.json());
    app.use('/files',express.static(path.resolve(__dirname,'../', 'uploads')));
    app.use(routes);
    
    
    server.listen(3000);
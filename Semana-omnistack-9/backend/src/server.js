const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect(
    'mongodb+srv://fernando:omnistack@cluster0-15xlf.mongodb.net/semana09?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

// definindo quem pode acessar a api
// app.use(cors({ origin: 'http://localhost:3000'})); 
app.use(cors());   
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname,'../', 'uploads')));
app.use(routes);


app.listen(3000);
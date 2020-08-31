const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = 4005;

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    console.log('Evento disparado');

    res.send({status: 'ok'}); 
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
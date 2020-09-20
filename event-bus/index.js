const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = 4005;

const app = express();

const events = [];

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post("http://posts-clusterip-srv:4000/events", event);
    axios.post('http://comments-clusterip-srv:4001/events', event);
    axios.post('http://query-clusterip-srv:4002/events', event);
    axios.post('http://moderation-clusterip-srv:4003/events', event);

    console.log('Evento disparado');

    res.send({status: 'ok'}); 
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
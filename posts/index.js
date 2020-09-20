const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors());

const posts = {};
const PORT = 4000;

app.post('/posts/create', async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id: id, 
        title: title
    };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });

    res.status(201).send(posts[id]);    
});

app.post('/events', (req, res) => {
    console.log('Evento recibido', req.body.type);

    res.send({});
});

app.listen(PORT, () => {
    console.log("Versiòn: 0.0.10");
    console.log(`Escuchando en el puerto ${PORT}`);
})

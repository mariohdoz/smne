const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4002; 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {

    const {type, data} = req.body;

    if (type === 'PostCreated') {
        const {id, title} = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const {id, content, postId} = data; 

        const post = posts[postId];

        post.comments.push({id, content});
    }

    console.log(`${type} creado`);

    res.send({});

});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});



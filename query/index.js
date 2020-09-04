const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const PORT = 4002; 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
      const { id, title } = data;

      posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
      const { id, content, postId, status } = data;

      const post = posts[postId];

      post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {
      const { id, content, postId, status } = data;

      const post = posts[postId];

      const commment = post.comments.find((comment) => {
        return comment.id === id;
      });

      commment.status = status;
      commment.content = content;
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {

    const {type, data} = req.body;

    handleEvent(type, data);

    res.send({});

});

app.listen(PORT, async () => {
    console.log(`Escuchando en el puerto ${PORT}`);

    const res = await axios.get('http://localhost:4005/events');

    console.log('Procesando eventos');
    res.data.forEach(event => {
        handleEvent(event.type, event.data)

    });

});



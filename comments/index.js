const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const PORT = 4001;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

const commentsByPostId = {}; 

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id; 

    const comments = commentsByPostId[postId] || [];

    res.status(200).send(comments);

});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    comments.push({ id: commentId, content: content });

    commentsByPostId[postId] = comments; 

    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        commentId,
        content,
        postId,
      },
    });

    
    res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Evento recibido", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
    console.log(`Servidor de comentarios diponible en puerto ${PORT}`);
});

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

    comments.push({ id: commentId, content: content, status: 'pending'  });

    commentsByPostId[postId] = comments; 

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    });

    
    res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const {type, data} = req.body; 

  console.log("Evento recibido", type);



  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
    console.log(`Servidor de comentarios diponible en puerto ${PORT}`);
});

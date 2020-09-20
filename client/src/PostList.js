import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './CommentList';


export default () => {

    const [posts, setPost] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get("http://posts.com/posts");
        setPost(res.data);
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {

        return (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20%" }}
            key={post.id}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList comments={post.comments} postId={post.id} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        );
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
}
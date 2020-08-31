import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
// import PostList from './PostList';



export default () => {
    return <div className="container"> 
            <h1>Create a post</h1>
            
            <PostCreate /> 
            <hr />

            <h1>Post</h1>

            <PostList />

        </div>;
};


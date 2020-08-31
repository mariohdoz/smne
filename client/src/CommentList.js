import React from 'react';

export default ({ comments, postId }) => { 

    
  const renderedComments = comments.map(comment => {
    return <li key={comment.id + postId}>{comment.content}</li>;
  });

  return <ul key={postId}>{renderedComments}</ul>;
}

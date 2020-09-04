import React from 'react';

export default ({ comments, postId }) => { 

    
  const renderedComments = comments.map(comment => {

    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = 'This comment is awaiting moderation';
    }

    if (comment.status === 'rejected') {
      content = 'this comment has been rejected';
    }

    return <li key={comment.id + postId}>{content}</li>;
  });

  return <ul key={postId}>{renderedComments}</ul>;
}

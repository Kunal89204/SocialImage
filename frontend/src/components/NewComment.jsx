import React, { useState } from 'react'
import axios from 'axios'

const NewComment = ({postId,  userId}) => {
    const [commentContent, setCommentContent] = useState("")
    const handleSubmit = (e) => {
      e.preventDefault();
        axios.post(`http://localhost:3000/comments/comment/${userId}`, {postId, commentContent})
        .then((respo) => console.log(respo.data))
    }
  return (
    <div>
      <div>
      <form onSubmit={handleSubmit}>
      <input type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
      <button type="submit">comment</button>
      </form>
      </div>
    </div>
  )
}

export default NewComment

import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (

    <div style={blogStyle}>
      <div className="title">{blog.title}</div>
      <div className="author">{blog.author}</div>
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)} className="like">like</button> </div>
        <div>{}</div>
        <button onClick={() => handleDelete(blog)}>Delete</button>
      </Togglable>

    </div>

  )
}

export default Blog
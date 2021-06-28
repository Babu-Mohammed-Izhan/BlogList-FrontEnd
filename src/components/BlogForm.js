import React, { useState } from 'react'

const BlogForm = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleauthor = (event) => { setAuthor(event.target.value) }
    const handletitle = (event) => { setTitle(event.target.value) }
    const handleurl = (event) => { setUrl(event.target.value) }

    const addBlog = (event) => {
        event.preventDefault()
        props.createBlog({ author, title, url })
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    return (
        <div className="formDiv">
            <h3>{props.username}</h3>
            <form onSubmit={addBlog}>
                <div>
                    title:
          <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={handletitle}
                    />
                </div>
                <div>
                    author:
          <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={handleauthor}
                    />
                </div>
                <div>
                    url:
          <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={handleurl}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default BlogForm
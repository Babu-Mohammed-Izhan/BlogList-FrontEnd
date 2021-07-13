import React from 'react'
import Togglable from './Togglable'
import { Card, Button, Typography, CardContent, makeStyles, Link } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  blog: {
    padding: '20px',
    margin: '20px'
  }
}))

const Blog = ({ blog, handleLike, handleDelete }) => {

  const classes = useStyles()

  return (
    <Card variant="outlined" className={classes.blog}>
      <CardContent>
        <Typography variant="h4" className="title">{blog.title}</Typography>
        <Typography variant="h5" className="author">{blog.author}</Typography>
        <Togglable buttonLabel="view">
          <Link href={blog.url}>{blog.url}</Link>
          <Typography>likes {blog.likes} <Button size="small" variant="outlined" color="primary" onClick={() => handleLike(blog)} className="like">like</Button> </Typography>
          <div>{}</div>
          <Button color="secondary" variant="outlined" size="small" onClick={() => handleDelete(blog)}>Delete</Button>
        </Togglable>
      </CardContent>
    </Card>

  )
}

export default Blog
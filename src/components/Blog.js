import React from 'react'
import { Card, Button, Typography, CardContent, makeStyles, Link } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() => ({
  blog: {
    padding: '20px',
    margin: '20px',
  }
}))

const Blog = ({ blog, handleLike, handleDelete }) => {

  const classes = useStyles()

  return (
    <Card className={classes.blog}>
      <CardContent >
        <div style={{ "marginLeft": "25px" }}>
          <Typography className="title">{blog.title}</Typography>
          <Typography className="author">{blog.author}</Typography>
          <Link href={blog.url}>{blog.url}</Link>
          <Typography variant="h6">{blog.likes}   <Button size="small" color="primary" onClick={() => handleLike(blog)} className="like"><ThumbUpIcon color="primary" /></Button></Typography>
        </div>
        <Button color="secondary" size="small" onClick={() => handleDelete(blog)}><DeleteIcon color="secondary" /></Button>
      </CardContent>
    </Card>

  )
}

export default Blog
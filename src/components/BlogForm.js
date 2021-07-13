import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const BlogForm = (props) => {
    const classes = useStyles()
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
        <Container component="main" maxWidth="xs">
            <Typography component="h3" variant="h5">{props.username}</Typography>
            <form onSubmit={addBlog} className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    type="text"
                    label="title"
                    value={title}
                    onChange={handletitle}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="author"
                    type="text"
                    value={author}
                    label="author"
                    onChange={handleauthor}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="url"
                    label="url"
                    type="text"
                    value={url}
                    onChange={handleurl}
                />
                <Button fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit">Save</Button>
            </form>
        </Container>
    )
}

export default BlogForm
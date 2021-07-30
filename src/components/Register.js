import PropTypes from 'prop-types'
import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const RegisterForm = ({
    handleRegister,
    handleRegisterUsernameChange,
    handleRegisterPasswordChange,
    Registerusername,
    Registerpassword
}) => {
    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs" className={classes.paper}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={handleRegister} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={Registerusername}
                                onChange={handleRegisterUsernameChange}
                                label="username"
                                name="ussername"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={Registerpassword}
                                onChange={handleRegisterPasswordChange}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

RegisterForm.propTypes = {
    handleRegister: PropTypes.func.isRequired,
    handleRegisterUsernameChange: PropTypes.func.isRequired,
    handleRegisterPasswordChange: PropTypes.func.isRequired,
    Registerusername: PropTypes.string.isRequired,
    Registerpassword: PropTypes.string.isRequired
}

export default RegisterForm
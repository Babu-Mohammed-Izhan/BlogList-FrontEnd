import React from 'react'
import Alert from '@material-ui/lab/Alert'

const Notification = ({ message, errormessage }) => {
    if (message === null && errormessage === null) {
        return null
    }
    return (
        <div>
            {errormessage !== null ? <Alert className="error" variant="filled" severity="error">{errormessage}</Alert> : <div></div>}
            {message !== null ? <Alert className="message" variant="filled" severity="success">{message}</Alert> : <div></div>}
        </div>
    )
}

export default Notification
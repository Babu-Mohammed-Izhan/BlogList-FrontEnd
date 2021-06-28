import React from 'react'

const Notification = ({ message, errormessage }) => {
    if (message === null && errormessage === null) {
        return null
    }
    return (
        <div>
            {errormessage !== null ? <div className="error">{errormessage}</div> : <div></div>}
            {message !== null ? <div className="message">{message}</div> : <div></div>}
        </div>
    )
}

export default Notification
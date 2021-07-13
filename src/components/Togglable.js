import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

// eslint-disable-next-line no-unused-vars
const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={toggleVisibility}>hide</Button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable
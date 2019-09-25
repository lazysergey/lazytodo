import React from 'react';
import PropTypes from 'prop-types';
import './TodoError.scss';

export const TodoError = ({ hasError: { message } }) => <>
    <div className="todo-error">
        {message}
    </div>
</>

TodoError.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired
    })
}
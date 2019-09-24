import React from 'react';
import './TodoError.scss';

export const TodoError = ({hasError: {message}}) => <>
    <div className="todo-error">
        {message}
    </div>
</>
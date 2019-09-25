import React from 'react';
import PropTypes from 'prop-types';
import './TodoControls.scss';

export const TodoControls = ({ handleShowAll, handleShowCompleted, handleShowIncomplete, setAllCompleted }) => <div className="todo-controls d-flex justify-content-center">
    <button onClick={handleShowAll}>all</button>
    <button onClick={handleShowCompleted}>done</button>
    <button onClick={handleShowIncomplete}>incomplete</button>
    <button onClick={setAllCompleted(true)}>set all done</button>
    <button onClick={setAllCompleted(false)}>set all incomplete</button>
</div>

TodoControls.propTypes = {
    handleShowAll: PropTypes.func.isRequired,
    handleShowCompleted: PropTypes.func.isRequired,
    handleShowIncomplete: PropTypes.func.isRequired,
    setAllCompleted: PropTypes.func.isRequired
}
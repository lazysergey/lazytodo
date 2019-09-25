import React from 'react';
import PropTypes from 'prop-types';
import './TodoControls.scss';

export const TodoControls = ({ handleShowAll, handleShowCompleted, handleShowIncomplete, setAllCompleted, filteredBy }) => (
    <div className="todo-controls d-flex justify-content-center">
        <button
            className={filteredBy === 'all' ? 'active' : null}
            onClick={handleShowAll}>
            all
        </button>
        <button
            className={filteredBy === 'completed' ? 'active' : null}
            onClick={handleShowCompleted}>
            done
        </button>
        <button
            className={filteredBy === 'incomplete' ? 'active' : null}
            onClick={handleShowIncomplete}>
            incomplete
        </button>
        <button onClick={setAllCompleted(true)}>
            set all done
        </button>
        <button onClick={setAllCompleted(false)}>
            set all incomplete
        </button>
    </div>
)

TodoControls.propTypes = {
    filteredBy: PropTypes.oneOf(['all', 'completed', 'incomplete']),
    handleShowAll: PropTypes.func.isRequired,
    handleShowCompleted: PropTypes.func.isRequired,
    handleShowIncomplete: PropTypes.func.isRequired,
    setAllCompleted: PropTypes.func.isRequired
}